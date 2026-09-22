document.addEventListener("DOMContentLoaded", function () {
  const swiperContainer = document.querySelector(".swiper-container");

  if (swiperContainer && typeof Swiper !== "undefined") {
    new Swiper(".swiper-container", {
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      breakpoints: {
        360: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 35,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 40,
        },
      },
    });
  }

  const fadeInElements = document.querySelectorAll(".fade-in");

  if (fadeInElements.length) {
    const fadeObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute("data-delay") || "0";

            entry.target.style.transitionDelay = `${Number(delay) / 1000}s`;

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    fadeInElements.forEach(function (element) {
      fadeObserver.observe(element);
    });
  }

  const shareLinks = document.querySelectorAll(".share");
  const alertContainer = document.getElementById("alert-container");

  function showAlert(type, message) {
    if (!alertContainer) {
      return;
    }

    const alert = document.createElement("div");

    alert.className = `alert alert-${type} alert-dismissible fade show`;

    alert.setAttribute("role", "alert");

    alert.innerHTML = `
      ${message}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    `;

    alertContainer.appendChild(alert);

    setTimeout(function () {
      alert.classList.remove("show");

      setTimeout(function () {
        alert.remove();
      }, 300);
    }, 5000);
  }

  shareLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const platform = link.getAttribute("data-share-to");

      const currentUrl = encodeURIComponent(window.location.href);

      const shareText = encodeURIComponent("Check this out!");

      let shareUrl = "";

      switch (platform) {
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
          break;

        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareText}`;
          break;

        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
          break;

        case "youtube":
          shareUrl = `https://www.youtube.com/results?search_query=${shareText}`;
          break;

        case "whatsapp":
          shareUrl = `https://api.whatsapp.com/send?text=${shareText}%20${currentUrl}`;
          break;

        case "instagram":
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
              .writeText(window.location.href)
              .then(function () {
                showAlert(
                  "success",
                  "Link copied! Share this on Instagram by pasting it into a post or story.",
                );
              })
              .catch(function () {
                showAlert(
                  "danger",
                  "Failed to copy the link. Please try again.",
                );
              });
          } else {
            showAlert("danger", "Clipboard is not supported in this browser.");
          }

          return;

        default:
          console.error("Unsupported platform:", platform);

          return;
      }

      if (shareUrl) {
        window.open(shareUrl, "_blank", "noopener,noreferrer");
      }
    });
  });

  const newsletterForm = document.getElementById("newsletterForm");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const popupMessage = document.getElementById("popupMessage");

      if (!popupMessage) {
        return;
      }

      popupMessage.style.display = "block";

      setTimeout(function () {
        popupMessage.style.display = "none";
      }, 3000);
    });
  }

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const popupMessage = document.getElementById("popupMessageContact");

      if (!popupMessage) {
        return;
      }

      popupMessage.style.display = "block";

      setTimeout(function () {
        popupMessage.style.display = "none";
      }, 3000);
    });
  }

  const menuToggle = document.getElementById("siteMenuToggle");
  const menu = document.getElementById("siteMobileMenu");
  const menuClose = document.getElementById("siteMenuClose");
  const backdrop = document.getElementById("siteMenuBackdrop");

  if (menuToggle && menu && menuClose && backdrop) {
    const mobileDropdowns = menu.querySelectorAll(".mobile-dropdown-item");

    function resetMobileDropdowns() {
      mobileDropdowns.forEach(function (dropdown) {
        dropdown.classList.remove("open");
      });
    }

    function openMenu() {
      menu.classList.add("show");
      backdrop.classList.add("show");
      menuToggle.classList.add("active");

      menuToggle.setAttribute("aria-expanded", "true");
      menu.setAttribute("aria-hidden", "false");
      menuToggle.setAttribute("aria-label", "Close navigation");

      document.body.classList.add("site-menu-open");
    }

    function closeMenu() {
      menu.classList.remove("show");
      backdrop.classList.remove("show");
      menuToggle.classList.remove("active");

      menuToggle.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
      menuToggle.setAttribute("aria-label", "Open navigation");

      document.body.classList.remove("site-menu-open");

      resetMobileDropdowns();
    }

    menuToggle.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (menu.classList.contains("show")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menuClose.addEventListener("click", function (event) {
      event.preventDefault();
      closeMenu();
    });

    backdrop.addEventListener("click", function () {
      closeMenu();
    });

    mobileDropdowns.forEach(function (dropdown) {
      const mainLink = dropdown.querySelector(".mobile-dropdown-main");

      if (!mainLink) {
        return;
      }

      mainLink.addEventListener("click", function (event) {
        const isOpen = dropdown.classList.contains("open");

        if (!isOpen) {
          event.preventDefault();
          event.stopImmediatePropagation();

          mobileDropdowns.forEach(function (item) {
            if (item !== dropdown) {
              item.classList.remove("open");
            }
          });

          dropdown.classList.add("open");

          return;
        }

        dropdown.classList.remove("open");
      });
    });

    const menuLinks = menu.querySelectorAll(
      ".site-mobile-nav-list a:not(.mobile-dropdown-main)",
    );

    menuLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.classList.contains("show")) {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 992) {
        closeMenu();
      }
    });
  }

  const unheardTitles = [
    "You don't have to say your name. Just say you're ready.",
    "No forms. No labels. Just a room, and someone who listens.",
    "For the tiredness that has no name.",
  ];

  const unheardHeroTitle = document.getElementById("unheardHeroTitle");

  if (unheardHeroTitle && unheardTitles.length) {
    let unheardTitleIndex = 0;

    setInterval(function () {
      unheardHeroTitle.classList.remove("fade-up");

      void unheardHeroTitle.offsetWidth;

      unheardTitleIndex = (unheardTitleIndex + 1) % unheardTitles.length;

      unheardHeroTitle.textContent = unheardTitles[unheardTitleIndex];

      unheardHeroTitle.classList.add("fade-up");
    }, 2000);
  }

  const sanctuarySlider = document.querySelector(".hero-sanctuaries-list");

  const sanctuaryCards = document.querySelectorAll(".hero-sanctuary");

  const sanctuaryDots = document.querySelector(".hero-sanctuaries-dots");

  if (sanctuarySlider && sanctuaryCards.length && sanctuaryDots) {
    sanctuaryDots.innerHTML = "";

    sanctuaryCards.forEach(function (card, index) {
      const dot = document.createElement("button");

      dot.type = "button";

      dot.setAttribute("aria-label", `Go to sanctuary ${index + 1}`);

      dot.addEventListener("click", function () {
        sanctuarySlider.scrollTo({
          left: card.offsetLeft,
          behavior: "smooth",
        });
      });

      sanctuaryDots.appendChild(dot);
    });

    function updateSanctuaryDots() {
      let activeIndex = 0;
      let smallestDistance = Infinity;

      sanctuaryCards.forEach(function (card, index) {
        const distance = Math.abs(sanctuarySlider.scrollLeft - card.offsetLeft);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          activeIndex = index;
        }
      });

      sanctuaryDots.querySelectorAll("button").forEach(function (dot, index) {
        dot.classList.toggle("active", index === activeIndex);
      });
    }

    sanctuarySlider.addEventListener("scroll", updateSanctuaryDots, {
      passive: true,
    });

    window.addEventListener("resize", updateSanctuaryDots);

    updateSanctuaryDots();
  }

  const reflections = [
    {
      quote:
        "No one asked my name. For the first time, that felt like relief, not fear.",
      author: "Anonymous",
    },
    {
      quote:
        "I didn't need advice. I just needed someone to sit with the weight for an hour.",
      author: "Anonymous, Chennai",
    },
    {
      quote:
        "I've held this in for eleven years. It took eleven minutes to finally let it go.",
      author: "Anonymous, Chennai",
    },
    {
      quote:
        "I walked in not knowing what I'd say. I walked out having said everything.",
      author: "Anonymous, Chennai",
    },
  ];

  const reflectionQuote = document.querySelector(
    ".unheard-reflections-quote p",
  );

  const reflectionAuthor = document.querySelector(
    ".unheard-reflections-author",
  );

  const reflectionDots = document.querySelectorAll(
    ".unheard-reflections-dots button",
  );

  if (reflectionQuote && reflectionAuthor && reflectionDots.length) {
    let reflectionIndex = 0;
    let reflectionTimer;

    function changeReflection(index) {
      reflectionQuote.style.opacity = "0";
      reflectionAuthor.style.opacity = "0";

      setTimeout(function () {
        reflectionQuote.textContent = reflections[index].quote;

        reflectionAuthor.textContent = `— ${reflections[index].author}`;

        reflectionQuote.style.opacity = "1";
        reflectionAuthor.style.opacity = "1";
      }, 250);

      reflectionDots.forEach(function (dot, dotIndex) {
        dot.classList.toggle("active", dotIndex === index);
      });

      reflectionIndex = index;
    }

    function startReflectionSlider() {
      clearInterval(reflectionTimer);

      reflectionTimer = setInterval(function () {
        const nextIndex = (reflectionIndex + 1) % reflections.length;

        changeReflection(nextIndex);
      }, 3000);
    }

    reflectionDots.forEach(function (dot, index) {
      dot.addEventListener("click", function () {
        changeReflection(index);
        startReflectionSlider();
      });
    });

    startReflectionSlider();
  }

  const unheardFinalCta = document.querySelector(".unheard-final-cta");

  if (unheardFinalCta) {
    const unheardCtaObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            unheardFinalCta.classList.add("is-visible");

            observer.unobserve(unheardFinalCta);
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    unheardCtaObserver.observe(unheardFinalCta);
  }

  /* =====================================================
     CHECK MAP
  ===================================================== */

  const mapElement = document.getElementById("tamilNaduMap");

  if (mapElement && typeof L !== "undefined") {
    /* =====================================================
       TAMIL NADU MAP
    ===================================================== */

    const map = L.map("tamilNaduMap", {
      center: [10.8505, 78.7047],

      zoom: 7,

      zoomControl: true,

      attributionControl: true,

      scrollWheelZoom: false,

      doubleClickZoom: true,

      dragging: true,

      touchZoom: true,

      boxZoom: false,

      keyboard: false,
    });

    /* =====================================================
       OPENSTREETMAP
    ===================================================== */

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,

      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
    }).addTo(map);

    /* =====================================================
       LOCATIONS
    ===================================================== */

    const locations = [
      { name: "Chennai", lat: 13.0827, lng: 80.2707 },
      { name: "Coimbatore", lat: 11.0168, lng: 76.9558 },
      { name: "Madurai", lat: 9.9252, lng: 78.1198 },
      { name: "Tirunelveli", lat: 8.7139, lng: 77.7567 },
      { name: "Salem", lat: 11.6643, lng: 78.146 },
      { name: "Tiruchirappalli", lat: 10.7905, lng: 78.7047 },
      { name: "Vellore", lat: 12.9165, lng: 79.1325 },
      { name: "Erode", lat: 11.341, lng: 77.7172 },
      { name: "Thanjavur", lat: 10.7867, lng: 79.1378 },
      { name: "Tiruppur", lat: 11.1085, lng: 77.3411 },
      { name: "Kanchipuram", lat: 12.8342, lng: 79.7036 },
      { name: "Dindigul", lat: 10.3673, lng: 77.9803 },
      { name: "Cuddalore", lat: 11.748, lng: 79.7714 },
      { name: "Nagapattinam", lat: 10.7672, lng: 79.8449 },
      { name: "Krishnagiri", lat: 12.5186, lng: 78.2137 },
      { name: "Nagercoil", lat: 8.1833, lng: 77.4119 },
      { name: "Ramanathapuram", lat: 9.3639, lng: 78.8395 },
      { name: "Thoothukudi", lat: 8.7642, lng: 78.1348 },
      { name: "Villupuram", lat: 11.9401, lng: 79.4861 },
      { name: "Sivaganga", lat: 9.8433, lng: 78.4809 },
      { name: "Pudukkottai", lat: 10.3833, lng: 78.8001 },
      { name: "The Nilgiris", lat: 11.4102, lng: 76.695 },
      { name: "Dharmapuri", lat: 12.1211, lng: 78.1582 },
      { name: "Namakkal", lat: 11.2194, lng: 78.1677 },
    ];

    /* =====================================================
       CUSTOM PIN
    ===================================================== */

    const pinIcon = L.divIcon({
      className: "coverage-map-marker",

      html: `
        <div class="coverage-map-pin"></div>
      `,

      iconSize: [42, 50],

      iconAnchor: [21, 50],

      popupAnchor: [0, -45],
    });

    /* =====================================================
       ADD LOCATION MARKERS
    ===================================================== */

    const markers = [];

    locations.forEach(function (location) {
      const marker = L.marker([location.lat, location.lng], {
        icon: pinIcon,
      });

      marker.addTo(map);

      marker.bindTooltip(location.name, {
        direction: "top",

        offset: [0, -40],

        className: "coverage-leaflet-tooltip",

        permanent: false,

        opacity: 1,
      });

      markers.push(marker);
    });

    /* =====================================================
       FIT MAP TO LOCATIONS
    ===================================================== */

    if (markers.length) {
      const bounds = L.latLngBounds(
        locations.map(function (location) {
          return [location.lat, location.lng];
        }),
      );

      map.fitBounds(bounds, {
        padding: [50, 50],

        maxZoom: 8,
      });
    }

    /* =====================================================
       MAP RESIZE
    ===================================================== */

    function refreshMap() {
      map.invalidateSize();
    }

    setTimeout(refreshMap, 300);

    setTimeout(refreshMap, 800);

    window.addEventListener("resize", function () {
      setTimeout(refreshMap, 150);
    });

    /* =====================================================
       MOBILE TOUCH BEHAVIOR
    ===================================================== */

    function updateMobileMap() {
      if (window.innerWidth <= 767) {
        map.options.scrollWheelZoom = false;

        map.options.doubleClickZoom = false;
      } else {
        map.options.scrollWheelZoom = false;

        map.options.doubleClickZoom = true;
      }
    }

    updateMobileMap();

    window.addEventListener("resize", updateMobileMap);
  }

  /* =====================================================
     OUR PROCESS
  ===================================================== */

  const processSection = document.querySelector("#our-process");

  if (processSection) {
    const steps = [...processSection.querySelectorAll(".our-process-step")];

    const processProgress = processSection.querySelector(
      ".our-process-progress",
    );

    /* =====================================================
       REVEAL / HIDE STEPS
    ===================================================== */

    const processObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.35,

        rootMargin: "0px 0px -15% 0px",
      },
    );

    steps.forEach((step) => {
      processObserver.observe(step);
    });

    /* =====================================================
       TIMELINE PROGRESS
    ===================================================== */

    function updateProcessProgress() {
      const timeline = processSection.querySelector(".our-process-timeline");

      if (!timeline || !processProgress) return;

      const rect = timeline.getBoundingClientRect();

      const viewportHeight = window.innerHeight;

      const triggerPoint = viewportHeight * 0.55;

      const distance = triggerPoint - rect.top;

      const totalHeight = timeline.offsetHeight;

      const percentage = Math.max(
        0,
        Math.min(100, (distance / totalHeight) * 100),
      );

      processProgress.style.height = percentage + "%";
    }

    window.addEventListener("scroll", updateProcessProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProcessProgress);

    updateProcessProgress();
  }

  /* =====================================================
     DURING VISIT CAROUSEL
  ===================================================== */

  const duringVisitCarousel = document.querySelector(".during-visit-carousel");

  if (duringVisitCarousel) {
    const duringVisitViewport = duringVisitCarousel.querySelector(
      ".during-visit-viewport",
    );

    const duringVisitTrack = duringVisitCarousel.querySelector(
      ".during-visit-track",
    );

    const duringVisitCards = duringVisitTrack
      ? [...duringVisitTrack.querySelectorAll(".during-visit-card")]
      : [];

    const duringVisitPrev =
      duringVisitCarousel.querySelector(".during-visit-prev");

    const duringVisitNext =
      duringVisitCarousel.querySelector(".during-visit-next");

    const duringVisitDots = document.querySelector(".during-visit-dots");

    const duringVisitCurrent = document.querySelector(".during-visit-current");

    if (duringVisitViewport && duringVisitTrack && duringVisitCards.length) {
      /* =====================================================
         SETTINGS
      ===================================================== */

      let duringVisitIndex = 0;

      let duringVisitVisibleCards = 3;

      let duringVisitAutoPlay;

      const DURING_VISIT_AUTO_DELAY = 3500;

      /* =====================================================
         GET VISIBLE CARDS
      ===================================================== */

      function getDuringVisitVisibleCards() {
        if (window.innerWidth <= 767) {
          return 1;
        }

        if (window.innerWidth <= 991) {
          return 2;
        }

        return 3;
      }

      /* =====================================================
         MAX INDEX
      ===================================================== */

      function getDuringVisitMaxIndex() {
        return Math.max(0, duringVisitCards.length - duringVisitVisibleCards);
      }

      /* =====================================================
         CREATE DOTS
      ===================================================== */

      function createDuringVisitDots() {
        if (!duringVisitDots) {
          return;
        }

        duringVisitDots.innerHTML = "";

        const total = getDuringVisitMaxIndex() + 1;

        for (let i = 0; i < total; i++) {
          const dot = document.createElement("button");

          dot.type = "button";

          dot.className = "during-visit-dot";

          dot.setAttribute("aria-label", `Go to slide ${i + 1}`);

          dot.addEventListener("click", function () {
            duringVisitIndex = i;

            updateDuringVisitCarousel();

            restartDuringVisitAutoPlay();
          });

          duringVisitDots.appendChild(dot);
        }
      }

      /* =====================================================
         GET CARD WIDTH
      ===================================================== */

      function getDuringVisitCardWidth() {
        if (!duringVisitCards.length) {
          return 0;
        }

        const card = duringVisitCards[0];

        const cardWidth = card.offsetWidth;

        const styles = window.getComputedStyle(duringVisitTrack);

        const gap = parseFloat(styles.columnGap || styles.gap || 0);

        return cardWidth + gap;
      }

      /* =====================================================
         UPDATE CAROUSEL
      ===================================================== */

      function updateDuringVisitCarousel() {
        duringVisitVisibleCards = getDuringVisitVisibleCards();

        const maxIndex = getDuringVisitMaxIndex();

        if (duringVisitIndex > maxIndex) {
          duringVisitIndex = maxIndex;
        }

        const cardWidth = getDuringVisitCardWidth();

        const translateX = duringVisitIndex * cardWidth;

        duringVisitTrack.style.transform = `translateX(-${translateX}px)`;

        updateDuringVisitDots();

        updateDuringVisitCounter();
      }

      /* =====================================================
         UPDATE DOTS
      ===================================================== */

      function updateDuringVisitDots() {
        if (!duringVisitDots) {
          return;
        }

        const dots = duringVisitDots.querySelectorAll(".during-visit-dot");

        dots.forEach(function (dot, index) {
          dot.classList.toggle("active", index === duringVisitIndex);
        });
      }

      /* =====================================================
         UPDATE COUNTER
      ===================================================== */

      function updateDuringVisitCounter() {
        if (!duringVisitCurrent) {
          return;
        }

        const displayNumber = String(duringVisitIndex + 1).padStart(2, "0");

        duringVisitCurrent.textContent = displayNumber;
      }

      /* =====================================================
         NEXT
      ===================================================== */

      function duringVisitNextSlide() {
        const maxIndex = getDuringVisitMaxIndex();

        if (duringVisitIndex >= maxIndex) {
          duringVisitIndex = 0;
        } else {
          duringVisitIndex++;
        }

        updateDuringVisitCarousel();
      }

      /* =====================================================
         PREVIOUS
      ===================================================== */

      function duringVisitPreviousSlide() {
        const maxIndex = getDuringVisitMaxIndex();

        if (duringVisitIndex <= 0) {
          duringVisitIndex = maxIndex;
        } else {
          duringVisitIndex--;
        }

        updateDuringVisitCarousel();
      }

      /* =====================================================
         BUTTON EVENTS
      ===================================================== */

      if (duringVisitNext) {
        duringVisitNext.addEventListener("click", function () {
          duringVisitNextSlide();

          restartDuringVisitAutoPlay();
        });
      }

      if (duringVisitPrev) {
        duringVisitPrev.addEventListener("click", function () {
          duringVisitPreviousSlide();

          restartDuringVisitAutoPlay();
        });
      }

      /* =====================================================
         AUTO PLAY
      ===================================================== */

      function startDuringVisitAutoPlay() {
        stopDuringVisitAutoPlay();

        duringVisitAutoPlay = setInterval(function () {
          duringVisitNextSlide();
        }, DURING_VISIT_AUTO_DELAY);
      }

      function stopDuringVisitAutoPlay() {
        if (duringVisitAutoPlay) {
          clearInterval(duringVisitAutoPlay);

          duringVisitAutoPlay = null;
        }
      }

      function restartDuringVisitAutoPlay() {
        stopDuringVisitAutoPlay();

        startDuringVisitAutoPlay();
      }

      /* =====================================================
         PAUSE ON HOVER
      ===================================================== */

      duringVisitCarousel.addEventListener("mouseenter", function () {
        stopDuringVisitAutoPlay();
      });

      duringVisitCarousel.addEventListener("mouseleave", function () {
        startDuringVisitAutoPlay();
      });

      /* =====================================================
         TOUCH / SWIPE
      ===================================================== */

      let duringVisitTouchStartX = 0;

      let duringVisitTouchEndX = 0;

      duringVisitViewport.addEventListener(
        "touchstart",
        function (event) {
          duringVisitTouchStartX = event.changedTouches[0].screenX;

          stopDuringVisitAutoPlay();
        },
        {
          passive: true,
        },
      );

      duringVisitViewport.addEventListener(
        "touchend",
        function (event) {
          duringVisitTouchEndX = event.changedTouches[0].screenX;

          const difference = duringVisitTouchStartX - duringVisitTouchEndX;

          const swipeDistance = 45;

          if (Math.abs(difference) > swipeDistance) {
            if (difference > 0) {
              duringVisitNextSlide();
            } else {
              duringVisitPreviousSlide();
            }
          }

          startDuringVisitAutoPlay();
        },
        {
          passive: true,
        },
      );

      /* =====================================================
         RESPONSIVE RESIZE
      ===================================================== */

      let duringVisitResizeTimer;

      window.addEventListener("resize", function () {
        clearTimeout(duringVisitResizeTimer);

        duringVisitResizeTimer = setTimeout(function () {
          duringVisitVisibleCards = getDuringVisitVisibleCards();

          createDuringVisitDots();

          updateDuringVisitCarousel();
        }, 150);
      });

      /* =====================================================
         INITIALIZE
      ===================================================== */

      duringVisitVisibleCards = getDuringVisitVisibleCards();

      createDuringVisitDots();

      updateDuringVisitCarousel();

      startDuringVisitAutoPlay();
    }
  }

  /* =====================================================
     UNHEARD FAQ
  ===================================================== */

  const unheardFaqItems = document.querySelectorAll(".unheard-faq-item");

  if (unheardFaqItems.length) {
    unheardFaqItems.forEach(function (item) {
      const button = item.querySelector(".unheard-faq-question");

      if (!button) {
        return;
      }

      button.addEventListener("click", function () {
        const isActive = item.classList.contains("active");

        unheardFaqItems.forEach(function (otherItem) {
          otherItem.classList.remove("active");

          const otherButton = otherItem.querySelector(".unheard-faq-question");

          if (otherButton) {
            otherButton.setAttribute("aria-expanded", "false");
          }
        });

        if (!isActive) {
          item.classList.add("active");

          button.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* =====================================================
     ORGANISATIONS CONTEXT TABS
  ===================================================== */

  const contextTabs = document.querySelectorAll(".organisations-context-tab");

  const contextPanels = document.querySelectorAll(
    ".organisations-context-panel",
  );

  const contextCards = document.querySelectorAll(".organisations-context-card");

  const cardObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        const card = entry.target;

        if (card.classList.contains("revealed")) {
          observer.unobserve(card);
          return;
        }

        const parent = card.closest(".organisations-context-cards");

        let index = 0;

        if (parent) {
          const cards = Array.from(
            parent.querySelectorAll(".organisations-context-card"),
          );

          index = cards.indexOf(card);
        }

        const isMobile = window.innerWidth <= 767;

        const delay = isMobile ? index * 80 : (index % 2) * 120;

        setTimeout(function () {
          card.classList.add("revealed");
        }, delay);

        observer.unobserve(card);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -70px 0px",
    },
  );

  contextCards.forEach(function (card) {
    cardObserver.observe(card);
  });

  function revealVisibleCards(panel) {
    if (!panel) {
      return;
    }

    const cards = panel.querySelectorAll(".organisations-context-card");

    cards.forEach(function (card) {
      if (card.classList.contains("revealed")) {
        return;
      }

      const rect = card.getBoundingClientRect();

      const viewportHeight = window.innerHeight;

      const isVisible = rect.top < viewportHeight * 0.9 && rect.bottom > 0;

      if (!isVisible) {
        return;
      }

      const cardsArray = Array.from(cards);

      const index = cardsArray.indexOf(card);

      const isMobile = window.innerWidth <= 767;

      const delay = isMobile ? index * 80 : (index % 2) * 120;

      setTimeout(function () {
        card.classList.add("revealed");
      }, delay);

      cardObserver.unobserve(card);
    });
  }

  function activateContext(target, updateUrl) {
    if (target !== "corporate" && target !== "school") {
      return;
    }

    const targetTab = document.querySelector(
      '.organisations-context-tab[data-context-tab="' + target + '"]',
    );

    const targetPanel = document.querySelector(
      '.organisations-context-panel[data-context-panel="' + target + '"]',
    );

    if (!targetTab || !targetPanel) {
      return;
    }

    contextTabs.forEach(function (tab) {
      tab.classList.remove("active");
      tab.setAttribute("aria-selected", "false");
    });

    contextPanels.forEach(function (panel) {
      panel.classList.remove("active");
    });

    targetTab.classList.add("active");
    targetTab.setAttribute("aria-selected", "true");

    targetPanel.classList.add("active");

    if (updateUrl) {
      const url = new URL(window.location.href);

      url.searchParams.set("context", target);

      window.history.replaceState(
        {},
        "",
        url.pathname + "?" + url.searchParams.toString(),
      );
    }

    requestAnimationFrame(function () {
      revealVisibleCards(targetPanel);
    });
  }

  contextTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const target = tab.getAttribute("data-context-tab");

      if (!target) {
        return;
      }

      if (tab.classList.contains("active")) {
        return;
      }

      activateContext(target, true);
    });
  });

  const params = new URLSearchParams(window.location.search);

  const requestedContext = params.get("context");

  if (requestedContext === "corporate" || requestedContext === "school") {
    activateContext(requestedContext, false);

    setTimeout(function () {
      const contextSection = document.getElementById("organisationsContext");

      if (contextSection) {
        contextSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 150);
  } else {
    const initialPanel = document.querySelector(
      ".organisations-context-panel.active",
    );

    if (initialPanel) {
      requestAnimationFrame(function () {
        revealVisibleCards(initialPanel);
      });
    }
  }

  let organisationsContextResizeTimer;

  window.addEventListener("resize", function () {
    clearTimeout(organisationsContextResizeTimer);

    organisationsContextResizeTimer = setTimeout(function () {
      const activePanel = document.querySelector(
        ".organisations-context-panel.active",
      );

      if (activePanel) {
        revealVisibleCards(activePanel);
      }
    }, 150);
  });

  /* =====================================================
     ORGANISATIONS FAQ
  ===================================================== */

  const organisationsFaqItems = document.querySelectorAll(
    ".organisations-faq-item",
  );

  if (organisationsFaqItems.length) {
    organisationsFaqItems.forEach(function (item) {
      const button = item.querySelector(".organisations-faq-question");

      if (!button) {
        return;
      }

      button.addEventListener("click", function () {
        const isActive = item.classList.contains("active");

        organisationsFaqItems.forEach(function (otherItem) {
          otherItem.classList.remove("active");

          const otherButton = otherItem.querySelector(
            ".organisations-faq-question",
          );

          if (otherButton) {
            otherButton.setAttribute("aria-expanded", "false");
          }
        });

        if (!isActive) {
          item.classList.add("active");

          button.setAttribute("aria-expanded", "true");
        }
      });
    });
  }
});
