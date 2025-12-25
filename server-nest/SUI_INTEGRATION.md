Sui Integration & Transparent Ledger
=================================

References (use in reports and docs):

- Sui Architecture: https://docs.sui.io/concepts/architecture
- Sui Events: https://docs.sui.io/concepts/events
- Sui Explorer: https://explorer.sui.io/

How this backend ties to Sui (overview):

- Frontend performs wallet transactions (via `@mysten/dapp-kit`). After the transaction is confirmed, the frontend calls `POST /transactions/complete` on this backend with `txHash`, `userAddress`, `nftObjectId`, `amount`, etc.
- The backend upserts `User` and `NFT` and creates a `Transaction` record in the local DB (transparent off-chain ledger).
- The `IndexerService` polls the configured `SUI_FULLNODE_URL` and persists on-chain events into the `OnChainEvent` table. These are used to reconcile and prove on-chain activity.
- Use the Sui Explorer to let users independently verify any `txHash` recorded. Example explorer link: `https://explorer.sui.io/txblock/<txHash>`.

Endpoints of interest:

- `POST /transactions/complete` — body: `{ txHash, userAddress, userEmail?, userName?, nftObjectId?, nftName?, amount, currency?, status?, metadata? }` — records the transaction and links user & NFT.
- `GET /transactions/verify?txHash=<hash>` — returns stored transaction and explorer link.
- `GET /invoices` and `POST /invoices` — create and list off-chain JSON invoices tied to orders.
- `POST /ai/valuate` — AI valuation service (persists `AIAnalysis`).

Suggested report language snippets:

"Sui Blockchain sử dụng mô hình Object-centric giúp theo dõi quyền sở hữu tài sản một cách minh bạch và không thể chỉnh sửa."

"Mỗi giao dịch NFT đều phát sinh Event trên Sui Blockchain, cho phép kiểm chứng công khai và đối chiếu hóa đơn thông qua transaction hash."

"Người dùng có thể kiểm tra độc lập mọi giao dịch thông qua Sui Explorer." 

Usage notes for developers:

- Configure `SUI_FULLNODE_URL` in `server-nest/.env` to point to a Sui fullnode RPC to enable indexing.
- Ensure `DATABASE_URL` is set and migrations applied (`npx prisma migrate dev`).
- After a confirmed on-chain transaction, call `/transactions/complete` from the frontend to persist off-chain user and invoice records.
