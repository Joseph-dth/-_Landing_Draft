async function loadAllNewBooks() {
    try {
        const newBooks = await fetchAllBooks('new-books');
        displayBooks('all-new-books', newBooks);
    } catch (error) {
        console.error('Error loading new books:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    loadAllNewBooks();
});