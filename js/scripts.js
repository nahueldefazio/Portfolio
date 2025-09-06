// Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburgerLines = [
        document.getElementById('hamburger-line-1'),
        document.getElementById('hamburger-line-2'),
        document.getElementById('hamburger-line-3')
    ];

    let isMenuOpen = false;

    // Debug: verificar que los elementos existen
    console.log('Mobile Menu Button:', mobileMenuBtn);
    console.log('Mobile Menu:', mobileMenu);
    console.log('Hamburger Lines:', hamburgerLines);

    // Verificar que todos los elementos existen
    if (!mobileMenuBtn || !mobileMenu || !hamburgerLines[0] || !hamburgerLines[1] || !hamburgerLines[2]) {
        console.error('Elementos del menú móvil no encontrados');
        return;
    }

    // Función para animar el botón hamburguesa
    function animateHamburger() {
        if (isMenuOpen) {
            // Animación para cerrar (X)
            hamburgerLines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            hamburgerLines[1].style.opacity = '0';
            hamburgerLines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            // Animación para abrir (hamburguesa)
            hamburgerLines[0].style.transform = 'rotate(0deg) translate(0px, 0px)';
            hamburgerLines[1].style.opacity = '1';
            hamburgerLines[2].style.transform = 'rotate(0deg) translate(0px, 0px)';
        }
    }

    // Función para abrir/cerrar el menú
    function toggleMobileMenu() {
        console.log('Toggle menu clicked, current state:', isMenuOpen);
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenu.classList.remove('-translate-y-full');
            mobileMenu.classList.add('translate-y-0');
            document.body.classList.add('menu-open'); // Prevenir scroll del body
            console.log('Menu opened');
        } else {
            mobileMenu.classList.remove('translate-y-0');
            mobileMenu.classList.add('-translate-y-full');
            document.body.classList.remove('menu-open'); // Restaurar scroll del body
            console.log('Menu closed');
        }
        
        animateHamburger();
    }

    // Event listener para el botón del menú
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Hamburger button clicked');
        toggleMobileMenu();
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMobileMenu();
        }
    });

    // Cerrar menú al redimensionar la ventana (si se cambia a desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && isMenuOpen) { // lg breakpoint
            toggleMobileMenu();
        }
    });
    // Scroll header effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('shadow-lg', 'shadow-navy-blue/20');
        } else {
            header.classList.remove('shadow-lg', 'shadow-navy-blue/20');
        }
    });

    // Activar enlace de navegación según scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

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
            link.classList.remove('text-light-blue');
            link.classList.add('text-gray');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-gray');
                link.classList.add('text-light-blue');
            }
        });
    });

    // Animaciones al cargar la página y al hacer scroll
    // Configurar observador para animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observar todos los elementos con clases de animación de Tailwind
    document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right, .animate-scale-in').forEach(element => {
        // Establecer estado inicial
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(element);
    });

    // Añadir efecto de flotación a elementos específicos
    document.querySelectorAll('img[class*="animate-float"]').forEach(element => {
        element.classList.add('animate-float');
    });

    // Smooth scroll para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto de parallax sutil para elementos de fondo
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.absolute');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});
