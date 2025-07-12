function showTab(tabName) {
  // Remove active class from all tabs
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Add active class to clicked tab
  event.target.classList.add("active");

  // Here you would show/hide different content sections
  // For now, we'll just update the active state
}

// Add gentle click effects to interactive elements
document
  .querySelectorAll(".video-item, .pinned-video, .stat")
  .forEach((item) => {
    item.addEventListener("click", function () {
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });

// Gentle floating animation with randomized timing
document
  .querySelectorAll(".gentle-overlay, .owl-sketch")
  .forEach((element) => {
    const randomDelay = Math.random() * 3;
    element.style.animationDelay = `${randomDelay}s`;
  });

// Simulated loading effect for videos
function simulateLoading() {
  const videos = document.querySelectorAll(".video-item");
  videos.forEach((video, index) => {
    setTimeout(() => {
      video.classList.add("shimmer-effect");
      setTimeout(() => {
        video.classList.remove("shimmer-effect");
        video.style.opacity = "1";
      }, 500);
    }, index * 100);
  });
}

// Gentle rain effect trigger
document.querySelectorAll(".rain-effect").forEach((rain) => {
  const randomDelay = Math.random() * 5;
  rain.style.animationDelay = `${randomDelay}s`;
});

// Realistic video interaction
document.querySelectorAll(".video-item").forEach((video) => {
  video.addEventListener("click", function () {
    // Simulate video play
    const playButton = this.querySelector(".play-button");
    if (playButton) {
      playButton.innerHTML = "⏸️";
      setTimeout(() => {
        playButton.innerHTML = "▶️";
      }, 2000);
    }

    // Update view count
    const statsEl = this.querySelector(".video-stats");
    if (statsEl) {
      const currentLikes = parseInt(statsEl.textContent.match(/\d+/)[0]);
      const newLikes = currentLikes + Math.floor(Math.random() * 5) + 1;
      statsEl.innerHTML = `❤️ ${newLikes}K`;
    }
  });
});

// Gentle hover effects
document.querySelectorAll(".video-item").forEach((video) => {
  video.addEventListener("mouseenter", function () {
    const overlay = this.querySelector(".video-overlay");
    if (overlay) {
      overlay.style.opacity = "1";
    }
  });

  video.addEventListener("mouseleave", function () {
    const overlay = this.querySelector(".video-overlay");
    if (overlay) {
      overlay.style.opacity = "0";
    }
  });
});

// Realistic follow button interaction
document
  .querySelector(".btn-follow")
  .addEventListener("click", function () {
    if (this.textContent === "Follow") {
      this.textContent = "Following";
      this.style.background = "#4a5568";

      // Update follower count
      const followerStat = document.querySelector(".stat-number");
      const currentCount = parseFloat(followerStat.textContent);
      followerStat.textContent = (currentCount + 0.1).toFixed(1) + "K";
    } else {
      this.textContent = "Follow";
      this.style.background = "#8fa0b3";
    }
  });

// Subtle scroll-based parallax for overlays
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.02;

  document
    .querySelectorAll(".gentle-overlay, .owl-sketch")
    .forEach((element) => {
      element.style.transform = `translateY(${rate}px) rotate(${
        rate * 0.1
      }deg)`;
    });

  ticking = false;
}

document.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// Gentle notification for pinned videos
document.querySelectorAll(".pinned-video").forEach((video) => {
  video.addEventListener("click", function () {
    const notification = document.createElement("div");
    notification.innerHTML =
      "🎵 Playing: " + this.querySelector(".pinned-content").textContent;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(143, 160, 179, 0.9);
      color: white;
      padding: 12px 20px;
      border-radius: 20px;
      z-index: 10000;
      font-size: 14px;
      font-weight: 500;
      backdrop-filter: blur(10px);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateX(-50%) translateY(-20px)";
      notification.style.transition = "all 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  });
});