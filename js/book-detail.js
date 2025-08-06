async function loadBookDetail() {
    const params = getUrlParams();
    if (!params.folder || !params.book) {
        document.querySelector('.book-detail').innerHTML = '<p>書籍資訊未找到</p>';
        return;
    }

    // 從JSON獲取書籍資訊
    let bookInfo = null;
    let introText = '暫無詳細介紹';

    try {
        // 先嘗試從featured JSON載入
        const featuredBooks = await fetchFeaturedBooks(params.folder);
        bookInfo = featuredBooks.find(b => b.name === params.book);
        
        if (!bookInfo) {
            // 如果featured中沒有，再從主JSON載入
            const allBooks = await fetchAllBooks(params.folder);
            bookInfo = allBooks.find(b => b.name === params.book);
        }
    } catch (error) {
        console.error('Error loading books:', error);
    }

    // 嘗試載入intro.txt
    if (bookInfo) {
        const pathsToTry = [];
        
        // 如果有 folderName 欄位，使用它
        if (bookInfo.folderName) {
            pathsToTry.push(`${params.folder}/${bookInfo.folderName}`);
        } else {
            // 向後相容性：使用舊的方式
            pathsToTry.push(`${params.folder}/${encodeURIComponent(params.book)}`);
        }

        for (const basePath of pathsToTry) {
            try {
                const introResponse = await fetch(`${basePath}/intro.txt`);
                if (introResponse.ok) {
                    introText = await introResponse.text();
                    break;
                }
            } catch (error) {
                console.log(`Failed to load intro from ${basePath}:`, error);
            }
        }
    }

    if (bookInfo) {
        displayBookDetail(bookInfo, introText);
    } else {
        document.querySelector('.book-detail').innerHTML = '<p>書籍資訊未找到</p>';
    }
}

function displayBookDetail(book, intro) {
    // 更新圖片
    const bookImage = document.getElementById('book-image');
    if (bookImage) {
        bookImage.src = book.image;
        bookImage.alt = book.title || book.name;
        bookImage.onerror = function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDIwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjREREQkRBIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNzY3MDY0IiBmb250LXNpemU9IjE0Ij7lnJblg4845pyq6aaJ56S6PC90ZXh0Pgo8L3N2Zz4K';
        };
    }

    // 更新標題
    const bookTitle = document.getElementById('book-title');
    if (bookTitle) {
        bookTitle.textContent = book.title || book.name;
    }

    // 更新講者資訊
    const bookSpeaker = document.getElementById('book-speaker');
    if (bookSpeaker) {
        bookSpeaker.textContent = book.speaker ? `講者：${book.speaker}` : '';
    }

    // 更新價格資訊
    const bookPrice = document.getElementById('book-price');
    if (bookPrice) {
        bookPrice.textContent = book.price ? `價格：${book.price}` : '';
    }

    // 更新學員數資訊
    const bookStudents = document.getElementById('book-students');
    if (bookStudents) {
        bookStudents.textContent = book.students ? `學員數：${book.students}` : '';
    }

    // 更新分類資訊
    const bookCategory = document.getElementById('book-category');
    if (bookCategory) {
        bookCategory.textContent = book.category ? `分類：${book.category}` : '';
    }

    // 更新內容介紹
    const bookContent = document.getElementById('book-content');
    if (bookContent) {
        if (intro) {
            // 處理換行符號，將每個段落轉換為 <p> 標籤
            const paragraphs = intro.split('\n\n').filter(para => para.trim());
            bookContent.innerHTML = paragraphs.map(para => 
                `<p>${para.trim().replace(/\n/g, '<br>')}</p>`
            ).join('');
        } else {
            bookContent.innerHTML = '<p>暫無詳細介紹</p>';
        }
    }

    // 更新頁面標題
    document.title = `${book.title || book.name} - 帆書聽書`;
}

// 為「開始聽書」按鈕添加功能
function startListening() {
    alert('開始播放音頻！\n（此為示範功能，實際應用中會連接到音頻播放系統）');
}

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    loadBookDetail();
});