async function loadHomepageBooks() {
    try {
        const newBooks = await fetchFeaturedBooks('new-books');
        const featuredBooks = await fetchFeaturedBooks('books');  
        const courses = await fetchFeaturedBooks('courses');

        displayBooks('new-books-grid', newBooks.slice(0, 4));
        displayBooks('featured-books-grid', featuredBooks.slice(0, 4));
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