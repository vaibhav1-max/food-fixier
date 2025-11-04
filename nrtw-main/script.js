document.addEventListener("DOMContentLoaded", () => {
  // --- SCROLL REVEAL LOGIC ---
  const revealElements = document.querySelectorAll(".scroll-reveal");
  const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  revealElements.forEach((element) => {
    observer.observe(element);
  });

  // --- MODAL CONTROL LOGIC ---
  const modalTriggers = document.querySelectorAll(".modal-trigger");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".modal-close");
  const stockTriggers = document.querySelectorAll(".stock-trigger");

  const closeModal = (modal) => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  };

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      document.body.style.overflow = "hidden";
    }
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu && mobileMenu.classList.contains("block")) {
      mobileMenu.classList.remove("block");
      mobileMenu.classList.add("hidden");
    }
  };

  // Global Modal Triggers (Header Links and CTA Button)
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = trigger.dataset.modal;
      openModal(modalId);
    });
  });

  // Partner Stock Triggers (Clickable Cards)
  stockTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();

      const storeName = trigger.dataset.store;
      document.getElementById(
        "stock-title"
      ).textContent = `Stock from: ${storeName}`;

      // Dynamic stock content generation based on partner name (simulation)
      const stockContent = document.getElementById("stock-content");
      if (storeName.includes("Bistro") || storeName.includes("Cafe")) {
        stockContent.innerHTML = `
                            <div class="p-3 bg-gray-100 rounded-lg border-l-4 border-red-500">
                                <p class="font-semibold text-lg">🍝 **Prepared Meals:** 20 portions of Lasagna (Ready at 9:30 PM)</p>
                            </div>
                            <div class="p-3 bg-gray-100 rounded-lg border-l-4 border-yellow-500">
                                <p class="font-semibold text-lg">🥗 **Salad:** 1 Large Catering Salad (Best by Midnight)</p>
                            </div>
                            <p class="text-center text-sm mt-6 text-gray-500">Simulated stock for a neighborhood restaurant.</p>
                        `;
      } else if (
        storeName.includes("Event") ||
        storeName.includes("Catering")
      ) {
        stockContent.innerHTML = `
                            <div class="p-3 bg-gray-100 rounded-lg border-l-4 border-green-500">
                                <p class="font-semibold text-lg">🥩 **Entrees:** 50 servings of Roasted Chicken (Ready for pickup at 11:00 PM)</p>
                            </div>
                            <div class="p-3 bg-gray-100 rounded-lg border-l-4 border-blue-500">
                                <p class="font-semibold text-lg">🍰 **Dessert:** 10 Trays of Individual Pastries (Untouched)</p>
                            </div>
                            <p class="text-center text-sm mt-6 text-gray-500">Simulated stock for a major event/institutional venue.</p>
                        `;
      } else {
        stockContent.innerHTML = `
                            <div class="p-3 bg-gray-100 rounded-lg border-l-4 border-gray-500">
                                <p class="font-semibold text-lg">📦 **Mixed:** 3 boxes of Mixed Surplus Food (Check details on site)</p>
                            </div>
                            <p class="text-center text-sm mt-6 text-gray-500">Simulated stock details.</p>
                        `;
      }

      openModal("stock-modal");
    });
  });

  // Close Buttons and Backdrop Click
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      if (modal) closeModal(modal);
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Form Submissions (Contact and Register) - Existing logic
  const contactForm = document.getElementById("contact-form-modal");
  const contactMessage = document.getElementById("contact-submission-message");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      contactMessage.textContent = "Submitting inquiry...";
      contactMessage.className =
        "mt-4 p-3 rounded-lg text-center font-medium bg-yellow-100 text-yellow-800";
      contactMessage.style.display = "block";
      setTimeout(() => {
        contactMessage.textContent =
          "✅ Contact received! We will respond within 24 hours.";
        contactMessage.className =
          "mt-4 p-3 rounded-lg text-center font-medium bg-green-100 text-green-800";
        this.reset();
        setTimeout(() => {
          closeModal(document.getElementById("contact-modal"));
          contactMessage.style.display = "none";
        }, 3000);
      }, 2000);
    });
  }

  const registerForm = document.getElementById("registration-form");
  const registerMessage = document.getElementById(
    "registration-submission-message"
  );
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      registerMessage.textContent = "Processing registration...";
      registerMessage.className =
        "mt-4 p-3 rounded-lg text-center font-medium bg-yellow-100 text-yellow-800";
      registerMessage.style.display = "block";
      setTimeout(() => {
        registerMessage.textContent =
          "🥳 Success! Your organization is pre-registered. Check your email for verification steps.";
        registerMessage.className =
          "mt-4 p-3 rounded-lg text-center font-medium bg-green-100 text-green-800";
        this.reset();
        setTimeout(() => {
          closeModal(document.getElementById("register-modal"));
          registerMessage.style.display = "none";
        }, 5000);
      }, 2000);
    });
  }

  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("block");
    });
  }
});
