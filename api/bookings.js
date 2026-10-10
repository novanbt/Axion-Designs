import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const VALID_SERVICE_IDS = new Set(Array.from({ length: 15 }, (_, i) => i + 1));
const IS_VERCEL = Boolean(process.env.VERCEL);
const DATA_FILE = IS_VERCEL
  ? path.join('/tmp', 'bookings.json')
  : path.join(process.cwd(), 'data', 'bookings.json');

function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim().slice(0, 2000);
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
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
    // Seed from repository data folder if present
    const seedPath = path.join(process.cwd(), 'data', 'bookings.json');
    if (fs.existsSync(seedPath)) {
      const data = fs.readFileSync(seedPath, 'utf8');
      if (IS_VERCEL) {
        try {
          fs.writeFileSync(DATA_FILE, data, 'utf8');
        } catch {
          // ignore seeding write error
        }
      }
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading bookings:', err);
  }
  return [];
}

function writeBookings(bookings) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving bookings:', err);
    return false;
  }
}

async function parseBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) req.destroy();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        resolve(null);
      }
    });
    req.on('error', () => resolve(null));
  });
}

function sendJson(res, statusCode, data) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (typeof res.status === 'function') {
    return res.status(statusCode).json(data);
  }
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

export default async function handler(req, res) {
  // CORS & Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    if (typeof res.status === 'function') return res.status(200).end();
    res.writeHead(200);
    return res.end();
  }

  const host = req.headers?.host || 'localhost';
  const url = new URL(req.url || '/', `http://${host}`);
  const pathname = url.pathname;
  const queryId = req.query?.id || url.searchParams.get('id');

  // Route: GET /api/bookings/:id or /api/bookings?id=...
  if (req.method === 'GET') {
    let targetId = queryId;
    if (!targetId && pathname.startsWith('/api/bookings/')) {
      targetId = pathname.replace('/api/bookings/', '').trim();
    }

    if (targetId) {
      const bookings = readBookings();
      const match = bookings.find(b => b.bookingId.toLowerCase() === targetId.toLowerCase());

      if (!match) {
        return sendJson(res, 404, { success: false, error: 'Booking reference not found' });
      }

      return sendJson(res, 200, {
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
      });
    }

    // Default GET returns health / info
    return sendJson(res, 200, {
      success: true,
      service: 'Axion Designs Booking API',
      bookingsCount: readBookings().length
    });
  }

  // Route: POST /api/bookings
  if (req.method === 'POST') {
    const payload = await parseBody(req);
    if (!payload) {
      return sendJson(res, 400, { success: false, error: 'Malformed JSON payload' });
    }

    // Anti-spam honeypot
    if (payload.hp_website && payload.hp_website.length > 0) {
      return sendJson(res, 400, { error: 'Invalid submission detected' });
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
      return sendJson(res, 400, { success: false, errors });
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
      return sendJson(res, 500, { success: false, error: 'Database storage error' });
    }

    return sendJson(res, 201, {
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
    });
  }

  return sendJson(res, 405, { success: false, error: 'Method not allowed' });
}
