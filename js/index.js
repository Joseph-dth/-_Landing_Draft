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

document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initMobileMenu();
    loadHomepageBooks();
});