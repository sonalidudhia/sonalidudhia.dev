document.addEventListener('DOMContentLoaded', () => {
    console.log('%c System Online ', 'background: #222; color: #bada55');

    // Select all cards
    const cards = document.querySelectorAll('.bento-card');

    // Add initial state for animation
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        card.style.transition = 'opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    // Check local storage or system preference
    const userTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const enableDarkMode = () => {
        document.body.classList.add('dark-mode');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        localStorage.setItem('theme', 'dark');
    };

    const enableLightMode = () => {
        document.body.classList.remove('dark-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        localStorage.setItem('theme', 'light');
    };

    if (userTheme === 'dark' || (!userTheme && systemTheme)) {
        enableDarkMode();
    } else {
        enableLightMode();
    }

    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            enableLightMode();
        } else {
            enableDarkMode();
        }
    });

    // Staggered Reveal
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 80 * index); // Faster, more technical reveal
    });
});
