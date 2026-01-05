document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // ================= THEME TOGGLE =================
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.checked = true;
    }

    themeToggle?.addEventListener('change', () => {
        body.classList.toggle('light-theme');
        localStorage.setItem(
            'theme',
            body.classList.contains('light-theme') ? 'light' : 'dark'
        );
    });

    // ================= SMOOTH SCROLL =================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================= SECTION ANIMATION =================
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // ================= NAV ACTIVE LINK =================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 90) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                'active',
                link.getAttribute('href').slice(1) === current
            );
        });
    });
const contactForm = document.getElementById('contact-form');

contactForm?.addEventListener('submit', () => {
    setTimeout(() => {
        alert('Message sent successfully!');
    }, 500);
});

});


const canvas = document.getElementById("stars-bg");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// ⭐ STAR SETTINGS
const STAR_COUNT = 20000;
const STAR_SIZE = window.innerWidth < 768 ? 1.8 : 4; // 🔥 DEFINE ONCE
const stars = [];

for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * w,
        speed: Math.random() * 3 + 1
    });
}

function animateStars() {
    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = "rgba(180, 230, 255, 1)";
    for (let star of stars) {
        star.z -= star.speed;

        if (star.z <= 0) {
            star.z = w;
            star.x = Math.random() * w;
            star.y = Math.random() * h;
        }

        const sx = (star.x - w / 2) * (w / star.z) + w / 2;
        const sy = (star.y - h / 2) * (w / star.z) + h / 2;

        // 🌌 DEPTH-BASED STAR SIZE (PRO LOOK)
        const depth = 1 - star.z / w;
        const r = depth * depth * STAR_SIZE;

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
    }

    requestAnimationFrame(animateStars);
}

animateStars();

