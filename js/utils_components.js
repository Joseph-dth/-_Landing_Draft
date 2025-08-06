// Unified Navigation and Footer Components
// This module provides reusable HTML components for navigation and footer

function createNavigation(activePage = '') {
    return `
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <h2>Money錢<span class="x-gray"> X </span>樊登</h2>
                </div>
                <ul class="nav-menu">
                    <li class="nav-item">
                        <a href="index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">首頁</a>
                    </li>
                    <li class="nav-item">
                        <a href="books.html" class="nav-link ${activePage === 'books' ? 'active' : ''}">書籍</a>
                    </li>
                    <li class="nav-item">
                        <a href="audiobooks.html" class="nav-link ${activePage === 'audiobooks' ? 'active' : ''}">聽書</a>
                    </li>
                    <li class="nav-item">
                        <a href="courses.html" class="nav-link ${activePage === 'courses' ? 'active' : ''}">線上課程—帆書系列</a>
                    </li>
                    <li class="nav-item">
                        <a href="community.html" class="nav-link ${activePage === 'community' ? 'active' : ''}">加入社群</a>
                    </li>
                </ul>
                <div class="hamburger">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </div>
        </nav>
    `;
}

function createFooter() {
    return `
        <footer class="footer">
            <div class="container">
                <p>&copy; 2025 帆書聽書. All rights reserved.</p>
            </div>
        </footer>
    `;
}

// Initialize components on page load
function initComponents(activePage = '') {
    // Insert navigation at the beginning of body
    const body = document.body;
    body.insertAdjacentHTML('afterbegin', createNavigation(activePage));
    
    // Insert footer before the last script tag or at the end
    const scripts = body.querySelectorAll('script');
    if (scripts.length > 0) {
        scripts[0].insertAdjacentHTML('beforebegin', createFooter());
    } else {
        body.insertAdjacentHTML('beforeend', createFooter());
    }
    
    // Initialize mobile menu after navigation is inserted
    // Use setTimeout to ensure DOM is fully updated
    setTimeout(() => {
        if (typeof initMobileMenu === 'function') {
            initMobileMenu();
        }
    }, 0);
}

// Export functions for use in other scripts
window.ComponentUtils = {
    createNavigation,
    createFooter,
    initComponents
};