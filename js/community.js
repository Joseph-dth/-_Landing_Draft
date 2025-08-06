async function loadCommunityEvents() {
    try {
        const response = await fetch('community/community.json');
        const events = await response.json();
        displayCommunityCarousel(events);
        initCommunityCarousel();
    } catch (error) {
        console.error('Error loading community events:', error);
    }
}

function displayCommunityCarousel(events) {
    const container = document.getElementById('community-carousel-container');
    if (!container) return;

    container.innerHTML = events.map(event => `
        <div class="community-carousel-item">
            <a href="${event.link}" target="_blank">
                <img src="${event.image}" alt="${event.title}" loading="lazy">
                <div class="community-event-info">
                    <h3>${event.title}</h3>
                    <p>${event.data}</p>
                </div>
            </a>
        </div>
    `).join('');
}

function initCommunityCarousel() {
    const container = document.getElementById('community-carousel-container');
    const prevBtn = document.querySelector('.community-prev-btn');
    const nextBtn = document.querySelector('.community-next-btn');
    
    if (!container || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const items = container.querySelectorAll('.community-carousel-item');
    const itemWidth = items[0]?.offsetWidth + 20 || 280;

    function updateCarousel() {
        container.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        const maxIndex = Math.max(0, items.length - Math.floor(container.parentElement.offsetWidth / itemWidth));
        currentIndex = Math.min(maxIndex, currentIndex + 1);
        updateCarousel();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadCommunityEvents();
    
    const joinCommunityBtn = document.getElementById('join-community-btn');
    const learnMoreBtn = document.getElementById('learn-more-btn');

    if (joinCommunityBtn) {
        joinCommunityBtn.addEventListener('click', function() {
            alert('感謝您的興趣！請聯繫我們的客服團隊了解早鳥方案詳情。\n\n📞 客服專線：02-1234-5678\n📧 Email: support@fanshubook.com\n⏰ 服務時間：週一至週五 9:00-18:00');
        });
    }

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            const infoModal = `
                <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000; display: flex; align-items: center; justify-content: center;" id="info-modal">
                    <div style="background: white; padding: 2rem; border-radius: 15px; max-width: 500px; max-height: 80vh; overflow-y: auto; margin: 20px;">
                        <h3 style="color: #BDA588; margin-bottom: 1rem;">社群詳細資訊</h3>
                        <div style="line-height: 1.6; color: #333;">
                            <h4>🎯 社群目標</h4>
                            <p>打造高品質的學習社群，促進付費用戶間的深度交流與成長</p>
                            
                            <h4>📅 活動安排</h4>
                            <ul>
                                <li><strong>每週一</strong>：書籍導讀分享</li>
                                <li><strong>每週二</strong>：職涯發展討論</li>
                                <li><strong>每週三</strong>：投資理財交流</li>
                                <li><strong>每週四</strong>：輕鬆話題閒聊</li>
                            </ul>
                            
                            <h4>🎤 特色講師</h4>
                            <p>每週邀請不同領域的知名IP講師，包括：</p>
                            <ul>
                                <li>暢銷書作家</li>
                                <li>職涯規劃師</li>
                                <li>投資理財專家</li>
                                <li>生活風格達人</li>
                            </ul>
                            
                            <h4>💎 專屬福利</h4>
                            <ul>
                                <li>限定早鳥用戶專享</li>
                                <li>直播互動機會</li>
                                <li>專屬學習資源</li>
                                <li>優先問答權限</li>
                            </ul>
                        </div>
                        <button onclick="document.getElementById('info-modal').remove()" style="background: #BDA588; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 25px; margin-top: 1rem; cursor: pointer; float: right;">關閉</button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', infoModal);
        });
    }

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const weekCards = document.querySelectorAll('.week-card');
    weekCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        
        observer.observe(card);
    });


    function smoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    smoothScroll();

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.community-hero');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.backgroundPositionY = speed + 'px';
        }
    });
});