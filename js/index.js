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

  document.querySelectorAll(".nav-item.dropdown").forEach(function (dropdown) {
    dropdown.addEventListener("mouseover", function () {
      const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');

      if (toggle && typeof bootstrap !== "undefined") {
        const instance = bootstrap.Dropdown.getOrCreateInstance(toggle);

        instance.show();
      }
    });

    dropdown.addEventListener("mouseleave", function () {
      const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');

      if (toggle && typeof bootstrap !== "undefined") {
        const instance = bootstrap.Dropdown.getOrCreateInstance(toggle);

        instance.hide();
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

    const menuLinks = menu.querySelectorAll(".site-mobile-nav-list a");

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

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const howItsWorkSection = document.querySelector(".how-its-work");

    const howItsWorkPin = document.querySelector(".how-its-work-pin");

    const howItsWorkSteps = gsap.utils.toArray(".how-its-work-step");

    const howItsWorkLine = document.querySelector(".how-its-work-line span");

    if (
      howItsWorkSection &&
      howItsWorkPin &&
      howItsWorkSteps.length &&
      howItsWorkLine
    ) {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", function () {
        gsap.set(howItsWorkSteps, {
          clearProps: "all",
        });

        gsap.set(
          howItsWorkSteps.map(function (step) {
            return step.querySelector(".how-its-work-step-number");
          }),
          {
            scale: 0.7,
            opacity: 0.3,
          },
        );

        gsap.set(
          howItsWorkSteps.map(function (step) {
            return step.querySelector(".how-its-work-step-content");
          }),
          {
            opacity: 0,
            y: 50,
          },
        );

        gsap.set(howItsWorkLine, {
          width: "0%",
        });

        const timeline = gsap.timeline({
          defaults: {
            ease: "power2.out",
          },

          scrollTrigger: {
            trigger: howItsWorkSection,

            start: "top top",

            end: function () {
              return `+=${Math.max(
                0,
                howItsWorkSection.offsetHeight - window.innerHeight,
              )}`;
            },

            pin: howItsWorkPin,

            pinSpacing: false,

            scrub: 1,

            anticipatePin: 1,

            invalidateOnRefresh: true,

            fastScrollEnd: true,

            refreshPriority: 1,
          },
        });

        timeline.to(
          howItsWorkSteps[0].querySelector(".how-its-work-step-number"),
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
          },
        );

        timeline.to(
          howItsWorkSteps[0].querySelector(".how-its-work-step-content"),
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
        );

        timeline.to(howItsWorkLine, {
          width: "50%",
          duration: 1,
          ease: "none",
        });

        timeline.to(
          howItsWorkSteps[1].querySelector(".how-its-work-step-number"),
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
          },
        );

        timeline.to(
          howItsWorkSteps[1].querySelector(".how-its-work-step-content"),
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
        );

        timeline.to(howItsWorkLine, {
          width: "100%",
          duration: 1,
          ease: "none",
        });

        timeline.to(
          howItsWorkSteps[2].querySelector(".how-its-work-step-number"),
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
          },
        );

        timeline.to(
          howItsWorkSteps[2].querySelector(".how-its-work-step-content"),
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
        );

        function refreshScrollTrigger() {
          requestAnimationFrame(function () {
            ScrollTrigger.refresh();
          });
        }

        window.addEventListener("resize", refreshScrollTrigger);

        return function () {
          window.removeEventListener("resize", refreshScrollTrigger);

          timeline.kill();
        };
      });

      setTimeout(function () {
        ScrollTrigger.refresh();
      }, 300);
    }
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
});
