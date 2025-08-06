async function loadHomepageBooks() {
    try {
        const books = await fetchFeaturedBooks('books');
        const audiobooks = await fetchFeaturedBooks('audiobooks');  
        const courses = await fetchFeaturedBooks('courses');

        displayBooks('books-grid', books.slice(0, 4));
        displayBooks('audiobooks-grid', audiobooks.slice(0, 4));
        displayBooks('courses-grid', courses.slice(0, 4));
    } catch (error) {
        console.error('Error loading homepage books:', error);
    }
}

async function loadCommunityEvents() {
    try {
        const response = await fetch('community/community.json');
        const events = await response.json();
        displayCommunityCarousel(events);
        initCommunityCarousel();
    } catch (error) {
        console.error('Error loading community events:', error);
    }
}

function displayCommunityCarousel(events) {
    const container = document.getElementById('community-carousel-container');
    if (!container) return;

    container.innerHTML = events.map(event => `
        <div class="community-carousel-item">
            <a href="${event.link}" target="_blank">
                <img src="${event.image}" alt="${event.title}" loading="lazy">
                <div class="community-event-info">
                    <h3>${event.title}</h3>
                    <p>${event.data}</p>
                </div>
            </a>
        </div>
    `).join('');
}

function initCommunityCarousel() {
    const container = document.getElementById('community-carousel-container');
    const prevBtn = document.querySelector('.community-prev-btn');
    const nextBtn = document.querySelector('.community-next-btn');
    
    if (!container || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const items = container.querySelectorAll('.community-carousel-item');
    const itemWidth = items[0]?.offsetWidth + 20 || 280;

    function updateCarousel() {
        container.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        const maxIndex = Math.max(0, items.length - Math.floor(container.parentElement.offsetWidth / itemWidth));
        currentIndex = Math.min(maxIndex, currentIndex + 1);
        updateCarousel();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initMobileMenu();
    loadHomepageBooks();
    loadCommunityEvents();
});