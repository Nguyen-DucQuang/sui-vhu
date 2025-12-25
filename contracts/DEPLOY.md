# Triển khai Move package lên Sui (Testnet / Devnet)

Hướng dẫn này cho Windows PowerShell (cũng chạy tương tự trên macOS/Linux với thay đổi lệnh shell).

Yêu cầu trước khi triển khai:
- Cài `sui` CLI (theo hướng dẫn chính thức của Sui).
- Có ví / keypair đã cấu hình trong `sui` CLI (ví dụ `sui client` đã nhận diện wallet).

1) Build Move package

```powershell
cd contracts\nft_marketplace
sui move build
```

2) Publish package lên mạng (testnet/devnet)

Ví dụ (từ thư mục package):

```powershell
# dùng gas budget phù hợp
sui client publish --path . --gas-budget 100000000
```

Lưu ý: lệnh có thể khác theo phiên bản CLI; nếu bạn dùng `sui move` namespace thì tương tự:

```powershell
sui move publish --path . --gas-budget 100000000
```

3) Lấy `package id` từ output

Khi publish thành công, CLI sẽ in ra `package id` (dạng `0x...`). Ghi lại giá trị này.

4) Cập nhật frontend

- Mở `SuiNFT/.env.local` (nếu chưa có, tạo) và thêm:

```
VITE_NFT_MARKETPLACE_PACKAGE_ID=0x....    # package id vừa publish
VITE_SUI_FULLNODE_URL=https://fullnode.testnet.sui.io  # hoặc fullnode devnet bạn muốn dùng
VITE_API_BASE_URL=http://localhost:4000
VITE_USE_MOCK_NFTS=false
```

- Hoặc cập nhật `SuiNFT/src/utils/sui-constants.js` trực tiếp nếu muốn.

5) Chạy frontend và kiểm tra

```powershell
cd SuiNFT
npm install
npm run dev
```

6) Kiểm tra mint/list/buy

- Dùng UI để `mint` — frontend sẽ gọi Move entry `mint_nft` tới package đã cấu hình.
- Sau giao dịch, bạn có thể kiểm tra on-chain bằng Sui Explorer (`https://explorer.sui.io/txblock/<txHash>`) hoặc dùng `sui client` để lấy transaction block.

Nếu muốn, chạy script `tools/publish-move.ps1` từ workspace root để tự động build + publish (PowerShell). Script này cố gắng parse output để in `package id`.
