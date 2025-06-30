
//BOUTON BIOGRAPHIE
document.addEventListener("DOMContentLoaded", function () {
  const bouton = document.getElementById("btn-biographie");
  const bio = document.getElementById("biographie");

  bouton.addEventListener("click", function () {
    const isOpen = bio.classList.contains("active");

    // Ajoute une classe temporaire pour effet de fondu
    bouton.classList.add("fade-out");

    // Après la transition d'opacité, change le texte
    setTimeout(() => {
      bouton.textContent = isOpen ? "Voir la biographie" : "Masquer la biographie";
      bouton.classList.remove("fade-out");
    }, 200);

    if (isOpen) {
      // Fermer la bio
      bio.style.height = bio.scrollHeight + "px";
      requestAnimationFrame(() => {
        bio.style.height = "0px";
        bio.classList.remove("active");
      });
    } else {
      // Ouvrir la bio
      bio.classList.add("active");
      const height = bio.scrollHeight + "px";
      bio.style.height = "0px";
      requestAnimationFrame(() => {
        bio.style.height = height;
      });

      // Scroll vers la biographie (après animation d'ouverture)
      setTimeout(() => {
        bio.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }

    // Nettoyage après animation
    bio.addEventListener("transitionend", function handler() {
      if (bio.classList.contains("active")) {
        bio.style.height = "auto";
      }
      bio.removeEventListener("transitionend", handler);
    });
  });
});


//DEFILEMENT SMOOTH
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-element");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // ne l'observe qu'une fois
      }
    });
  }, {
    threshold: 0.1
  });

  elements.forEach(el => observer.observe(el));
});


//AFFICHAGE PDF
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href !== '#') {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});


//SIDEBAR
// Affichage des icônes Lucide
lucide.createIcons();
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('menu-toggle');

  // Toggle du menu mobile
  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Fermeture automatique au scroll (sur mobile uniquement)
  window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('open');
    }
  });
});

// Ouverture PDF
document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("open-pdf");
  const modal = document.getElementById("pdf-modal");
  const closeBtn = modal.querySelector(".close-modal");

  openBtn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", function () {
    modal.classList.add("hidden");
  });

  // Fermer en cliquant à l'extérieur de la fenêtre
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});

//--------------OUVERTURE FERMETURE CARROUSEL VISUELS---------------
// JS pour ouvrir et fermer l'image
function openImageModal(src) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  modalImg.src = src;
  modal.classList.remove('hidden');
}

// Fermer avec la croix OU clic hors de l'image
function closeImageModal() {
  document.getElementById('image-modal').classList.add('hidden');
}

// Activation sur clic image
document.querySelectorAll('.zoomable').forEach(img => {
  img.addEventListener('click', () => {
    openImageModal(img.src);
  });
});

// Fermer si on clique en dehors de l'image
document.getElementById('image-modal').addEventListener('click', function (e) {
  const modalImg = document.getElementById('modal-img');
  if (!modalImg.contains(e.target)) {
    closeImageModal();
  }
});

// Parallaxe personnalisé (optionnel)
document.addEventListener("scroll", () => {
  const section = document.querySelector(".parallax-photo");
  const wrapper = document.querySelector(".section.photo-profil");

  if (!section || !wrapper) return;

  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const sectionTop = wrapper.offsetTop;
  const sectionHeight = wrapper.offsetHeight;

  // Vérifie si la section est visible dans le viewport
  if (scrollY + windowHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
    const progress = (scrollY + windowHeight - sectionTop) / (sectionHeight + windowHeight);
    const offset = (progress - 0.3) * 100; // ← ajuste ici si nécessaire

    // Applique un décalage en Y progressif
    section.style.transform = `translateY(${Math.max(offset, 0)}px)`;
    
  }
});