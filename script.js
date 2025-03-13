let currentIndex = 0;

function moveCarousel(direction) {
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    currentIndex += direction;

    if (currentIndex >= totalItems) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalItems - 1;
    }

    const carousel = document.querySelector('.carousel');
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}
