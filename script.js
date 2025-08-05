document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initMobileMenu();
    loadBooks();
});

function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });

    setInterval(nextSlide, 5000);
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

async function loadBooks() {
    try {
        const newBooks = await fetchBooksData('new-books');
        const featuredBooks = await fetchBooksData('books');
        const courses = await fetchBooksData('courses');

        displayBooks('new-books-grid', newBooks.slice(0, 4));
        displayBooks('featured-books-grid', featuredBooks.slice(0, 4));
        displayBooks('courses-grid', courses.slice(0, 4));
    } catch (error) {
        console.error('Error loading books:', error);
    }
}

function fetchBooksData(folder) {
    const booksData = {
        'new-books': [
            {
                name: '曾國藩的正面與側面',
                title: '曾國藩的正面與側面',
                speaker: '樊登',
                price: '99 NTD',
                category: '歷史人物',
                image: 'new-books/曾國藩的正面與側面/image.png',
                folder: 'new-books'
            },
            {
                name: '父母的語言',
                title: '父母的語言',
                speaker: '樊登',
                price: '99 NTD',
                category: '親子教育',
                image: 'new-books/父母的語言/image.png',
                folder: 'new-books'
            },
            {
                name: '鈍感力',
                title: '鈍感力',
                speaker: '樊登',
                price: '99 NTD',
                category: '心靈',
                image: 'new-books/鈍感力/image.png',
                folder: 'new-books'
            },
            {
                name: '高效休息法',
                title: '高效休息法',
                speaker: '樊登',
                price: '99 NTD',
                category: '自我提升',
                image: 'new-books/高效休息法/image.png',
                folder: 'new-books'
            }
        ],
        'books': [
            {
                name: '反脆弱',
                title: '反脆弱',
                speaker: '樊登',
                price: '99 NTD',
                category: '商業財經',
                image: 'books/反脆弱/image.png',
                folder: 'books'
            },
            {
                name: '如何讓你愛的人愛上你',
                title: '如何讓你愛的人愛上你',
                speaker: '樊登',
                price: '99 NTD',
                category: '兩性關係',
                image: 'books/如何讓你愛的人愛上你/image.png',
                folder: 'books'
            },
            {
                name: '曾國藩的正面與側面',
                title: '曾國藩的正面與側面',
                speaker: '樊登',
                price: '99 NTD',
                category: '歷史人物',
                image: 'books/曾國藩的正面與側面/image.png',
                folder: 'books'
            },
            {
                name: '父母的語言',
                title: '父母的語言',
                speaker: '樊登',
                price: '99 NTD',
                category: '親子教育',
                image: 'books/父母的語言/image.png',
                folder: 'books'
            },
            {
                name: '鈍感力',
                title: '鈍感力',
                speaker: '樊登',
                price: '99 NTD',
                category: '心靈',
                image: 'books/鈍感力/image.png',
                folder: 'books'
            },
            {
                name: '高效休息法',
                title: '高效休息法',
                speaker: '樊登',
                price: '99 NTD',
                category: '自我提升',
                image: 'books/高效休息法/image.png',
                folder: 'books'
            }
        ],
        'courses': [
            {
                name: '陳重銘的金融股淘金術｜教你挖出不敗績優股',
                title: '陳重銘的金融股淘金術｜教你挖出不敗績優股',
                speaker: '不敗教主-陳重銘',
                students: '7878',
                category: '股票 基本面 不盯盤 選股',
                image: 'courses/陳重銘的金融股淘金術｜教你挖出不敗績優股/image.png',
                folder: 'courses'
            },
            {
                name: '大俠武林 動態篩選法：7小時股票 × ETF 配息價差雙賺實戰',
                title: '大俠武林 動態篩選法：7小時股票 × ETF 配息價差雙賺實戰',
                speaker: '大俠武林',
                students: '5432',
                category: '股票 ETF 投資策略',
                image: 'courses/大俠武林 動態篩選法：7小時股票 × ETF 配息價差雙賺實戰/image.png',
                folder: 'courses'
            }
        ]
    };

    return Promise.resolve(booksData[folder] || []);
}

function parseBookInfo(infoText, bookName, folder) {
    const lines = infoText.trim().split('\n').filter(line => line.trim());
    const info = { name: bookName, folder: folder };

    lines.forEach(line => {
        if (line.includes('講者：') || line.includes('講師：')) {
            info.speaker = line.split('：')[1]?.trim();
        } else if (line.includes('書名：') || line.includes('課程名稱：')) {
            info.title = line.split('：')[1]?.trim();
        } else if (line.includes('價格：')) {
            info.price = line.split('：')[1]?.trim();
        } else if (line.includes('分類：')) {
            info.category = line.split('：')[1]?.trim();
        } else if (line.includes('學員數：')) {
            info.students = line.split('：')[1]?.trim();
        }
    });

    info.image = `${folder}/${bookName}/image.png`;
    return info;
}

function displayBooks(containerId, books) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = books.map(book => `
        <div class="book-card" onclick="openBookDetail('${book.folder}', '${book.name}')">
            <img src="${book.image}" alt="${book.title}" class="book-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDIwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjREREQkRBIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNzY3MDY0IiBmb250LXNpemU9IjE0Ij7lnJblg4845pyq6aaJ56S6PC90ZXh0Pgo8L3N2Zz4K'">
            <div class="book-info">
                <div class="book-title">${book.title || book.name}</div>
                <div class="book-speaker">${book.speaker || ''}</div>
                ${book.price ? `<div class="book-price">${book.price}</div>` : ''}
                ${book.students ? `<div class="book-price">學員數：${book.students}</div>` : ''}
                ${book.category ? `<div class="book-category">${book.category}</div>` : ''}
            </div>
        </div>
    `).join('');
}

function openBookDetail(folder, bookName) {
    window.location.href = `book-detail.html?folder=${encodeURIComponent(folder)}&book=${encodeURIComponent(bookName)}`;
}

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        folder: params.get('folder'),
        book: params.get('book')
    };
}