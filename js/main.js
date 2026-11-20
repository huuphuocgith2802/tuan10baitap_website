/**
 * TUẦN 10: THAO TÁC VỚI DOM & XỬ LÝ SỰ KIỆN
 * TỆP: js/main.js - ĐIỀU PHỐI GIAO DIỆN CHÍNH, NAVIGATION VÀ THEME
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cập nhật năm hiện tại ở footer tự động bằng JS Date
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 2. Đồng bộ nút Theme Toggle trên thanh Header
  const headerThemeBtn = document.getElementById('header-theme-toggle');
  if (headerThemeBtn) {
    headerThemeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      
      headerThemeBtn.innerHTML = isDark ? '☀️ Light' : '🌙 Dark';

      // Đồng bộ nút ở Activity 2 nếu có
      const act2ToggleBtn = document.getElementById('toggle-btn');
      if (act2ToggleBtn) {
        act2ToggleBtn.innerHTML = isDark ? '☀️ Chuyển sang Light Mode' : '🌙 Chuyển sang Dark Mode';
      }
    });
  }

  // 3. Mobile Navigation Drawer Toggle
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  if (mobileToggleBtn && navLinksContainer) {
    mobileToggleBtn.addEventListener('click', () => {
      const isVisible = navLinksContainer.style.display === 'flex';
      if (isVisible) {
        navLinksContainer.style.display = 'none';
      } else {
        navLinksContainer.style.display = 'flex';
        navLinksContainer.style.flexDirection = 'column';
        navLinksContainer.style.position = 'absolute';
        navLinksContainer.style.top = '72px';
        navLinksContainer.style.left = '0';
        navLinksContainer.style.right = '0';
        navLinksContainer.style.backgroundColor = 'var(--bg-card)';
        navLinksContainer.style.padding = '16px 20px';
        navLinksContainer.style.borderBottom = '1px solid var(--border-color)';
        navLinksContainer.style.boxShadow = 'var(--shadow-lg)';
      }
    });
  }

  // 4. Highlight active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  console.log('⚡ Hệ thống bài tập Tuần 10: DOM & Event Manipulation đã sẵn sàng!');
});
