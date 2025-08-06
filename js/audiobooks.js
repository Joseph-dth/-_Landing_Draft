let allAudiobooks = []; // 儲存所有聽書資料

async function loadAllAudiobooks() {
    try {
        allAudiobooks = await fetchAllBooks('audiobooks');
        generateCategoryFilters();
        displayBooks('all-audiobooks', allAudiobooks);
    } catch (error) {
        console.error('Error loading audiobooks:', error);
    }
}

function generateCategoryFilters() {
    // 獲取所有獨特的分類
    const categories = [...new Set(allAudiobooks.map(book => book.category))].sort();
    
    // 生成電腦版按鈕
    const buttonsContainer = document.getElementById('category-buttons');
    if (buttonsContainer) {
        buttonsContainer.innerHTML = `
            <button class="category-btn active" data-category="all">全部</button>
            ${categories.map(category => 
                `<button class="category-btn" data-category="${category}">${category}</button>`
            ).join('')}
        `;
        
        // 添加按鈕點擊事件
        buttonsContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('category-btn')) {
                // 移除所有活躍狀態
                document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                // 添加活躍狀態到點擊的按鈕
                e.target.classList.add('active');
                // 過濾書籍
                filterBooksByCategory(e.target.dataset.category);
            }
        });
    }
    
    // 生成手機版下拉選單
    const selectElement = document.getElementById('category-select');
    if (selectElement) {
        selectElement.innerHTML = `
            <option value="all">全部分類</option>
            ${categories.map(category => 
                `<option value="${category}">${category}</option>`
            ).join('')}
        `;
        
        // 添加選擇事件
        selectElement.addEventListener('change', function(e) {
            filterBooksByCategory(e.target.value);
        });
    }
}

function filterBooksByCategory(category) {
    let filteredBooks;
    
    if (category === 'all') {
        filteredBooks = allAudiobooks;
    } else {
        filteredBooks = allAudiobooks.filter(book => book.category === category);
    }
    
    displayBooks('all-audiobooks', filteredBooks);
}

// DOMContentLoaded handling moved to inline script in HTML