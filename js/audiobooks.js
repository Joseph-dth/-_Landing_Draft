async function loadAllAudiobooks() {
    try {
        const audiobooks = await fetchAllBooks('audiobooks');
        displayBooks('all-audiobooks', audiobooks);
    } catch (error) {
        console.error('Error loading audiobooks:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    loadAllAudiobooks();
});