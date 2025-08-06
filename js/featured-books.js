async function loadAllFeaturedBooks() {
    try {
        const featuredBooks = await fetchAllBooks('books');
        displayBooks('all-featured-books', featuredBooks);
    } catch (error) {
        console.error('Error loading featured books:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    loadAllFeaturedBooks();
});