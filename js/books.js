async function loadAllBooks() {
    try {
        const books = await fetchAllBooks('books');
        displayBooks('all-books', books);
    } catch (error) {
        console.error('Error loading books:', error);
    }
}

// DOMContentLoaded handling moved to inline script in HTML