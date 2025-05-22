// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = mobileMenu.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Scroll header effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Activar enlace de navegación según scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Inicializar carrusel de testimonios
new Glide('.glide', {
    type: 'carousel',
    perView: 1,
    gap: 40,
    autoplay: 3000
}).mount();

// Animaciones al cargar la página y al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar animaciones inmediatas
    const initialAnimations = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-up, .scale-in, .slide-in-bottom');

    initialAnimations.forEach((element) => {
        // Asegurarse de que las animaciones se muestren correctamente incluso si hay retrasos
        setTimeout(() => {
            element.style.visibility = 'visible';
        }, 100);
    });

    // Configurar observador para animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observar todos los elementos con clases de animación
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-up, .scale-in, .slide-in-bottom').forEach(element => {
        observer.observe(element);
    });

    // Añadir efecto de flotación a elementos específicos
    document.querySelectorAll('.project-img, .hero-img').forEach(element => {
        element.classList.add('float');
    });
});
