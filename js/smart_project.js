/**
 * TUẦN 10: THAO TÁC VỚI DOM & XỬ LÝ SỰ KIỆN
 * TỆP: js/smart_project.js - XỬ LÝ THÁCH THỨC NHÓM "THE SMART PROJECT"
 * Tính năng:
 * - Đóng / Mở Modal thông minh không làm tải lại trang
 * - Đổ dữ liệu sản phẩm tương ứng vào Modal (Data Binding)
 * - Xử lý sự kiện Submit Form với preventDefault()
 * - Validate dữ liệu và hiển thị thông báo thành công mượt mà
 * - Đóng Modal bằng phím ESC và click backdrop bên ngoài
 */

document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.getElementById('checkout-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  const modalForm = document.getElementById('modal-checkout-form');
  const modalAlert = document.getElementById('modal-alert-box');

  // Các trường thông tin sản phẩm trên modal
  const modalProductTitle = document.getElementById('modal-product-title');
  const modalProductPrice = document.getElementById('modal-product-price');
  const modalTypeBadge = document.getElementById('modal-type-badge');
  const modalMainTitle = document.getElementById('modal-main-heading');
  const modalActionInput = document.getElementById('order-action-type');
  const modalProductInput = document.getElementById('order-product-name');

  // Hàm mở Modal
  function openModal(actionType, productName, productPrice) {
    if (!modalOverlay) return;

    // Reset alert và form
    if (modalAlert) {
      modalAlert.className = 'modal-alert';
      modalAlert.style.display = 'none';
      modalAlert.innerHTML = '';
    }
    if (modalForm) {
      modalForm.reset();
      modalForm.style.display = 'block';
    }

    // Cập nhật thông tin động vào Modal
    if (modalProductTitle) modalProductTitle.innerText = productName;
    if (modalProductPrice) modalProductPrice.innerText = productPrice;
    if (modalProductInput) modalProductInput.value = productName;
    if (modalActionInput) modalActionInput.value = actionType;

    if (actionType === 'buy') {
      if (modalMainTitle) modalMainTitle.innerText = '🛒 Xác Nhận Đặt Hàng Nhanh';
      if (modalTypeBadge) {
        modalTypeBadge.innerText = 'ĐƠN ĐẶT HÀNG';
        modalTypeBadge.className = 'badge badge-primary';
      }
    } else {
      if (modalMainTitle) modalMainTitle.innerText = '✉️ Liên Hệ & Tư Vấn Kỹ Thuật';
      if (modalTypeBadge) {
        modalTypeBadge.innerText = 'TƯ VẤN SẢN PHẨM';
        modalTypeBadge.className = 'badge badge-warning';
      }
    }

    // Hiển thị modal bằng cách thêm class .open
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Ngăn cuộn trang phía sau

    // Focus vào ô họ tên đầu tiên để tăng trải nghiệm UX
    setTimeout(() => {
      const nameField = document.getElementById('customer-name');
      if (nameField) nameField.focus();
    }, 100);
  }

  // Hàm đóng Modal
  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = ''; // Khôi phục cuộn trang
  }

  // Lắng nghe sự kiện click trên các nút "Mua hàng" và "Liên hệ"
  const buyButtons = document.querySelectorAll('.btn-buy-action');
  buyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productCard = btn.closest('.product-card');
      const title = productCard ? productCard.querySelector('.product-title')?.innerText : 'Sản phẩm LHU Pro';
      const price = productCard ? productCard.querySelector('.product-price')?.innerText : '1.890.000 VNĐ';
      openModal('buy', title, price);
    });
  });

  const contactButtons = document.querySelectorAll('.btn-contact-action');
  contactButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productCard = btn.closest('.product-card');
      const title = productCard ? productCard.querySelector('.product-title')?.innerText : 'Sản phẩm LHU Pro';
      const price = productCard ? productCard.querySelector('.product-price')?.innerText : 'Tư vấn miễn phí';
      openModal('contact', title, price);
    });
  });

  // Lắng nghe nút Đóng (X)
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Lắng nghe nút Hủy
  if (modalCancelBtn) {
    modalCancelBtn.addEventListener('click', closeModal);
  }

  // Lắng nghe click bên ngoài backdrop để đóng Modal
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Lắng nghe phím ESC trên bàn phím để đóng Modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  // Xử lý sự kiện SUBMIT FORM không reload trang (sử dụng preventDefault)
  if (modalForm) {
    modalForm.addEventListener('submit', (event) => {
      // 1. Ngăn chặn hành vi mặc định gửi form và tải lại trang
      event.preventDefault();

      const nameVal = document.getElementById('customer-name')?.value.trim();
      const phoneVal = document.getElementById('customer-phone')?.value.trim();
      const emailVal = document.getElementById('customer-email')?.value.trim();
      const noteVal = document.getElementById('customer-note')?.value.trim();
      const actionType = modalActionInput?.value || 'buy';
      const productName = modalProductInput?.value || 'Sản phẩm công nghệ';

      // 2. Validate dữ liệu cơ bản phía Client
      if (!nameVal || !phoneVal) {
        if (modalAlert) {
          modalAlert.className = 'modal-alert error';
          modalAlert.innerHTML = '⚠️ Vui lòng điền đầy đủ Họ tên và Số điện thoại liên hệ!';
          modalAlert.style.display = 'block';
        }
        return;
      }

      // Kiểm tra định dạng số điện thoại Việt Nam (10 số, bắt đầu bằng 0)
      const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
      if (!phoneRegex.test(phoneVal)) {
        if (modalAlert) {
          modalAlert.className = 'modal-alert error';
          modalAlert.innerHTML = '⚠️ Số điện thoại không đúng định dạng (Ví dụ: 0912345678)!';
          modalAlert.style.display = 'block';
        }
        return;
      }

      // Tạo mã đơn ngẫu nhiên
      const randomOrderId = 'LHU-' + Math.floor(100000 + Math.random() * 900000);

      // 3. Hiển thị thông báo thành công trực tiếp mà không tải lại trang
      modalForm.style.display = 'none';

      if (modalAlert) {
        modalAlert.className = 'modal-alert success';
        modalAlert.style.display = 'block';
        modalAlert.innerHTML = `
          <div style="text-align: center; padding: 10px 0;">
            <div style="font-size: 2.5rem; margin-bottom: 8px;">🎉</div>
            <h4 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; color: var(--success-text);">
              ${actionType === 'buy' ? 'Đặt Hàng Thành Công!' : 'Gửi Yêu Cầu Tư Vấn Thành Công!'}
            </h4>
            <p style="margin-bottom: 12px; font-size: 0.95rem;">
              Cảm ơn anh/chị <strong>${nameVal}</strong> đã quan tâm đến sản phẩm của chúng tôi.
            </p>
            <div style="background: rgba(255,255,255,0.7); border: 1px dashed var(--success-border); border-radius: 8px; padding: 12px; margin-bottom: 16px; font-size: 0.88rem; text-align: left;">
              <p>📦 <strong>Sản phẩm:</strong> ${productName}</p>
              <p>🔖 <strong>Mã phiếu:</strong> <span style="font-family:monospace; font-weight:700;">${randomOrderId}</span></p>
              <p>📞 <strong>Số điện thoại:</strong> ${phoneVal}</p>
              ${emailVal ? `<p>📧 <strong>Email:</strong> ${emailVal}</p>` : ''}
              ${noteVal ? `<p>📝 <strong>Ghi chú:</strong> ${noteVal}</p>` : ''}
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">
              Nhân viên tư vấn LHU Store sẽ liên hệ lại với bạn trong vòng 15 phút.
            </p>
            <button type="button" id="btn-success-done" class="btn btn-primary" style="min-width: 140px;">
              Hoàn Tất & Đóng
            </button>
          </div>
        `;

        const doneBtn = document.getElementById('btn-success-done');
        if (doneBtn) {
          doneBtn.addEventListener('click', closeModal);
        }
      }
    });
  }
});
