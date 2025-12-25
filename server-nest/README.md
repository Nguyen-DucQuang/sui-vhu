# Sui NFT Backend (NestJS scaffold)

This folder contains a minimal NestJS scaffold for the Sui NFT project.

Modules included:
- `indexer` (stub): on-chain indexing service for Sui
- `ai` (proxy): wrappers to call Gemini or fallback mock valuation

Quick start (in `server-nest`):

```bash
npm install
npm run start:dev
```

The Nest server exposes:
- GET `/indexer/status` — indexer health
- POST `/ai/valuate` — body: `{ "metadata": { ... } }` returns AI valuation (or mock if no key)

Environment:
- `GEMINI_API_KEY` or `VITE_GEMINI_API_KEY` for Google Gemini calls
- `PORT_NEST` to override default port (4000)

Next steps:
- Add DB (Postgres) + ORM (TypeORM/Prisma)
- Implement indexer connection to Sui fullnode
- Add invoices and user modules
