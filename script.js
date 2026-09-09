/*
 * ==========================================================
 * MEMOREELS
 * Main site JavaScript
 * ==========================================================
 */


/* ==========================================================
   ASSET CONFIGURATION
========================================================== */

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
    video: 'wedding-film-compressed-25mb.mp4',
    thumbnail: ''
  },
  {
    id: '02',
    video: 'ring-ceremony-compressed-25mb.mp4',
    thumbnail: ''
  },
  {
    id: '03',
    video: 'welcome-ceremony-final.mp4',
    thumbnail: ''
  },
  {
    id: '04',
    video: 'birthday-compressed-25mb.mp4',
    thumbnail: ''
  },
  {
    id: '05',
    video: 'car-delivery-5.mp4',
    thumbnail: ''
  }
],

  stories: {
    Weddings: {
      image:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85'
    },

    Celebrations: {
      image:
        'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=1000&q=85'
    },

    Events: {
      image:
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85'
    }
  }
};


/* ==========================================================
   CONTACT
========================================================== */

const WHATSAPP_NUMBER = '917699135521';

const WHATSAPP_URL =
  `https://wa.me/${WHATSAPP_NUMBER}`;

const FULL_PORTFOLIO_DRIVE_URL =
  'https://drive.google.com/drive/folders/1drHYXtt68WriUwYl-eWJwGoW9K8ONjWD';


const NORMAL_WHATSAPP_MESSAGE = `Hello Ankit! 👋

I came across Memoreels and would like to know more about your photography / films services.

Could you please share the details and availability?

Thank you!`;


const openWhatsApp = (message) => {

  const url =
    `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;

  window.open(
    url,
    '_blank',
    'noopener,noreferrer'
  );
};


/* ==========================================================
   ELEMENTS
========================================================== */

const menuToggle =
  document.querySelector('.menu-toggle');

const mainNav =
  document.querySelector('.main-nav');

const siteHeader =
  document.querySelector('.site-header');


/* ==========================================================
   CONTACT BUTTON NORMALIZATION
========================================================== */

const normalizeContactActions = () => {

  const contactActions =
    document.querySelector('.contact-actions');


  const combinedAction =
    contactActions?.querySelector(
      'a[href^="tel:"]'
    );


  if (
    combinedAction &&
    combinedAction.textContent.includes(
      'WhatsApp / Call'
    )
  ) {

    const whatsappAction =
      document.createElement('a');

    whatsappAction.className =
      'text-link whatsapp-link';

    whatsappAction.href =
      WHATSAPP_URL;

    whatsappAction.target =
      '_blank';

    whatsappAction.rel =
      'noreferrer';

    whatsappAction.innerHTML =
      'WhatsApp <span>↗</span>';


    combinedAction.textContent =
      'Call ';


    const arrow =
      document.createElement('span');

    arrow.textContent =
      '↗';


    combinedAction.append(
      arrow
    );


    contactActions.insertBefore(
      whatsappAction,
      combinedAction
    );
  }


  const details =
    document.querySelector(
      '.contact-details'
    );


  const combinedDetails =
    [
      ...(details?.querySelectorAll(
        'span'
      ) || [])
    ].find(
      (item) =>
        item.textContent.includes(
          'WhatsApp / Call'
        )
    );


  if (combinedDetails) {

    combinedDetails.outerHTML =
      '<span>WHATSAPP <a class="whatsapp-link" href="https://wa.me/917699135521" target="_blank" rel="noreferrer">+91 7699135521 ↗</a></span>' +
      '<span>CALL <a href="tel:+917699135521">+91 7699135521 ↗</a></span>';
  }


  const contactBookButton =
    contactActions?.querySelector(
      '.button'
    );


  if (contactBookButton) {

    contactBookButton.href =
      '#contact';

    contactBookButton.dataset.contactScroll =
      'true';
  }
};


normalizeContactActions();


/* ==========================================================
   PORTFOLIO
========================================================== */

const portfolioLink =
  document.querySelector(
    '.portfolio-cta-link'
  );


if (portfolioLink) {

  portfolioLink.href =
    FULL_PORTFOLIO_DRIVE_URL;
}


/* ==========================================================
   WHATSAPP LINKS
========================================================== */

document
  .querySelectorAll(
    'a[href^="https://wa.me/"]'
  )
  .forEach(
    (link) => {

      if (
        link.dataset.whatsappBound ===
        'true'
      ) {
        return;
      }


      link.dataset.whatsappBound =
        'true';


      link.addEventListener(
        'click',
        (event) => {

          event.preventDefault();


          openWhatsApp(
            NORMAL_WHATSAPP_MESSAGE
          );
        }
      );
    }
  );


/* ==========================================================
   TOP / CONTACT SMOOTH SCROLL
========================================================== */

const scrollToTop = () => {

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

};


const scrollToContact = () => {

  const contactSection =
    document.querySelector(
      '#contact'
    );


  if (!contactSection) {
    return;
  }


  const headerHeight =
    siteHeader?.offsetHeight ||
    88;


  const targetPosition =
    contactSection.getBoundingClientRect().top +
    window.scrollY -
    headerHeight;


  window.scrollTo({

    top:
      Math.max(
        0,
        targetPosition
      ),

    behavior:
      'smooth'
  });
};


/* ==========================================================
   BOOK A SHOOT
========================================================== */

document
  .querySelectorAll(
    '[data-contact-scroll="true"]'
  )
  .forEach(
    (button) => {

      button.addEventListener(
        'click',
        (event) => {

          event.preventDefault();


          scrollToContact();


          /*
           * Remove #contact from URL
           * so the browser does not create
           * another jump.
           */

          history.replaceState(
            null,
            '',
            window.location.pathname +
            window.location.search
          );
        }
      );
    }
  );


/* ==========================================================
   BACK TO TOP
========================================================== */

document
  .querySelectorAll(
    'a[href="#top"]'
  )
  .forEach(
    (topLink) => {

      topLink.addEventListener(
        'click',
        (event) => {

          event.preventDefault();


          scrollToTop();


          /*
           * Keep the URL clean.
           */

          history.replaceState(
            null,
            '',
            window.location.pathname +
            window.location.search
          );
        }
      );
    }
  );


/* ==========================================================
   MOBILE NAV
========================================================== */

menuToggle?.addEventListener(
  'click',
  () => {

    const isOpen =
      mainNav.classList.toggle(
        'is-open'
      );


    menuToggle.setAttribute(
      'aria-expanded',
      String(isOpen)
    );
  }
);


document
  .querySelectorAll(
    '.main-nav a'
  )
  .forEach(
    (link) => {

      link.addEventListener(
        'click',
        () => {

          mainNav.classList.remove(
            'is-open'
          );


          menuToggle?.setAttribute(
            'aria-expanded',
            'false'
          );
        }
      );
    }
  );


/* ==========================================================
   NAVIGATION / ACTIVE SECTION
========================================================== */

const navSections = [
  ...document.querySelectorAll(
    'main > section[id]'
  )
];


const navLinks = [
  ...document.querySelectorAll(
    '.main-nav a[href^="#"]'
  )
];


const updateNavigation = () => {

  siteHeader?.classList.toggle(
    'is-scrolled',
    window.scrollY > 12
  );


  const currentSection =
    navSections.reduce(
      (current, section) => {

        if (
          window.scrollY + 160 >=
          section.offsetTop
        ) {

          return section.id;
        }


        return current;
      },
      'work'
    );


  navLinks.forEach(
    (link) => {

      link.classList.toggle(
        'is-active',
        link.getAttribute(
          'href'
        ) ===
        `#${currentSection}`
      );
    }
  );
};


updateNavigation();


window.addEventListener(
  'scroll',
  updateNavigation,
  {
    passive: true
  }
);


/* ==========================================================
   REVEAL ANIMATIONS
========================================================== */

const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              'is-visible'
            );


            revealObserver.unobserve(
              entry.target
            );
          }
        }
      );
    },
    {
      threshold: 0.12
    }
  );


document
  .querySelectorAll(
    '.reveal'
  )
  .forEach(
    (element) => {

      revealObserver.observe(
        element
      );
    }
  );


/* ==========================================================
   STORIES
========================================================== */

const stories = {

  Weddings: {

    image:
      ASSET_CONFIG.stories.Weddings.image,

    label:
      '01 / Weddings',

    description:
      'Cinematic films, photography and reels for your day.'
  },


  Celebrations: {

    image:
      ASSET_CONFIG.stories.Celebrations.image,

    label:
      '02 / Celebrations',

    description:
      'Birthdays, engagements and moments worth keeping.'
  },


  Events: {

    image:
      ASSET_CONFIG.stories.Events.image,

    label:
      '03 / Events',

    description:
      'Stories from launches, gatherings and live moments.'
  }

};


const storyImage =
  document.querySelector(
    '#story-image'
  );


const storyLabel =
  document.querySelector(
    '#story-label'
  );


const storyDescription =
  document.querySelector(
    '#story-description'
  );


/* ==========================================================
   IMAGE HELPERS
========================================================== */

const assetExists = async (
  source
) => {

  if (!source) {
    return false;
  }


  if (
    !source.startsWith(
      'assets/'
    )
  ) {

    return true;
  }


  try {

    const response =
      await fetch(
        source,
        {
          method: 'HEAD'
        }
      );


    return response.ok;

  } catch {

    return false;
  }
};


const setImageSource = async (
  image,
  source
) => {

  if (!image || !source) {
    return;
  }


  if (
    !(await assetExists(source))
  ) {

    return;
  }


  image.src =
    source;


  image
    .closest(
      '.hero-asset-slot, .about-asset-slot'
    )
    ?.classList.remove(
      'asset-missing'
    );
};


/* ==========================================================
   HERO / ABOUT
========================================================== */

setImageSource(
  document.querySelector(
    '#ankit-camera-image'
  ),
  ASSET_CONFIG.hero.image
);


setImageSource(
  document.querySelector(
    '#ankit-portrait-image'
  ),
  ASSET_CONFIG.about.image
);


setImageSource(
  storyImage,
  stories.Weddings.image
);


/* ==========================================================
   FEATURED FILMS
========================================================== */

const filmItems = [
  ...document.querySelectorAll(
    '.film-item'
  )
];


let activeFilm =
  null;


/* ==========================================================
   STOP OTHER FILMS
========================================================== */

const stopOtherFilmPreviews = (
  exceptVideo = null
) => {

  filmItems.forEach(
    (film) => {

      const video =
        film.querySelector(
          '.film-preview'
        );


      if (
        !video ||
        video === exceptVideo
      ) {

        return;
      }


      video.pause();


      video.classList.remove(
        'is-playing'
      );


      film
        .querySelector(
          '.film-poster-slot'
        )
        ?.classList.remove(
          'has-video'
        );
    }
  );
};


/* ==========================================================
   PREPARE FILMS
========================================================== */

filmItems.forEach((film) => {

  const asset = ASSET_CONFIG.films.find(
    (item) => item.id === film.dataset.film
  );

  const preview = film.querySelector('.film-preview');

  if (!asset || !preview) {
    return;
  }

  film.dataset.video = asset.video;

  preview.src = asset.video;
  preview.muted = true;
  preview.loop = true;
  preview.playsInline = true;

  // IMPORTANT:
  // Load the video immediately so the FIRST FRAME
  // is visible before the mouse enters the card.
  preview.preload = 'auto';
  preview.load();

  preview.addEventListener('loadeddata', () => {

    const posterSlot =
      film.querySelector('.film-poster-slot');

    posterSlot?.classList.add('has-video');

    // Keep the first frame visible.
    preview.pause();

    try {
      preview.currentTime = 0;
    } catch {}

  }, { once: true });

  preview.addEventListener('error', () => {

    film
      .querySelector('.film-poster-slot')
      ?.classList.add('video-error');

  }, { once: true });

});
/* ==========================================================
   LOAD FILM VIDEO
========================================================== */

const loadFilmVideo = (
  video
) => {

  return new Promise(
    (resolve) => {

      if (
        !video ||
        !video.dataset.src
      ) {

        resolve(false);

        return;
      }


      if (
        video.getAttribute(
          'src'
        )
      ) {

        resolve(true);

        return;
      }


      const finishLoading =
        () => {

          video.removeEventListener(
            'loadeddata',
            finishLoading
          );


          video.removeEventListener(
            'error',
            failLoading
          );


          resolve(true);
        };


      const failLoading =
        () => {

          video.removeEventListener(
            'loadeddata',
            finishLoading
          );


          video.removeEventListener(
            'error',
            failLoading
          );


          resolve(false);
        };


      video.addEventListener(
        'loadeddata',
        finishLoading
      );


      video.addEventListener(
        'error',
        failLoading
      );


      video.src =
        video.dataset.src;


      video.load();
    }
  );
};


/* ==========================================================
   PLAY FILM PREVIEW
========================================================== */

const playFilmPreview = async (
  film
) => {

  const video =
    film?.querySelector(
      '.film-preview'
    );


  if (!video) {
    return;
  }


  stopOtherFilmPreviews(
    video
  );


  activeFilm =
    film;


  const loaded =
    await loadFilmVideo(
      video
    );


  if (
    activeFilm !== film
  ) {

    return;
  }


  if (!loaded) {
    return;
  }


  film
    .querySelector(
      '.film-poster-slot'
    )
    ?.classList.add(
      'has-video'
    );


  try {

    await video.play();

  } catch {

    /* autoplay may fail silently */

  }
};


/* ==========================================================
   PAUSE FILM PREVIEW
========================================================== */

const pauseFilmPreview = (
  film
) => {

  const video =
    film?.querySelector(
      '.film-preview'
    );


  if (!video) {
    return;
  }


  video.pause();


  try {

    video.currentTime =
      0;

  } catch {}


  film
    .querySelector(
      '.film-poster-slot'
    )
    ?.classList.remove(
      'has-video'
    );


  if (
    activeFilm === film
  ) {

    activeFilm =
      null;
  }
};


/* ==========================================================
   DESKTOP HOVER
========================================================== */

filmItems.forEach(
  (film) => {

    film.addEventListener(
      'mouseenter',
      () => {

        if (
          window.matchMedia(
            '(hover: hover)'
          ).matches
        ) {

          playFilmPreview(
            film
          );
        }
      }
    );


    film.addEventListener(
      'mouseleave',
      () => {

        if (
          window.matchMedia(
            '(hover: hover)'
          ).matches
        ) {

          pauseFilmPreview(
            film
          );
        }
      }
    );
  }
);


/* ==========================================================
   MOBILE FILM AUTOPLAY
========================================================== */

let mobileActiveFilm =
  null;


const chooseMobileFilm = () => {

  if (
    window.matchMedia(
      '(hover: hover)'
    ).matches
  ) {

    return;
  }


  let bestFilm =
    null;


  let bestDistance =
    Infinity;


  filmItems.forEach(
    (film) => {

      const rect =
        film.getBoundingClientRect();


      const viewportCenter =
        window.innerHeight /
        2;


      const filmCenter =
        rect.top +
        rect.height /
        2;


      const distance =
        Math.abs(
          filmCenter -
          viewportCenter
        );


      const visibleTop =
        Math.max(
          rect.top,
          0
        );


      const visibleBottom =
        Math.min(
          rect.bottom,
          window.innerHeight
        );


      const visibleHeight =
        Math.max(
          0,
          visibleBottom -
          visibleTop
        );


      const visibility =
        rect.height > 0
          ? visibleHeight /
            rect.height
          : 0;


      if (
        visibility >= 0.35 &&
        distance < bestDistance
      ) {

        bestDistance =
          distance;


        bestFilm =
          film;
      }
    }
  );


  if (
    bestFilm &&
    bestFilm !==
      mobileActiveFilm
  ) {

    if (
      mobileActiveFilm
    ) {

      pauseFilmPreview(
        mobileActiveFilm
      );
    }


    mobileActiveFilm =
      bestFilm;


    playFilmPreview(
      bestFilm
    );
  }
};


let mobileFilmTicking =
  false;


const handleMobileFilmScroll =
  () => {

    if (
      mobileFilmTicking
    ) {

      return;
    }


    mobileFilmTicking =
      true;


    requestAnimationFrame(
      () => {

        chooseMobileFilm();


        mobileFilmTicking =
          false;
      }
    );
  };


window.addEventListener(
  'scroll',
  handleMobileFilmScroll,
  {
    passive: true
  }
);


window.addEventListener(
  'resize',
  handleMobileFilmScroll,
  {
    passive: true
  }
);


window.addEventListener(
  'orientationchange',
  handleMobileFilmScroll,
  {
    passive: true
  }
);


/* ==========================================================
   STORY TABS
========================================================== */

document
  .querySelectorAll(
    '.story-tab'
  )
  .forEach(
    (tab) => {

      tab.addEventListener(
        'click',
        () => {

          const story =
            stories[
              tab.dataset.story
            ];


          if (!story) {
            return;
          }


          document
            .querySelector(
              '.story-tab.is-active'
            )
            ?.classList.remove(
              'is-active'
            );


          tab.classList.add(
            'is-active'
          );


          tab.setAttribute(
            'aria-selected',
            'true'
          );


          if (storyImage) {

            storyImage.style.opacity =
              '0';
          }


          window.setTimeout(
            () => {

              if (
                storyImage
              ) {

                storyImage.src =
                  story.image;


                storyImage.alt =
                  `${story.label} story`;
              }


              if (
                storyLabel
              ) {

                storyLabel.textContent =
                  story.label;
              }


              if (
                storyDescription
              ) {

                storyDescription.textContent =
                  story.description;
              }


              if (
                storyImage
              ) {

                storyImage.style.opacity =
                  '1';
              }

            },
            180
          );
        }
      );
    }
  );


/* ==========================================================
   PLAY BUTTONS
========================================================== */

document
  .querySelectorAll(
    '.play-button'
  )
  .forEach(
    (button) => {

      button.addEventListener(
        'click',
        (event) => {

          event.preventDefault();

          event.stopPropagation();


          button.classList.toggle(
            'is-playing'
          );


          const span =
            button.querySelector(
              'span'
            );


          if (span) {

            span.textContent =
              button.classList.contains(
                'is-playing'
              )
                ? 'Ⅱ'
                : '▶';
          }
        }
      );


      button.addEventListener(
        'keydown',
        (event) => {

          if (
            event.key ===
              'Enter' ||
            event.key ===
              ' '
          ) {

            event.preventDefault();

            button.click();
          }
        }
      );
    }
  );


/* ==========================================================
   FILM MODAL
========================================================== */

const filmModal =
  document.querySelector(
    '#film-modal'
  );


const filmPlayer =
  document.querySelector(
    '.film-player'
  );


const filmModalTitle =
  document.querySelector(
    '#film-modal-title'
  );


const filmModalCategory =
  document.querySelector(
    '.film-modal-category'
  );


const filmModalEmpty =
  document.querySelector(
    '.film-modal-empty'
  );


const filmModalClose =
  document.querySelector(
    '.film-modal-close'
  );


const closeFilmModal = () => {

  filmModal?.classList.remove(
    'is-open'
  );


  filmModal?.setAttribute(
    'aria-hidden',
    'true'
  );


  document.body.classList.remove(
    'modal-open'
  );


  if (filmPlayer) {

    filmPlayer.pause();


    filmPlayer.removeAttribute(
      'src'
    );


    filmPlayer.load();


    filmPlayer.hidden =
      false;
  }


  if (filmModalEmpty) {

    filmModalEmpty.hidden =
      true;
  }
};


/* ==========================================================
   OPEN FILM MODAL
========================================================== */

document
  .querySelectorAll(
    '.film-item'
  )
  .forEach(
    (film) => {

      film
        .querySelector(
          '.film-visual'
        )
        ?.addEventListener(
          'click',
          async (event) => {

            event.preventDefault();


            const title =
              film.querySelector(
                'h3'
              )?.textContent ||
              'Selected film';


            const category =
              film.querySelector(
                '.film-meta p'
              )?.textContent ||
              'Selected film';


            const videoSource =
              film.dataset.video?.trim();


            if (
              filmModalTitle
            ) {

              filmModalTitle.textContent =
                title;
            }


            if (
              filmModalCategory
            ) {

              filmModalCategory.textContent =
                `Memoreels / ${category}`;
            }


            filmModal?.classList.add(
              'is-open'
            );


            filmModal?.setAttribute(
              'aria-hidden',
              'false'
            );


            document.body.classList.add(
              'modal-open'
            );


            if (
              videoSource &&
              filmPlayer
            ) {

              filmPlayer.src =
                videoSource;


              filmPlayer.hidden =
                false;


              if (
                filmModalEmpty
              ) {

                filmModalEmpty.hidden =
                  true;
              }


              try {

                await filmPlayer.play();

              } catch {

                /* manual play remains available */
              }

            } else {

              if (
                filmPlayer
              ) {

                filmPlayer.hidden =
                  true;
              }


              if (
                filmModalEmpty
              ) {

                filmModalEmpty.hidden =
                  false;


                filmModalEmpty.textContent =
                  'This film is reserved for a future Memoreels release.';
              }
            }


            filmModalClose?.focus();
          }
        );
    }
  );


/* ==========================================================
   MODAL CLOSE
========================================================== */

document
  .querySelectorAll(
    '[data-modal-close]'
  )
  .forEach(
    (control) => {

      control.addEventListener(
        'click',
        closeFilmModal
      );
    }
  );


document.addEventListener(
  'keydown',
  (event) => {

    if (
      event.key ===
        'Escape' &&
      filmModal?.classList.contains(
        'is-open'
      )
    ) {

      closeFilmModal();
    }
  }
);


/* ==========================================================
   ASSET ERROR HANDLING
========================================================== */

document
  .querySelectorAll(
    '[data-asset-src]'
  )
  .forEach(
    (asset) => {

      asset.addEventListener(
        'error',
        () => {

          asset
            .closest(
              '.hero-asset-slot, .about-asset-slot'
            )
            ?.classList.add(
              'asset-missing'
            );
        }
      );
    }
  );


/* ==========================================================
   ENQUIRY FORM
========================================================== */

const enquiryForm =
  document.querySelector(
    '#enquiry-form'
  );


const formStatus =
  document.querySelector(
    '.form-status'
  );


enquiryForm?.addEventListener(
  'submit',
  (event) => {

    event.preventDefault();


    if (
      !enquiryForm.checkValidity()
    ) {

      enquiryForm.classList.add(
        'is-invalid'
      );


      if (
        formStatus
      ) {

        formStatus.textContent =
          'Please add your name, phone number and event type to continue.';
      }


      enquiryForm
        .querySelector(
          ':invalid'
        )
        ?.focus();


      return;
    }


    enquiryForm.classList.remove(
      'is-invalid'
    );


    const formData =
      new FormData(
        enquiryForm
      );


    const enquiryMessage =
      `Hello Ankit! 👋

I would like to enquire about photography / films for my upcoming event.

Here are my details:

Name: ${formData.get('name')}
Phone / WhatsApp: ${formData.get('phone')}
Email: ${formData.get('email') || 'Not provided'}
Event Type: ${formData.get('eventType')}
Event Date: ${formData.get('eventDate') || 'Not provided'}
Location: ${formData.get('location') || 'Not provided'}

A little about my story:
${formData.get('story') || 'Not provided'}

I would love to discuss the availability, requirements and suitable package with you.

Thank you!`;


    if (
      formStatus
    ) {

      formStatus.textContent =
        'Opening WhatsApp…';
    }


    openWhatsApp(
      enquiryMessage
    );
  }
);


/* ==========================================================
   HERO PARALLAX
========================================================== */

const heroMedia =
  document.querySelector(
    '.hero-media'
  );


window.addEventListener(
  'scroll',
  () => {

    if (
      window.innerWidth > 800 &&
      heroMedia
    ) {

      heroMedia.style.transform =
        `translateY(${Math.min(
          window.scrollY * 0.08,
          32
        )}px)`;
    }
  },
  {
    passive: true
  }
);


/* ==========================================================
   INITIAL MOBILE FILM CHECK
========================================================== */

window.addEventListener(
  'load',
  () => {

    chooseMobileFilm();
  }
);
