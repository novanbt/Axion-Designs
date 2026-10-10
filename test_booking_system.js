import http from 'http';
import fs from 'fs';

function request(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', reject);

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runTests() {
  console.log('==================================================');
  console.log('   RUNNING COMPREHENSIVE BOOKING SYSTEM TESTS     ');
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

  try {
    // TEST 1: Check dedicated URL /book-service
    const res1 = await request({
      hostname: 'localhost',
      port: 5173,
      path: '/book-service',
      method: 'GET'
    });
    assert(res1.statusCode === 200, 'GET /book-service responds with HTTP 200');
    assert(res1.body.includes('What Can We Help You Design?'), 'Page contains Step 1 Heading');
    assert(res1.body.includes('Tell Us About Your Project'), 'Page contains Step 2 Heading');
    assert(res1.body.includes("Let's Plan Your Project"), 'Page contains Step 3 Heading');
    assert(res1.body.includes('How Can We Reach You?'), 'Page contains Step 4 Heading');
    assert(res1.body.includes('Review Your Booking Request'), 'Page contains Step 5 Heading');
    assert(res1.body.includes('Your Request Has Been Received!'), 'Page contains Confirmation Heading');

    // TEST 2: Check direct /book-service.html
    const res2 = await request({
      hostname: 'localhost',
      port: 5173,
      path: '/book-service.html',
      method: 'GET'
    });
    assert(res2.statusCode === 200, 'GET /book-service.html responds with HTTP 200');

    // TEST 3: Validation Error on Empty POST /api/bookings
    const res3 = await request({
      hostname: 'localhost',
      port: 5173,
      path: '/api/bookings',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, JSON.stringify({}));
    assert(res3.statusCode === 400, 'POST /api/bookings with empty payload returns HTTP 400');
    const err3 = JSON.parse(res3.body);
    assert(err3.errors && err3.errors.length > 0, 'Server returns structured validation error list');

    // TEST 4: Honeypot rejection
    const res4 = await request({
      hostname: 'localhost',
      port: 5173,
      path: '/api/bookings',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, JSON.stringify({
      hp_website: 'spam-bot-input',
      service: { id: 1, name: 'Residential Interior Design' }
    }));
    assert(res4.statusCode === 400, 'Honeypot triggers rejection with HTTP 400');

    // TEST 5: Successful Booking Submission
    const validBooking = {
      hp_website: '',
      service: {
        id: 2,
        name: 'Modular Kitchen and Wardrobe Design',
        slug: 'modular-kitchen-and-wardrobe-design'
      },
      project: {
        name: 'Penthouse Aurora',
        propertyType: 'Apartment / Flat',
        city: 'Bengaluru',
        area: 'Indiranagar',
        address: '100 Feet Road, 4th Block',
        approxArea: 1850,
        areaUnit: 'sq. ft.',
        status: 'Ready for interior work',
        description: 'Modern minimalist kitchen with quartz island and walk-in wardrobe.',
        serviceSpecificDetails: {
          answers: ['Both Kitchen & Wardrobes', 'Hafele hardware preferred']
        }
      },
      planning: {
        budgetRange: '₹10 lakh – ₹20 lakh',
        timeline: 'Within 1–3 months',
        consultationDate: '2026-10-25',
        consultationTime: 'Morning (10:00 AM – 1:00 PM)',
        consultationMethod: 'Video Call',
        meetingLocation: '',
        additionalNotes: 'Need 3D renders before civil commencement'
      },
      contact: {
        fullName: 'Dr. Priya V. Menon',
        countryCode: '+91',
        mobile: '9845012345',
        email: 'priya.menon@example.com',
        whatsapp: '9845012345',
        preferredMethod: 'WhatsApp'
      },
      consent: true
    };

    const res5 = await request({
      hostname: 'localhost',
      port: 5173,
      path: '/api/bookings',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, JSON.stringify(validBooking));

    assert(res5.statusCode === 201, 'POST /api/bookings returns HTTP 201 Created');
    const json5 = JSON.parse(res5.body);
    assert(json5.success === true, 'Response contains success: true');
    assert(/^AX-2026-[A-Z0-9]{4}$/.test(json5.bookingId), `Generated valid booking ID: ${json5.bookingId}`);
    assert(json5.summary.serviceName === 'Modular Kitchen and Wardrobe Design', 'Recap summary contains correct service');
    assert(json5.summary.customerName === 'Dr. Priya V. Menon', 'Recap summary contains customer name');

    // TEST 6: Check Persistence in data/bookings.json
    const rawData = fs.readFileSync('data/bookings.json', 'utf8');
    const bookingsList = JSON.parse(rawData);
    const persisted = bookingsList.find(b => b.bookingId === json5.bookingId);
    assert(persisted !== undefined, `Booking ${json5.bookingId} successfully persisted in data/bookings.json`);
    assert(persisted.status === 'new_enquiry', 'Booking has initial status new_enquiry');

    // TEST 7: Retrieve via GET /api/bookings/:id
    const res7 = await request({
      hostname: 'localhost',
      port: 5173,
      path: `/api/bookings/${json5.bookingId}`,
      method: 'GET'
    });
    assert(res7.statusCode === 200, `GET /api/bookings/${json5.bookingId} responds with HTTP 200`);
    const json7 = JSON.parse(res7.body);
    assert(json7.booking.bookingId === json5.bookingId, 'Retrieved matching booking ID');

    // TEST 8: Check all 15 Service Image Assets on disk
    const serviceImages = [
      'residential-interior.jpg',
      'modular-kitchen.jpg',
      'ceiling-lighting.jpg',
      'commercial-interior.jpg',
      'materials-finishes.jpg',
      'interior-visualisation.jpg',
      'turnkey-execution.jpg',
      'furniture-styling.jpg',
      'renovation-remodelling.jpg',
      'vastu-spatial.jpg',
      'space-optimisation.jpg',
      'budget-estimation.jpg',
      'procurement-sourcing.jpg',
      'smart-home-interior.jpg',
      'project-management.jpg'
    ];

    let allImagesOk = true;
    for (const img of serviceImages) {
      if (!fs.existsSync(`assets/images/services/${img}`)) {
        allImagesOk = false;
        console.error(`Missing image: assets/images/services/${img}`);
      }
    }
    assert(allImagesOk, 'All 15 service images exist in assets/images/services/');

    // TEST 9: Check Homepage entry points
    const indexHtml = fs.readFileSync('index.html', 'utf8');
    assert(indexHtml.includes('href="/book-service"'), 'Homepage contains links to /book-service');
    assert(indexHtml.includes('href="/book-service?service=residential-interior-design"'), 'Homepage links to service-specific preselection');
    assert(!indexHtml.includes('services-booking-cta-banner'), 'Homepage cleanly removed bottom CTA banner per user request');

    // TEST 10: Check Form Options Dark Contrast Styling
    const bookingHtml = fs.readFileSync('book-service.html', 'utf8');
    assert(bookingHtml.includes('color-scheme') && bookingHtml.includes('content="dark"'), 'book-service.html declares color-scheme: dark meta tag');
    assert(bookingHtml.includes('style="background-color: #12151D; color: #FFFFFF;"'), 'book-service.html select options have high-contrast inline styles');

    const bookingCss = fs.readFileSync('css/booking.css', 'utf8');
    assert(bookingCss.includes('.form-select option') && bookingCss.includes('background-color: #12151D'), 'booking.css has explicit dark background styling for select options');
    assert(bookingCss.includes('color: #F3F4F7'), 'booking.css has crisp high-contrast text color for select options');

  } catch (err) {
    console.error('Test execution error:', err);
    failed++;
  }

  console.log('\n==================================================');
  console.log(`TOTAL: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('==================================================');
}

runTests();
