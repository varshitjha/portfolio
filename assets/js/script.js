// ============================================
// PORTFOLIO — script.js
// Author: [Your Name]
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // CACHE DOM ELEMENTS
  // We grab all the elements we need once at
  // the top, so we don't search the DOM
  // repeatedly inside event listeners.
  // ==========================================

  const navbar       = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks     = document.getElementById('navLinks');
  const allNavLinks  = document.querySelectorAll('.navbar__link');


  // ==========================================
  // FEATURE 1: SCROLL-TRIGGERED NAVBAR
  // Adds a frosted-glass background once the
  // user scrolls past 50px.
  // ==========================================

  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }

  // Run on page load in case user refreshes mid-page
  handleNavbarScroll();

  // Run every time the user scrolls
  window.addEventListener('scroll', handleNavbarScroll);


  // ==========================================
  // FEATURE 2: HAMBURGER MENU TOGGLE
  // Toggles the mobile drawer open and closed.
  // ==========================================

  function toggleMobileMenu() {
    const isOpen = navLinks.classList.toggle('navbar__links--open');

    // Animate hamburger → X
    hamburgerBtn.classList.toggle('navbar__hamburger--open');

    // Update aria-expanded for screen readers
    // (true if open, false if closed)
    hamburgerBtn.setAttribute('aria-expanded', isOpen);

    // Prevent the page body from scrolling while menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburgerBtn.addEventListener('click', toggleMobileMenu);


  // ==========================================
  // FEATURE 3: CLOSE MENU ON LINK CLICK
  // When a nav link is clicked on mobile,
  // close the drawer automatically.
  // ==========================================

  allNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('navbar__links--open');
      hamburgerBtn.classList.remove('navbar__hamburger--open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });


  // ==========================================
  // FEATURE 4: CLOSE MENU ON BACKDROP CLICK
  // If the user clicks outside the drawer
  // (on the dark backdrop), close it.
  // ==========================================

  document.addEventListener('click', function (event) {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedHamburger  = hamburgerBtn.contains(event.target);
    const menuIsOpen        = navLinks.classList.contains('navbar__links--open');

    if (menuIsOpen && !clickedInsideMenu && !clickedHamburger) {
      navLinks.classList.remove('navbar__links--open');
      hamburgerBtn.classList.remove('navbar__hamburger--open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });


  // ==========================================
  // FEATURE 5: ACTIVE LINK ON SCROLL
  // Highlights the correct nav link based on
  // which section is currently in the viewport.
  // Uses IntersectionObserver — the modern,
  // performance-friendly way to do this.
  // ==========================================

  // All the sections we want to observe.
  // We'll add id attributes to each section
  // as we build them in future phases.
  const sections = document.querySelectorAll('section[id]');

  const observerOptions = {
    root: null,          // observe relative to the viewport
    rootMargin: '-40% 0px -55% 0px',  // trigger when section is near center
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Remove active class from all links
        allNavLinks.forEach(function (link) {
          link.classList.remove('navbar__link--active');
        });

        // Add active class to the matching link
        const activeLink = document.querySelector(
          '.navbar__link[href="#' + entry.target.id + '"]'
        );
        if (activeLink) {
          activeLink.classList.add('navbar__link--active');
        }
      }
    });
  }, observerOptions);

  // Start observing each section
  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  // ==========================================
  // FEATURE 6: HERO FADE-IN ON LOAD
  // Triggers the CSS opacity/transform
  // transition as soon as the page loads.
  // ==========================================

  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    // Small timeout so the browser has painted
    // the page before we start the animation.
    setTimeout(function () {
      heroSection.classList.add('hero--visible');
    }, 100);
  }


  // ==========================================
  // FEATURE 7: TYPING ANIMATION
  // Cycles through an array of roles, types
  // each one character by character, pauses,
  // then erases it before typing the next.
  // ==========================================

  const typingTarget = document.getElementById('typingText');

  // Add or change roles here freely
  const roles = [
    'Frontend Developer',
    'C Programmer',
    'Web Developer',
    'Problem Solver',
    'Open to Work',
  ];

  let roleIndex   = 0;   // which role we're on
  let charIndex   = 0;   // which character within the role
  let isDeleting  = false;

  // How fast to type, delete, and pause (in ms)
  const TYPING_SPEED   = 90;
  const DELETING_SPEED = 50;
  const PAUSE_AFTER    = 1800;   // pause at full word
  const PAUSE_BEFORE   = 400;    // pause before typing next

  function runTyping() {
    if (!typingTarget) return;

    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      // ADD one character
      charIndex++;
      typingTarget.textContent = currentRole.slice(0, charIndex);

      if (charIndex === currentRole.length) {
        // Reached end of word — pause then start deleting
        isDeleting = true;
        setTimeout(runTyping, PAUSE_AFTER);
        return;
      }
      setTimeout(runTyping, TYPING_SPEED);

    } else {
      // REMOVE one character
      charIndex--;
      typingTarget.textContent = currentRole.slice(0, charIndex);

      if (charIndex === 0) {
        // Fully erased — move to next role
        isDeleting = false;
        roleIndex  = (roleIndex + 1) % roles.length;
        setTimeout(runTyping, PAUSE_BEFORE);
        return;
      }
      setTimeout(runTyping, DELETING_SPEED);
    }
  }

  // Start typing after a short delay so
  // the fade-in animation finishes first
  setTimeout(runTyping, 800);

// ==========================================
  // FEATURE 8: SCROLL REVEAL
  // Watches elements with class="reveal" or
  // "reveal-children". When they enter the
  // viewport, adds "is-visible" to trigger
  // the CSS transition.
  // Reused by About, Skills, Projects, Contact.
  // ==========================================

  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-children'
  );

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          // Once revealed, stop watching —
          // no need to toggle it on/off
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,      // trigger when 12% of element is visible
      rootMargin: '0px',
    }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });


  // ==========================================
  // FEATURE 9: STAT COUNTER ANIMATION
  // Counts up from 0 to the data-target value
  // when the stats section scrolls into view.
  // ==========================================

  const statNumbers = document.querySelectorAll('.about__stat-number');

  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        const el     = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1200;    // total animation time in ms
        const stepTime = 16;      // ~60fps
        const steps    = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(function () {
          current += increment;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current);
          }
        }, stepTime);

        // Only run the counter once per element
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(function (stat) {
    counterObserver.observe(stat);
  });

// ==========================================
  // FEATURE 10: SKILL BAR ANIMATION
  // Each .skills__bar-fill has a data-width
  // attribute (e.g. data-width="85").
  // When the bar scrolls into view, we animate
  // its CSS width from 0% to that value.
  // ==========================================

  const skillBars = document.querySelectorAll('.skills__bar-fill');

  const barObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        const bar       = entry.target;
        const targetWidth = bar.getAttribute('data-width');

        // Small delay so the reveal animation
        // finishes before the bar starts filling
        setTimeout(function () {
          bar.style.width = targetWidth + '%';
        }, 200);

        // Animate once — then stop watching
        barObserver.unobserve(bar);
      });
    },
    { threshold: 0.4 }
  );

  skillBars.forEach(function (bar) {
    barObserver.observe(bar);
  });

  // ==========================================
  // FEATURE 11: CONTACT FORM — EMAILJS
  // Docs: https://www.emailjs.com/docs/
  // ==========================================

  // --- YOUR CREDENTIALS ---
  // Replace these three values with your real
  // keys from the EmailJS dashboard.
  const EMAILJS_PUBLIC_KEY  = 'nh-399kvCkQg5ZXqu';
  const EMAILJS_SERVICE_ID  = 'service_0ur7tki';
  const EMAILJS_TEMPLATE_ID = 'template_xjy3xv3';

  // Initialise EmailJS with your public key.
  // Must run before any emailjs.send() call.
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  // --- Cache DOM elements ---
  const contactForm    = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');
  const submitBtn      = document.getElementById('contactSubmit');
  const honeypotField  = document.getElementById('honeypot');

  // --- Helper: mark a field as invalid ---
  function showFieldError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const span  = document.getElementById(errorId);
    if (input) input.classList.add('contact__input--error');
    if (span)  span.textContent = message;
  }

  // --- Helper: clear a field's error state ---
  function clearFieldError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const span  = document.getElementById(errorId);
    if (input) input.classList.remove('contact__input--error');
    if (span)  span.textContent = '';
  }

  // --- Clear errors on input so user gets instant feedback ---
  var fieldPairs = [
    ['contactName',    'nameError'],
    ['contactEmail',   'emailError'],
    ['contactSubject', 'subjectError'],
    ['contactMessage', 'messageError'],
  ];

  fieldPairs.forEach(function (pair) {
    var el = document.getElementById(pair[0]);
    if (!el) return;
    el.addEventListener('input', function () {
      clearFieldError(pair[0], pair[1]);
      hideFormBanner();
    });
  });

  // --- Email format check ---
  function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // --- Validate all four fields ---
  // Returns true only when every field passes.
  function validateAllFields(name, email, subject, message) {
    var passed = true;

    // Clear previous errors first
    fieldPairs.forEach(function (pair) {
      clearFieldError(pair[0], pair[1]);
    });

    if (name.length < 2) {
      showFieldError(
        'contactName', 'nameError',
        'Please enter your full name.'
      );
      passed = false;
    }

    if (!isEmailValid(email)) {
      showFieldError(
        'contactEmail', 'emailError',
        'Please enter a valid email address.'
      );
      passed = false;
    }

    if (subject.length < 3) {
      showFieldError(
        'contactSubject', 'subjectError',
        'Please add a subject.'
      );
      passed = false;
    }

    if (message.length < 10) {
      showFieldError(
        'contactMessage', 'messageError',
        'Message must be at least 10 characters.'
      );
      passed = false;
    }

    return passed;
  }

  // --- Loading state helpers ---
  function setButtonLoading(isLoading) {
    if (!submitBtn) return;
    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      submitBtn.classList.add('contact__submit--loading');
    } else {
      submitBtn.disabled = false;
      submitBtn.innerHTML =
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" ' +
        'stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
        'stroke-linejoin="round" aria-hidden="true">' +
        '<line x1="22" y1="2" x2="11" y2="13"/>' +
        '<polygon points="22 2 15 22 11 13 2 9 22 2"/>' +
        '</svg>' +
        ' Send Message';
      submitBtn.classList.remove('contact__submit--loading');
    }
  }

  // --- Form-level error banner ---
  // Appears below the fields on network / EmailJS failure.
  // Created once, updated on each error, hidden on retry.
  function showFormBanner(message) {
    var banner = document.getElementById('formErrorBanner');
    if (!banner) {
      banner = document.createElement('p');
      banner.id        = 'formErrorBanner';
      banner.className = 'contact__form-error-banner';
      if (submitBtn) {
        submitBtn.insertAdjacentElement('beforebegin', banner);
      }
    }
    banner.textContent = message;
    banner.hidden      = false;
  }

  function hideFormBanner() {
    var banner = document.getElementById('formErrorBanner');
    if (banner) banner.hidden = true;
  }

  // --- Main submit handler ---
  if (contactForm) {
    contactForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      // Read and trim all values
      var name    = document.getElementById('contactName').value.trim();
      var email   = document.getElementById('contactEmail').value.trim();
      var subject = document.getElementById('contactSubject').value.trim();
      var message = document.getElementById('contactMessage').value.trim();

      // --- HONEYPOT CHECK ---
      // If this hidden field has any value, it's a bot.
      // Drop silently — never alert the bot that it was caught.
      if (honeypotField && honeypotField.value.trim().length > 0) {
        contactForm.reset();
        return;
      }

      // --- VALIDATION ---
      if (!validateAllFields(name, email, subject, message)) {
        return;
      }

      // --- EMAILJS AVAILABILITY CHECK ---
      if (typeof emailjs === 'undefined') {
        showFormBanner(
          'Mail service failed to load. ' +
          'Please refresh the page and try again.'
        );
        return;
      }

      // --- START LOADING ---
      setButtonLoading(true);
      hideFormBanner();

      // --- TEMPLATE PARAMETERS ---
      // These keys must match {{variable}} names
      // in your EmailJS template exactly.
      var templateParams = {
        from_name:  name,
        from_email: email,
        subject:    subject,
        message:    message,
      };

      try {
        // --- SEND EMAIL ---
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams
        );

        // --- SUCCESS ---
        contactForm.hidden    = true;
        contactSuccess.hidden = false;
        contactForm.reset();

      } catch (err) {
        // --- FAILURE ---
        showFormBanner(
          'Something went wrong sending your message. ' +
          'Please email me directly at varshitjha17@gmail.com'
        );

      } finally {
        // Always restore button whether success or fail
        setButtonLoading(false);
      }
    });
  }


  // ==========================================
  // FEATURE 12: AUTO FOOTER YEAR
  // ==========================================

  const footerYear = document.getElementById('footerYear');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }


  // ==========================================
  // FEATURE 13: TOAST NOTIFICATION SYSTEM
  // ==========================================

  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, type = 'info') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    
    let icon = '⚡';
    if (type === 'success') icon = '✓';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }


  // ==========================================
  // FEATURE 14: MULTI-THEME ENGINE (Dark/Light/Cyberpunk)
  // ==========================================

  const themeToggleBtn = document.getElementById('themeToggle');
  const themes = ['dark', 'light', 'cyberpunk'];
  let currentTheme = localStorage.getItem('portfolio-theme') || 'dark';

  function applyTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('portfolio-theme', themeName);
    currentTheme = themeName;
  }

  // Initial theme application
  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
      const nextTheme = themes[nextIndex];
      applyTheme(nextTheme);
      showToast(`Switched theme to ${nextTheme.toUpperCase()}`, 'info');
    });
  }


  // ==========================================
  // FEATURE 15: BACKGROUND CURSOR SPOTLIGHT GLOW
  // ==========================================

  window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });


  // ==========================================
  // FEATURE 16: INTERACTIVE DEVELOPER CLI TERMINAL
  // ==========================================

  const terminalForm   = document.getElementById('terminalForm');
  const terminalInput  = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalClear  = document.getElementById('terminalClearBtn');

  const commandRegistry = {
    help: () => `
<span class="terminal__prompt-system">Available Commands:</span><br/>
• <span class="terminal__cmd-tag">about</span>    - Brief intro & background<br/>
• <span class="terminal__cmd-tag">skills</span>   - List tech stack & frameworks<br/>
• <span class="terminal__cmd-tag">projects</span> - Display highlighted projects<br/>
• <span class="terminal__cmd-tag">contact</span>  - Show direct email & social links<br/>
• <span class="terminal__cmd-tag">theme</span>    - Cycle UI color theme<br/>
• <span class="terminal__cmd-tag">sudo hire</span>- Trigger fast-track hire protocol<br/>
• <span class="terminal__cmd-tag">clear</span>    - Clear terminal screen
    `,
    about: () => `
<span class="terminal__prompt-system">[Varshit Jha]</span>: CS student at Parul University, India.<br/>
Passionate about building responsive, accessible web interfaces and clean algorithms.
    `,
    skills: () => `
<span class="terminal__prompt-system">Tech Stack Matrix:</span><br/>
Languages: HTML5, CSS3, JavaScript (ES6+), C, Python<br/>
Frontend:  DOM, Fetch API, Tailwind, React (in progress)<br/>
Tools:     Git, GitHub, Vercel, VS Code
    `,
    projects: () => `
<span class="terminal__prompt-system">Featured Projects:</span><br/>
1. <a href="#projects" style="color:#00f3ff;">Developer Portfolio</a> (Vanilla JS)<br/>
2. <a href="#projects" style="color:#00f3ff;">Weather Dashboard</a> (REST API)<br/>
3. <a href="#projects" style="color:#00f3ff;">TaskFlow Board</a> (CRUD + LocalStorage)<br/>
4. <a href="#projects" style="color:#00f3ff;">GitHub Finder</a> (GitHub REST API)
    `,
    contact: () => `
<span class="terminal__prompt-system">Contact Details:</span><br/>
Email: varshitjha17@gmail.com<br/>
Phone: +91 7250725745<br/>
GitHub: github.com/varshitjha
    `,
    theme: () => {
      const nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
      applyTheme(themes[nextIndex]);
      return `Theme switched to: <span class="terminal__cmd-tag">${themes[nextIndex]}</span>`;
    },
    'sudo hire': () => {
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
        showToast('Hire Protocol Activated! Inbox ready.', 'success');
      }, 500);
      return `<span style="color:#10b981; font-weight:bold;">[SUCCESS]</span> Access granted! Fast-tracking to contact section...`;
    }
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      if (terminalOutput) {
        terminalOutput.innerHTML = `
          <div class="terminal__line terminal__welcome">
            <span class="terminal__prompt-system">[system]:</span> Screen cleared. Type <span class="terminal__cmd-tag">'help'</span>.
          </div>
        `;
      }
      return;
    }

    // Print command line
    const userLine = document.createElement('div');
    userLine.className = 'terminal__line';
    userLine.innerHTML = `<span class="terminal__prompt-user">guest@varshit-dev:~$</span> ${rawCmd}`;
    terminalOutput.appendChild(userLine);

    // Print response
    const respLine = document.createElement('div');
    respLine.className = 'terminal__line';

    if (commandRegistry[cmd]) {
      respLine.innerHTML = commandRegistry[cmd]();
    } else {
      respLine.innerHTML = `<span style="color:#f87171;">Command not found: '${cmd}'. Type <span class="terminal__cmd-tag">'help'</span>.</span>`;
    }

    terminalOutput.appendChild(respLine);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  if (terminalForm && terminalInput) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputVal = terminalInput.value;
      executeCommand(inputVal);
      terminalInput.value = '';
    });
  }

  if (terminalClear) {
    terminalClear.addEventListener('click', () => executeCommand('clear'));
  }


  // ==========================================
  // FEATURE 17: PROJECT CATEGORY FILTER TABS
  // ==========================================

  const filterBtns = document.querySelectorAll('.projects__filter-btn');
  const projectCards = document.querySelectorAll('.projects__featured, .projects__card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterBtns.forEach((b) => b.classList.remove('projects__filter-btn--active'));
      btn.classList.add('projects__filter-btn--active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = '';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            if (btn.getAttribute('data-filter') !== 'all' && !card.getAttribute('data-category').includes(btn.getAttribute('data-filter'))) {
              card.style.display = 'none';
            }
          }, 200);
        }
      });
    });
  });


  // ==========================================
  // FEATURE 18: PROJECT QUICK VIEW MODAL
  // ==========================================

  const projectModal   = document.getElementById('projectModal');
  const modalOverlay   = document.getElementById('modalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContent  = document.getElementById('modalContent');

  const projectDetailsData = [
    {
      title: 'Developer Portfolio Website',
      description: 'A modern, responsive, multi-theme developer portfolio engineered with plain HTML, CSS, and JavaScript.',
      features: [
        'Interactive CLI Terminal Widget',
        '3-Mode Theme Engine (Dark, Light, Cyberpunk)',
        'Live GitHub REST API Profile & Repo Integration',
        'Filterable Project Category Grid',
        'Custom Toast Alert System'
      ],
      github: 'https://github.com/varshitjha/portfolio',
      demo: 'https://varshitjha.dev'
    },
    {
      title: 'Weather Dashboard App',
      description: 'Real-time weather query web application leveraging OpenWeatherMap REST API.',
      features: [
        'Live temperature, humidity & wind metrics',
        '5-Day forecast data parser',
        'Dynamic weather condition icons',
        'Robust API error handling & loading states'
      ],
      github: 'https://github.com/varshitjha/weather-app',
      demo: 'https://weather-app-demo.vercel.app'
    },
    {
      title: 'TaskFlow Board',
      description: 'Full CRUD task & workflow management dashboard with localStorage state retention.',
      features: [
        'Create, Edit, Complete & Delete tasks',
        'Priority tagging (High, Medium, Low)',
        'Local Storage state persistence',
        'Clean responsive UI layout'
      ],
      github: 'https://github.com/varshitjha/vj_TaskFlow-Board',
      demo: 'https://task-manager-demo.vercel.app'
    },
    {
      title: 'GitHub Profile Finder',
      description: 'Instant developer lookup app pulling stats directly from GitHub public APIs.',
      features: [
        'Live user profile lookup',
        'Repository star & fork counters',
        'Followers & bio details',
        'Direct link to recent repositories'
      ],
      github: 'https://github.com/varshitjha/github-finder',
      demo: 'https://github-finder-demo.vercel.app'
    }
  ];

  function openProjectModal(index) {
    const data = projectDetailsData[index];
    if (!data || !projectModal || !modalContent) return;

    modalContent.innerHTML = `
      <h3 class="modal__title">${data.title}</h3>
      <p class="modal__desc">${data.description}</p>
      <div class="modal__features">
        <h4>Key Highlights &amp; Technical Features:</h4>
        <ul>
          ${data.features.map((f) => `<li>${f}</li>`).join('')}
        </ul>
      </div>
      <div class="projects__actions" style="margin-top:20px;">
        <a href="${data.github}" class="btn btn--outline" target="_blank" rel="noopener noreferrer">View GitHub</a>
        <a href="${data.demo}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">Live Demo</a>
      </div>
    `;

    projectModal.classList.add('modal--open');
    projectModal.setAttribute('aria-hidden', 'false');
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('modal--open');
    projectModal.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.project-quick-view').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.currentTarget.getAttribute('data-project'), 10);
      openProjectModal(index);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalOverlay)  modalOverlay.addEventListener('click', closeProjectModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });


  // ==========================================
  // FEATURE 19: LIVE GITHUB REST API FETCHER
  // ==========================================

  const GITHUB_USERNAME = 'varshitjha';

  async function fetchGitHubStats() {
    const ghRepos     = document.getElementById('ghRepos');
    const ghFollowers = document.getElementById('ghFollowers');
    const ghStars     = document.getElementById('ghStars');
    const ghForks     = document.getElementById('ghForks');
    const ghRepoList  = document.getElementById('ghRepoList');

    if (!ghRepos) return;

    try {
      // 1. Fetch Profile info
      const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      if (!userRes.ok) throw new Error('GitHub profile fetch failed');
      const userData = await userRes.json();

      ghRepos.textContent     = userData.public_repos || '0';
      ghFollowers.textContent = userData.followers || '0';

      // 2. Fetch Repos
      const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
      if (!reposRes.ok) throw new Error('GitHub repos fetch failed');
      const reposData = await reposRes.json();

      let totalStars = 0;
      let totalForks = 0;

      reposData.forEach((r) => {
        totalStars += r.stargazers_count || 0;
        totalForks += r.forks_count || 0;
      });

      ghStars.textContent = totalStars;
      ghForks.textContent = totalForks;

      // 3. Render Top Repositories
      if (ghRepoList) {
        if (reposData.length === 0) {
          ghRepoList.innerHTML = '<div class="github-stats__loading">No public repositories found.</div>';
          return;
        }

        ghRepoList.innerHTML = reposData.slice(0, 4).map((repo) => `
          <div class="github-repo-card">
            <div>
              <div class="github-repo-card__name">
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
              </div>
              <div class="github-repo-card__desc">${repo.description || 'No description provided.'}</div>
            </div>
            <div class="github-repo-card__meta">
              <span>● ${repo.language || 'Code'}</span>
              <span>★ ${repo.stargazers_count}</span>
              <span>⑂ ${repo.forks_count}</span>
            </div>
          </div>
        `).join('');
      }

    } catch (err) {
      console.warn('GitHub API fetch fallback triggered:', err);
      // Fallback values if offline or rate limited
      if (ghRepos) ghRepos.textContent = '10+';
      if (ghFollowers) ghFollowers.textContent = '5+';
      if (ghStars) ghStars.textContent = '12';
      if (ghForks) ghForks.textContent = '4';
      if (ghRepoList) {
        ghRepoList.innerHTML = `
          <div class="github-repo-card">
            <div class="github-repo-card__name"><a href="https://github.com/varshitjha/portfolio" target="_blank">portfolio</a></div>
            <div class="github-repo-card__desc">Developer portfolio website built with HTML, CSS &amp; JavaScript.</div>
            <div class="github-repo-card__meta"><span>● JavaScript</span><span>★ 5</span></div>
          </div>
          <div class="github-repo-card">
            <div class="github-repo-card__name"><a href="https://github.com/varshitjha/weather-app" target="_blank">weather-app</a></div>
            <div class="github-repo-card__desc">Real-time weather dashboard with OpenWeather API.</div>
            <div class="github-repo-card__meta"><span>● JavaScript</span><span>★ 3</span></div>
          </div>
        `;
      }
    }
  }

  // Trigger GitHub API fetch
  fetchGitHubStats();


  // ==========================================
  // FEATURE 20: SINGLE-CLICK COPY TO CLIPBOARD
  // ==========================================

  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyPhoneBtn = document.getElementById('copyPhoneBtn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'varshitjha17@gmail.com';
      navigator.clipboard.writeText(email);
      showToast('Email address copied to clipboard!', 'success');
    });
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = '+917250725745';
      navigator.clipboard.writeText(phone);
      showToast('Phone number copied to clipboard!', 'success');
    });
  }

});

