// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const themeDropdown = document.getElementById("themeDropdown");
const themeOptions = document.querySelectorAll(".theme-option");
const body = document.body;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", currentTheme);

// Toggle dropdown
themeToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  themeDropdown.classList.toggle("active");
});

// Close dropdown when clicking outside
document.addEventListener("click", () => {
  themeDropdown.classList.remove("active");
});

// Theme selection
themeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const selectedTheme = option.getAttribute("data-theme");

    if (selectedTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      body.setAttribute("data-theme", systemTheme);
      localStorage.setItem("theme", "system");
    } else {
      body.setAttribute("data-theme", selectedTheme);
      localStorage.setItem("theme", selectedTheme);
    }

    themeDropdown.classList.remove("active");
  });
});

// Listen for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (localStorage.getItem("theme") === "system") {
      body.setAttribute("data-theme", e.matches ? "dark" : "light");
    }
  });

// Skills Tabs Functionality
const skillsTabs = document.querySelectorAll(".skills-tab");
const skillsPanels = document.querySelectorAll(".skills-panel");

skillsTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetPanel = tab.getAttribute("data-tab");

    // Remove active class from all tabs and panels
    skillsTabs.forEach((t) => t.classList.remove("active"));
    skillsPanels.forEach((p) => p.classList.remove("active"));

    // Add active class to clicked tab and corresponding panel
    tab.classList.add("active");
    document.getElementById(targetPanel).classList.add("active");
  });
});

// Project Modal Functionality
const projectDetailsButtons = document.querySelectorAll(".project-details-btn");
const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalPeriod = document.getElementById("modalPeriod");
const modalDescription = document.getElementById("modalDescription");
const modalImage = document.getElementById("modalImage");
const modalTechnologies = document.getElementById("modalTechnologies");
const modalLinks = document.getElementById("modalLinks");

// Project data for Balachandar S
const projectData = {
  "thrive-tech": {
    title: "Thrive-Tech Website",
    period: "2024",
    description:
      "Developed a comprehensive company website using Python Django framework with HTML, CSS, and JavaScript. Successfully hosted on Hostinger with optimized performance and responsive design. The website features modern UI/UX design principles and is fully responsive across all devices.",
    technologies: ["Python Django", "HTML5", "CSS3", "JavaScript", "Hostinger"],
    image: "thrivmockup.jpg",
    liveUrl: "https://thrivetech.info/",
  },
  "cluster-tech": {
    title: "ClusterTech Website",
    period: "2024",
    description:
      "Created a modern company website for ClusterTech using Python Django framework. Implemented responsive design principles and deployed on Hostinger for optimal performance. Features include dynamic content management, contact forms, and service showcases.",
    technologies: ["Python Django", "HTML5", "CSS3", "JavaScript", "Hostinger"],
    image: "CTprojectIMG.jpg",
    liveUrl: "https://clustertech.info/",
  },
  "assessment-platform": {
    title: "Assessment Platform",
    period: "2024",
    description:
      "Built a full-stack web application for online assessments using Django framework and MongoDB. Features include user authentication, test creation, automated grading system, real-time results, and comprehensive analytics dashboard for educators.",
    technologies: ["Django", "MongoDB", "Python", "HTML/CSS", "JavaScript"],
    image: "assesment.png",
    githubUrl: "https://github.com/Nithishkumar2004/Hexaware-hackathon.git",
  },
  "udemy-clone": {
    title: "Udemy Clone",
    period: "2021",
    description:
      "Developed a comprehensive e-learning platform with OpenAI integration for auto-responses. Features include course management, user enrollment, interactive learning modules, video streaming, progress tracking, and AI-powered student support system.",
    technologies: [
      "Django",
      "MySQL",
      "OpenAI API",
      "HTML5",
      "CSS3",
      "JavaScript",
    ],
    image: "udemy.png",
    githubUrl: "https://github.com/dk172923/online-learning-platform.git",
  },
};

projectDetailsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const projectId = button.getAttribute("data-project");
    const project = projectData[projectId];

    if (project) {
      modalTitle.textContent = project.title;
      modalPeriod.textContent = project.period;
      modalDescription.textContent = project.description;
      modalImage.src = project.image;
      modalImage.alt = project.title;

      // Clear and populate technologies
      modalTechnologies.innerHTML = "";
      project.technologies.forEach((tech) => {
        const badge = document.createElement("span");
        badge.className = "tech-badge";
        badge.textContent = tech;
        modalTechnologies.appendChild(badge);
      });

      // Clear and populate links
      modalLinks.innerHTML = "";
      if (project.githubUrl) {
        const githubLink = document.createElement("a");
        githubLink.href = project.githubUrl;
        githubLink.target = "_blank";
        githubLink.rel = "noopener noreferrer";
        githubLink.className = "btn btn-outline btn-sm";
        githubLink.innerHTML = '<i data-lucide="github"></i> GitHub';
        modalLinks.appendChild(githubLink);
      }
      if (project.liveUrl) {
        const liveLink = document.createElement("a");
        liveLink.href = project.liveUrl;
        liveLink.target = "_blank";
        liveLink.rel = "noopener noreferrer";
        liveLink.className = "btn btn-outline btn-sm";
        liveLink.innerHTML = '<i data-lucide="globe"></i> Live Demo';
        modalLinks.appendChild(liveLink);
      }

      // Re-initialize Lucide icons for new elements
      lucide.createIcons();

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});

// Close modal functionality
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Escape key to close modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

// Contact Form Functionality
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Simple validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Simulate form submission
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  // Simulate API call
  setTimeout(() => {
    alert("Thank you for your message! I'll get back to you soon.");
    contactForm.reset();
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 2000);
});

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

// Set current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Initialize Lucide icons
lucide.createIcons();

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(
    ".experience-card, .project-card, .education-card, .about-card, .achievement-card"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.backgroundColor = "hsl(var(--background) / 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.backgroundColor = "hsl(var(--background) / 0.95)";
    header.style.backdropFilter = "blur(10px)";
  }
});

// Preload images for better performance
const imageUrls = [
  
  "balachandar-photo.jpg"
];

imageUrls.forEach((url) => {
  const img = new Image();
  img.src = url;
});

console.log("Balachandar S Portfolio website loaded successfully!");
