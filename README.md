# Axion Designs — Bespoke Antigravity Interior Architecture

> *Defy Gravity. Elevate Design.*

Axion Designs is an ultra-modern, high-end interior architecture and spatial engineering studio web application. The platform showcases signature antigravity architectural aesthetics, floating structural millwork, ethereal biophilic luminescence, 15 specialized design disciplines, and an interactive 5-step service booking wizard.

---

## ✨ Features

- **Hero Experience**: Immersive architectural hero centerpiece with subtle cursor illumination and ambient lighting.
- **Signature Projects**: Interactive project gallery featuring detailed architectural inspection modals with discrete CSS transitions.
- **15 Design Disciplines**: Comprehensive showcase of interior architecture services (Residential, Commercial, Turnkey, Smart-Home Integration, Vastu Spatial Planning, and more).
- **Dedicated Multi-Step Booking Wizard (`/book-service`)**:
  - Step 1: Primary discipline selection from all 15 services with instant URL parameter deep-linking (`?service=...`).
  - Step 2: Property type, site address, floor plan status, and dynamic service-specific scope questionnaires.
  - Step 3: Indicative budget range bracket selection and project commencement timelines.
  - Step 4: Schedule preferences, consultation modality (Phone, Video, In-Person), and verified client contact details.
  - Step 5: Live review, recap summary, and instant digital booking confirmation.
- **REST API Backend**: Fast Node.js HTTP server handling static asset delivery, routing, inquiry submissions, and transactional JSON persistence.
- **Full Dark Mode**: Native `color-scheme: dark` styling across all inputs, high-contrast custom dropdowns, and date pickers.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)

### Installation & Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/novanbt/Axion-Designs.git
   cd Axion-Designs
   ```

2. Start the development server:
   ```bash
   npm start
   # or: node server.js
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Running Automated Verification Tests

```bash
npm test
# or: node test_booking_system.js
```

---

## 📁 Project Structure

```
Axion-Designs/
├── assets/
│   └── images/
│       ├── services/       # 15 High-resolution discipline imagery
│       └── ...             # Architectural project photography & assets
├── css/
│   ├── styles.css          # Design system tokens, typography, and homepage styling
│   └── booking.css         # Multi-step booking wizard layout and form controls
├── data/
│   └── bookings.json       # Persisted project consultation bookings
├── js/
│   ├── app.js              # Homepage interactions, modal controller, smooth navigation
│   ├── booking.js          # Multi-step state machine, validation, API integration
│   └── gravity-engine.js   # Cursor glow physics and subtle floating micro-animations
├── index.html              # Main architectural portfolio landing page
├── book-service.html       # Dedicated multi-step booking experience
├── server.js               # Node.js ES-Module HTTP server and API endpoints
├── test_booking_system.js  # Automated 28-point end-to-end test suite
└── package.json            # Project manifest and scripts
```

---

## 🛡️ License

Private Commission © 2026 Axion Designs Studio Ltd. All rights reserved.
