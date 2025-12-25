🌀 Sui AI NFT Market

**Sui AI NFT Market** là một **nền tảng quản lý và chuyển nhượng quyền sở hữu NFT** được xây dựng trên **blockchain Sui**, hỗ trợ người dùng **tạo, hiển thị và chuyển giao NFT thông qua các giao dịch on-chain**.

Dự án hướng tới mục tiêu **nghiên cứu – học tập – trình diễn công nghệ Web3**, tập trung vào:

* Trải nghiệm người dùng thân thiện
* Minh bạch quyền sở hữu tài sản số
* Ứng dụng công nghệ blockchain Sui vào quản lý NFT

---

## 🎯 Mục tiêu dự án

* Minh họa cách **NFT đại diện cho quyền sở hữu tài sản số**
* Giảm rào cản tiếp cận blockchain cho người mới
* Cung cấp một nền tảng demo cho:

  * Sinh viên
  * Người học Web3
  * Nhà phát triển blockchain Sui

⚠️ **Dự án không nhằm mục đích thương mại, đầu tư hay trung gian thanh toán.**

---

## ✨ Chức năng chính

### 🧩 Tạo NFT (Mint)

* Người dùng kết nối ví Sui
* Tạo NFT từ hình ảnh và metadata
* NFT được ghi nhận quyền sở hữu on-chain

---

### 🔁 Chuyển nhượng quyền sở hữu NFT

* Người sở hữu NFT có thể **chuyển quyền sở hữu NFT sang ví khác**
* Giao dịch được thực hiện thông qua **ký xác nhận trên blockchain Sui**
* Hệ thống chỉ ghi nhận trạng thái on-chain, **không xử lý thanh toán**

> Bản chất kỹ thuật:
> NFT thay đổi trường `owner` trên blockchain thông qua một giao dịch hợp lệ.

---

### 🖼️ Hiển thị & quản lý NFT

* Danh sách NFT đã tạo
* Xem metadata, người sở hữu hiện tại
* Phân loại NFT theo collection / creator

---

### 🔗 Kết nối ví Web3

* Kết nối với các ví tương thích Sui (Sui Wallet, Ethos Wallet…)
* Người dùng **tự ký giao dịch**, nền tảng không lưu private key

---

## 🧠 Giá trị & vấn đề được giải quyết

| Vấn đề thực tế                         | Giải pháp của hệ thống  |
| -------------------------------------- | ----------------------- |
| Người mới khó tiếp cận blockchain      | Giao diện Web2-friendly |
| Khó xác minh quyền sở hữu tài sản số   | NFT on-chain minh bạch  |
| Thiếu nền tảng demo Web3 cho sinh viên | Marketplace nghiên cứu  |
| Quản lý NFT rời rạc                    | Hệ thống tập trung      |

---

## 🏗️ Kiến trúc hệ thống

```
┌────────────────┐
│   Frontend     │  React / Next.js
│ (User Interface)
└───────▲────────┘
        │
        │ Gọi API / Ký giao dịch
        ▼
┌────────────────┐
│    Backend     │  Node.js / NestJS
│ (Business Logic)
└───────▲────────┘
        │
        │ Truy vấn / ghi nhận
        ▼
┌────────────────┐
│ Sui Blockchain │
│  (On-chain)    │
└────────────────┘
        │
        │  Ghi nhận
┌────────────────┐
│ Admin Dashboard│  React / Next.js
│   (Quản trị)   │
└───────▲────────┘
       
---

## 🛠️ Công nghệ sử dụng

| Thành phần     | Công nghệ                        |
| -------------- | -------------------------------- |
| Frontend       | Next.js, TypeScript, TailwindCSS |
| Admin/Backend  | Node.js / NestJS                 |
| Blockchain     | Sui Network                      |
| Smart Contract | Move                             |
| Wallet         | Sui Wallet, Ethos                |
| Deploy         | Netlify / Vercel                 |

---

## 🚀 Chạy dự án local

### 1️⃣ Clone repository

```bash
git clone https://github.com/Nguyen-DucQuang/sui-vhu.git
cd sui-vhu
```

### 2️⃣ Cài dependencies

```bash
npm install
# hoặc
pnpm install
```

### 3️⃣ Cấu hình môi trường

Tạo file `.env.local`:

```env
NEXT_PUBLIC_SUI_RPC=https://fullnode.devnet.sui.io:443
```

### 4️⃣ Chạy ứng dụng

```bash
cd "C:\Users\LENOVO\OneDrive\Máy tính\Sui_NewProject\SuiNFT"
npm install
npm run dev
```

Mở trình duyệt:
👉 `http://localhost:...`

---

### Có thể Run riêng Admin để xem (Đang hoàn thiện)
```bash
cd "C:\Users\LENOVO\OneDrive\Máy tính\Sui_NewProject\server-nest"
npm install
npm run start:dev

---

## 🔐 Bảo mật & quyền riêng tư

* Hệ thống **không lưu private key**
* Tất cả giao dịch được người dùng **tự ký bằng ví cá nhân**
* Backend chỉ đóng vai trò:

  * Xác minh giao dịch
  * Đồng bộ dữ liệu hiển thị
  * Minh bạch hóa các giao dịch và có thể kiếm tra trên Sui Scan các giao dịch về chuyển nhượng sở hữu tài sản số (Đang hoàn thiện)

---

## ⚠️ Tuyên bố pháp lý (Legal Disclaimer)

* Dự án mang tính **học thuật và nghiên cứu công nghệ**
* Không phải sàn giao dịch tài chính
* Không thực hiện thanh toán
* Không hỗ trợ đầu tư hay sinh lợi
* Mọi giao dịch là **chuyển nhượng quyền sở hữu tài sản số (NFT)** thông qua blockchain
* Mọi giao dịch đều là Ảo và không sử dụng đến tài sản thật

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍🎓 Tác giả

**Nguyen Duc Quang**
Sinh viên CNTT – Nghiên cứu Web3 & Blockchain Sui

---

## 📌 Ghi chú cho giám khảo / người xem

> Dự án tập trung minh họa cách blockchain Sui được sử dụng để
> **xác lập và chuyển nhượng quyền sở hữu tài sản số**,
> không liên quan đến hoạt động thanh toán hay tài chính.


