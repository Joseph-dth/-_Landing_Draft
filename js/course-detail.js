async function loadCourseDetail() {
    const params = getUrlParams();
    if (!params.folder || !params.book) {
        document.querySelector('.course-detail').innerHTML = '<p>課程資訊未找到</p>';
        return;
    }

    // 從JSON獲取課程資訊
    let courseInfo = null;
    let introText = '暫無詳細介紹';

    try {
        // 先嘗試從featured JSON載入
        const featuredCourses = await fetchFeaturedBooks(params.folder);
        courseInfo = featuredCourses.find(b => b.name === params.book);
        
        if (!courseInfo) {
            // 如果featured中沒有，再從主JSON載入
            const allCourses = await fetchAllBooks(params.folder);
            courseInfo = allCourses.find(b => b.name === params.book);
        }
    } catch (error) {
        console.error('Error loading courses:', error);
    }

    // 嘗試載入intro.txt
    if (courseInfo) {
        const pathsToTry = [];
        
        // 如果有 folderName 欄位，使用它
        if (courseInfo.folderName) {
            pathsToTry.push(`${params.folder}/${courseInfo.folderName}`);
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

    if (courseInfo) {
        displayCourseDetail(courseInfo, introText);
    } else {
        document.querySelector('.course-detail').innerHTML = '<p>課程資訊未找到</p>';
    }
}

function displayCourseDetail(course, intro) {
    // 更新圖片
    const courseImage = document.getElementById('course-image');
    if (courseImage) {
        courseImage.src = course.image;
        courseImage.alt = course.title || course.name;
        
        courseImage.onerror = function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDIwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjREREQkRBIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNzY3MDY0IiBmb250LXNpemU9IjE0Ij7lnJblg4845pyq6aaJ56S6PC90ZXh0Pgo8L3N2Zz4K';
        };
    }

    // 更新標題
    const courseTitle = document.getElementById('course-title');
    if (courseTitle) {
        courseTitle.textContent = course.title || course.name;
    }

    // 更新講者資訊
    const courseSpeaker = document.getElementById('course-speaker');
    if (courseSpeaker) {
        courseSpeaker.textContent = course.speaker ? `講者：${course.speaker}` : '';
    }

    // 更新價格資訊
    const coursePrice = document.getElementById('course-price');
    if (coursePrice) {
        coursePrice.textContent = course.price ? `價格：${course.price}` : '';
    }

    // 更新學員數資訊
    const courseStudents = document.getElementById('course-students');
    if (courseStudents) {
        courseStudents.textContent = course.students ? `學員數：${course.students}` : '';
    }

    // 更新分類資訊
    const courseCategory = document.getElementById('course-category');
    if (courseCategory) {
        courseCategory.textContent = course.category ? `分類：${course.category}` : '';
    }

    // 更新內容介紹
    const courseContent = document.getElementById('course-content');
    if (courseContent) {
        if (intro) {
            // 處理換行符號，將每個段落轉換為 <p> 標籤
            const paragraphs = intro.split('\n\n').filter(para => para.trim());
            courseContent.innerHTML = paragraphs.map(para => 
                `<p>${para.trim().replace(/\n/g, '<br>')}</p>`
            ).join('');
        } else {
            courseContent.innerHTML = '<p>暫無詳細介紹</p>';
        }
    }

    // 更新頁面標題
    document.title = `${course.title || course.name} - 帆書聽書`;
}

// 為「開始聽書」按鈕添加功能
function startListening() {
    alert('開始播放課程！\n（此為示範功能，實際應用中會連接到課程播放系統）');
}