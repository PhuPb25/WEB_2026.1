/* BÀI B — VIẾT CODE: Giỏ hàng của xưởng in
   Hoàn thiện class GioHang và hàm napGioHang.
   Không đổi tên class, tên phương thức, tên hàm; không sửa phần "DỮ LIỆU ĐÃ CHO". */

// ---------- DỮ LIỆU ĐÃ CHO (không sửa) ----------
const DANH_MUC = [
	{ id: "TC01", ten: "Thiệp cưới cotton", loai: "thiep cuoi", gia: 1500 },
	{ id: "TC02", ten: "Thiệp cưới kraft", loai: "thiep cuoi", gia: 900 },
	{ id: "DT01", ten: "Danh thiếp ép kim", loai: "danh thiep", gia: 1200 },
	{ id: "PB01", ten: "Phong bì lót lụa", loai: "phu kien", gia: 500 }
];

// ---------- PHẦN BẠN VIẾT ----------
class GioHang {
	constructor() {
		// Mỗi dòng của giỏ là một object { id, ten, loai, gia, soLuong }.
		this.dsDong = [];
	}

	// 1. Thêm sản phẩm; trả về true nếu thêm được, false nếu soLuong không hợp lệ.
	them(sanPham, soLuong) {
		// TODO
		if (typeof soLuong !== 'number' || !Number.isInteger(soLuong) || soLuong <= 0) {
			return false;
		}

		const index = this.dsDong.findIndex(dong => dong.id === sanPham.id);
		
		if (index !== -1) {
			this.dsDong[index].soLuong += soLuong;
		} else {
            // Lưu dưới dạng object hoàn toàn mới để không phụ thuộc hoặc làm biến đổi tham chiếu gốc
			this.dsDong.push({
				id: sanPham.id,
				ten: sanPham.ten,
				loai: sanPham.loai,
				gia: sanPham.gia,
				soLuong: soLuong
			});
		}
		return true;
	}

	// 2. Xoá dòng có id tương ứng; trả về true nếu có xoá, false nếu không tìm thấy.
	xoa(id) {
		// TODO
		const soLuongBanDau = this.dsDong.length;
		this.dsDong = this.dsDong.filter(dong => dong.id !== id);
		return this.dsDong.length < soLuongBanDau;	
	}

	// 3. Tổng tiền cả giỏ.
	tongTien() {
		// TODO
		return this.dsDong.reduce((tong, dong) => tong + (dong.gia * dong.soLuong), 0);
	}

	// 4. Object thống kê: { "<loai>": tổng tiền của loại đó, ... }.
	thongKeTheoLoai() {
		// TODO
		return this.dsDong.reduce((thongKe, dong) => {
			const tienDong = dong.gia * dong.soLuong;
			thongKe[dong.loai] = (thongKe[dong.loai] || 0) + tienDong;
			return thongKe;
		}, {});
	}

	// 5. Dòng có thành tiền lớn nhất (bản sao, có thêm thanhTien); null nếu giỏ rỗng.
	dongDatNhat() {
		// TODO
		if (this.dsDong.length === 0) return null;

		let maxDong = this.dsDong[0];
		let maxTien = maxDong.gia * maxDong.soLuong;

		for (let i = 1; i < this.dsDong.length; i++) {
			const dong = this.dsDong[i];
			const tienDong = dong.gia * dong.soLuong;
			if (tienDong > maxTien) {
				maxTien = tienDong;
				maxDong = dong;
			}
		}

		return { ...maxDong, thanhTien: maxTien };
	}

	// 6. Mảng BẢN SAO các dòng, mỗi dòng có thêm thuộc tính thanhTien.
	layDanhSach() {
		// TODO
		return this.dsDong.map(dong => ({
			...dong,
			thanhTien: dong.gia * dong.soLuong
		}));
	}

	// 7. Chuỗi JSON của mảng các dòng.
	xuatJSON() {
		// TODO
		return JSON.stringify(this.dsDong);
	}
}

// 8. Tạo lại một GioHang từ chuỗi JSON do xuatJSON() sinh ra.
function napGioHang(chuoiJSON) {
	// TODO
	const gioMoi = new GioHang();
	try {
		const duLieu = JSON.parse(chuoiJSON);
		if (Array.isArray(duLieu)) {
            // Copy sâu (deep copy) dữ liệu vào giỏ để đảm bảo tính an toàn
			gioMoi.dsDong = duLieu.map(dong => ({ ...dong }));
		}
	} catch (error) {
		// Bỏ qua lỗi và trả về giỏ rỗng nếu chuỗi JSON không hợp lệ
	}
	return gioMoi;
}

// ---------- CHẠY THỬ (không sửa) ----------
const gio = new GioHang();
gio.them(DANH_MUC[0], 100);
gio.them(DANH_MUC[3], 200);
gio.them(DANH_MUC[0], 50);
veGioHang(gio.layDanhSach(), gio.tongTien());
console.table(gio.layDanhSach());
hienThi(`JSON gửi lên máy chủ: ${gio.xuatJSON()}`);
