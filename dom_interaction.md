# BÁO CÁO MÔ TẢ CÁC SỰ KIỆN DOM (DOM INTERACTION REPORT)
**HỌC PHẦN 111101 · THIẾT KẾ WEB · ĐẠI HỌC LẠC HỒNG (LHU)**  
**TUẦN 10: THAO TÁC VỚI DOM & XỬ LÝ SỰ KIỆN (DOM MANIPULATION & EVENT HANDLING)**

---

### THÔNG TIN SINH VIÊN / NHÓM THỰC HIỆN
- **Họ và tên:** huuphuocgith2802
- **Mã số sinh viên (MSSV):** 125000155
- **Email sinh viên:** 125000155@lachong.edu.vn
- **Lớp / Học phần:** 111101 - Thiết kế Web
- **Khoa:** Công Nghệ Thông Tin - Đại học Lạc Hồng
- **GitHub Repository:** [https://github.com/huuphuocgith2802/tuan10baitap_website](https://github.com/huuphuocgith2802/tuan10baitap_website)

---

## 1. TỔNG QUAN CHUẨN ĐẦU RA BÀI HỌC (LLO)
Dự án đã đáp ứng đầy đủ và toàn diện 4 chuẩn đầu ra của Tuần 10:
- **LLO 3.3.1:** Sử dụng thành thạo `querySelector`, `querySelectorAll` và `getElementById` để chọn chính xác các phần tử trên trang.
- **LLO 3.3.2:** Thay đổi linh hoạt nội dung văn bản (`innerText`, `innerHTML`) và các thuộc tính (`src`, `alt`, `type`, `classList`, `style`) của phần tử.
- **LLO 3.3.3:** Viết hàm xử lý sự kiện với `addEventListener` cho các hành động tương tác chính: `click`, `input`, `submit`, `keydown`, `change`.
- **LLO 3.3.4:** Ứng dụng Prompt AI để xây dựng các tương tác nâng cao: Đóng/Mở Modal, Form không tải lại trang với `preventDefault()`, Bộ sưu tập ảnh và Mobile Menu drawer.

---

## 2. BẢNG TỔNG HỢP CÁC SỰ KIỆN (DOM EVENTS) TRONG DỰ ÁN

| STT | Tên Sự Kiện | Phần Tử Lắng Nghe | Phương Thức Xử Lý | Mục Đích & Hành Động Phản Hồi |
| :---: | :--- | :--- | :--- | :--- |
| **1** | `click` | `.btn-buy-action`, `.btn-contact-action` | `addEventListener('click')` | Mở Modal đặt hàng / tư vấn, truyền dữ liệu sản phẩm tương ứng vào Modal. |
| **2** | `click` | `#modal-close-btn`, `#modal-cancel-btn` | `addEventListener('click')` | Đóng Modal popup, gỡ bỏ class `.open` và trả lại trạng thái scroll cho body. |
| **3** | `click` | `#checkout-modal` (Overlay Backdrop) | `addEventListener('click')` | Đóng Modal khi người dùng click vào vùng mờ bên ngoài hộp thoại. |
| **4** | `keydown` | `document` (`e.key === 'Escape'`) | `addEventListener('keydown')` | Hỗ trợ trải nghiệm UX người dùng nhấn phím `ESC` để đóng Modal nhanh. |
| **5** | `submit` | `#modal-checkout-form` | `addEventListener('submit')` | Chặn tải lại trang với `e.preventDefault()`, validate dữ liệu và hiển thị thông báo thành công. |
| **6** | `click` | `#btn-picker-inspect` | `addEventListener('click')` | Thực thi `document.querySelector('.menu-item')` và in kết quả ra màn hình console. |
| **7** | `click` | `#btn-picker-color-red` | `addEventListener('click')` | Sử dụng `document.querySelectorAll('#menu a')` và đổi màu chữ thành `#ef4444`. |
| **8** | `click` | `#bulb-toggle-btn` | `addEventListener('click')` | Đổi thuộc tính `src` giữa ảnh bóng đèn bật và tắt (`bulb_on.svg` & `bulb_off.svg`). |
| **9** | `click` | `#toggle-btn`, `#header-theme-toggle` | `addEventListener('click')` | Chuyển đổi giao diện Sáng / Tối (Dark / Light Mode) bằng `classList.toggle('dark-mode')`. |
| **10** | `input` | `#live-text-input` | `addEventListener('input')` | Phản hồi từng ký tự gõ vào theo thời gian thực lên thẻ `<span>` và thẻ `<h2>`. |
| **11** | `click` | `#hw1-greet-btn` | `addEventListener('click')` | Lấy tên từ input và hiển thị `Chào mừng [Tên]!` lên thẻ thông báo web thay vì dùng `alert()`. |
| **12** | `click` | `.gallery-thumb` | `addEventListener('click')` | Thay đổi `src` và `alt` của ảnh lớn (`#hw2-main-image`) và kích hoạt viền highlight `.active`. |
| **13** | `click` | `#hw3-add-btn` | `addEventListener('click')` | Tạo thẻ `<li>` mới bằng `document.createElement('li')` và chèn vào danh sách To-Do List. |
| **14** | `change` | `.todo-checkbox` | `addEventListener('change')` | Bật/tắt class `.completed` để gạch ngang việc đã hoàn thành. |
| **15** | `click` | `.todo-delete-btn` | `addEventListener('click')` | Xóa phần tử công việc khỏi danh sách bằng phương thức `li.remove()`. |
| **16** | `input` | `#hw4-password-input` | `addEventListener('input')` | Kiểm tra độ dài mật khẩu realtime: `< 8` báo đỏ "Quá ngắn", `>= 8` báo xanh "Hợp lệ". |
| **17** | `click` | `#hw5-zoom-in`, `#hw5-zoom-out` | `addEventListener('click')` | Tăng hoặc giảm thuộc tính `style.fontSize` của văn bản mỗi lần `2px`. |
| **18** | `click` | `#hw6-toggle-btn` | `addEventListener('click')` | Chuyển đổi thuộc tính `type` của thẻ input giữa `"password"` và `"text"`. |

---

## 3. CHI TIẾT CÁC TƯƠNG TÁC THEO TỪNG HẠNG MỤC

### 3.1. 🎯 THÁCH THỨC TUẦN 10: "THE SMART PROJECT" (DỰ ÁN NHÓM)
#### A. Mục tiêu & Luồng hoạt động
1. Khi người dùng bấm nút **"Mua Hàng Ngay"** hoặc **"Tư Vấn Thêm"** trên bất kỳ sản phẩm nào:
   - JavaScript truy xuất thông tin từ card sản phẩm (Tên sản phẩm, giá bán).
   - Đổ dữ liệu động vào hộp tóm tắt trong Modal (Data binding).
   - Thêm class `.open` vào modal backdrop để kích hoạt hiệu ứng hiển thị mờ dần và trượt mượt mà.
   - Tự động `focus()` vào ô nhập họ tên đầu tiên.
2. Đóng Modal linh hoạt bằng 3 cách:
   - Nhấp vào nút đóng `&times;` (`#modal-close-btn`) hoặc nút **"Hủy Bỏ"**.
   - Nhấp chuột ra vùng mờ (backdrop) bên ngoài hộp thoại.
   - Nhấn phím `Escape` (`ESC`) trên bàn phím.
3. Xử lý Form đăng ký/mua hàng:
   - Sử dụng `event.preventDefault()` để ngăn trình duyệt reload lại toàn bộ trang.
   - Kiểm tra định dạng số điện thoại Việt Nam (Regex `/(84|0[3|5|7|8|9])+([0-9]{8})\b/`).
   - Ẩn form và render thẻ kết quả thành công chứa mã đơn hàng ngẫu nhiên (`LHU-XXXXXX`), tóm tắt sản phẩm và lời cảm ơn.

#### B. Đoạn mã JavaScript cốt lõi
```javascript
// Ngăn reload trang và xử lý gửi form
modalForm.addEventListener('submit', (event) => {
  event.preventDefault(); // CHẶN HÀNH VI MẶC ĐỊNH

  const nameVal = document.getElementById('customer-name').value.trim();
  const phoneVal = document.getElementById('customer-phone').value.trim();

  if (!nameVal || !phoneVal) {
    showAlert('error', '⚠️ Vui lòng điền đầy đủ Họ tên và Số điện thoại!');
    return;
  }

  // Ẩn form và hiển thị kết quả thành công
  modalForm.style.display = 'none';
  modalAlert.innerHTML = `
    <h4>🎉 Đặt Hàng Thành Công!</h4>
    <p>Cảm ơn <strong>${nameVal}</strong> đã mua hàng. Mã đơn: LHU-${Date.now().toString().slice(-6)}</p>
  `;
});
```

---

### 3.2. 🏫 HOẠT ĐỘNG THỰC HÀNH TRÊN LỚP (IN-CLASS ACTIVITIES)

#### Hoạt động 1: "The Element Picker" - Truy tìm thẻ
- **Cú pháp sử dụng:**
  ```javascript
  const firstItem = document.querySelector('.menu-item');
  console.log(firstItem);

  // Vibe Coding Prompt: Chọn tất cả các thẻ <a> bên trong thẻ có id="menu" và đổi màu đỏ
  const menuLinks = document.querySelectorAll('#menu a');
  menuLinks.forEach(link => {
    link.style.color = '#ef4444';
  });
  ```
- **Ý nghĩa:** Giúp sinh viên phân biệt sự khác nhau giữa `querySelector` (trả về 1 phần tử đầu tiên) và `querySelectorAll` (trả về danh sách `NodeList` để lặp duyệt).

#### Hoạt động 2: "Light Switch" - Bật/Tắt bóng đèn & Dark Mode
- **Cú pháp sử dụng:**
  ```javascript
  bulbToggleBtn.addEventListener('click', () => {
    isBulbOn = !isBulbOn;
    bulbImage.src = isBulbOn ? 'assets/images/bulb_on.svg' : 'assets/images/bulb_off.svg';
  });

  // Prompt mẫu giáo trình: Đổi màu nền body từ trắng sang đen và ngược lại
  darkModeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
  ```
- **Ý nghĩa:** Minh họa việc thay đổi thuộc tính `src` của thẻ `<img>` và quản lý trạng thái giao diện qua CSS class.

#### Hoạt động 3: "Live Input" - Phản hồi tức thì
- **Cú pháp sử dụng:**
  ```javascript
  liveTextInput.addEventListener('input', (event) => {
    const text = event.target.value;
    liveSpanOutput.innerText = text;
    liveH2Output.innerText = text || 'Nội dung hiển thị tức thì sẽ ở đây...';
  });
  ```
- **Ý nghĩa:** Giúp sinh viên nắm rõ sự kiện `input` phản hồi ngay từng phím gõ, khác với sự kiện `change` chỉ kích hoạt khi mất tiêu điểm (blur).

---

### 3.3. 📝 6 BÀI TẬP TỰ RÈN LUYỆN TẠI NHÀ (HOMEWORK)

1. **Bài 1 - Thay đổi lời chào theo tên:**
   - Sử dụng `innerText` và `innerHTML` để đưa lời chào vào một Alert Box đẹp mắt trên web, loại bỏ hoàn toàn việc dùng popup `alert()` gây chặn luồng giao diện.
2. **Bài 2 - Bộ sưu tập ảnh (Simple Gallery):**
   - Lắng nghe `click` trên danh sách `.gallery-thumb`, lấy giá trị `src` từ ảnh con và gán cho `#main-img.src`.
   - Cập nhật class `.active` tạo viền sáng giúp người dùng nhận biết ảnh đang chọn.
3. **Bài 3 - Danh sách việc cần làm (To-Do List):**
   - Sử dụng `document.createElement('li')` tạo thẻ mới, gán `innerHTML` gồm checkbox, văn bản và nút xóa.
   - Sử dụng `appendChild` chèn vào thẻ `<ul>`.
   - Thêm sự kiện `change` cho checkbox để toggle class `.completed` (gạch ngang chữ).
   - Thêm sự kiện `click` cho nút xóa để gọi `li.remove()`.
4. **Bài 4 - Kiểm tra độ dài mật khẩu:**
   - Lắng nghe sự kiện `input` trên ô mật khẩu.
   - Tính toán `password.length`: nếu `< 8` hiển thị cảnh báo đỏ và thanh tiến trình ngắn; nếu `>= 8` hiển thị thông báo màu xanh hợp lệ.
5. **Bài 5 - Thay đổi kích thước văn bản:**
   - Quản lý biến trạng thái `currentFontSize = 16`.
   - Mỗi lần bấm "Phóng to" tăng `+2px`, bấm "Thu nhỏ" giảm `-2px`.
   - Cập nhật trực tiếp `element.style.fontSize = currentFontSize + 'px'` và hiển thị số px trên UI.
6. **Bài 6 - Ẩn / Hiện mật khẩu:**
   - Lấy thuộc tính `type` của thẻ input bằng `input.getAttribute('type')` hoặc `input.type`.
   - Nếu đang là `'password'` thì gán `'text'`, cập nhật nhãn nút thành "Ẩn"; nếu đang là `'text'` thì đổi về `'password'` và cập nhật nhãn "Hiện".

---

## 4. KẾT LUẬN & ĐÁNH GIÁ TRẢI NGHIỆM NGƯỜI DÙNG (UX)
- Giao diện được thiết kế hiện đại, đáp ứng tốt trên máy tính và điện thoại di động (Responsive).
- Hỗ trợ cả 2 chế độ Sáng / Tối (Light & Dark Mode) đồng bộ.
- Phản hồi tương tác của các sự kiện diễn ra tức thì, không gây giật lag hay reload trang ngoài ý muốn.
- Cấu trúc thư mục rõ ràng, code JavaScript được chú thích chi tiết từng hàm và sự kiện.
