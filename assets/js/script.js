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
        // Log full error for debugging, show clean message to user.
        console.error('EmailJS send failed:', err);
        showFormBanner(
          'Something went wrong sending your message. ' +
          'Please email me directly at yourname@example.com'
        );

      } finally {
        // Always restore button whether success or fail
        setButtonLoading(false);
      }
    });
  }


  // ==========================================
  // FEATURE 12: AUTO FOOTER YEAR
  // Sets the copyright year automatically.
  // You never have to update it manually.
  // ==========================================

  const footerYear = document.getElementById('footerYear');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

});
