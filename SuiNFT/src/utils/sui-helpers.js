import { SuiClient } from '@mysten/sui/client';

// Hàm lấy danh sách NFT (objectId) của user
export async function fetchUserNFTs(address) {
  // if configured to use mock NFTs or no address, fetch mock JSON from public folder
  const useMock = import.meta.env.VITE_USE_MOCK_NFTS === 'true' || !address;
  if (useMock) {
    try {
      const res = await fetch('/mock-nfts.json');
      const data = await res.json();
      return data.map(n => ({ objectId: n.id, name: n.name, collection: n.collection, image: n.image, price: n.price, aiConfidence: n.aiConfidence }));
    } catch (e) {
      return [];
    }
  }

  try {
    const nodeUrl = import.meta.env.VITE_SUI_FULLNODE_URL || 'https://fullnode.testnet.sui.io';
    const client = new SuiClient({ url: nodeUrl });
    const objects = await client.getOwnedObjects({ owner: address });
    // Lọc ra các object là NFT của marketplace
    return objects.data.filter(obj => obj.type && obj.type.includes('nft_marketplace::NFT'));
  } catch (e) {
    // fallback to empty
    return [];
  }
}

// Hàm lấy danh sách coin SUI của user
export async function fetchUserSuiCoins(address) {
  try {
    const nodeUrl = import.meta.env.VITE_SUI_FULLNODE_URL || 'https://fullnode.testnet.sui.io';
    const client = new SuiClient({ url: nodeUrl });
    const coins = await client.getCoins({ owner: address, coinType: '0x2::sui::SUI' });
    return coins.data;
  } catch (e) {
    return [];
  }
}

export async function fetchTransactionBlock(txHash) {
  try {
    const nodeUrl = import.meta.env.VITE_SUI_FULLNODE_URL || 'https://fullnode.testnet.sui.io';
    const client = new SuiClient({ url: nodeUrl });
    if (typeof client.getTransactionBlock === 'function') {
      return await client.getTransactionBlock({ digest: txHash });
    }
    if (typeof client.getTransaction === 'function') {
      return await client.getTransaction({ digest: txHash });
    }
    return null;
  } catch (e) {
    return null;
  }
}
