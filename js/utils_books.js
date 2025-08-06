async function fetchBooksFromJSON(folder, isFeatured = false) {
    try {
        const jsonPath = isFeatured ? `${folder}/featured/featured.json` : `${folder}/books.json`;
        const response = await fetch(jsonPath);
        if (response.ok) {
            const booksData = await response.json();
            return booksData;
        } else {
            throw new Error(`Failed to fetch ${jsonPath}`);
        }
    } catch (error) {
        console.error(`Error loading books from JSON:`, error);
        return [];
    }
}

async function fetchFeaturedBooks(folder) {
    return await fetchBooksFromJSON(folder, true);
}

async function fetchAllBooks(folder) {
    return await fetchBooksFromJSON(folder, false);
}

async function fetchBooksFromFiles(folder, isFeatured = false) {
    return await fetchBooksFromJSON(folder, isFeatured);
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

    info.image = `${folder}/featured/${bookName}/image.png`;
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