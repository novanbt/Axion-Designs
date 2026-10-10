/**
 * Axion Designs — Core Application Logic
 * Manages project data, accessible modal transitions, and smooth scrolling.
 */

import GravityEngine from './gravity-engine.js';

// Project Database
const PROJECTS_DATA = {
  kitchen: {
    title: 'Serenity in Nature',
    tag: 'Contemporary Bedroom',
    location: 'Kyoto, Japan • 2026',
    clearance: 'Biophilic Light Integration',
    materials: 'Natural Oak, Expansive Glass, Earthy Textures',
    image: 'assets/images/nature-bedroom.jpg',
    description: 'A contemporary bedroom that brings the outdoors in through expansive glass windows, lush greenery, natural wood textures, and a restrained earthy palette. Clean architectural lines and soft natural light create a peaceful, resort-inspired living experience.'
  },
  bedroom: {
    title: 'Serene Haven: Weightless Retreat',
    tag: 'Sanctuary Suite • Platform Architecture',
    location: 'Zurich, Switzerland • 2026',
    clearance: '18 mm Active Hover',
    materials: 'Brushed Titanium, Belgian Linen, Fluted Ash',
    image: 'assets/images/bedroom.jpg',
    description: 'Suspended in mid-air to decouple the sleeping surface from terrestrial vibration. Integrated bio-resonance dampening creates absolute stillness, while an ambient cyan under-glow mirrors serene nocturnal tranquility.'
  },
  workspace: {
    title: 'The Art of Quiet Luxury',
    tag: 'Modern Luxury Bedroom',
    location: 'Milan, Italy • 2026',
    clearance: 'Fluted Acoustic Architecture',
    materials: 'Italian Marble, Fluted Wall Panels, Warm Brass',
    image: 'assets/images/luxury-bedroom.jpg',
    description: 'A sophisticated bedroom blending warm neutral tones, vertical fluted wall panels, sculptural lighting, marble flooring, and bespoke furniture. Every detail is designed to create a calm, refined, and effortlessly luxurious retreat.'
  }
};

// All 15 Architectural & Interior Service Disciplines
const SERVICES_DATA = [
  {
    index: '01',
    code: 'DISCIPLINE 01',
    title: 'Residential Interior Design',
    category: 'Residential & Living',
    image: 'assets/images/services/residential-interior.jpg',
    desc: 'Complete residential concepts engineered from initial spatial layouts to bespoke architectural finishes, tailored for elevated modern lifestyle.',
    bullets: [
      'Living room, bedroom, and dining room design.',
      'Kitchen and bathroom interiors.',
      'Furniture layouts and space planning.',
      'Complete home interior concepts for apartments, villas, and houses.'
    ]
  },
  {
    index: '02',
    code: 'DISCIPLINE 02',
    title: 'Modular Kitchen and Wardrobe Design',
    category: 'Residential & Living',
    image: 'assets/images/services/modular-kitchen.jpg',
    desc: 'Bespoke European-grade modular kitchen joinery, concealed storage systems, and walk-in dressing suites designed with precision ergonomics.',
    bullets: [
      'Modular kitchen planning and layouts.',
      'Custom wardrobes and walk-in closets.',
      'Cabinets, drawers, and intelligent storage solutions.',
      'Material, finish, and hardware selection.'
    ]
  },
  {
    index: '03',
    code: 'DISCIPLINE 03',
    title: 'Ceiling, Lighting and Electrical Planning',
    category: 'Residential & Living',
    image: 'assets/images/services/ceiling-lighting.jpg',
    desc: 'Sculptural ceiling architecture and multi-layered circadian illumination frameworks designed to sculpt space through light and shadow.',
    bullets: [
      'False ceilings and decorative ceiling designs.',
      'Ambient, accent, and task lighting.',
      'LED lighting and lighting layouts.',
      'Electrical point and switch placement coordination.'
    ]
  },
  {
    index: '04',
    code: 'DISCIPLINE 04',
    title: 'Commercial Interior Design',
    category: 'Residential & Living',
    image: 'assets/images/services/commercial-interior.jpg',
    desc: 'Dynamic executive environments, luxury retail pavilions, and high-hospitality spaces designed to amplify corporate brand identity and focus.',
    bullets: [
      'Offices and coworking spaces.',
      'Retail shops and showrooms.',
      'Restaurants and cafés.',
      'Salons, clinics, studios, and reception areas.'
    ]
  },
  {
    index: '05',
    code: 'DISCIPLINE 05',
    title: 'Materials, Colours and Finishes',
    category: 'Finishes & Visualisation',
    image: 'assets/images/services/materials-finishes.jpg',
    desc: 'Artisanal curation of rare marbles, fluted timbers, fine bouclés, and architectural pigments composed into harmonious sensory palettes.',
    bullets: [
      'Paint colours and wall finishes.',
      'Wallpaper and decorative wall panels.',
      'Flooring, tiles, marble, and wood finishes.',
      'Fabrics, curtains, and upholstery selection.'
    ]
  },
  {
    index: '06',
    code: 'DISCIPLINE 06',
    title: '2D Drawings and 3D Visualisation',
    category: 'Finishes & Visualisation',
    image: 'assets/images/services/interior-visualisation.jpg',
    desc: 'CGI photorealism and sub-millimeter architectural CAD drafts allowing clients to experience their built future before groundbreak.',
    bullets: [
      '2D floor plans and furniture layouts.',
      'High-quality 3D interior visualisations.',
      'Material, colour, and finish previews.',
      'Detailed working drawings for project execution.'
    ]
  },
  {
    index: '07',
    code: 'DISCIPLINE 07',
    title: 'Interior Execution and Turnkey Projects',
    category: 'Execution & Turnkey',
    image: 'assets/images/services/turnkey-execution.jpg',
    desc: 'White-glove end-to-end site contracting, master woodworking fabrication, and uncompromising on-site quality assurance from foundation to key handover.',
    bullets: [
      'Coordination of carpenters, painters, installers, and contractors.',
      'False ceiling, flooring, and interior finishing work.',
      'Kitchen, wardrobe, and furniture installation.',
      'Site supervision and quality checks.',
      'End-to-end project coordination and handover.'
    ]
  },
  {
    index: '08',
    code: 'DISCIPLINE 08',
    title: 'Furniture, Decor and Styling',
    category: 'Finishes & Visualisation',
    image: 'assets/images/services/furniture-styling.jpg',
    desc: 'Tailored interior accessorisation with gallery-grade sculptural pieces, natural textiles, botanicals, and bespoke lighting fixtures.',
    bullets: [
      'Furniture selection and placement.',
      'Curtains, rugs, cushions, and soft furnishings.',
      'Wall art, mirrors, and decorative accessories.',
      'Indoor plants and final styling touches.'
    ]
  },
  {
    index: '09',
    code: 'DISCIPLINE 09',
    title: 'Renovation and Remodelling',
    category: 'Execution & Turnkey',
    image: 'assets/images/services/renovation-remodelling.jpg',
    desc: 'Thoughtful spatial transformation of existing architectural structures, upgrading historical character with contemporary performance.',
    bullets: [
      'Renovation of existing homes and apartments.',
      'Kitchen and bathroom remodelling.',
      'Interior upgrades and modernisation.',
      'Space reconfiguration and interior improvements.'
    ]
  },
  {
    index: '10',
    code: 'DISCIPLINE 10',
    title: 'Vastu Consultation',
    category: 'Spatial & Technology',
    image: 'assets/images/services/vastu-spatial.jpg',
    desc: 'Advisory consultation aligning spatial energy dynamics and sunlight trajectories with modern architectural living layouts.',
    bullets: [
      'Incorporating client-requested Vastu preferences into interior layouts.',
      'Furniture placement recommendations.',
      'Room arrangement and spatial planning based on the agreed requirements.'
    ]
  },
  {
    index: '11',
    code: 'DISCIPLINE 11',
    title: 'Space Optimisation',
    category: 'Spatial & Technology',
    image: 'assets/images/services/space-optimisation.jpg',
    desc: 'Architectural geometry designed to unlock hidden cubic volume in urban apartments through multifunctional joinery and clean sightlines.',
    bullets: [
      'Smart layouts for compact rooms and apartments.',
      'Space-saving furniture recommendations.',
      'Built-in storage and multifunctional furniture.',
      'Better utilisation of available floor space.'
    ]
  },
  {
    index: '12',
    code: 'DISCIPLINE 12',
    title: 'Budget Estimation and Cost Planning',
    category: 'Execution & Turnkey',
    image: 'assets/images/services/project-management.jpg',
    desc: 'Transparent, itemised financial modeling and material tier benchmarking ensuring vision fidelity within prescribed capital parameters.',
    bullets: [
      'Preliminary project budget estimates.',
      'Itemised material and labour cost estimates.',
      'Cost comparisons between material and finish options.',
      'Budget-conscious design recommendations.'
    ]
  },
  {
    index: '13',
    code: 'DISCIPLINE 13',
    title: 'Procurement and Material Sourcing',
    category: 'Execution & Turnkey',
    image: 'assets/images/services/materials-finishes.jpg',
    desc: 'Global direct trade sourcing connecting private commissions with premier stone quarries, Italian tanneries, and lighting artisans.',
    bullets: [
      'Furniture and lighting sourcing.',
      'Selection of tiles, flooring, hardware, and fixtures.',
      'Material and finish comparisons.',
      'Coordination of product purchasing and delivery.'
    ]
  },
  {
    index: '14',
    code: 'DISCIPLINE 14',
    title: 'Smart-Home Integration',
    category: 'Spatial & Technology',
    image: 'assets/images/services/smart-home-interior.jpg',
    desc: 'Invisible architectural automation harmonizing motorized drapery, circadian lighting, HVAC micro-climates, and acoustic sensors.',
    bullets: [
      'Smart lighting coordination.',
      'Automated curtain and blind integration.',
      'Smart switches and control systems.',
      'Coordination with appropriate electrical and automation specialists.'
    ]
  },
  {
    index: '15',
    code: 'DISCIPLINE 15',
    title: 'Project Management',
    category: 'Spatial & Technology',
    image: 'assets/images/services/project-management.jpg',
    desc: 'Methodical program management overseeing milestones, vendor compliance, critical-path scheduling, and precision site inspections.',
    bullets: [
      'Project scheduling and milestone planning.',
      'Coordination with contractors and vendors.',
      'Site progress monitoring.',
      'Budget and scope tracking.',
      'Quality checks and project handover coordination.'
    ]
  }
];

class AxionApp {
  constructor() {
    this.gravityEngine = new GravityEngine();
    this.init();
  }

  init() {
    this.setupScrollHeader();
    this.setupProjectModal();
    this.setupSmoothScroll();
    this.setupServicesSection();
  }

  /* -------------------------------------------------------------------------
     Transparent Navigation Scroll Transition
     ------------------------------------------------------------------------- */
  setupScrollHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    let ticking = false;
    const updateHeader = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
    updateHeader();
  }

  /* -------------------------------------------------------------------------
     Project Detail Modal (Modern <dialog> with Light Dismiss & Animation)
     ------------------------------------------------------------------------- */
  setupProjectModal() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const dismissBtn = document.getElementById('modal-dismiss-btn');
    const inquireBtn = document.getElementById('modal-inquire-btn');
    const consultBtn = document.getElementById('inquire-btn');
    const cards = document.querySelectorAll('.project-card');

    if (!modal) return;

    // Open on project card click
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-project-id');
        this.populateAndOpenModal(id);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = card.getAttribute('data-project-id');
          this.populateAndOpenModal(id);
        }
      });
    });

    // Consult Studio buttons (Navbar & Hero Section)
    const heroConsultBtn = document.getElementById('hero-consult-btn');
    if (consultBtn) {
      consultBtn.addEventListener('click', () => {
        this.populateAndOpenModal('kitchen');
      });
    }
    if (heroConsultBtn) {
      heroConsultBtn.addEventListener('click', () => {
        this.populateAndOpenModal('kitchen');
      });
    }

    // Footer Portfolio Links
    const footerProjectLinks = document.querySelectorAll('.footer-links a[data-project-id]');
    footerProjectLinks.forEach(link => {
      link.addEventListener('click', () => {
        const id = link.getAttribute('data-project-id');
        if (id) {
          setTimeout(() => this.populateAndOpenModal(id), 300);
        }
      });
    });

    // Modal Close button
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => this.closeModal());
    }

    if (inquireBtn) {
      inquireBtn.addEventListener('click', () => {
        inquireBtn.textContent = 'Inquiry Sent ✓';
        inquireBtn.style.background = '#27C93F';
        inquireBtn.style.borderColor = '#27C93F';
        setTimeout(() => {
          this.closeModal();
          inquireBtn.textContent = 'Inquire for Space';
          inquireBtn.style.background = '';
          inquireBtn.style.borderColor = '';
        }, 1200);
      });
    }

    // Light dismiss: click outside modal box closes modal
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );
      if (!isInDialog) {
        this.closeModal();
      }
    });
  }

  populateAndOpenModal(projectId) {
    const modal = document.getElementById('project-modal');
    const data = PROJECTS_DATA[projectId] || PROJECTS_DATA['kitchen'];

    document.getElementById('modal-img').src = data.image;
    document.getElementById('modal-img').alt = data.title;
    document.getElementById('modal-tag').textContent = data.tag;
    document.getElementById('modal-project-title').textContent = data.title;
    document.getElementById('modal-location').textContent = data.location;
    document.getElementById('modal-clearance').textContent = data.clearance;
    document.getElementById('modal-materials').textContent = data.materials;
    document.getElementById('modal-description').textContent = data.description;

    modal.showModal();
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    const modal = document.getElementById('project-modal');
    if (!modal || !modal.open) return;

    modal.close();
    document.body.style.overflow = '';
  }

  /* -------------------------------------------------------------------------
     Smooth Scrolling Navigation
     ------------------------------------------------------------------------- */
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#' || href === '#all-works') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /* -------------------------------------------------------------------------
     Services Section: Inquiries & Consultations
     ------------------------------------------------------------------------- */
  setupServicesSection() {
    this.setupServiceInquiries();
  }

  setupServiceInquiries() {
    document.querySelectorAll('.btn-service-inquire').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.service-card');
        const idx = card ? parseInt(card.getAttribute('data-service-index'), 10) : 0;
        this.populateAndOpenServiceModal(idx);
      });
    });
  }

  populateAndOpenServiceModal(serviceIdx) {
    const service = SERVICES_DATA[serviceIdx] || SERVICES_DATA[0];
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    document.getElementById('modal-img').src = service.image;
    document.getElementById('modal-img').alt = service.title;
    document.getElementById('modal-tag').textContent = `Discipline ${service.index} • ${service.category}`;
    document.getElementById('modal-project-title').textContent = service.title;
    document.getElementById('modal-location').textContent = 'Axion Bespoke Studio • 2026';
    document.getElementById('modal-clearance').textContent = 'Full Turnkey Practice';
    document.getElementById('modal-materials').textContent = 'Architectural Standards';
    document.getElementById('modal-description').textContent = `${service.desc} Deliverables include: ${service.bullets.join('; ')}.`;

    modal.showModal();
    document.body.style.overflow = 'hidden';
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.axionApp = new AxionApp();
});
