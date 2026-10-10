import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('==================================================');
console.log('   VERIFYING VERCEL PRODUCTION DEPLOYMENT SETUP   ');
console.log('==================================================\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  }
}

// 1. Static Root Files
assert(fs.existsSync('index.html'), 'Root contains index.html for homepage');
const indexContent = fs.readFileSync('index.html', 'utf8');
assert(indexContent.includes('Axion Designs'), 'index.html contains Axion Designs branding');
assert(indexContent.includes('color-scheme'), 'index.html has color-scheme meta tag');

assert(fs.existsSync('book-service.html'), 'Root contains book-service.html for /book-service');
assert(fs.existsSync('favicon.ico'), 'Root contains favicon.ico');
assert(fs.existsSync('favicon.png'), 'Root contains favicon.png');

// 2. vercel.json Verification
assert(fs.existsSync('vercel.json'), 'vercel.json exists in root');
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
assert(vercelConfig.cleanUrls === true, 'vercel.json has cleanUrls: true enabled');
assert(Array.isArray(vercelConfig.rewrites), 'vercel.json defines rewrites array');
const hasBookServiceRewrite = vercelConfig.rewrites.some(r => r.source === '/book-service' && r.destination === '/book-service.html');
assert(hasBookServiceRewrite, 'vercel.json rewrites /book-service to /book-service.html');
const hasApiIdRewrite = vercelConfig.rewrites.some(r => r.source === '/api/bookings/:id');
assert(hasApiIdRewrite, 'vercel.json rewrites /api/bookings/:id to query parameter');

// 2b. vercel.json Functions & Bundling Verification
assert(vercelConfig.functions && vercelConfig.functions['server.js'], 'vercel.json defines functions["server.js"] config');
assert(Array.isArray(vercelConfig.functions['server.js'].includeFiles), 'vercel.json includes static files in server.js function bundle');
const includesIndex = vercelConfig.functions['server.js'].includeFiles.includes('index.html');
assert(includesIndex, 'vercel.json includeFiles explicitly bundles index.html for root route');

// 2c. .vercelignore Verification
assert(fs.existsSync('.vercelignore'), '.vercelignore exists');
const vercelIgnoreContent = fs.readFileSync('.vercelignore', 'utf8');
assert(!vercelIgnoreContent.includes('server.js'), '.vercelignore does NOT exclude server.js (ensures Vercel finds entrypoint)');

// 3. package.json Verification
assert(fs.existsSync('package.json'), 'package.json exists');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
assert(pkg.main === 'server.js', 'package.json defines "main": "server.js" for Vercel Node.js runtime entrypoint');
assert(pkg.scripts && pkg.scripts.build, 'package.json defines build script for Vercel');
assert(pkg.scripts && pkg.scripts.start, 'package.json preserves start script for local dev');

// 4. Serverless Functions in api/
assert(fs.existsSync('api/health.js'), 'api/health.js exists');
assert(fs.existsSync('api/bookings.js'), 'api/bookings.js exists');

// 5. Test Serverless Handlers Directly
const { default: healthHandler } = await import('./api/health.js');
let healthResData = null;
const mockHealthRes = {
  setHeader: () => {},
  writeHead: () => {},
  end: (str) => { healthResData = JSON.parse(str); },
  status: (code) => ({
    json: (data) => { healthResData = data; }
  })
};
healthHandler({ method: 'GET', url: '/api/health' }, mockHealthRes);
assert(healthResData && healthResData.status === 'healthy', 'api/health.js handler returns status: healthy');

const { default: bookingsHandler } = await import('./api/bookings.js');
let bookingsResData = null;
let bookingsStatusCode = null;
const mockBookingsRes = {
  setHeader: () => {},
  writeHead: (code) => { bookingsStatusCode = code; },
  end: (str) => { bookingsResData = JSON.parse(str); },
  status: (code) => {
    bookingsStatusCode = code;
    return {
      json: (data) => { bookingsResData = data; },
      end: () => {}
    };
  }
};

await bookingsHandler({ method: 'GET', url: '/api/bookings' }, mockBookingsRes);
assert(bookingsStatusCode === 200 && bookingsResData.success === true, 'api/bookings.js GET returns success: true');

// Test POST validation
let postResData = null;
let postStatusCode = null;
const mockPostRes = {
  setHeader: () => {},
  writeHead: (code) => { postStatusCode = code; },
  end: (str) => { postResData = JSON.parse(str); },
  status: (code) => {
    postStatusCode = code;
    return {
      json: (data) => { postResData = data; }
    };
  }
};
await bookingsHandler({ method: 'POST', url: '/api/bookings', body: {} }, mockPostRes);
assert(postStatusCode === 400 && Array.isArray(postResData.errors), 'api/bookings.js POST empty payload returns validation errors with 400');

console.log('\n==================================================');
console.log(`TOTAL: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log('==================================================');

if (failed > 0) {
  process.exit(1);
}
