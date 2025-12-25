Frontend: call backend after confirmed Sui transaction
---------------------------------------------------

Example (React) — after you submit a tx via `signAndExecuteTransaction` or similar and receive `tx.digest`:

```jsx
// assume txResult.digest is the txHash
const txHash = txResult?.digest;
if (txHash) {
  await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'}/transactions/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      txHash,
      userAddress: walletAddress,
      userEmail: currentUser?.email,
      userName: currentUser?.name,
      nftObjectId: mintedObjectId,
      nftName: metadata?.name,
      amount: salePrice,
      currency: 'SUI',
      status: 'completed',
      metadata: { raw: metadata }
    })
  });
}
```

Also show a verification link to the user:

```
const explorer = `https://explorer.sui.io/txblock/${txHash}`;
// render link in UI for user to click and verify
```

Make sure `VITE_API_BASE_URL` points to your backend (e.g., `http://localhost:4000`).
