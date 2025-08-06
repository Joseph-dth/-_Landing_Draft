async function loadAllCourses() {
    try {
        const courses = await fetchAllBooks('courses');
        displayBooks('all-courses', courses);
    } catch (error) {
        console.error('Error loading courses:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    loadAllCourses();
});