/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// Các phần tử DOM cần thiết
const oTimKiem = document.getElementById('o-tim-kiem');
const list = document.getElementById('list');
const boDem = document.getElementById('bo-dem');
const khongThay = document.getElementById('khong-thay');
const nutDang = document.getElementById('nut-dang');
const inputTieuDe = document.getElementById('tin-tieu-de');
const inputNoiDung = document.getElementById('tin-noi-dung');
const baoLoi = document.getElementById('bao-loi');

// Hàm cập nhật bộ đếm
function capNhatBoDem() {
    const cacTin = list.querySelectorAll('li');
    const tongSo = cacTin.length;
    let soHienThi = 0;
    
    cacTin.forEach(tin => {
        if (!tin.classList.contains('an')) {
            soHienThi++;
        }
    });
    
    boDem.textContent = `Đang hiển thị ${soHienThi}/${tongSo} tin`;
}

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem
oTimKiem.addEventListener('keyup', () => {
    const tuKhoa = oTimKiem.value.toLowerCase();
    const cacTin = list.querySelectorAll('li');
    let soTinKhop = 0;

    cacTin.forEach(tin => {
        const tieuDe = tin.querySelector('h3').textContent.toLowerCase();
        const noiDung = tin.querySelector('p').textContent.toLowerCase();
        
        if (tieuDe.includes(tuKhoa) || noiDung.includes(tuKhoa)) {
            tin.classList.remove('an');
            soTinKhop++;
        } else {
            tin.classList.add('an');
        }
    });

    if (soTinKhop === 0 && oTimKiem.value !== "") {
        khongThay.classList.remove('an');
        khongThay.textContent = `Không tìm thấy tin nào cho "${oTimKiem.value}"`;
    } else {
        khongThay.classList.add('an');
    }
    
    capNhatBoDem();
});

// F4. Nút "Read more >>" / "Thu gọn <<" (Sử dụng Event Delegation)
list.addEventListener('click', (e) => {
    if (e.target.classList.contains('more')) {
        const theP = e.target.parentNode.querySelector('p');
        
        if (theP.classList.contains('day-du')) {
            theP.classList.remove('day-du');
            e.target.textContent = 'Read more >>';
        } else {
            theP.classList.add('day-du');
            e.target.textContent = 'Thu gọn <<';
        }
    }
});

// F5. Nút #nut-dang: Đăng tin nhanh
nutDang.addEventListener('click', () => {
    const tieuDe = inputTieuDe.value.trim();
    const noiDung = inputNoiDung.value.trim();

    if (tieuDe === "" || noiDung === "") {
        baoLoi.textContent = 'Vui lòng nhập đủ tiêu đề và nội dung.';
        return;
    }

    // Xoá thông báo lỗi nếu có
    baoLoi.textContent = '';

    // Tạo các phần tử mới
    const theLiMoi = document.createElement('li');

    const theTime = document.createElement('span');
    theTime.className = 'time';
    // Giả định hàm homNay() đã được cung cấp trong ho-tro.js như đề bài đề cập
    theTime.textContent = typeof homNay === 'function' ? homNay() : new Date().toLocaleDateString('vi-VN');
    theLiMoi.appendChild(theTime);

    const theH3 = document.createElement('h3');
    theH3.textContent = tieuDe; // Dùng textContent để chặn HTML injection
    theLiMoi.appendChild(theH3);

    const theP = document.createElement('p');
    theP.textContent = noiDung;
    theLiMoi.appendChild(theP);

    const theButton = document.createElement('button');
    theButton.type = 'button';
    theButton.className = 'more';
    theButton.textContent = 'Read more >>';
    theLiMoi.appendChild(theButton);

    // Chèn tin mới vào đầu danh sách
    list.prepend(theLiMoi);

    // Xoá nội dung form
    inputTieuDe.value = '';
    inputNoiDung.value = '';

    // Kích hoạt lại sự kiện lọc để kiểm tra xem tin mới có khớp với từ khoá đang nhập hay không
    oTimKiem.dispatchEvent(new Event('keyup'));
});

// Cập nhật bộ đếm lần đầu khi tải trang
capNhatBoDem();