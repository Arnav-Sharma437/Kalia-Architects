/* -------------------------------------------------------------
 * KALIA ARCHITECTS - JAVASCRIPT
 * Custom interactions, custom cursor, GSAP scroll triggers & modal
 * ------------------------------------------------------------- */

// Project Database
const projectData = [
    {
        num: "01",
        title: "Residence at Dharamshala",
        category: "Residential &middot; Dharamshala",
        year: "2024",
        location: "Civil Lines, Dharamshala",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
        description: "Nestled in the pine forests of Dharamshala, this private residence uses local slate stone and cedar timber to create a warm, context-aware living space. The design centers on visual connectivity to the Dhauladhar range, balancing double-height glass walls with massive stone piers."
    },
    {
        num: "02",
        title: "Residence at Kangra",
        category: "Residential &middot; Kangra",
        year: "2023",
        location: "Kangra Valley",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200",
        description: "A contemporary mountain home built on a sloping agricultural terraced plot. The design incorporates deep roof overhangs to shield against intense monsoon rains, exposed concrete finishes, and a spacious open deck that frames panoramic valley sunsets."
    },
    {
        num: "03",
        title: "Hospital at Dharamshala",
        category: "Commercial / Clinical &middot; Dharamshala",
        year: "2022",
        location: "Dharamshala District",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200",
        description: "A modern healthcare facility that rejects sterile clinical design in favor of healing architecture. By utilizing natural daylight, courtyard gardens, and local Himalayan materials, the space offers a calming, hopeful environment for patients."
    },
    {
        num: "04",
        title: "Hotel Sidharth Inn",
        category: "Hospitality &middot; Dharamshala",
        year: "2025",
        location: "Civil Lines, Dharamshala",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
        description: "Completed in 2025, this premium boutique hotel serves as a modern sanctuary. The design bridges local heritage and luxury, featuring custom woodwork, valley view suites, and an open terrace celebrating mountain twilight."
    },
    {
        num: "05",
        title: "Hotel Highland",
        category: "Hospitality &middot; Dharamshala",
        year: "2021",
        location: "Dharamshala",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200",
        description: "A mountain retreat resort that frames the rugged terrain. Timber beams and structural slate details connect guests directly with the Himalayan backdrop, emphasizing warmth, fireplace gatherings, and outdoor panoramic decks."
    },
    {
        num: "06",
        title: "Office Building at Nurpur",
        category: "Commercial &middot; Nurpur, Kangra",
        year: "2024",
        location: "Nurpur, HP",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
        description: "A sleek workplace emphasizing open-plan layouts and sustainable climate control. Passive heating design channels the winter sun, while vertical structural louvers shade the interiors during warm summer months."
    },
    {
        num: "07",
        title: "Residential Interior",
        category: "Interiors &middot; Dharamshala",
        year: "2023",
        location: "Dharamshala",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200",
        description: "A minimalist interior transformation prioritizing light and tactile simplicity. Handcrafted wooden ceilings, limestone floors, and custom low-profile furniture frame the natural landscape outside as the primary artwork."
    }
];

document.addEventListener("DOMContentLoaded", () => {
    // 1. Set Copyright Year
    const yearEl = document.getElementById("copyright-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // REGISTER GSAP
    gsap.registerPlugin(ScrollTrigger);

    // 2. PRELOADER & HERO INTRO ANIMATION
    const preloader = document.getElementById("preloader");
    const preloaderBar = document.querySelector(".preloader-bar");
    
    // Simulate loading
    const tl = gsap.timeline({
        onComplete: () => {
            if (preloader) {
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    onComplete: () => {
                        preloader.style.display = "none";
                        // Trigger Hero Entrance Animation
                        playHeroEntrance();
                    }
                });
            }
        }
    });

    tl.to(preloaderBar, { width: "100%", duration: 1.2, ease: "power2.inOut" });

    function playHeroEntrance() {
        const heroTl = gsap.timeline();

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            gsap.set(".hero-title .title-line, .hero-subtitle, .hero-cta, .site-header", { opacity: 1, y: 0 });
            return;
        }

        // Parallax image initial scale settle
        heroTl.fromTo(".hero-bg-parallax", 
            { scale: 1.15, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.8, ease: "power3.out" }
        );

        // Header fade in
        heroTl.fromTo(".site-header", 
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
            "-=1.2"
        );

        // Title reveals line by line
        heroTl.fromTo(".hero-title .title-line", 
            { y: "100%", opacity: 0 },
            { y: "0%", opacity: 1, stagger: 0.2, duration: 1.2, ease: "power4.out" },
            "-=1.4"
        );

        // Subtitle and CTA fade up
        heroTl.fromTo([".hero-subtitle", ".hero-cta"], 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out" },
            "-=1.0"
        );
    }

    // 3. STICKY HEADER TRANSITION ON SCROLL
    const header = document.getElementById("site-header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // 4. MOBILE MENU TRANSITIONS
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

    function toggleMobileMenu() {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", !isExpanded);
        document.body.classList.toggle("mobile-menu-active");
        mobileMenu.classList.toggle("active");
        mobileMenu.setAttribute("aria-hidden", isExpanded);
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", toggleMobileMenu);
    }

    // Close menu when clicking link
    mobileNavLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (mobileMenu.classList.contains("active")) {
                toggleMobileMenu();
            }
        });
    });

    // 5. CUSTOM CURSOR
    const cursor = document.getElementById("custom-cursor");
    let isTouchDevice = false;

    // Detect touch device
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        isTouchDevice = true;
    }

    if (!isTouchDevice && cursor) {
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power2.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power2.out" });

        document.addEventListener("mousemove", (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
            if (cursor.style.opacity === "0" || cursor.style.opacity === "") {
                cursor.style.opacity = "1";
            }
        });

        document.addEventListener("mouseleave", () => {
            cursor.style.opacity = "0";
        });

        // Hover events for buttons, project elements
        const links = document.querySelectorAll("a, button, .project-item");
        links.forEach(link => {
            link.addEventListener("mouseenter", () => {
                if (link.classList.contains("project-item")) {
                    cursor.classList.add("hovering-project");
                } else {
                    cursor.classList.add("hovering-link");
                }
            });
            
            link.addEventListener("mouseleave", () => {
                cursor.classList.remove("hovering-project");
                cursor.classList.remove("hovering-link");
            });
        });
    } else if (cursor) {
        cursor.style.display = "none"; // Hide completely on touch
    }

    // 6. SCROLL REVEALS (GSAP SCROLLTRIGGER)
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReduced) {
        // Hero BG Scroll Parallax
        gsap.to(".hero-bg-parallax", {
            y: "15%",
            ease: "none",
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Reveal headings/sections
        const revealTexts = document.querySelectorAll(".reveal-text");
        revealTexts.forEach(text => {
            gsap.fromTo(text, 
                { y: 50, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 1.2, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: text,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Reveal content groups
        const revealUps = document.querySelectorAll(".reveal-up");
        revealUps.forEach(element => {
            gsap.fromTo(element, 
                { y: 40, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 1, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 88%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Project Image Mask Reveal (clip path horizontal expansion)
        const imageContainers = document.querySelectorAll(".image-reveal-container");
        imageContainers.forEach(container => {
            ScrollTrigger.create({
                trigger: container,
                start: "top 80%",
                onEnter: () => {
                    container.classList.add("revealed");
                },
                once: true
            });
        });

        // Areas of expertise staggered reveal
        gsap.fromTo(".expertise-card", 
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                stagger: 0.15, 
                duration: 1, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".expertise-grid",
                    start: "top 85%"
                }
            }
        );
    } else {
        // Reduced motion fallback: instantly reveal everything
        const revealTexts = document.querySelectorAll(".reveal-text, .reveal-up");
        revealTexts.forEach(el => gsap.set(el, { opacity: 1, y: 0 }));

        const imageContainers = document.querySelectorAll(".image-reveal-container");
        imageContainers.forEach(container => container.classList.add("revealed"));
    }

    // 7. LIGHTBOX MODAL INTERACTIONS
    const projectItems = document.querySelectorAll(".project-item");
    const modal = document.getElementById("project-modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalCategory = document.getElementById("modal-category");
    const modalDescription = document.getElementById("modal-description");
    const modalNum = document.getElementById("modal-num");
    const modalYear = document.getElementById("modal-spec-year");
    const modalLocation = document.getElementById("modal-spec-location");
    const modalClose = document.getElementById("modal-close");

    function openModal(projectId) {
        const data = projectData[projectId];
        if (!data) return;

        // Populate Modal Details
        modalNum.textContent = data.num;
        modalTitle.textContent = data.title;
        modalCategory.innerHTML = data.category;
        modalDescription.innerHTML = `<p>${data.description}</p>`;
        modalYear.textContent = data.year;
        modalLocation.textContent = data.location;
        modalImg.src = data.image;
        modalImg.alt = data.title;

        // Toggle Modal Classes
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Lock page scroll

        // Keyboard focus management
        modalClose.focus();
    }

    function closeModal() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = ""; // Restore scroll
        
        // Return focus to active project item
        const activeProject = document.querySelector(`.project-item[data-project="${modalNum.textContent - 1}"]`);
        if (activeProject) activeProject.focus();
    }

    projectItems.forEach(item => {
        item.addEventListener("click", () => {
            const index = item.getAttribute("data-project");
            openModal(index);
        });

        // Add keyboard interaction for focus state accessibility
        item.setAttribute("tabindex", "0");
        item.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                const index = item.getAttribute("data-project");
                openModal(index);
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }

    // Close when clicking backdrop
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Keyboard support: Escape closes modal
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
});
