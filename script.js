/*
 * MEMOREELS
 * Main interaction + media configuration
 */

const ASSET_CONFIG = {
  hero: {
    image: ''
  },

  about: {
    image: 'images/Untitled.jpg'
  },

  films: [
    {
      id: '01',
      video: 'wedding-film-compressed-25mb.mp4#t=0.001'
    },
    {
      id: '02',
      video: 'ring-ceremony-compressed-25mb.mp4#t=0.001'
    },
    {
      id: '03',
      video: 'welcome-ceremony-final.mp4#t=0.001'
    },
    {
      id: '04',
      video: 'birthday-compressed-25mb.mp4#t=0.001'
    },
    {
      id: '05',
      video: 'car-delivery-5.mp4#t=0.001'
    }
  ],

  stories: {
    Weddings: {
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85'
    },
    Celebrations: {
      image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=1000&q=85'
    },
    Events: {
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85'
    }
  }
};


/* =========================================================
   CONTACT / WHATSAPP
========================================================= */

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const WHATSAPP_NUMBER = '917699135521';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const FULL_PORTFOLIO_DRIVE_URL = 'https://drive.google.com/drive/folders/1drHYXtt68WriUwYl-eWJwGoW9K8ONjWD';
const NORMAL_WHATSAPP_MESSAGE = `Hello Ankit! 👋\n\nI came across Memoreels and would like to know more about your photography / films services.\n\nCould you please share the details and availability?\n\nThank you!`;

const openWhatsApp = (message) => {
  const url = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};


/* =========================================================
   NORMALIZE CONTACT ACTIONS
========================================================= */

const normalizeContactActions = () => {
  const contactActions = document.querySelector('.contact-actions');
  const combinedAction = contactActions?.querySelector('a[href^="tel:"]');

  if (combinedAction && combinedAction.textContent.includes('WhatsApp / Call')) {
    const whatsappAction = document.createElement('a');
    whatsappAction.className = 'text-link whatsapp-link';
    whatsappAction.href = WHATSAPP_URL;
    whatsappAction.target = '_blank';
    whatsappAction.rel = 'noreferrer';
    whatsappAction.innerHTML = 'WhatsApp <span>↗</span>';
    combinedAction.textContent = 'Call ';
    
    const arrow = document.createElement('span');
    arrow.textContent = '↗';
    combinedAction.append(arrow);
    contactActions.insertBefore(whatsappAction, combinedAction);
  }

  const details = document.querySelector('.contact-details');
  const combinedDetails = [...(details?.querySelectorAll('span') || [])].find(
      (item) => item.textContent.includes('WhatsApp / Call')
  );

  if (combinedDetails) {
    combinedDetails.outerHTML = '<span>WHATSAPP <a class="whatsapp-link" href="https://wa.me/917699135521" target="_blank" rel="noreferrer">+91 7699135521 ↗</a></span><span>CALL <a href="tel:+917699135521">+91 7699135521 ↗</a></span>';
  }

  const contactBookButton = contactActions?.querySelector('.button');
  if (contactBookButton) {
    contactBookButton.href = '#enquiry-form';
  }
};

normalizeContactActions();


/* =========================================================
   PORTFOLIO
========================================================= */

const portfolioLink = document.querySelector('.portfolio-cta-link');
if (portfolioLink) {
  portfolioLink.href = FULL_PORTFOLIO_DRIVE_URL;
  portfolioLink.target = '_blank';
  portfolioLink.rel = 'noopener noreferrer';
}


/* =========================================================
   WHATSAPP LINKS
========================================================= */

document.querySelectorAll('a[href^="https://wa.me/"]').forEach((link) => {
    if (link.dataset.whatsappBound === 'true') return;
    link.dataset.whatsappBound = 'true';
    link.addEventListener('click', (event) => {
        event.preventDefault();
        openWhatsApp(NORMAL_WHATSAPP_MESSAGE);
    });
});


/* =========================================================
   MOBILE MENU
========================================================= */

menuToggle?.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        menuToggle?.setAttribute('aria-expanded', 'false');
    });
});


/* =========================================================
   HEADER / NAVIGATION
========================================================= */

const siteHeader = document.querySelector('.site-header');
const navSections = [...document.querySelectorAll('main > section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];

const updateNavigation = () => {
  siteHeader?.classList.toggle('is-scrolled', window.scrollY > 12);
  const currentSection = navSections.reduce((current, section) => {
        if (window.scrollY + 160 >= section.offsetTop) return section.id;
        return current;
      }, 'work');

  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${currentSection}`);
  });
};

updateNavigation();
window.addEventListener('scroll', updateNavigation, { passive: true });


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================================
   STORIES
========================================================= */

const stories = {
  Weddings: { image: ASSET_CONFIG.stories.Weddings.image, label: '01 / Weddings', description: 'Cinematic films, photography and reels for your day.' },
  Celebrations: { image: ASSET_CONFIG.stories.Celebrations.image, label: '02 / Celebrations', description: 'Birthdays, engagements and moments worth keeping.' },
  Events: { image: ASSET_CONFIG.stories.Events.image, label: '03 / Events', description: 'Stories from launches, gatherings and live moments.' }
};

const storyImage = document.querySelector('#story-image');
const storyLabel = document.querySelector('#story-label');
const storyDescription = document.querySelector('#story-description');


/* =========================================================
   ASSET HELPERS
========================================================= */

const assetExists = async (source) => {
  if (!source) return false;
  if (source.startsWith('http://') || source.startsWith('https://')) return true;
  try {
    const response = await fetch(source, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

const setImageSource = async (image, source) => {
    if (!image || !source) return;
    const exists = await assetExists(source);
    if (!exists) return;
    image.src = source;
    image.closest('.hero-asset-slot, .about-asset-slot')?.classList.remove('asset-missing');
};


/* =========================================================
   HERO / ABOUT IMAGES
========================================================= */

setImageSource(document.querySelector('#ankit-camera-image'), ASSET_CONFIG.hero.image);
setImageSource(document.querySelector('#ankit-portrait-image'), ASSET_CONFIG.about.image);
setImageSource(storyImage, stories.Weddings.image);


/* =========================================================
   FEATURED FILMS - ORIGINAL LOCALHOST BEHAVIOR FIX
========================================================= */

const filmItems = document.querySelectorAll('.film-item');

document.querySelectorAll('.film-preview').forEach((video) => {
    // Opacity hamesha 1 rakhenge taaki video ka first frame dikhe!
    video.style.opacity = '1'; 
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.preload = 'metadata'; 
});

filmItems.forEach((film) => {
  const asset = ASSET_CONFIG.films.find(item => item.id === film.dataset.film);
  const preview = film.querySelector('.film-preview');
  
  // Jo pehle faltu ke img tag the usko ignore karenge
  const posterImg = film.querySelector('img[data-asset-role="film-poster"]');
  if (posterImg) {
    posterImg.style.display = 'none'; // Unsplash wali pic chhupao
  }

  if (!asset || !preview) return;

  // Save clean video path for modal (remove #t=0.001)
  film.dataset.video = asset.video ? asset.video.replace('#t=0.001', '') : '';
  
  if (asset.video) {
    preview.src = asset.video;
  }

  // Desktop hover logic
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (canHover) {
    film.addEventListener('pointerenter', () => {
      if (!preview.src) return;
      preview.muted = true;
      preview.play().catch(() => {});
    });

    film.addEventListener('pointerleave', () => {
      preview.pause();
      try {
        // Wapas 0.001 par laao taaki poster image bani rahe
        preview.currentTime = 0.001;
      } catch (e) {}
    });
  }
});


/* =========================================================
   STORY TABS
========================================================= */

document.querySelectorAll('.story-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
        const story = stories[tab.dataset.story];
        if (!story) return;

        document.querySelector('.story-tab.is-active')?.classList.remove('is-active');
        document.querySelector('.story-tab[aria-selected="true"]')?.setAttribute('aria-selected', 'false');
        
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');

        if (storyImage) storyImage.style.opacity = '0';

        window.setTimeout(() => {
            if (!storyImage) return;
            storyImage.src = story.image;
            storyImage.alt = `${storyLabel?.textContent || ''} story`;
            if (storyLabel) storyLabel.textContent = story.label;
            if (storyDescription) storyDescription.textContent = story.description;
            storyImage.style.opacity = '1';
          }, 180);
      });
  });


/* =========================================================
   PLAY BUTTON
========================================================= */

document.querySelectorAll('.play-button').forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        button.classList.toggle('is-playing');
        const icon = button.querySelector('span');
        if (icon) {
          icon.textContent = button.classList.contains('is-playing') ? 'Ⅱ' : '▶';
        }
      });

    button.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          button.click();
        }
      });
  });


/* =========================================================
   FILM MODAL
========================================================= */

const filmModal = document.querySelector('#film-modal');
const filmPlayer = document.querySelector('.film-player');
const filmModalTitle = document.querySelector('#film-modal-title');
const filmModalCategory = document.querySelector('.film-modal-category');
const filmModalEmpty = document.querySelector('.film-modal-empty');
const filmModalClose = document.querySelector('.film-modal-close');


/* =========================================================
   CLOSE MODAL
========================================================= */

const closeFilmModal = () => {
  filmModal?.classList.remove('is-open');
  filmModal?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (filmPlayer) {
    filmPlayer.pause();
    filmPlayer.removeAttribute('src');
    filmPlayer.load();
  }
};


/* =========================================================
   OPEN FILM MODAL
========================================================= */

document.querySelectorAll('.film-item').forEach((film) => {
    film.querySelector('.film-visual')?.addEventListener('click', (event) => {
          event.preventDefault();

          const title = film.querySelector('h3')?.textContent || 'Selected film';
          const category = film.querySelector('.film-meta p')?.textContent || 'Selected film';
          const videoSource = film.dataset.video?.trim();

          if (filmModalTitle) filmModalTitle.textContent = title;
          if (filmModalCategory) filmModalCategory.textContent = `Memoreels / ${category}`;

          filmModal?.classList.add('is-open');
          filmModal?.setAttribute('aria-hidden', 'false');
          document.body.classList.add('modal-open');

          if (videoSource && filmPlayer) {
            filmPlayer.src = videoSource;
            filmPlayer.hidden = false;
            if (filmModalEmpty) filmModalEmpty.hidden = true;
            filmPlayer.play().catch(() => {});
          } else {
            if (filmPlayer) filmPlayer.hidden = true;
            if (filmModalEmpty) {
              filmModalEmpty.hidden = false;
              filmModalEmpty.textContent = film.dataset.film === '01'
                  ? 'The Beginning will be available here once the final film is connected.'
                  : 'This film is reserved for a future Memoreels release.';
            }
          }
          filmModalClose?.focus();
        });
  });


/* =========================================================
   MODAL CLOSE CONTROLS
========================================================= */

document.querySelectorAll('[data-modal-close]').forEach((control) => {
    control.addEventListener('click', closeFilmModal);
  });

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && filmModal?.classList.contains('is-open')) {
      closeFilmModal();
    }
  });


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

document.querySelectorAll('[data-asset-src]').forEach((asset) => {
    asset.addEventListener('error', () => {
        asset.closest('.hero-asset-slot, .about-asset-slot')?.classList.add('asset-missing');
      });
  });


/* =========================================================
   ENQUIRY FORM
========================================================= */

const enquiryForm = document.querySelector('#enquiry-form');
const formStatus = document.querySelector('.form-status');

enquiryForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!enquiryForm.checkValidity()) {
      enquiryForm.classList.add('is-invalid');
      if (formStatus) formStatus.textContent = 'Please add your name, phone number and event type to continue.';
      enquiryForm.querySelector(':invalid')?.focus();
      return;
    }

    enquiryForm.classList.remove('is-invalid');
    const formData = new FormData(enquiryForm);

    const enquiryMessage = `Hello Ankit! 👋\n\nI would like to enquire about photography / films for my upcoming event.\n\nHere are my details:\n\nName: ${formData.get('name')}\nPhone / WhatsApp: ${formData.get('phone')}\nEmail: ${formData.get('email') || 'Not provided'}\nEvent Type: ${formData.get('eventType')}\nEvent Date: ${formData.get('eventDate') || 'Not provided'}\nLocation: ${formData.get('location') || 'Not provided'}\n\nA little about my story:\n${formData.get('story') || 'Not provided'}\n\nI would love to discuss the availability, requirements and suitable package with you.\n\nThank you!`;

    if (formStatus) formStatus.textContent = 'Opening WhatsApp…';
    openWhatsApp(enquiryMessage);
  });


/* =========================================================
   HERO PARALLAX
========================================================= */

const heroMedia = document.querySelector('.hero-media');
window.addEventListener('scroll', () => {
    if (window.innerWidth > 800 && heroMedia) {
      heroMedia.style.transform = `translateY(${Math.min(window.scrollY * 0.08, 32)}px)`;
    }
  }, { passive: true });
