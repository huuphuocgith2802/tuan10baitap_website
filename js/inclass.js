/**
 * TUẦN 10: THAO TÁC VỚI DOM & XỬ LÝ SỰ KIỆN
 * TỆP: js/inclass.js - XỬ LÝ CÁC HOẠT ĐỘNG THỰC HÀNH TRÊN LỚP (IN-CLASS ACTIVITIES)
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // HOẠT ĐỘNG 1: "The Element Picker" - Truy tìm thẻ (querySelector & querySelectorAll)
  // =========================================================================
  const inspectPickerBtn = document.getElementById('btn-picker-inspect');
  const changeColorRedBtn = document.getElementById('btn-picker-color-red');
  const resetColorBtn = document.getElementById('btn-picker-reset');
  const consoleDisplay = document.getElementById('picker-console-output');

  // 1.1 Kiểm tra thẻ đầu tiên có class .menu-item bằng querySelector
  if (inspectPickerBtn) {
    inspectPickerBtn.addEventListener('click', () => {
      // Thực hiện đúng hướng dẫn giáo trình: console.log(document.querySelector('.menu-item'))
      const firstItem = document.querySelector('.menu-item');
      console.log('Phần tử tìm thấy:', firstItem);

      if (firstItem && consoleDisplay) {
        consoleDisplay.innerHTML = `<strong>> document.querySelector('.menu-item'):</strong> &lt;a class="menu-item" href="${firstItem.getAttribute('href')}"&gt;${firstItem.innerText}&lt;/a&gt;`;
        firstItem.style.outline = '2px solid #3b82f6';
        setTimeout(() => {
          firstItem.style.outline = 'none';
        }, 1500);
      }
    });
  }

  // 1.2 Yêu cầu Vibe Coding: Chọn tất cả các thẻ <a> bên trong thẻ có id là 'menu' và đổi màu chữ sang màu đỏ
  if (changeColorRedBtn) {
    changeColorRedBtn.addEventListener('click', () => {
      // Truy xuất tất cả các thẻ a bên trong #menu
      const menuLinks = document.querySelectorAll('#menu a');
      console.log(`Tìm thấy ${menuLinks.length} thẻ <a> bên trong #menu:`, menuLinks);

      // Lặp qua danh sách phần tử và đổi màu chữ sang màu đỏ
      menuLinks.forEach((link, index) => {
        link.style.color = '#ef4444';
        link.style.borderColor = '#fca5a5';
      });

      if (consoleDisplay) {
        consoleDisplay.innerHTML = `<strong>> Vibe Coding AI:</strong> Đã chọn ${menuLinks.length} thẻ <code>#menu a</code> và đổi màu chữ sang <code>#ef4444</code> (Màu đỏ)!`;
      }
    });
  }

  // 1.3 Khôi phục lại màu ban đầu
  if (resetColorBtn) {
    resetColorBtn.addEventListener('click', () => {
      const menuLinks = document.querySelectorAll('#menu a');
      menuLinks.forEach(link => {
        link.style.color = '';
        link.style.borderColor = '';
      });

      if (consoleDisplay) {
        consoleDisplay.innerHTML = `<strong>> Console:</strong> Đã hoàn tác style của menu về mặc định.`;
      }
    });
  }

  // =========================================================================
  // HOẠT ĐỘNG 2: "Light Switch" - Bật/Tắt bóng đèn & Đổi màu nền (Dark Mode)
  // =========================================================================
  const bulbImage = document.getElementById('bulb-image');
  const bulbToggleBtn = document.getElementById('bulb-toggle-btn');
  const bulbStatus = document.getElementById('bulb-status');
  const darkModeToggleBtn = document.getElementById('toggle-btn');

  let isBulbOn = false;

  // 2.1 Bật / Tắt bóng đèn bằng cách thay đổi thuộc tính src của thẻ <img>
  if (bulbToggleBtn && bulbImage) {
    bulbToggleBtn.addEventListener('click', () => {
      isBulbOn = !isBulbOn;

      if (isBulbOn) {
        bulbImage.src = 'assets/images/bulb_on.svg';
        bulbImage.alt = 'Bóng đèn đang bật';
        bulbStatus.innerHTML = '💡 Trạng thái: <span style="color:#eab308;font-weight:700;">ĐÈN ĐANG BẬT</span>';
        bulbToggleBtn.textContent = 'Tắt Đèn';
        bulbToggleBtn.className = 'btn btn-secondary';
      } else {
        bulbImage.src = 'assets/images/bulb_off.svg';
        bulbImage.alt = 'Bóng đèn đang tắt';
        bulbStatus.innerHTML = '🌑 Trạng thái: <span style="color:var(--text-muted);font-weight:700;">ĐÈN ĐANG TẮT</span>';
        bulbToggleBtn.textContent = 'Bật Đèn';
        bulbToggleBtn.className = 'btn btn-primary';
      }
    });
  }

  // 2.2 Prompt mẫu giáo trình: Đổi màu nền body từ trắng sang đen và ngược lại (#toggle-btn)
  if (darkModeToggleBtn) {
    darkModeToggleBtn.addEventListener('click', () => {
      // Toggle class dark-mode trên body
      document.body.classList.toggle('dark-mode');

      const isDark = document.body.classList.contains('dark-mode');
      console.log('Chế độ hiển thị:', isDark ? 'Dark Mode' : 'Light Mode');

      // Cập nhật text nút bấm
      if (isDark) {
        darkModeToggleBtn.innerHTML = '☀️ Chuyển sang Light Mode';
      } else {
        darkModeToggleBtn.innerHTML = '🌙 Chuyển sang Dark Mode';
      }
    });
  }

  // =========================================================================
  // HOẠT ĐỘNG 3: "Live Input" - Phản hồi tức thì với sự kiện 'input'
  // =========================================================================
  const liveTextInput = document.getElementById('live-text-input');
  const liveSpanOutput = document.getElementById('live-span-output');
  const liveH2Output = document.getElementById('live-h2-output');
  const liveCharCount = document.getElementById('live-char-count');

  if (liveTextInput) {
    // Lắng nghe sự kiện 'input' để phản hồi từng ký tự ngay khi người dùng gõ
    liveTextInput.addEventListener('input', (event) => {
      const textValue = event.target.value;

      // Cập nhật thẻ span
      if (liveSpanOutput) {
        liveSpanOutput.innerText = textValue.trim() !== '' ? textValue : '(Chưa có dữ liệu)';
      }

      // Cập nhật thẻ h2 bên dưới (đúng yêu cầu Prompt mẫu)
      if (liveH2Output) {
        liveH2Output.innerText = textValue.trim() !== '' ? textValue : 'Nội dung hiển thị tức thì sẽ ở đây...';
      }

      // Đếm số ký tự
      if (liveCharCount) {
        liveCharCount.innerText = `${textValue.length} ký tự`;
      }
    });
  }
});
