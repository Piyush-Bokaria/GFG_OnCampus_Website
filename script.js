// const burger = document.querySelector(".burger");
const navMenu = document.querySelector(".nav-menu");

// burger.addEventListener("click", () => {
//   burger.classList.toggle("active");
//   navMenu.classList.toggle("active");
// });

// // Close mobile menu when clicking on a link
// document.querySelectorAll(".nav-menu a").forEach((n) =>
//   n.addEventListener("click", () => {
//     burger.classList.remove("active");
//     navMenu.classList.remove("active");
//   })
// );

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
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

// Contact form submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector("textarea").value;

    // Simple validation
    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }

    // Simulate form submission
    alert("Thank you for your message! We will get back to you soon.");
    this.reset();
  });
}

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.background = "#fff";
    navbar.style.backdropFilter = "none";
  }
});

// Enhanced scroll animations that repeat every time
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const repeatableSlideInObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add animation class when entering viewport
      entry.target.classList.add("animate-in");
      entry.target.classList.remove("animate-out");
    } else {
      // Remove animation class when leaving viewport
      entry.target.classList.remove("animate-in");
      entry.target.classList.add("animate-out");
    }
  });
}, observerOptions);

// Initialize animations when page loads
document.addEventListener("DOMContentLoaded", () => {
  // Add animation classes to elements
  const animateElements = document.querySelectorAll(`
        .hero-image,
        .about h2,
        .about-text,
        .about-image,
        .stat,
        .events h2,
        .event-card,
        .team h2,
        .team-member,
        .resources h2,
        .resource-card,
        .faq h2,
        .faq-item,
        .contact h2,
        .contact-info,
        .contact-form,
        .footer-section
    `);

  animateElements.forEach((el, index) => {
    // Add different animation classes based on position
    if (
      el.classList.contains("hero-image") ||
      el.classList.contains("about-image") ||
      el.classList.contains("contact-form")
    ) {
      el.classList.add("slide-in-right");
    } else if (
      el.classList.contains("event-card") ||
      el.classList.contains("team-member") ||
      el.classList.contains("resource-card")
    ) {
      el.classList.add("slide-in-up");
    } else if (el.tagName === "H2") {
      el.classList.add("fade-in-down");
    } else {
      el.classList.add("slide-in-left");
    }

    // Set stagger delay for elements in the same section
    const section = el.closest("section");

    if (el.classList.contains("event-card")) {
      // Special handling for event cards
      const eventsSection = el.closest(".events");
      const allEventCards = eventsSection.querySelectorAll(".event-card");
      const upcomingCards = eventsSection
        .querySelector(".events-grid")
        .querySelectorAll(".event-card");
      const pastCards = eventsSection
        .querySelector(".events-grid:last-of-type")
        .querySelectorAll(".event-card");

      const cardIndex = Array.from(allEventCards).indexOf(el);
      const upcomingCount = upcomingCards.length;

      if (cardIndex < upcomingCount) {
        // Upcoming events - normal stagger
        el.style.transitionDelay = `${cardIndex * 0.1}s`;
      } else {
        // Past events - reset stagger timing
        const pastIndex = cardIndex - upcomingCount;
        el.style.transitionDelay = `${pastIndex * 0.1}s`;
      }
    } else {
      // Regular stagger for other elements
      const elementsInSection = section
        ? section.querySelectorAll(
            ".slide-in-left, .slide-in-right, .slide-in-up, .fade-in-down"
          )
        : [el];
      const indexInSection = Array.from(elementsInSection).indexOf(el);
      el.style.transitionDelay = `${indexInSection * 0.1}s`;
    }

    // Start elements in hidden state
    el.classList.add("animate-out");

    repeatableSlideInObserver.observe(el);
  });

  // Special handling for hero section (animate once on load)
  const heroElements = document.querySelectorAll(".hero-content > *");
  heroElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
    el.classList.add("hero-animate");
  });
});
// Counter animation for stats
const animateCounters = () => {
  const counters = document.querySelectorAll(".stat h3");

  counters.forEach((counter) => {
    const target = parseInt(counter.textContent.replace("+", ""));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current) + "+";
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target + "+";
      }
    };

    // Start animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter();
          statsObserver.unobserve(entry.target);
        }
      });
    });

    statsObserver.observe(counter.closest(".stat"));
  });
};

// Initialize counter animation
animateCounters();
// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
});