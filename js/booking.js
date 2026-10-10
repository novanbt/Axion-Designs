/**
 * AXION DESIGNS — Dedicated Multi-Step Service Booking Engine
 * Route: /book-service
 */

// 15 Comprehensive Architectural & Interior Disciplines
export const SERVICES_CATALOG = [
  {
    id: 1,
    slug: 'residential-interior-design',
    aliasSlugs: ['residential-interior', 'residential', '1'],
    name: 'Residential Interior Design',
    category: 'Residential & Living',
    image: 'assets/images/services/residential-interior.jpg',
    description: 'Living rooms, master suites, dining spaces, kitchens, and complete home concepts for apartments, villas, and independent residences.',
    chips: ['Living & Bed Suites', 'Space Planning', 'Full Home Concepts', 'Turnkey Finishes']
  },
  {
    id: 2,
    slug: 'modular-kitchen-and-wardrobe-design',
    aliasSlugs: ['modular-kitchen', 'kitchen-wardrobe', 'kitchen', '2'],
    name: 'Modular Kitchen and Wardrobe Design',
    category: 'Residential & Living',
    image: 'assets/images/services/modular-kitchen.jpg',
    description: 'Custom ergonomic modular kitchen configurations, built-in wardrobes, walk-in closets, and smart organizational cabinetry.',
    chips: ['Ergonomic Kitchens', 'Walk-in Closets', 'Hafele/Blum Hardware', 'Maximised Storage'],
    dynamicQuestion: {
      type: 'checkboxes',
      title: 'Which areas require modular solutions?',
      subtitle: 'Select all functional zones to be engineered.',
      options: ['Modular Kitchen Only', 'Wardrobes & Closets Only', 'Both Kitchen & Wardrobes', 'Full Home Storage Solutions']
    }
  },
  {
    id: 3,
    slug: 'ceiling-lighting-and-electrical-planning',
    aliasSlugs: ['ceiling-lighting', 'lighting-electrical', 'ceiling', '3'],
    name: 'Ceiling, Lighting and Electrical Planning',
    category: 'Lighting & Tech',
    image: 'assets/images/services/ceiling-lighting.jpg',
    description: 'Architectural false ceiling design, ambient & task lighting schemes, electrical conduit planning, and lighting fixture selection.',
    chips: ['False Ceiling Design', 'Layered Lighting', 'Electrical Schematics', 'Architectural LEDs']
  },
  {
    id: 4,
    slug: 'commercial-interior-design',
    aliasSlugs: ['commercial-interior', 'commercial', 'office', '4'],
    name: 'Commercial Interior Design',
    category: 'Commercial',
    image: 'assets/images/services/commercial-interior.jpg',
    description: 'High-impact workspace environments, corporate offices, retail showrooms, boutique studios, restaurants, and hospitality spaces.',
    chips: ['Executive Offices', 'Retail Showrooms', 'Hospitality & Cafés', 'Acoustic Zoning']
  },
  {
    id: 5,
    slug: 'materials-colours-and-finishes',
    aliasSlugs: ['materials-finishes', 'materials-colours', 'materials', '5'],
    name: 'Materials, Colours and Finishes',
    category: 'Finishes & Curation',
    image: 'assets/images/services/materials-finishes.jpg',
    description: 'Harmonious curation of color palettes, wall treatments, stone, tiles, veneers, bespoke textures, and tactile material finishes.',
    chips: ['Veneer & Stone Palettes', 'Wall Textures', 'Custom Paint Schemes', 'Tactile Sampling']
  },
  {
    id: 6,
    slug: '2d-drawings-and-3d-visualisation',
    aliasSlugs: ['interior-visualisation', '3d-visualisation', 'drawings-3d', '6'],
    name: '2D Drawings and 3D Visualisation',
    category: 'Design & Visualization',
    image: 'assets/images/services/interior-visualisation.jpg',
    description: 'Photorealistic 3D renders, VR walkthroughs, detailed 2D architectural CAD plans, elevations, and MEP technical drawings.',
    chips: ['Photorealistic 3D', 'CAD Working Drawings', 'Joinery Details', 'VR Walkthroughs'],
    dynamicQuestion: {
      type: 'radio',
      title: 'Do you already have an architectural floor plan?',
      subtitle: 'Helps us determine whether on-site spatial scanning is needed.',
      options: ['Yes — CAD / DWG / High-Res PDF available', 'Yes — Hand-drawn sketch with dimensions', 'No — Need site measurement & scanning']
    }
  },
  {
    id: 7,
    slug: 'interior-execution-and-turnkey-projects',
    aliasSlugs: ['turnkey-execution', 'turnkey-projects', 'turnkey', '7'],
    name: 'Interior Execution and Turnkey Projects',
    category: 'Execution & Turnkey',
    image: 'assets/images/services/turnkey-execution.jpg',
    description: 'Complete turnkey delivery from bare-shell to final handover with dedicated civil, carpentry, electrical, and finishing master crews.',
    chips: ['Single Point Accountability', 'Master Carpentry', 'Civil & MEP Works', 'Guaranteed Handover'],
    dynamicQuestion: {
      type: 'radio',
      title: 'Do you already have existing interior blueprints?',
      subtitle: 'Clarifies whether you need design & build or execution-only.',
      options: ['Need Complete Design + Build Turnkey Delivery', 'Have Blueprints Ready — Execution & Contracting Only', 'Partially Designed — Need Value Engineering & Build']
    }
  },
  {
    id: 8,
    slug: 'furniture-decor-and-styling',
    aliasSlugs: ['furniture-styling', 'furniture-decor', 'decor', '8'],
    name: 'Furniture, Decor and Styling',
    category: 'Styling & Decor',
    image: 'assets/images/services/furniture-styling.jpg',
    description: 'Custom bespoke furniture design, art curation, window treatments, rugs, accent illumination, indoor landscaping, and final styling.',
    chips: ['Bespoke Furniture', 'Art & Sculpture Curation', 'Window Drapes & Rugs', 'Biophilic Styling']
  },
  {
    id: 9,
    slug: 'renovation-and-remodelling',
    aliasSlugs: ['renovation-remodelling', 'renovation', 'remodelling', '9'],
    name: 'Renovation and Remodelling',
    category: 'Renovation',
    image: 'assets/images/services/renovation-remodelling.jpg',
    description: 'Transformative structural updates, demolition, bathroom overhauls, kitchen upgrades, civil repairs, and spatial reconfiguration.',
    chips: ['Structural Realignment', 'Bathroom Overhauls', 'Kitchen Modernization', 'Flooring Retrofits'],
    dynamicQuestion: {
      type: 'checkboxes',
      title: 'Which areas require renovation?',
      subtitle: 'Select all zones in need of remodelling.',
      options: ['Full Property Overhaul', 'Kitchen & Dining Spaces', 'Bathrooms & Wet Areas', 'Living & Common Spaces', 'Structural Wall Demolition / Modification']
    }
  },
  {
    id: 10,
    slug: 'vastu-consultation',
    aliasSlugs: ['vastu-spatial', 'vastu', '10'],
    name: 'Vastu Consultation',
    category: 'Spatial & Wellbeing',
    image: 'assets/images/services/vastu-spatial.jpg',
    description: 'Directional harmony and energy balancing integrating time-tested Vastu Shastra principles with cutting-edge modern aesthetics.',
    chips: ['Entrance & Direction Alignment', 'Zonal Balancing', 'Non-Destructive Fixes', 'Modern Integration']
  },
  {
    id: 11,
    slug: 'space-optimisation',
    aliasSlugs: ['space-planning', 'optimisation', '11'],
    name: 'Space Optimisation',
    category: 'Spatial Engineering',
    image: 'assets/images/services/space-optimisation.jpg',
    description: 'Intelligent spatial zoning, multi-functional transformative furniture, circulation optimization, and compact floorplan engineering.',
    chips: ['Compact Space Engineering', 'Foldable Furniture', 'Circulation Enhancement', 'Concealed Storage']
  },
  {
    id: 12,
    slug: 'budget-estimation-and-cost-planning',
    aliasSlugs: ['budget-estimation', 'cost-planning', 'budget', '12'],
    name: 'Budget Estimation and Cost Planning',
    category: 'Planning & Finance',
    image: 'assets/images/services/budget-estimation.jpg',
    description: 'Preliminary and itemised project budget estimates, material cost-comparison trade-offs, and value engineering recommendations.',
    chips: ['Detailed BOQ Estimates', 'Labour & Material Splits', 'Alternative Material Trade-offs', 'Milestone Cashflow Planning']
  },
  {
    id: 13,
    slug: 'procurement-and-material-sourcing',
    aliasSlugs: ['procurement-sourcing', 'material-sourcing', 'procurement', '13'],
    name: 'Procurement and Material Sourcing',
    category: 'Procurement',
    image: 'assets/images/services/procurement-sourcing.jpg',
    description: 'Direct vendor sourcing for tiles, sanitary ware, hardware, lighting, stone, and furnishings with delivery logistics coordination.',
    chips: ['Factory Direct Sourcing', 'Tile & Stone Audits', 'Lighting & Fixtures', 'Delivery Logistics Oversight']
  },
  {
    id: 14,
    slug: 'smart-home-integration',
    aliasSlugs: ['smart-home', 'automation', '14'],
    name: 'Smart-Home Integration',
    category: 'Technology & Automation',
    image: 'assets/images/services/smart-home-interior.jpg',
    description: 'Architectural integration of automated lighting scenes, motorized window blinds, climate control, and smart voice systems.',
    chips: ['Scene & Mood Lighting', 'Motorized Window Drapes', 'Smart Climate & HVAC', 'Voice & Mobile Control'],
    dynamicQuestion: {
      type: 'checkboxes',
      title: 'Which automation systems do you wish to integrate?',
      subtitle: 'Select your preferred smart infrastructure.',
      options: ['Smart Lighting & Mood Scenes', 'Motorized Curtains & Blinds', 'Audio / Visual & Home Theater', 'Smart Climate Control (HVAC)', 'Smart Security & Keyless Access']
    }
  },
  {
    id: 15,
    slug: 'project-management',
    aliasSlugs: ['project-oversight', 'site-management', '15'],
    name: 'Project Management',
    category: 'Management & Oversight',
    image: 'assets/images/services/project-management.jpg',
    description: 'Dedicated site engineers, strict timeline tracking, critical-path scheduling, vendor compliance audits, and handover coordination.',
    chips: ['Milestone Gantt Tracking', 'Quality Assurance Audits', 'Vendor Compliance', 'Handover Certification']
  }
];

export const PROPERTY_TYPES = [
  { value: 'Apartment / Flat', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', sub: 'High-rise & mid-rise flats' },
  { value: 'Independent House', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', sub: 'Stand-alone family residence' },
  { value: 'Villa', icon: 'M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m4 0h1m-5 4h1m4 0h1m-5 4h1m4 0h1', sub: 'Gated luxury villas' },
  { value: 'Office', icon: 'M20 7h-3a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z', sub: 'Corporate & startup spaces' },
  { value: 'Retail Shop / Showroom', icon: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z', sub: 'Boutiques, retail stores' },
  { value: 'Restaurant / Café', icon: 'M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z', sub: 'Dining & hospitality' },
  { value: 'Clinic / Studio', icon: 'M22 12h-4l-3 9L9 3l-3 9H2', sub: 'Medical, wellness & creative' },
  { value: 'Other', icon: 'M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z', sub: 'Custom property category' }
];

export const BUDGET_RANGES = [
  { value: 'Below ₹1 lakh', sub: 'Consultation & small accents' },
  { value: '₹1 lakh – ₹3 lakh', sub: 'Single room / targeted styling' },
  { value: '₹3 lakh – ₹5 lakh', sub: 'Modular kitchen or 2BHK basic' },
  { value: '₹5 lakh – ₹10 lakh', sub: 'Comprehensive 2BHK / 3BHK interiors' },
  { value: '₹10 lakh – ₹20 lakh', sub: 'Premium bespoke residence' },
  { value: 'Above ₹20 lakh', sub: 'Luxury villa & executive space' },
  { value: 'Not decided yet', sub: 'Looking for architectural guidance' }
];

export const TIMELINE_OPTIONS = [
  { value: 'As soon as possible', sub: 'Immediate start (< 10 days)' },
  { value: 'Within 2–4 weeks', sub: 'Site possession soon' },
  { value: 'Within 1–3 months', sub: 'Under construction / finishing' },
  { value: 'Within 3–6 months', sub: 'Early structural planning' },
  { value: 'Just exploring options', sub: 'Preliminary research stage' }
];

export class BookingWizardApp {
  constructor() {
    this.state = {
      currentStep: 1,
      selectedService: null,
      project: {
        name: '',
        propertyType: '',
        city: '',
        area: '',
        address: '',
        approxArea: '',
        areaUnit: 'sq. ft.',
        status: '',
        description: '',
        serviceSpecific: {}
      },
      planning: {
        budgetRange: '',
        timeline: '',
        consultDate: '',
        consultTime: 'Flexible / Any Time',
        consultMethod: 'Phone Call',
        meetingLocation: '',
        additionalNotes: ''
      },
      contact: {
        fullName: '',
        countryCode: '+91',
        mobile: '',
        email: '',
        whatsapp: '',
        preferredMethod: 'Phone Call'
      },
      consent: false,
      bookingId: null,
      isSubmitting: false
    };

    this.init();
  }

  init() {
    this.renderServicesGrid();
    this.renderPropertyTypeCards();
    this.renderBudgetCards();
    this.renderTimelineCards();
    this.bindEvents();
    this.setupDateConstraint();
    this.handleUrlPreselection();
    this.updateWizardUI();
  }

  /* -------------------------------------------------------------------------
     Render Step 1 Services Grid
     ------------------------------------------------------------------------- */
  renderServicesGrid() {
    const gridEl = document.getElementById('services-grid');
    if (!gridEl) return;

    gridEl.innerHTML = SERVICES_CATALOG.map(s => {
      const isSelected = this.state.selectedService && this.state.selectedService.id === s.id;
      return `
        <article 
          class="service-select-card ${isSelected ? 'is-selected' : ''}" 
          data-service-id="${s.id}"
          tabindex="0"
          role="radio"
          aria-checked="${isSelected}"
          aria-label="${s.name}"
        >
          <div class="service-card-media-box">
            <img src="${s.image}" alt="${s.name}" class="service-card-image" loading="lazy">
            <div class="service-card-gradient" aria-hidden="true"></div>
            <div class="service-num-badge">${String(s.id).padStart(2, '0')}</div>
            <div class="service-select-indicator" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
          <div class="service-card-info">
            <span class="service-card-category">${s.category}</span>
            <h3 class="service-card-h3">${s.name}</h3>
            <p class="service-card-snippet">${s.description}</p>
            <div class="service-card-chips">
              ${s.chips.map(c => `<span class="service-chip">${c}</span>`).join('')}
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /* -------------------------------------------------------------------------
     Render Step 2 Property Types
     ------------------------------------------------------------------------- */
  renderPropertyTypeCards() {
    const groupEl = document.getElementById('property-type-group');
    if (!groupEl) return;

    groupEl.innerHTML = PROPERTY_TYPES.map(pt => {
      const isSelected = this.state.project.propertyType === pt.value;
      return `
        <div 
          class="choice-card ${isSelected ? 'is-selected' : ''}" 
          data-type-val="${pt.value}"
          tabindex="0"
          role="radio"
          aria-checked="${isSelected}"
        >
          <div class="choice-card-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="${pt.icon}"></path>
            </svg>
          </div>
          <div class="choice-card-title">${pt.value}</div>
          <div class="choice-card-sub">${pt.sub}</div>
        </div>
      `;
    }).join('');
  }

  /* -------------------------------------------------------------------------
     Render Step 3 Budget Cards
     ------------------------------------------------------------------------- */
  renderBudgetCards() {
    const groupEl = document.getElementById('budget-range-group');
    if (!groupEl) return;

    groupEl.innerHTML = BUDGET_RANGES.map(b => {
      const isSelected = this.state.planning.budgetRange === b.value;
      return `
        <div 
          class="choice-card ${isSelected ? 'is-selected' : ''}" 
          data-budget-val="${b.value}"
          tabindex="0"
          role="radio"
          aria-checked="${isSelected}"
        >
          <div class="choice-card-title">${b.value}</div>
          <div class="choice-card-sub">${b.sub}</div>
        </div>
      `;
    }).join('');
  }

  /* -------------------------------------------------------------------------
     Render Step 3 Timeline Cards
     ------------------------------------------------------------------------- */
  renderTimelineCards() {
    const groupEl = document.getElementById('timeline-group');
    if (!groupEl) return;

    groupEl.innerHTML = TIMELINE_OPTIONS.map(t => {
      const isSelected = this.state.planning.timeline === t.value;
      return `
        <div 
          class="choice-card ${isSelected ? 'is-selected' : ''}" 
          data-timeline-val="${t.value}"
          tabindex="0"
          role="radio"
          aria-checked="${isSelected}"
        >
          <div class="choice-card-title">${t.value}</div>
          <div class="choice-card-sub">${t.sub}</div>
        </div>
      `;
    }).join('');
  }

  /* -------------------------------------------------------------------------
     Date picker constraints (cannot be in past)
     ------------------------------------------------------------------------- */
  setupDateConstraint() {
    const dateInput = document.getElementById('input-consult-date');
    if (dateInput) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      dateInput.min = `${yyyy}-${mm}-${dd}`;
    }
  }

  /* -------------------------------------------------------------------------
     URL Parameter Pre-selection (e.g. ?service=residential-interior-design)
     ------------------------------------------------------------------------- */
  handleUrlPreselection() {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = (params.get('service') || '').trim().toLowerCase();

    if (!serviceParam) return;

    const matchedService = SERVICES_CATALOG.find(s => {
      if (s.slug.toLowerCase() === serviceParam) return true;
      if (s.aliasSlugs && s.aliasSlugs.some(a => a.toLowerCase() === serviceParam)) return true;
      if (String(s.id) === serviceParam) return true;
      return false;
    });

    if (matchedService) {
      this.selectService(matchedService.id, false);
      console.log(`[URL PRESELECT] Preselected discipline: ${matchedService.name}`);
    }
  }

  /* -------------------------------------------------------------------------
     Select Service Action (Step 1)
     ------------------------------------------------------------------------- */
  selectService(serviceId, autoScroll = true) {
    const service = SERVICES_CATALOG.find(s => s.id === serviceId);
    if (!service) return;

    this.state.selectedService = service;

    // Update Step 1 card UI
    document.querySelectorAll('.service-select-card').forEach(card => {
      const cId = parseInt(card.getAttribute('data-service-id'), 10);
      const isThis = cId === service.id;
      card.classList.toggle('is-selected', isThis);
      card.setAttribute('aria-checked', isThis ? 'true' : 'false');
    });

    // Update Context Ribbon
    this.updateContextRibbon(service);

    // Update Dynamic Questions for Step 2
    this.updateDynamicQuestions(service);

    // Enable next button
    const nextBtn = document.getElementById('btn-wizard-next');
    if (nextBtn && this.state.currentStep === 1) {
      nextBtn.disabled = false;
    }

    if (autoScroll) {
      // Smooth visual confirmation
      const activeCard = document.querySelector(`.service-select-card[data-service-id="${serviceId}"]`);
      if (activeCard) {
        activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }

  /* -------------------------------------------------------------------------
     Context Ribbon Update
     ------------------------------------------------------------------------- */
  updateContextRibbon(service) {
    const banner = document.getElementById('selected-service-banner');
    const thumb = document.getElementById('banner-thumb');
    const tag = document.getElementById('banner-tag');
    const title = document.getElementById('banner-title');

    if (!banner || !service) return;

    banner.style.display = 'flex';
    if (thumb) {
      thumb.src = service.image;
      thumb.alt = service.name;
    }
    if (tag) tag.textContent = `Discipline ${String(service.id).padStart(2, '0')} • ${service.category}`;
    if (title) title.textContent = service.name;
  }

  /* -------------------------------------------------------------------------
     Dynamic Question Rendering (Step 2)
     ------------------------------------------------------------------------- */
  updateDynamicQuestions(service) {
    const wrapper = document.getElementById('dynamic-questions-wrapper');
    const title = document.getElementById('dynamic-q-title');
    const sub = document.getElementById('dynamic-q-sub');
    const content = document.getElementById('dynamic-q-content');

    if (!wrapper || !content) return;

    if (!service.dynamicQuestion) {
      wrapper.classList.remove('is-visible');
      content.innerHTML = '';
      return;
    }

    wrapper.classList.add('is-visible');
    if (title) title.querySelector('span').textContent = service.dynamicQuestion.title;
    if (sub) sub.textContent = service.dynamicQuestion.subtitle;

    const q = service.dynamicQuestion;
    if (q.type === 'checkboxes') {
      content.innerHTML = `
        <div class="dynamic-options-pills">
          ${q.options.map((opt, i) => `
            <label class="pill-checkbox-label" for="dyn-opt-${i}">
              <input type="checkbox" id="dyn-opt-${i}" name="dyn_opt" value="${opt}">
              <span>${opt}</span>
            </label>
          `).join('')}
        </div>
      `;
    } else if (q.type === 'radio') {
      content.innerHTML = `
        <div class="dynamic-options-pills">
          ${q.options.map((opt, i) => `
            <label class="pill-checkbox-label" for="dyn-opt-${i}">
              <input type="radio" id="dyn-opt-${i}" name="dyn_radio" value="${opt}">
              <span>${opt}</span>
            </label>
          `).join('')}
        </div>
      `;
    }

    // Attach pill toggle highlights
    content.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', () => {
        if (input.type === 'radio') {
          content.querySelectorAll('.pill-checkbox-label').forEach(l => l.classList.remove('is-checked'));
        }
        input.closest('.pill-checkbox-label').classList.toggle('is-checked', input.checked);
      });
    });
  }

  /* -------------------------------------------------------------------------
     Event Bindings
     ------------------------------------------------------------------------- */
  bindEvents() {
    // Step 1 Service Cards click / keyboard
    const servicesGrid = document.getElementById('services-grid');
    if (servicesGrid) {
      servicesGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.service-select-card');
        if (card) {
          const id = parseInt(card.getAttribute('data-service-id'), 10);
          this.selectService(id);
        }
      });

      servicesGrid.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          const card = e.target.closest('.service-select-card');
          if (card) {
            e.preventDefault();
            const id = parseInt(card.getAttribute('data-service-id'), 10);
            this.selectService(id);
          }
        }
      });
    }

    // Stepper node clicks (only allowed for visited/clickable earlier steps)
    document.querySelectorAll('.stepper-item').forEach(item => {
      item.addEventListener('click', () => {
        const step = parseInt(item.getAttribute('data-step'), 10);
        if (item.classList.contains('is-clickable') && step < this.state.currentStep) {
          this.goToStep(step);
        }
      });
    });

    // "Change Discipline" button in context ribbon
    const changeServiceBtn = document.getElementById('btn-change-service');
    if (changeServiceBtn) {
      changeServiceBtn.addEventListener('click', () => {
        this.goToStep(1);
      });
    }

    // Property Type card selections
    const propertyGroup = document.getElementById('property-type-group');
    if (propertyGroup) {
      propertyGroup.addEventListener('click', (e) => {
        const card = e.target.closest('.choice-card');
        if (card) {
          const val = card.getAttribute('data-type-val');
          this.state.project.propertyType = val;
          propertyGroup.querySelectorAll('.choice-card').forEach(c => {
            const isMatch = c.getAttribute('data-type-val') === val;
            c.classList.toggle('is-selected', isMatch);
            c.setAttribute('aria-checked', isMatch ? 'true' : 'false');
          });
          document.getElementById('err-property-type').style.display = 'none';
        }
      });
    }

    // Area Unit toggle buttons
    document.querySelectorAll('.area-unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.area-unit-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        this.state.project.areaUnit = btn.getAttribute('data-unit');
      });
    });

    // Budget card selections
    const budgetGroup = document.getElementById('budget-range-group');
    if (budgetGroup) {
      budgetGroup.addEventListener('click', (e) => {
        const card = e.target.closest('.choice-card');
        if (card) {
          const val = card.getAttribute('data-budget-val');
          this.state.planning.budgetRange = val;
          budgetGroup.querySelectorAll('.choice-card').forEach(c => {
            const isMatch = c.getAttribute('data-budget-val') === val;
            c.classList.toggle('is-selected', isMatch);
            c.setAttribute('aria-checked', isMatch ? 'true' : 'false');
          });
          document.getElementById('err-budget').style.display = 'none';
        }
      });
    }

    // Timeline card selections
    const timelineGroup = document.getElementById('timeline-group');
    if (timelineGroup) {
      timelineGroup.addEventListener('click', (e) => {
        const card = e.target.closest('.choice-card');
        if (card) {
          const val = card.getAttribute('data-timeline-val');
          this.state.planning.timeline = val;
          timelineGroup.querySelectorAll('.choice-card').forEach(c => {
            const isMatch = c.getAttribute('data-timeline-val') === val;
            c.classList.toggle('is-selected', isMatch);
            c.setAttribute('aria-checked', isMatch ? 'true' : 'false');
          });
          document.getElementById('err-timeline').style.display = 'none';
        }
      });
    }

    // Consultation Method change (toggle meeting location field)
    const methodSelect = document.getElementById('select-consult-method');
    const locationGroup = document.getElementById('in-person-location-group');
    if (methodSelect && locationGroup) {
      methodSelect.addEventListener('change', () => {
        locationGroup.style.display = methodSelect.value === 'In Person' ? 'block' : 'none';
      });
    }

    // Contact Channel selection
    const channelGroup = document.getElementById('contact-method-group');
    if (channelGroup) {
      channelGroup.addEventListener('click', (e) => {
        const card = e.target.closest('.choice-card');
        if (card) {
          const val = card.getAttribute('data-value');
          this.state.contact.preferredMethod = val;
          channelGroup.querySelectorAll('.choice-card').forEach(c => {
            const isMatch = c.getAttribute('data-value') === val;
            c.classList.toggle('is-selected', isMatch);
            c.setAttribute('aria-checked', isMatch ? 'true' : 'false');
          });
        }
      });
    }

    // Form inputs real-time error cleanup
    ['input-city', 'input-area', 'input-full-name', 'input-mobile', 'input-email'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          el.classList.remove('is-invalid');
          const errEl = document.getElementById(`err-${id.replace('input-', '')}`);
          if (errEl) errEl.style.display = 'none';
        });
      }
    });

    const statusSelect = document.getElementById('select-project-status');
    if (statusSelect) {
      statusSelect.addEventListener('change', () => {
        statusSelect.classList.remove('is-invalid');
        const err = document.getElementById('err-status');
        if (err) err.style.display = 'none';
      });
    }

    // Consent Checkbox
    const consentBox = document.getElementById('input-consent');
    if (consentBox) {
      consentBox.addEventListener('change', () => {
        this.state.consent = consentBox.checked;
        const err = document.getElementById('err-consent');
        if (err) err.style.display = consentBox.checked ? 'none' : 'block';
      });
    }

    // Bottom Navigation Buttons
    const prevBtn = document.getElementById('btn-wizard-prev');
    const nextBtn = document.getElementById('btn-wizard-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.state.currentStep > 1) {
          this.goToStep(this.state.currentStep - 1);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.handleNextStep();
      });
    }

    // Step 5 Review Edit Buttons
    document.querySelectorAll('.btn-edit-step').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = parseInt(btn.getAttribute('data-target-step'), 10);
        if (target >= 1 && target <= 4) {
          this.goToStep(target);
        }
      });
    });

    // Privacy Dialog
    const privacyModal = document.getElementById('privacy-modal');
    const privacyLink = document.getElementById('link-privacy-policy');
    const closePrivacy = document.getElementById('btn-close-privacy');
    const dismissPrivacy = document.getElementById('btn-dismiss-privacy');

    if (privacyLink && privacyModal) {
      privacyLink.addEventListener('click', (e) => {
        e.preventDefault();
        privacyModal.showModal();
      });
    }
    if (closePrivacy && privacyModal) {
      closePrivacy.addEventListener('click', () => privacyModal.close());
    }
    if (dismissPrivacy && privacyModal) {
      dismissPrivacy.addEventListener('click', () => privacyModal.close());
    }

    // Confirmation Screen Buttons
    const printBtn = document.getElementById('btn-print-receipt');
    if (printBtn) {
      printBtn.addEventListener('click', () => window.print());
    }

    const resetBtn = document.getElementById('btn-reset-booking');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        window.location.href = '/book-service';
      });
    }

    const copyRefBtn = document.getElementById('btn-copy-ref');
    if (copyRefBtn) {
      copyRefBtn.addEventListener('click', () => {
        if (this.state.bookingId) {
          navigator.clipboard.writeText(this.state.bookingId).then(() => {
            copyRefBtn.style.color = '#27C93F';
            setTimeout(() => { copyRefBtn.style.color = ''; }, 2000);
          });
        }
      });
    }
  }

  /* -------------------------------------------------------------------------
     Step Navigation & Validation Router
     ------------------------------------------------------------------------- */
  handleNextStep() {
    const step = this.state.currentStep;

    if (step === 1) {
      if (!this.state.selectedService) {
        alert('Please choose one interior design discipline to continue.');
        return;
      }
      this.goToStep(2);
    } else if (step === 2) {
      if (!this.validateStep2()) return;
      this.saveStep2Data();
      this.goToStep(3);
    } else if (step === 3) {
      if (!this.validateStep3()) return;
      this.saveStep3Data();
      this.goToStep(4);
    } else if (step === 4) {
      if (!this.validateStep4()) return;
      this.saveStep4Data();
      this.renderReviewSummary();
      this.goToStep(5);
    } else if (step === 5) {
      if (!this.validateStep5()) return;
      this.submitBookingRequest();
    }
  }

  /* -------------------------------------------------------------------------
     Step 2 Validation & Data Extraction
     ------------------------------------------------------------------------- */
  validateStep2() {
    let isValid = true;

    // Property Type
    if (!this.state.project.propertyType) {
      document.getElementById('err-property-type').style.display = 'block';
      isValid = false;
    }

    // City
    const cityInput = document.getElementById('input-city');
    if (!cityInput.value.trim() || cityInput.value.trim().length < 2) {
      cityInput.classList.add('is-invalid');
      document.getElementById('err-city').style.display = 'block';
      isValid = false;
    }

    // Area
    const areaInput = document.getElementById('input-area');
    if (!areaInput.value.trim()) {
      areaInput.classList.add('is-invalid');
      document.getElementById('err-area').style.display = 'block';
      isValid = false;
    }

    // Status
    const statusSelect = document.getElementById('select-project-status');
    if (!statusSelect.value) {
      statusSelect.classList.add('is-invalid');
      document.getElementById('err-status').style.display = 'block';
      isValid = false;
    }

    return isValid;
  }

  saveStep2Data() {
    this.state.project.name = document.getElementById('input-project-name').value.trim();
    this.state.project.city = document.getElementById('input-city').value.trim();
    this.state.project.area = document.getElementById('input-area').value.trim();
    this.state.project.address = document.getElementById('input-address').value.trim();
    this.state.project.approxArea = document.getElementById('input-approx-area').value.trim();
    this.state.project.status = document.getElementById('select-project-status').value;
    this.state.project.description = document.getElementById('input-description').value.trim();

    // Collect dynamic questions
    const dynamicAnswers = [];
    document.querySelectorAll('#dynamic-q-content input:checked').forEach(inp => {
      dynamicAnswers.push(inp.value);
    });
    this.state.project.serviceSpecific = {
      answers: dynamicAnswers
    };
  }

  /* -------------------------------------------------------------------------
     Step 3 Validation & Data Extraction
     ------------------------------------------------------------------------- */
  validateStep3() {
    let isValid = true;

    // Budget
    if (!this.state.planning.budgetRange) {
      document.getElementById('err-budget').style.display = 'block';
      isValid = false;
    }

    // Timeline
    if (!this.state.planning.timeline) {
      document.getElementById('err-timeline').style.display = 'block';
      isValid = false;
    }

    // Date (must not be in past)
    const dateInput = document.getElementById('input-consult-date');
    if (dateInput.value) {
      const selectedDate = new Date(dateInput.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        dateInput.classList.add('is-invalid');
        document.getElementById('err-consult-date').style.display = 'block';
        isValid = false;
      }
    }

    return isValid;
  }

  saveStep3Data() {
    this.state.planning.consultDate = document.getElementById('input-consult-date').value;
    this.state.planning.consultTime = document.getElementById('select-consult-time').value;
    this.state.planning.consultMethod = document.getElementById('select-consult-method').value;
    this.state.planning.meetingLocation = document.getElementById('input-meeting-location').value.trim();
    this.state.planning.additionalNotes = document.getElementById('input-additional-requirements').value.trim();
  }

  /* -------------------------------------------------------------------------
     Step 4 Validation & Data Extraction
     ------------------------------------------------------------------------- */
  validateStep4() {
    let isValid = true;

    // Full name
    const nameInput = document.getElementById('input-full-name');
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameInput.classList.add('is-invalid');
      document.getElementById('err-full-name').style.display = 'block';
      isValid = false;
    }

    // Mobile number (10+ digits)
    const mobileInput = document.getElementById('input-mobile');
    const rawMobile = mobileInput.value.replace(/\D/g, '');
    if (rawMobile.length < 10) {
      mobileInput.classList.add('is-invalid');
      document.getElementById('err-mobile').style.display = 'block';
      isValid = false;
    }

    // Email (optional, but validated if present)
    const emailInput = document.getElementById('input-email');
    if (emailInput.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('is-invalid');
        document.getElementById('err-email').style.display = 'block';
        isValid = false;
      }
    }

    return isValid;
  }

  saveStep4Data() {
    this.state.contact.fullName = document.getElementById('input-full-name').value.trim();
    this.state.contact.mobile = document.getElementById('input-mobile').value.trim();
    this.state.contact.email = document.getElementById('input-email').value.trim();
    this.state.contact.whatsapp = document.getElementById('input-whatsapp').value.trim();
  }

  /* -------------------------------------------------------------------------
     Step 5 Validation (Consent)
     ------------------------------------------------------------------------- */
  validateStep5() {
    const consentBox = document.getElementById('input-consent');
    if (!consentBox.checked) {
      document.getElementById('err-consent').style.display = 'block';
      return false;
    }
    return true;
  }

  /* -------------------------------------------------------------------------
     Render Step 5 Review Summary Cards
     ------------------------------------------------------------------------- */
  renderReviewSummary() {
    const s = this.state;

    // 1. Service
    document.getElementById('rev-service-name').textContent = s.selectedService ? s.selectedService.name : '—';
    document.getElementById('rev-service-category').textContent = s.selectedService ? s.selectedService.category : '—';

    // 2. Project
    document.getElementById('rev-property-type').textContent = s.project.propertyType || '—';
    document.getElementById('rev-location').textContent = `${s.project.city}${s.project.area ? ', ' + s.project.area : ''}`;
    document.getElementById('rev-area').textContent = s.project.approxArea ? `${s.project.approxArea} ${s.project.areaUnit}` : 'Not specified';
    document.getElementById('rev-status').textContent = s.project.status || '—';

    // Dynamic question answers
    const dynRow = document.getElementById('rev-dynamic-row');
    const dynVal = document.getElementById('rev-dynamic-val');
    if (s.project.serviceSpecific && s.project.serviceSpecific.answers && s.project.serviceSpecific.answers.length > 0) {
      dynRow.style.display = 'flex';
      dynVal.textContent = s.project.serviceSpecific.answers.join('; ');
    } else {
      dynRow.style.display = 'none';
    }

    document.getElementById('rev-desc').textContent = s.project.description || 'None provided';

    // 3. Planning & Budget
    document.getElementById('rev-budget').textContent = s.planning.budgetRange || '—';
    document.getElementById('rev-timeline').textContent = s.planning.timeline || '—';
    const dateStr = s.planning.consultDate ? new Date(s.planning.consultDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Flexible';
    document.getElementById('rev-consult-slot').textContent = `${dateStr} (${s.planning.consultTime})`;
    document.getElementById('rev-consult-method').textContent = s.planning.consultMethod + (s.planning.meetingLocation ? ` (${s.planning.meetingLocation})` : '');

    // 4. Contact
    document.getElementById('rev-full-name').textContent = s.contact.fullName || '—';
    document.getElementById('rev-mobile').textContent = `+91 ${s.contact.mobile}`;
    document.getElementById('rev-email').textContent = s.contact.email || 'None provided';
    document.getElementById('rev-preferred-channel').textContent = s.contact.preferredMethod;
  }

  /* -------------------------------------------------------------------------
     Step Switcher / Transition Controller
     ------------------------------------------------------------------------- */
  goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > 5) return;

    this.state.currentStep = stepNumber;

    // Show active panel, hide others
    for (let i = 1; i <= 5; i++) {
      const panel = document.getElementById(`step-panel-${i}`);
      if (panel) {
        panel.classList.toggle('is-active', i === stepNumber);
      }
    }

    // Scroll to top of main smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.updateWizardUI();
  }

  /* -------------------------------------------------------------------------
     Wizard UI State Reflector
     ------------------------------------------------------------------------- */
  updateWizardUI() {
    const step = this.state.currentStep;

    // Eyebrows & Headings
    const titles = {
      1: {
        eyebrow: 'Project Initiation • Step 1 of 5',
        title: 'What Can We Help You Design?',
        desc: "Choose the service that best matches your project. We'll collect a few details to understand your requirements and help you take the next step."
      },
      2: {
        eyebrow: 'Spatial Scope • Step 2 of 5',
        title: 'Tell Us About Your Project',
        desc: 'Provide details about your space, location, and property type so our studio can evaluate your layout requirements.'
      },
      3: {
        eyebrow: 'Planning & Investment • Step 3 of 5',
        title: "Let's Plan Your Project",
        desc: 'Share your target investment bracket and scheduling preferences to align with our architectural availability.'
      },
      4: {
        eyebrow: 'Direct Communication • Step 4 of 5',
        title: 'How Can We Reach You?',
        desc: 'Our design desk will prepare a bespoke discovery deck and reach out through your preferred contact method.'
      },
      5: {
        eyebrow: 'Verification • Step 5 of 5',
        title: 'Review Your Booking Request',
        desc: 'Confirm your project brief and submit your consultation booking to our private studio archive.'
      }
    };

    const currentMeta = titles[step] || titles[1];
    document.getElementById('wizard-eyebrow').textContent = currentMeta.eyebrow;
    document.getElementById('wizard-title').textContent = currentMeta.title;
    document.getElementById('wizard-desc').textContent = currentMeta.desc;

    // Stepper Track & Nodes
    const fillPercent = ((step - 1) / 4) * 100;
    document.getElementById('stepper-track-fill').style.width = `${fillPercent}%`;

    for (let i = 1; i <= 5; i++) {
      const node = document.getElementById(`step-node-${i}`);
      if (!node) continue;

      const bubble = node.querySelector('.stepper-bubble');
      node.classList.remove('is-active', 'is-completed', 'is-clickable');

      if (i < step) {
        node.classList.add('is-completed', 'is-clickable');
        if (bubble) bubble.disabled = false;
      } else if (i === step) {
        node.classList.add('is-active');
        if (bubble) bubble.disabled = false;
      } else {
        if (bubble) bubble.disabled = true;
      }
    }

    // Context Ribbon Visibility (Step 2 to 5)
    const banner = document.getElementById('selected-service-banner');
    if (banner) {
      banner.style.display = (step > 1 && this.state.selectedService) ? 'flex' : 'none';
    }

    // Action Bar State
    const prevBtn = document.getElementById('btn-wizard-prev');
    const nextBtn = document.getElementById('btn-wizard-next');
    const nextText = document.getElementById('next-btn-text');
    const statusText = document.getElementById('bottom-status-text');

    if (prevBtn) {
      prevBtn.disabled = step === 1;
    }

    if (nextBtn) {
      if (step === 1) {
        nextBtn.disabled = !this.state.selectedService;
        nextText.textContent = 'Continue to Project Details';
      } else if (step === 5) {
        nextBtn.disabled = false;
        nextText.textContent = 'Submit Booking Request';
      } else {
        nextBtn.disabled = false;
        nextText.textContent = 'Continue to Next Step';
      }
    }

    if (statusText) {
      const stepNames = {
        1: 'Choose Your Service',
        2: 'Project Details',
        3: 'Budget & Schedule',
        4: 'Contact Details',
        5: 'Review & Submit'
      };
      statusText.innerHTML = `Step <strong>${step}</strong> of 5 • ${stepNames[step]}`;
    }
  }

  /* -------------------------------------------------------------------------
     Submit Booking Request to Persistent Server API
     ------------------------------------------------------------------------- */
  async submitBookingRequest() {
    if (this.state.isSubmitting) return;

    this.state.isSubmitting = true;
    const nextBtn = document.getElementById('btn-wizard-next');
    const prevBtn = document.getElementById('btn-wizard-prev');
    const errorBanner = document.getElementById('global-submit-error');
    const errorText = document.getElementById('global-error-text');

    if (nextBtn) {
      nextBtn.classList.add('is-loading');
      nextBtn.disabled = true;
    }
    if (prevBtn) {
      prevBtn.disabled = true;
    }
    if (errorBanner) {
      errorBanner.style.display = 'none';
    }

    // Build API payload
    const payload = {
      hp_website: document.getElementById('hp_website').value,
      service: {
        id: this.state.selectedService.id,
        name: this.state.selectedService.name,
        slug: this.state.selectedService.slug
      },
      project: {
        name: this.state.project.name,
        propertyType: this.state.project.propertyType,
        city: this.state.project.city,
        area: this.state.project.area,
        address: this.state.project.address,
        approxArea: this.state.project.approxArea,
        areaUnit: this.state.project.areaUnit,
        status: this.state.project.status,
        description: this.state.project.description,
        serviceSpecificDetails: this.state.project.serviceSpecific
      },
      planning: {
        budgetRange: this.state.planning.budgetRange,
        timeline: this.state.planning.timeline,
        consultationDate: this.state.planning.consultDate,
        consultationTime: this.state.planning.consultTime,
        consultationMethod: this.state.planning.consultMethod,
        meetingLocation: this.state.planning.meetingLocation,
        additionalNotes: this.state.planning.additionalNotes
      },
      contact: {
        fullName: this.state.contact.fullName,
        countryCode: this.state.contact.countryCode,
        mobile: this.state.contact.mobile,
        email: this.state.contact.email,
        whatsapp: this.state.contact.whatsapp,
        preferredMethod: this.state.contact.preferredMethod
      },
      consent: true
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || (result.errors && result.errors.join(', ')) || 'Server validation failed');
      }

      // Success! Update Confirmation state
      this.state.bookingId = result.bookingId;
      this.displayConfirmationState(result);

    } catch (err) {
      console.error('Booking submission failed:', err);
      if (errorBanner && errorText) {
        errorBanner.style.display = 'flex';
        errorText.textContent = `Transmission failed: ${err.message}. Your entries have been preserved. Please retry.`;
      }
    } finally {
      this.state.isSubmitting = false;
      if (nextBtn) {
        nextBtn.classList.remove('is-loading');
        nextBtn.disabled = false;
      }
      if (prevBtn) {
        prevBtn.disabled = false;
      }
    }
  }

  /* -------------------------------------------------------------------------
     Display Confirmation Screen State
     ------------------------------------------------------------------------- */
  displayConfirmationState(result) {
    // Hide all form panels
    for (let i = 1; i <= 5; i++) {
      const panel = document.getElementById(`step-panel-${i}`);
      if (panel) panel.classList.remove('is-active');
    }

    // Hide wizard top header, stepper, context ribbon, and bottom action bar
    document.getElementById('wizard-header').style.display = 'none';
    document.getElementById('stepper-nav').style.display = 'none';
    document.getElementById('selected-service-banner').style.display = 'none';
    document.getElementById('wizard-bottom-bar').style.display = 'none';

    // Populate confirmation recap data
    document.getElementById('confirm-ref-code').textContent = result.bookingId;
    document.getElementById('confirm-service-name').textContent = result.summary.serviceName;
    document.getElementById('confirm-location').textContent = result.summary.location;
    document.getElementById('confirm-timeline').textContent = result.summary.timeline;
    document.getElementById('confirm-date-slot').textContent = `${result.summary.consultationDate} (${result.summary.consultationTime})`;

    // Show confirmation panel
    const confirmPanel = document.getElementById('step-panel-confirmation');
    if (confirmPanel) {
      confirmPanel.classList.add('is-active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

// Instantiate on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.bookingApp = new BookingWizardApp();
});
