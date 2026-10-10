import http from 'http';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 5173;
const DATA_DIR = path.join(__dirname, 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

// Ensure data directory and bookings store exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(BOOKINGS_FILE)) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2), 'utf8');
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const VALID_SERVICE_IDS = new Set(Array.from({ length: 15 }, (_, i) => i + 1));

function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 2000);
}

function generateBookingId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randStr = '';
  const randomBytes = crypto.randomBytes(4);
  for (let i = 0; i < 4; i++) {
    randStr += chars[randomBytes[i] % chars.length];
  }
  return `AX-2026-${randStr}`;
}

function readBookings() {
  try {
    const raw = fs.readFileSync(BOOKINGS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading bookings file:', err);
    return [];
  }
}

function writeBookings(bookings) {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving bookings file:', err);
    return false;
  }
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Security & standard headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  // API Route: POST /api/bookings
  if (req.method === 'POST' && pathname === '/api/bookings') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) { // 1MB limit
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body);

        // Anti-spam honeypot
        if (payload.hp_website && payload.hp_website.length > 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid submission detected' }));
          return;
        }

        // Server-side validation
        const errors = [];
        const service = payload.service || {};
        const project = payload.project || {};
        const planning = payload.planning || {};
        const contact = payload.contact || {};
        const consent = payload.consent;

        if (!service.id || !VALID_SERVICE_IDS.has(Number(service.id))) {
          errors.push('A valid primary service (1-15) must be selected.');
        }

        if (!project.propertyType || typeof project.propertyType !== 'string') {
          errors.push('Property type is required.');
        }

        if (!project.city || project.city.trim().length < 2) {
          errors.push('Project city is required.');
        }

        if (!planning.budgetRange) {
          errors.push('Budget range preference is required.');
        }

        if (!planning.timeline) {
          errors.push('Timeline preference is required.');
        }

        if (!contact.fullName || contact.fullName.trim().length < 2) {
          errors.push('Full name is required.');
        }

        const cleanMobile = (contact.mobile || '').replace(/\D/g, '');
        if (cleanMobile.length < 10) {
          errors.push('A valid mobile number with at least 10 digits is required.');
        }

        if (consent !== true && consent !== 'true') {
          errors.push('Consent to contact and privacy terms is required.');
        }

        if (errors.length > 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, errors }));
          return;
        }

        // Build clean sanitized booking record
        const bookingId = generateBookingId();
        const timestamp = new Date().toISOString();

        const bookingRecord = {
          bookingId,
          createdAt: timestamp,
          status: 'new_enquiry',
          submissionSource: 'dedicated_web_booking_page',
          service: {
            id: Number(service.id),
            name: sanitizeInput(service.name),
            slug: sanitizeInput(service.slug)
          },
          project: {
            name: sanitizeInput(project.name),
            propertyType: sanitizeInput(project.propertyType),
            city: sanitizeInput(project.city),
            area: sanitizeInput(project.area),
            address: sanitizeInput(project.address),
            approxArea: project.approxArea ? Number(project.approxArea) : null,
            areaUnit: sanitizeInput(project.areaUnit || 'sq. ft.'),
            status: sanitizeInput(project.status),
            description: sanitizeInput(project.description),
            serviceSpecificDetails: project.serviceSpecificDetails || {}
          },
          planning: {
            budgetRange: sanitizeInput(planning.budgetRange),
            timeline: sanitizeInput(planning.timeline),
            consultationDate: sanitizeInput(planning.consultationDate),
            consultationTime: sanitizeInput(planning.consultationTime),
            consultationMethod: sanitizeInput(planning.consultationMethod || 'Phone Call'),
            meetingLocation: sanitizeInput(planning.meetingLocation),
            additionalNotes: sanitizeInput(planning.additionalNotes)
          },
          contact: {
            fullName: sanitizeInput(contact.fullName),
            countryCode: sanitizeInput(contact.countryCode || '+91'),
            mobile: sanitizeInput(contact.mobile),
            email: sanitizeInput(contact.email),
            whatsapp: sanitizeInput(contact.whatsapp || contact.mobile),
            preferredMethod: sanitizeInput(contact.preferredMethod || 'Phone Call')
          },
          consent: {
            agreed: true,
            timestamp: timestamp
          }
        };

        const currentBookings = readBookings();
        currentBookings.unshift(bookingRecord);
        const saveOk = writeBookings(currentBookings);

        if (!saveOk) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Database storage error' }));
          return;
        }

        console.log(`[BOOKING SUCCESS] Registered booking ${bookingId} for "${bookingRecord.contact.fullName}" (${bookingRecord.service.name})`);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          bookingId,
          createdAt: timestamp,
          message: 'Your booking enquiry has been received successfully.',
          summary: {
            bookingId,
            serviceName: bookingRecord.service.name,
            propertyType: bookingRecord.project.propertyType,
            location: `${bookingRecord.project.city}${bookingRecord.project.area ? ', ' + bookingRecord.project.area : ''}`,
            budget: bookingRecord.planning.budgetRange,
            timeline: bookingRecord.planning.timeline,
            consultationDate: bookingRecord.planning.consultationDate || 'To be scheduled',
            consultationTime: bookingRecord.planning.consultationTime || 'Flexible',
            consultationMethod: bookingRecord.planning.consultationMethod,
            customerName: bookingRecord.contact.fullName,
            preferredContact: bookingRecord.contact.preferredMethod
          }
        }));
      } catch (err) {
        console.error('Error processing booking JSON payload:', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Malformed JSON payload' }));
      }
    });
    return;
  }

  // API Route: GET /api/bookings/:id
  if (req.method === 'GET' && pathname.startsWith('/api/bookings/')) {
    const targetId = pathname.replace('/api/bookings/', '').trim();
    const bookings = readBookings();
    const match = bookings.find(b => b.bookingId.toLowerCase() === targetId.toLowerCase());

    if (!match) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Booking reference not found' }));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      booking: {
        bookingId: match.bookingId,
        createdAt: match.createdAt,
        status: match.status,
        service: match.service,
        project: {
          propertyType: match.project.propertyType,
          city: match.project.city,
          area: match.project.area
        },
        planning: {
          consultationDate: match.planning.consultationDate,
          consultationTime: match.planning.consultationTime,
          consultationMethod: match.planning.consultationMethod
        }
      }
    }));
    return;
  }

  // API Route: GET /api/health
  if (req.method === 'GET' && pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() }));
    return;
  }

  // Page Routing & URL mapping:
  // Dedicated route /book-service or /book-service/ -> /book-service.html
  if (pathname === '/book-service' || pathname === '/book-service/') {
    pathname = '/book-service.html';
  } else if (pathname === '/') {
    pathname = '/index.html';
  }

  const filePath = path.join(__dirname, pathname);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Page Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache'
    });

    if (req.method === 'HEAD') {
      res.end();
      return;
    }

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Axion Designs server running at http://localhost:${PORT}`);
  console.log(`Booking endpoint ready at http://localhost:${PORT}/book-service`);
});
