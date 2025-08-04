
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Functionality
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const closeMenuButton = document.getElementById("close-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.add("active");
    });
  }

  if (closeMenuButton && mobileMenu) {
    closeMenuButton.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (mobileMenu && mobileMenu.classList.contains("active")) {
      if (
        !mobileMenu.contains(event.target) &&
        !mobileMenuButton.contains(event.target)
      ) {
        mobileMenu.classList.remove("active");
      }
    }
  });

  // Newsletter Form Submission
  const newsletterForm = document.querySelector("form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      if (email) {
        alert("Thank you for subscribing to our newsletter!");
        this.reset();
      }
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for your message! We will get back to you soon.");
      this.reset();
    });
  }

  // Reservation Form Submission
  const reservationForm = document.getElementById("reservation-form");
  if (reservationForm) {
    reservationForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert(
        "Thank you for your reservation request! We will confirm your booking shortly."
      );
      this.reset();
    });
  }

  // Gallery Image Modal (Simple implementation)
  const galleryImages = document.querySelectorAll(".gallery-image");
  galleryImages.forEach((image) => {
    image.addEventListener("click", function () {
      // Simple modal implementation - you can enhance this
      const modal = document.createElement("div");
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        cursor: pointer;
      `;

      const img = document.createElement("img");
      img.src = this.src;
      img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
      `;

      modal.appendChild(img);
      document.body.appendChild(modal);

      modal.addEventListener("click", () => {
        document.body.removeChild(modal);
      });
    });
  });

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Booking form date validation
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");

  if (checkinInput && checkoutInput) {
    // Set minimum date to today
    const today = new Date().toISOString().split("T")[0];
    checkinInput.min = today;
    checkoutInput.min = today;

    checkinInput.addEventListener("change", function () {
      const checkinDate = new Date(this.value);
      const nextDay = new Date(checkinDate);
      nextDay.setDate(nextDay.getDate() + 1);
      checkoutInput.min = nextDay.toISOString().split("T")[0];

      if (checkoutInput.value && new Date(checkoutInput.value) <= checkinDate) {
        checkoutInput.value = nextDay.toISOString().split("T")[0];
      }
    });
  }

  // Room selection and price calculation
  const roomSelect = document.getElementById("room-type");
  const guestsSelect = document.getElementById("guests");
  const priceDisplay = document.getElementById("total-price");

  if (roomSelect && priceDisplay) {
    const roomPrices = {
      deluxe: 5500,
      premium: 8500,
      royal: 12000,
    };

    function calculatePrice() {
      const roomType = roomSelect.value;
      const guests = Number.parseInt(guestsSelect?.value || 1);
      const basePrice = roomPrices[roomType] || 0;
      const extraGuestFee = guests > 2 ? (guests - 2) * 1000 : 0;
      const totalPrice = basePrice + extraGuestFee;

      if (priceDisplay) {
        priceDisplay.textContent = `₹${totalPrice.toLocaleString()}/night`;
      }
    }

    roomSelect.addEventListener("change", calculatePrice);
    if (guestsSelect) {
      guestsSelect.addEventListener("change", calculatePrice);
    }

    // Initial calculation
    calculatePrice();
  }

  // Add loading states for forms
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function () {
      const submitButton = this.querySelector('button[type="submit"]');
      if (submitButton) {
        const originalText = submitButton.textContent;
        submitButton.textContent = "Processing...";
        submitButton.disabled = true;

        setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }, 2000);
      }
    });
  });

  // GSAP Scroll Animations for sections
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".gsap-animate").forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
          stagger: 0.2,
        },
      });
    });
  }
  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".feature-card, .room-card, .testimonial-card"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// swiper js code carosel

var swiper = new Swiper(".mySwiper", {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  loop: true,
  speed: 1200, // ⬅️ Smooth fade duration
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// terminology swiper js code
document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".testimonialsSwiper", {
    loop: true,
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 30,
    speed: 900,
    effect: "slide",
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".testimonialsSwiper .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
});

// <!-- Glightbox JS -->

const lightbox = GLightbox({
  selector: ".glightbox",
  touchNavigation: true,
  loop: true,
  zoomable: true,
});

// nav gsap animation
function heroNavAnimation() {
  var tl = gsap.timeline();

  // Animate Header
  // var header = document.querySelector("#header");
  // tl.from(header, {
  //   y: -100,
  //   opacity: 0,
  //   duration: 1.1,
  //   delay: 0.5,
  //   ease: "power2.out",
  // });

  // Get only active slide content
  var activeSlide = document.querySelector(".swiper-slide-active");

  if (activeSlide) {
    var heroTitle = activeSlide.querySelector(".hero-title");
    var heroDesc = activeSlide.querySelector(".hero-desc");
    var heroButtons = activeSlide.querySelectorAll(".hero-buttons");

    tl.from(heroTitle, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    tl.from(heroDesc, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.6");

    tl.from(heroButtons, {
      scale: 0.95,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      stagger: 0.6,
      ease: "back.out(1.7)",
    }, "-=0.5");
  }


  
}
// nav and carousel animation call
heroNavAnimation();





  // preloader
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500); // Wait for fade-out transition
    }, 2000); // Keep loader visible for at least 2s (adjustable)
  });


  function eventCardAnimation() {
  gsap.registerPlugin(ScrollTrigger);

// Select all event card wrappers
document.querySelectorAll(".event-card-wrapper").forEach((card, index) => {
  const direction = index % 2 === 0 ? -100 : 100; // Alternate left/right
  const inner = card.querySelector(".card-animation");

  gsap.fromTo(
    inner,
    {
      opacity: 0,
      x: direction,
    },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 80%", // when card enters
        end: "top 20%", // when card is at top
        // scrub: true,
        // toggleActions: "play reverse play reverse",
        // markers: true // Uncomment for debugging
      },
    }
  );
});

}
eventCardAnimation();

// Show/hide button on scrolltop button

const header = document.querySelector("#header");
let headerAnimated = false;

window.addEventListener("scroll", () => {
  const btn = document.getElementById("scrollToTopBtn");
  if (!btn) return;

  if (window.scrollY > 300) {
    btn.style.display = "block";
    gsap.to(btn, { opacity: 1, duration: 0.5, ease: "power2.out" });
    if (!headerAnimated) {
      gsap.fromTo(header,
        { y: 60 },
        {
          y: 0,
          duration: 0.5,
          ease: "power1.out"
        }
      );
      headerAnimated = true;
    }
  } else {
    gsap.to(btn, { opacity: 0, duration: 0.5, ease: "power2.out" });
    setTimeout(() => {
      btn.style.display = "none";
    }, 500);
    headerAnimated = false;
  }
});

// Scroll to top on click (robust)
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("scrollToTopBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      gsap.to(window, {
        scrollTo: { y: 0 },
        duration: 1,
        ease: "expo.in",
      });
    });
  }
});

function bounceArrowLoop() {
  const tl = gsap.timeline({
    repeat: -1,       // Infinite loop
    repeatDelay: 3    // Har cycle ke baad 3 second ka gap
  });

  tl.to(".bounce-arrow", {
    y: -10,
    yoyo: true,
    repeat: 3,        // Ek cycle me 3 bounce
    duration: 0.3,
    ease: "power1.inOut"
  });
}

bounceArrowLoop();


// room gallery js
function changeImg(el) {
  document.getElementById("mainRoomImg").src = el.src;
  document.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));
  el.classList.add("active");
}
