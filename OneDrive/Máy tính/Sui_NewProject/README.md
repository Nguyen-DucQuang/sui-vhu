# Sui AI NFT Market 2025

Dự án NFT Marketplace hoàn chỉnh tích hợp Trí tuệ nhân tạo (AI) trên mạng lưới Sui.

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
