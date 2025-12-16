document.addEventListener('DOMContentLoaded', () => {
    // Select all cards
    const cards = document.querySelectorAll('.bento-card');

    // Add initial state for animation
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
    });

    // Staggered Reveal
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index); // 100ms delay between each card
    });

    // Optional: Interactive Tilt Effect for Desktop
    if (window.matchMedia('(min-width: 769px)').matches) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            cards.forEach(card => {
                const sensitivity = 0.015;
                const x = (clientX - centerX) * sensitivity;
                const y = (clientY - centerY) * sensitivity;

                // varied movement for depth
                const depth = Math.random() * 0.5 + 0.5;

                // Apply subtle parallax to cards
                // Note: We use the existing transform transition, so it might be smooth or laggy depending on browser.
                // For high perf, requestAnimationFrame is better, but for this simple effect:
                // We won't apply it to everything to avoid conflict with hover.
                // Actually, let's just animate the blobs slightly more associated with mouse
            });

            const blobs = document.querySelectorAll('.blob');
            blobs.forEach((blob, i) => {
                const speed = (i + 1) * 0.02;
                const x = (clientX - centerX) * speed;
                const y = (clientY - centerY) * speed;
                blob.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
});
