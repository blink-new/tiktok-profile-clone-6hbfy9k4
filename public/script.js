// Desktop TikTok Profile Clone JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupTabNavigation();
    setupVideoInteractions();
    setupProfileInteractions();
    setupSearchFunctionality();
    setupModalFunctionality();
    setupAnimations();
    setupKeyboardNavigation();
}

// Tab Navigation
function setupTabNavigation() {
    const tabs = document.querySelectorAll('.tab');
    const videoGrids = {
        'videos': document.getElementById('videos-tab'),
        'liked': document.getElementById('liked-tab')
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show/hide appropriate content
            Object.keys(videoGrids).forEach(key => {
                if (key === tabName) {
                    videoGrids[key].classList.remove('hidden');
                } else {
                    videoGrids[key].classList.add('hidden');
                }
            });
            
            // Add subtle animation
            videoGrids[tabName].style.opacity = '0';
            setTimeout(() => {
                videoGrids[tabName].style.opacity = '1';
                videoGrids[tabName].style.transition = 'opacity 0.3s ease';
            }, 50);
        });
    });
}

// Video Interactions
function setupVideoInteractions() {
    const videoCards = document.querySelectorAll('.video-card, .pinned-video');
    
    videoCards.forEach(video => {
        video.addEventListener('click', function() {
            handleVideoClick(this);
        });
        
        // Add hover effects
        video.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.video-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
            
            // Pause other animations when hovering
            const animations = this.querySelectorAll('.gentle-overlay, .owl-sketch, .rain-effect');
            animations.forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        });
        
        video.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.video-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
            
            // Resume animations
            const animations = this.querySelectorAll('.gentle-overlay, .owl-sketch, .rain-effect');
            animations.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        });
        
        // Click animation
        video.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        video.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
    });
}

function handleVideoClick(videoElement) {
    // Get video data
    const videoData = getVideoData(videoElement);
    
    // Show modal
    showVideoModal(videoData);
    
    // Update play state
    updateVideoPlayState(videoElement);
    
    // Show notification
    showVideoNotification(videoData.title);
}

function getVideoData(videoElement) {
    const title = videoElement.querySelector('.video-title')?.textContent || 'Video';
    const caption = videoElement.querySelector('.video-caption')?.textContent || 'No description';
    const stats = videoElement.querySelector('.video-stats, .view-count')?.textContent || '0 views';
    const videoId = videoElement.dataset.video || 'unknown';
    
    return { title, caption, stats, videoId };
}

function updateVideoPlayState(videoElement) {
    const playButton = videoElement.querySelector('.play-button, .play-icon');
    if (playButton) {
        playButton.innerHTML = '⏸️';
        setTimeout(() => {
            playButton.innerHTML = '▶️';
        }, 2000);
    }
    
    // Update view count realistically
    const statsEl = videoElement.querySelector('.video-stats');
    if (statsEl && statsEl.textContent.includes('❤️')) {
        const currentLikes = parseInt(statsEl.textContent.match(/\d+/)[0]);
        const newLikes = currentLikes + Math.floor(Math.random() * 5) + 1;
        statsEl.innerHTML = `❤️ ${newLikes}K`;
    }
}

// Profile Interactions
function setupProfileInteractions() {
    // Follow button
    const followBtn = document.querySelector('.btn-follow');
    if (followBtn) {
        followBtn.addEventListener('click', function() {
            handleFollowClick(this);
        });
    }
    
    // Stats interactions
    const stats = document.querySelectorAll('.stat-item');
    stats.forEach(stat => {
        stat.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Profile avatar interaction
    const avatar = document.querySelector('.avatar-circle');
    if (avatar) {
        avatar.addEventListener('click', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    }
    
    // Profile links
    const profileLinks = document.querySelectorAll('.profile-link');
    profileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification(`Opening ${this.textContent.trim()}...`);
        });
    });
}

function handleFollowClick(button) {
    if (button.textContent === 'Follow') {
        button.textContent = 'Following';
        button.style.background = '#4a5568';
        
        // Update follower count
        const followerStat = document.querySelector('.stat-item .stat-number');
        if (followerStat) {
            const currentCount = parseFloat(followerStat.textContent);
            followerStat.textContent = (currentCount + 0.1).toFixed(1) + 'K';
        }
        
        showNotification('Now following @milo_sounds! 🎵');
    } else {
        button.textContent = 'Follow';
        button.style.background = 'var(--accent-color)';
        
        showNotification('Unfollowed @milo_sounds');
    }
}

// Search Functionality
function setupSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            handleSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                handleSearch(this.value);
            }
        });
        
        // Search suggestions (mock)
        searchInput.addEventListener('input', function() {
            if (this.value.length > 2) {
                // Mock search suggestions
                console.log('Searching for:', this.value);
            }
        });
    }
}

function handleSearch(query) {
    if (query.trim()) {
        showNotification(`Searching for "${query}"...`);
        // Here you would implement actual search functionality
        console.log('Search query:', query);
    }
}

// Modal Functionality
function setupModalFunctionality() {
    const modal = document.getElementById('videoModal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    if (modalClose) {
        modalClose.addEventListener('click', hideVideoModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', hideVideoModal);
    }
    
    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideVideoModal();
        }
    });
    
    // Action buttons in modal
    setupModalActions();
}

function setupModalActions() {
    const likeBtn = document.querySelector('.like-btn');
    const commentBtn = document.querySelector('.comment-btn');
    const shareBtn = document.querySelector('.share-btn');
    
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            this.classList.toggle('liked');
            const countEl = this.querySelector('.action-count');
            if (this.classList.contains('liked')) {
                const currentCount = parseInt(countEl.textContent.replace('K', ''));
                countEl.textContent = (currentCount + 1) + 'K';
                showNotification('Liked! ❤️');
            } else {
                const currentCount = parseInt(countEl.textContent.replace('K', ''));
                countEl.textContent = (currentCount - 1) + 'K';
                showNotification('Unliked');
            }
        });
    }
    
    if (commentBtn) {
        commentBtn.addEventListener('click', function() {
            showNotification('Comments feature coming soon! 💬');
        });
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            showNotification('Link copied to clipboard! 📤');
        });
    }
}

function showVideoModal(videoData) {
    const modal = document.getElementById('videoModal');
    const titleEl = document.getElementById('modalVideoTitle');
    const captionEl = document.getElementById('modalVideoCaption');
    const likeCountEl = document.getElementById('likeCount');
    
    if (modal && titleEl && captionEl) {
        titleEl.textContent = videoData.title;
        captionEl.textContent = videoData.caption;
        
        if (likeCountEl) {
            const likes = videoData.stats.match(/\d+/)?.[0] || '23';
            likeCountEl.textContent = likes + 'K';
        }
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

function hideVideoModal() {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        modal.style.opacity = '0';
    }
}

// Animations
function setupAnimations() {
    // Randomize animation delays for floating elements
    const floatingElements = document.querySelectorAll('.gentle-overlay, .owl-sketch');
    floatingElements.forEach(element => {
        const randomDelay = Math.random() * 3;
        element.style.animationDelay = `${randomDelay}s`;
    });
    
    // Rain effects
    const rainElements = document.querySelectorAll('.rain-effect');
    rainElements.forEach(rain => {
        const randomDelay = Math.random() * 5;
        rain.style.animationDelay = `${randomDelay}s`;
    });
    
    // Scroll-based parallax
    setupParallaxScrolling();
    
    // Intersection Observer for animations
    setupIntersectionObserver();
}

function setupParallaxScrolling() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.02;
        
        const parallaxElements = document.querySelectorAll('.gentle-overlay, .owl-sketch');
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px) rotate(${rate * 0.1}deg)`;
        });
        
        ticking = false;
    }
    
    document.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe video cards for animation
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Keyboard Navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Tab navigation with keyboard
        if (e.key === '1') {
            document.querySelector('[data-tab="videos"]')?.click();
        } else if (e.key === '2') {
            document.querySelector('[data-tab="liked"]')?.click();
        }
        
        // Video navigation with arrow keys (when modal is open)
        if (!document.getElementById('videoModal').classList.contains('hidden')) {
            if (e.key === 'ArrowLeft') {
                // Previous video logic
                console.log('Previous video');
            } else if (e.key === 'ArrowRight') {
                // Next video logic
                console.log('Next video');
            }
        }
        
        // Space to play/pause (when modal is open)
        if (e.key === ' ' && !document.getElementById('videoModal').classList.contains('hidden')) {
            e.preventDefault();
            console.log('Toggle play/pause');
        }
    });
}

// Utility Functions
function showNotification(message) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(143, 160, 179, 0.95);
        color: white;
        padding: 12px 24px;
        border-radius: 24px;
        z-index: 10000;
        font-size: 14px;
        font-weight: 500;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showVideoNotification(title) {
    showNotification(`🎵 Playing: ${title}`);
}

// Performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scrolling for navigation
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Initialize responsive behavior
function handleResize() {
    const sidebar = document.querySelector('.left-sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth <= 1024) {
        // Mobile/tablet layout adjustments
        if (sidebar) {
            sidebar.style.position = 'sticky';
            sidebar.style.top = '70px';
        }
    } else {
        // Desktop layout
        if (sidebar) {
            sidebar.style.position = 'static';
        }
    }
}

// Listen for window resize
window.addEventListener('resize', debounce(handleResize, 250));

// Initialize on load
handleResize();

// Add some easter eggs
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        showNotification('🎵 Konami Code activated! Milo approves! 🥁');
        konamiCode = [];
    }
});

console.log('🎵 TikTok Desktop Profile Clone loaded successfully! 🥁');