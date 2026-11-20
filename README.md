# TUẦN 10: THAO TÁC VỚI DOM & XỬ LÝ SỰ KIỆN (DOM MANIPULATION)

> **HỌC PHẦN 111101 · THIẾT KẾ WEB · ĐẠI HỌC LẠC HỒNG (LHU)**  
> **Giáo trình:** Thiết kế Web Lạc Hồng (Trang 68 - 69)  
> **Sinh viên:** huuphuocgith2802  
> **MSSV:** 125000155  
> **Email:** 125000155@lachong.edu.vn  
> **GitHub Repository:** [https://github.com/huuphuocgith2802/tuan10baitap_website](https://github.com/huuphuocgith2802/tuan10baitap_website)

---

## 📋 GIỚI THIỆU DỰ ÁN
Dự án được xây dựng nhằm hoàn thành toàn bộ nội dung bài học **Tuần 10: Thao tác với DOM & Xử lý sự kiện** của bộ môn Thiết kế Web. Trang web được thiết kế theo phong cách hiện đại (Modern UI, Glassmorphism, chuẩn responsive cho mọi kích thước màn hình), hỗ trợ Dark/Light Mode và tích hợp trọn vẹn:
1. **🎯 The Smart Project (Thách thức nhóm):** Hệ thống đặt hàng & tư vấn sản phẩm công nghệ với Modal Popup tương tác hoàn toàn bằng JavaScript, xử lý form submit với `event.preventDefault()` không làm reload trang web.
2. **🏫 3 Hoạt động thực hành trên lớp (In-class Activities):**
   - Hoạt động 1: *The Element Picker* - Truy tìm thẻ bằng `querySelector` / `querySelectorAll` và đổi màu chữ theo prompt AI.
   - Hoạt động 2: *Light Switch* - Bật/Tắt bóng đèn bằng cách thay đổi thuộc tính `src` của thẻ `<img>` và Dark mode cho trang web.
   - Hoạt động 3: *Live Input* - Phản hồi nội dung gõ phím tức thì với sự kiện `input` lên thẻ `<span>` và `<h2>`.
3. **📝 6 Bài tập tự rèn luyện tại nhà (Homework):**
   - **Bài 1:** Thay đổi lời chào theo tên (hiển thị trên giao diện thay vì alert).
   - **Bài 2:** Bộ sưu tập ảnh (Simple Gallery - click ảnh nhỏ đổi ảnh lớn).
   - **Bài 3:** Danh sách việc cần làm (To-Do List cơ bản - thêm thẻ `<li>`, check hoàn thành, xóa việc).
   - **Bài 4:** Kiểm tra độ dài mật khẩu (realtime: `< 8` màu đỏ, `>= 8` màu xanh, có thanh đo meter).
   - **Bài 5:** Thay đổi kích thước văn bản (nút Phóng to/Thu nhỏ tăng/giảm `2px`).
   - **Bài 6:** Ẩn/Hiện mật khẩu (chuyển đổi `type="password"` thành `type="text"` và ngược lại).
4. **📑 Tài liệu nộp bắt buộc:** File `dom_interaction.md` tổng hợp và mô tả toàn bộ sự kiện DOM đã sử dụng.

---

## 📂 CẤU TRÚC THƯ MỤC DỰ ÁN

```text
tuan10_website/
├── index.html                       # Trang chủ tổng hợp toàn bộ bài tập & The Smart Project
├── dom_interaction.md               # Tài liệu báo cáo chi tiết các sự kiện DOM đã sử dụng
├── README.md                        # Hướng dẫn chi tiết dự án & thông tin sinh viên
├── css/
│   └── style.css                    # Toàn bộ CSS phong cách Modern UI, Dark/Light mode
├── js/
│   ├── main.js                      # Điều phối giao diện, navigation, scroll & theme
│   ├── inclass.js                   # Logic xử lý 3 hoạt động thực hành trên lớp
│   ├── homework.js                  # Logic xử lý 6 bài tập tự rèn luyện tại nhà
│   └── smart_project.js             # Logic xử lý Modal, Data Binding & Submit không reload
├── assets/
│   ├── images/                      # Ảnh vector SVG sắc nét: bóng đèn, gallery, sản phẩm
│   │   ├── bulb_off.svg
│   │   ├── bulb_on.svg
│   │   ├── gallery_1.svg
│   │   ├── gallery_2.svg
│   │   ├── gallery_3.svg
│   │   ├── gallery_4.svg
│   │   ├── product_keyboard.svg
│   │   └── product_headphone.svg
│   └── icons/
└── exercises/                       # Các thư mục bài tập độc lập (chạy lẻ từng bài)
    ├── inclass_activities/index.html
    ├── smart_project/index.html
    ├── bai1_chao_hoi/index.html
    ├── bai2_gallery/index.html
    ├── bai3_todolist/index.html
    ├── bai4_password_check/index.html
    ├── bai5_font_size/index.html
    └── bai6_toggle_password/index.html
```

---

## 🚀 HƯỚNG DẪN CHẠY DỰ ÁN

### Cách 1: Mở trực tiếp trong trình duyệt (Không cần cài đặt)
1. Clone hoặc tải mã nguồn về máy:
   ```bash
   git clone https://github.com/huuphuocgith2802/tuan10baitap_website.git
   ```
2. Mở thư mục dự án và nhấp đúp vào tệp `index.html` để trải nghiệm trực tiếp trên Google Chrome, Microsoft Edge, Firefox,...

### Cách 2: Sử dụng Live Server trong VS Code / Antigravity IDE
1. Mở thư mục dự án trong IDE.
2. Cài đặt extension **Live Server** (nếu dùng VS Code).
3. Nhấp chuột phải vào `index.html` và chọn **"Open with Live Server"**.

---

## 🎯 CÁC CHUẨN ĐẦU RA BÀI HỌC (LLO) ĐÃ ĐẠT ĐƯỢC

- **LLO 3.3.1:** Sử dụng thành thạo `querySelector` và `getElementById` để truy xuất chính xác các phần tử trên trang.
- **LLO 3.3.2:** Thay đổi linh hoạt nội dung văn bản (`innerText`, `innerHTML`) và các thuộc tính (`src`, `href`, `type`, `classList`).
- **LLO 3.3.3:** Viết hàm xử lý sự kiện `addEventListener` cho các hành động: `click`, `input`, `submit`, `keydown`, `change`.
- **LLO 3.3.4:** Ứng dụng Prompt AI để xây dựng các tương tác nâng cao (Modal popup, To-Do list, Dark Mode).

---

## 👥 THÔNG TIN BẢN QUYỀN
Dự án được thực hiện bởi sinh viên **huuphuocgith2802 (MSSV: 125000155)** thuộc Học phần 111101 - Thiết kế Web, Trường Đại học Lạc Hồng.
Mọi mã nguồn đều tuân thủ các quy tắc lập trình sạch (Clean Code), chú thích chi tiết và tối ưu hóa trải nghiệm người dùng (UX).
