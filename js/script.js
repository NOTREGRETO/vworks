// Random Hero Background (Index Page Only)
const heroSection = document.querySelector('.hero-index');
if (heroSection) {
    const heroImages = [
        'facility_hero_bg_1776328678468.png', 
        'img_about_company.png',
        'img_maintenance.png',
        'img_who_we_are.png'
    ];
    
    const randomImage = heroImages[Math.floor(Math.random() * heroImages.length)];
    heroSection.style.backgroundImage = `linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.4)), url('${randomImage}')`;
}

// Sticky Header Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 4. HERO SLIDER LOGIC
const initHeroSlider = () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 5000;

    if (!slides.length) return;

    const showSlide = (n) => {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    };

    const nextSlide = () => showSlide(currentSlide + 1);

    // Auto-advance
    let autoPlay = setInterval(nextSlide, slideInterval);

    // Dot interaction
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoPlay);
            showSlide(index);
            autoPlay = setInterval(nextSlide, slideInterval);
        });
    });
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initReveal();
    initSmoothScroll();
});

// Re-initialize reveal logic for dynamic content
const initReveal = () => {
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-up, .reveal-left, .reveal-right');
    revealElements.forEach(el => revealObserver.observe(el));
};

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('open');
    });
}

// Premium Scroll Reveal
const revealElements = document.querySelectorAll('.reveal-fade, .reveal-left, .reveal-right');

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;

        if (elTop < triggerBottom) {
            el.classList.add('active-reveal');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll); // Trigger on initial load

// Smooth Scroll for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for sticky header
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Validation Logic
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (input.required && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        if (isValid) {
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Thank you! Your message has been sent successfully.');
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        }
    });
}

// Active Nav State based on Page
const currentPath = window.location.pathname;
const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.endsWith(href) || (currentPath.endsWith('/') && href === 'index.html')) {
        link.classList.add('active');
    }
});

// Modal Data & Interaction
const modalData = {
    mission: {
        title: "Extended Mission",
        text: "Our fundamental mission is to integrate sustainability into the core of facility operations. We aim to reduce the carbon footprint of the buildings we manage by 30% by 2030.",
        bullets: ["Sustainable Supply Chain", "Waste Reduction Audits", "Energy Efficiency Programs", "Zero-Chemical Cleaning Options"]
    },
    vision: {
        title: "Global Vision 2026",
        text: "We envision a future where facility management is invisible yet invincible. Our goal is to expand our operations to 50+ countries while maintaining the highest service standard in the industry.",
        bullets: ["Global Expansion Strategy", "Digital twin technology", "Automated Security Assets", "Regional Training Hubs"]
    },
    team: {
        title: "Experienced Team",
        text: "Our leadership consists of industry veterans with over 50 years of collective experience specifically in global facility operations and asset protection.",
        bullets: ["Certified Property Managers (CPM)", "Ex-Military Security Logistics Leads", "Hospitality Training Specialists", "Chartered Technical Engineers"]
    },
    solutions: {
        title: "Customized Solutions",
        text: "We don't believe in one-size-fits-all. Every facility receives a tailored operational roadmap and custom performance metrics.",
        bullets: ["Site-Specific SOP Manuals", "Flexible Dynamic Service Levels", "Dedicated Strategic Account Managers", "Real-time Client Feedback Loop"]
    },
    equipment: {
        title: "Modern Equipment",
        text: "We invest in the latest AI and IoT-driven equipment to ensure peak operational reliability and reduced utility waste.",
        bullets: ["AI-Powered Autonomous Cleaning", "IoT Building Sensor Networks", "High-Resolution Thermal Imaging", "Cloud-Based Energy Dashboards"]
    },
    support: {
        title: "24/7 Support",
        text: "Our global command center operates 24/7/365, providing instant technical support and emergency rapid response.",
        bullets: ["24-Hour Central Help Desk", "Emergency Rapid Response Units", "Remote Facility Monitoring", "Live Incident Escalation Portal"]
    },
    safety: {
        title: "Safety & Hygiene",
        text: "Safety is our DNA. We maintain the stricter international certifications for hygiene and workforce protection.",
        bullets: ["ISO 45001 & 14001 Compliance", "Standardized PPE Protocols", "Ozone Disinfection Technology", "Regular Biometric Safety Audits"]
    },
    cost: {
        title: "Cost-Effective Operations",
        text: "We leverage our scale and technology to reduce your bottom line while simultaneously improving service quality.",
        bullets: ["Transparent Open-Book Billing", "Strategic Resource Optimization", "Predictive maintenance Savings", "Bulk Component Procurement"]
    }
};

const modal = document.getElementById('detailsModal');
const modalBody = document.getElementById('modalBody');
const interactiveCards = document.querySelectorAll('.interactive-card');
const closeModal = document.querySelector('.close-modal');

if (modal) {
    interactiveCards.forEach(card => {
        card.addEventListener('click', () => {
            const topic = card.getAttribute('data-topic');
            const data = modalData[topic];
            
            modalBody.innerHTML = `
                <div class="modal-body">
                    <h2>${data.title}</h2>
                    <p>${data.text}</p>
                    <ul>
                        ${data.bullets.map(b => `<li><i class="fas fa-check-circle"></i> ${b}</li>`).join('')}
                    </ul>
                </div>
            `;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop background scroll
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}
