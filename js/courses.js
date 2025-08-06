async function loadAllCourses() {
    try {
        const courses = await fetchAllBooks('courses');
        displayCourses('all-courses', courses);
    } catch (error) {
        console.error('Error loading courses:', error);
    }
}

// DOMContentLoaded handling moved to inline script in HTML