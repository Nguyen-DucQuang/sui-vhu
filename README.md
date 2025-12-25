SuiNFT — Local run & deployment notes

Quick start (development)

1) Start backend (server-nest)

```bash
cd server-nest
cp .env.example .env
# edit .env if needed (ADMIN_JWT_SECRET, DATABASE_URL)
npm install
npm run start:dev
```

2) Start frontend (SuiNFT)

```bash
cd SuiNFT
npm install
npm run dev
```

3) Admin demo

- Open frontend URL shown by Vite (e.g. http://localhost:4028)
- Go to `/admin`, login with Admin / Admin16 (demo)
- Connect a wallet on the user pages to emit `user_connected` events
- Upload an NFT from Admin; if backend down, the upload is queued in `localStorage` and can be synced later via "Sync Now"

Production / deploy notes

- Set `ADMIN_JWT_SECRET` to a strong secret in production.
- Replace Basic/demo auth with a proper user store and JWT flows for admin users.
- Use HTTPS and a reverse proxy (NGINX) or host behind a platform (Vercel/Netlify for frontend, Docker/Kubernetes for backend).
- Recommended run: build frontend (`npm run build`) and serve static assets behind CDN; run backend with PM2 or Docker and expose port behind TLS.

Health checks & tests

- Backend health: `GET /admin/health`
- Admin login: `POST /admin/login` with `{ user, pass }` → returns `{ token }`
- Simulate wallet connect: `POST /users/connect` with `{ address }`
- Create NFT via API: `POST /admin/nfts` (Bearer token or Basic) with JSON `{ name, description, imageDataUrl }`
# Sui AI NFT Market 2025 - Nexus AI Marketplace

Thị trường NFT nâng cao AI trên Sui blockchain với các tính năng đánh giá giá trị, mẹo đầu tư và phân loại tự động.

## Tính năng chính

- **Kết nối ví Sui**: Tích hợp `@mysten/dapp-kit` cho phép kết nối mượt mà với Sui Wallet.
- **iNFT (Intelligent NFTs)**: Hỗ trợ các NFT thông minh có khả năng tương tác và học hỏi.
- **AI Valuation**: Backend AI dự đoán giá trị NFT dựa trên đặc tính và xu hướng thị trường.
- **AI Classification**: Tự động phân loại NFT và đánh giá độ hiếm.
- **Dashboard đầu tư**: Theo dõi portfolio và nhận lời khuyên đầu tư từ AI.

## Cấu trúc dự án

- `SuiNFT/`: Frontend React (Vite, Tailwind CSS).
- `server/`: Backend Node.js/Express (AI API endpoints).
- `contracts/`: Sui Move smart contracts cho NFT minting.

## Hướng dẫn cài đặt

### 1. Cài đặt Sui CLI
Theo hướng dẫn tại [Sui Documentation](https://docs.sui.io/guides/developer/getting-started/sui-install).

### 2. Chạy Smart Contract (Devnet)
```bash
cd contracts/nft_nexus
sui move build
sui client publish --gas-budget 100000000
```

### 3. Chạy Backend AI
```bash
cd server
npm install
node index.js
```

### 4. Chạy Frontend
```bash
cd SuiNFT
npm install
npm run start
```

## Công nghệ sử dụng

- **Blockchain**: Sui Network, Move Language.
- **Frontend**: React, @mysten/dapp-kit, Tailwind CSS, Recharts.
- **Backend**: Node.js, Express.
- **AI**: Phân tích dữ liệu thị trường thời gian thực (Mocked for prototype).

## Xu hướng NFT 2025

Dự án tập trung vào các xu hướng chủ đạo của năm 2025:
- Sự trỗi dậy của iNFTs.
- Token hóa tài sản thực (RWA).
- AI đóng vai trò thẩm định giá trị và tối ưu hóa danh mục đầu tư.
