/**
 * TUẦN 10: THAO TÁC VỚI DOM & XỬ LÝ SỰ KIỆN
 * TỆP: js/homework.js - XỬ LÝ 6 BÀI TẬP TỰ RÈN LUYỆN TẠI NHÀ (HOMEWORK)
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // BÀI 1: Thay đổi lời chào theo tên
  // Yêu cầu: 1 ô input và 1 nút bấm. Khi nhấn nút, hiển thị "Chào mừng [Tên người dùng]!"
  // lên trang web thay vì dùng alert.
  // =========================================================================
  const nameInput = document.getElementById('hw1-name-input');
  const greetingBtn = document.getElementById('hw1-greet-btn');
  const greetingResult = document.getElementById('hw1-greeting-result');

  if (greetingBtn && nameInput && greetingResult) {
    greetingBtn.addEventListener('click', () => {
      const userName = nameInput.value.trim();

      if (userName === '') {
        greetingResult.innerHTML = `
          <div class="greeting-alert" style="background-color: var(--danger-bg); border-color: var(--danger-border); color: var(--danger-text);">
            ⚠️ Vui lòng nhập họ và tên của bạn trước khi tiếp tục!
          </div>
        `;
        nameInput.focus();
        return;
      }

      // Hiển thị lời chào trực tiếp lên giao diện (không dùng alert())
      greetingResult.innerHTML = `
        <div class="greeting-alert">
          👋 Chào mừng <strong>${userName}</strong> đến với môn Thiết Kế Web (Đại học Lạc Hồng)!
        </div>
      `;
    });

    // Cho phép nhấn phím Enter để kích hoạt
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        greetingBtn.click();
      }
    });
  }

  // =========================================================================
  // BÀI 2: Bộ sưu tập ảnh (Simple Gallery)
  // Yêu cầu: Có 1 ảnh lớn và các ảnh nhỏ bên dưới. Click vào ảnh nhỏ nào,
  // ảnh lớn sẽ thay đổi thành ảnh đó thông qua thuộc tính src.
  // =========================================================================
  const mainGalleryImage = document.getElementById('hw2-main-image');
  const galleryCaption = document.getElementById('hw2-gallery-caption');
  const galleryThumbnails = document.querySelectorAll('.gallery-thumb');

  if (mainGalleryImage && galleryThumbnails.length > 0) {
    galleryThumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener('click', () => {
        // Lấy thẻ img con bên trong thumbnail được click
        const thumbImg = thumbnail.querySelector('img');
        if (!thumbImg) return;

        // Thay đổi thuộc tính src và alt của ảnh lớn
        const newSrc = thumbImg.getAttribute('src');
        const newAlt = thumbImg.getAttribute('alt');
        const title = thumbnail.getAttribute('data-title') || newAlt;

        // Hiệu ứng mờ dần nhẹ nhàng khi đổi ảnh
        mainGalleryImage.style.opacity = '0.3';
        setTimeout(() => {
          mainGalleryImage.src = newSrc;
          mainGalleryImage.alt = newAlt;
          mainGalleryImage.style.opacity = '1';
        }, 150);

        if (galleryCaption) {
          galleryCaption.innerText = `🖼️ Đang xem: ${title}`;
        }

        // Cập nhật class 'active' cho thumbnail
        galleryThumbnails.forEach(t => t.classList.remove('active'));
        thumbnail.classList.add('active');
      });
    });
  }

  // =========================================================================
  // BÀI 3: Danh sách việc cần làm (To-Do List cơ bản)
  // Yêu cầu: Cho phép người dùng nhập công việc vào ô input và nhấn "Thêm".
  // Công việc mới sẽ xuất hiện dưới dạng một thẻ <li> mới trong danh sách.
  // =========================================================================
  const todoInput = document.getElementById('hw3-todo-input');
  const todoAddBtn = document.getElementById('hw3-add-btn');
  const todoList = document.getElementById('hw3-todo-list');
  const todoEmptyNotice = document.getElementById('hw3-empty-notice');

  function updateTodoEmptyNotice() {
    if (!todoEmptyNotice || !todoList) return;
    const items = todoList.querySelectorAll('.todo-item');
    if (items.length === 0) {
      todoEmptyNotice.style.display = 'block';
    } else {
      todoEmptyNotice.style.display = 'none';
    }
  }

  function addTodoItem() {
    if (!todoInput || !todoList) return;
    const taskText = todoInput.value.trim();

    if (taskText === '') {
      todoInput.focus();
      return;
    }

    // 1. Tạo thẻ <li> mới bằng createElement
    const li = document.createElement('li');
    li.className = 'todo-item';

    // 2. Tạo nội dung bên trong thẻ li
    li.innerHTML = `
      <div class="todo-content">
        <input type="checkbox" class="todo-checkbox" title="Đánh dấu hoàn thành">
        <span class="todo-text">${taskText}</span>
      </div>
      <button class="todo-delete-btn" title="Xóa công việc">🗑️</button>
    `;

    // 3. Thêm sự kiện đánh dấu hoàn tất cho checkbox
    const checkbox = li.querySelector('.todo-checkbox');
    checkbox.addEventListener('change', () => {
      li.classList.toggle('completed', checkbox.checked);
    });

    // 4. Thêm sự kiện xóa công việc
    const deleteBtn = li.querySelector('.todo-delete-btn');
    deleteBtn.addEventListener('click', () => {
      li.remove();
      updateTodoEmptyNotice();
    });

    // 5. Gắn thẻ li mới vào danh sách ul
    todoList.appendChild(li);

    // 6. Xóa dữ liệu ô input và focus lại
    todoInput.value = '';
    todoInput.focus();
    updateTodoEmptyNotice();
  }

  if (todoAddBtn && todoInput) {
    todoAddBtn.addEventListener('click', addTodoItem);
    todoInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        addTodoItem();
      }
    });
  }

  // =========================================================================
  // BÀI 4: Kiểm tra độ dài mật khẩu
  // Yêu cầu: Khi người dùng gõ vào ô mật khẩu, nếu độ dài < 8 ký tự thì hiện
  // thông báo màu đỏ "Mật khẩu quá ngắn", nếu >= 8 ký tự thì hiện màu xanh "Mật khẩu hợp lệ".
  // =========================================================================
  const pwdInput = document.getElementById('hw4-password-input');
  const pwdStatusMsg = document.getElementById('hw4-status-msg');
  const pwdMeterFill = document.getElementById('hw4-meter-fill');

  if (pwdInput && pwdStatusMsg) {
    pwdInput.addEventListener('input', () => {
      const len = pwdInput.value.length;

      if (len === 0) {
        pwdStatusMsg.innerText = 'Vui lòng nhập mật khẩu để kiểm tra độ dài.';
        pwdStatusMsg.className = 'password-status-msg';
        if (pwdMeterFill) {
          pwdMeterFill.style.width = '0%';
          pwdMeterFill.style.backgroundColor = 'transparent';
        }
        return;
      }

      if (len < 8) {
        // < 8 ký tự: hiện thông báo màu đỏ "Mật khẩu quá ngắn"
        pwdStatusMsg.innerText = `❌ Mật khẩu quá ngắn (${len}/8 ký tự)`;
        pwdStatusMsg.className = 'password-status-msg msg-short';

        if (pwdMeterFill) {
          pwdMeterFill.style.width = `${(len / 8) * 60}%`;
          pwdMeterFill.style.backgroundColor = '#ef4444';
        }
      } else {
        // >= 8 ký tự: hiện thông báo màu xanh "Mật khẩu hợp lệ"
        pwdStatusMsg.innerText = `✔️ Mật khẩu hợp lệ (${len} ký tự)`;
        pwdStatusMsg.className = 'password-status-msg msg-valid';

        if (pwdMeterFill) {
          pwdMeterFill.style.width = '100%';
          pwdMeterFill.style.backgroundColor = '#10b981';
        }
      }
    });
  }

  // =========================================================================
  // BÀI 5: Thay đổi kích thước văn bản
  // Yêu cầu: Tạo 2 nút "Phóng to" và "Thu nhỏ". Khi nhấn, kích thước chữ của
  // đoạn văn bản tăng hoặc giảm 2px.
  // =========================================================================
  const targetText = document.getElementById('target-text');
  const btnZoomIn = document.getElementById('hw5-zoom-in');
  const btnZoomOut = document.getElementById('hw5-zoom-out');
  const btnResetFont = document.getElementById('hw5-reset-font');
  const fontSizeDisplay = document.getElementById('hw5-current-size');

  let currentFontSize = 16; // Kích thước chữ mặc định ban đầu là 16px

  function updateFontSize() {
    if (!targetText) return;
    targetText.style.fontSize = `${currentFontSize}px`;
    if (fontSizeDisplay) {
      fontSizeDisplay.innerText = `${currentFontSize}px`;
    }
  }

  if (btnZoomIn && btnZoomOut && targetText) {
    // Nút Phóng to (+2px)
    btnZoomIn.addEventListener('click', () => {
      if (currentFontSize < 36) { // Giới hạn tối đa hợp lý
        currentFontSize += 2;
        updateFontSize();
      }
    });

    // Nút Thu nhỏ (-2px)
    btnZoomOut.addEventListener('click', () => {
      if (currentFontSize > 10) { // Giới hạn tối thiểu đọc được
        currentFontSize -= 2;
        updateFontSize();
      }
    });

    // Nút Đặt lại mặc định (16px)
    if (btnResetFont) {
      btnResetFont.addEventListener('click', () => {
        currentFontSize = 16;
        updateFontSize();
      });
    }
  }

  // =========================================================================
  // BÀI 6: Ẩn/Hiện mật khẩu
  // Yêu cầu: Tạo một ô input mật khẩu và một nút "Hiện". Khi nhấn,
  // chuyển type="password" thành type="text" và ngược lại.
  // =========================================================================
  const toggleInput = document.getElementById('hw6-password-input');
  const toggleBtn = document.getElementById('hw6-toggle-btn');
  const toggleIcon = document.getElementById('hw6-toggle-icon');
  const toggleText = document.getElementById('hw6-toggle-text');

  if (toggleInput && toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      // Kiểm tra thuộc tính type hiện tại của ô input
      const currentType = toggleInput.getAttribute('type');

      if (currentType === 'password') {
        // Chuyển sang type="text" để hiển thị mật khẩu
        toggleInput.setAttribute('type', 'text');
        if (toggleText) toggleText.innerText = 'Ẩn';
        if (toggleIcon) toggleIcon.innerText = '🔒';
        toggleBtn.setAttribute('title', 'Ẩn mật khẩu');
      } else {
        // Chuyển lại type="password" để ẩn mật khẩu
        toggleInput.setAttribute('type', 'password');
        if (toggleText) toggleText.innerText = 'Hiện';
        if (toggleIcon) toggleIcon.innerText = '👁️';
        toggleBtn.setAttribute('title', 'Hiện mật khẩu');
      }

      // Giữ focus cho ô input sau khi click
      toggleInput.focus();
    });
  }
});
