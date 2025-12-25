import React, { useState, useEffect } from 'react';
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Toast from '../../components/ui/Toast';
import FilterPanel from './components/FilterPanel';
import NFTCard from './components/NFTCard';
import FeaturedCollections from './components/FeaturedCollections';
import TradingActivity from './components/TradingActivity';
import SearchBar from './components/SearchBar';
import GasTracker from './components/GasTracker';
import { NFT_MARKETPLACE_PACKAGE_ID } from '../../utils/sui-constants';
import { fetchUserNFTs, fetchUserSuiCoins } from '../../utils/sui-helpers';

const NFTMarketplace = () => {
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [currentSort, setCurrentSort] = useState('relevance');
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: 'all',
    blockchains: [],
    aiConfidence: 0,
    hasOffers: false,
    onAuction: false,
    buyNow: false
  });
  const [userNFTs, setUserNFTs] = useState([]);

  const [mockNFTs, setMockNFTs] = useState([]);

  useEffect(() => {
    const useMock = import.meta.env.VITE_USE_MOCK_NFTS === 'true';
    if (useMock) {
      fetch('/mock-nfts.json')
        .then((r) => r.json())
        .then((data) => setMockNFTs(data.map(n => ({
          id: n.id,
          name: n.name,
          collection: n.collection,
          collectionAvatar: n.collectionAvatar,
          image: n.image,
          // Use a small demo-friendly SUI price so buyers with small balances can test
          price: 0.01,
          aiConfidence: n.aiConfidence,
          verified: n.verified
        })))).catch(() => setMockNFTs([]));
    }
  }, []);


  const mockCollections = [
  {
    id: 1,
    name: "AI Cosmic Warriors",
    banner: "https://img.rocket.new/generatedImages/rocket_gen_img_19299689d-1764664116792.png",
    bannerAlt: "Wide banner showing epic space battle scene with armored warriors wielding energy weapons against starry cosmic backdrop",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c9c9ad80-1766401142453.png",
    avatarAlt: "Collection logo featuring futuristic warrior helmet with glowing blue visor on circular badge",
    items: 10000,
    floorPrice: "350 SUI",
    volume: "12.4M",
    change24h: 15.3,
    aiScore: 92,
    owners: 5234,
    verified: true
  },
  {
    id: 2,
    name: "iNFT Neon Dreams",
    banner: "https://images.unsplash.com/photo-1710722785769-f0dae5fe9b0c",
    bannerAlt: "Wide banner displaying abstract neon landscape with flowing pink and cyan light trails creating dreamlike atmosphere",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15f6b1b68-1766401144546.png",
    avatarAlt: "Collection logo with abstract neon geometric pattern in vibrant colors on circular badge",
    items: 8888,
    floorPrice: "280 SUI",
    volume: "8.9M",
    change24h: -3.2,
    aiScore: 78,
    owners: 3891,
    verified: true
  }];


  const mockActivities = [
  {
    id: 1,
    type: 'sale',
    nftName: "AI Cosmic Warrior #7804",
    nftImage: "https://img.rocket.new/generatedImages/rocket_gen_img_164746595-1765177655613.png",
    nftImageAlt: "Small thumbnail of armored space warrior with glowing blue energy sword",
    from: "0x742d...5e3a",
    to: "0x8f3c...9d2b",
    price: "450 SUI",
    time: "2 phút trước"
  },
  {
    id: 2,
    type: 'bid',
    nftName: "Intelligent Neon #3421",
    nftImage: "https://images.unsplash.com/photo-1676725375088-d9ade82e553f",
    nftImageAlt: "Small thumbnail of abstract neon light trails in pink and cyan",
    from: "0x9a4b...7c1d",
    to: null,
    price: "290 SUI",
    time: "5 phút trước"
  }];


  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };

  const handleAddToWatchlist = (nftId) => {
    console.log('Added to watchlist:', nftId);
  };

  const handleQuickBuy = (nft) => {
    if (!currentAccount) {
      setToast({
        message: 'Vui lòng kết nối ví Sui để thực hiện mua hàng!',
        type: 'warning'
      });
      return;
    }
    // Check user's SUI balance before opening purchase modal
    (async () => {
      try {
        const coins = await fetchUserSuiCoins(currentAccount.address);
        const total = (coins || []).reduce((acc, c) => acc + Number(c.balance || c.value || 0), 0);
        const price = typeof nft.price === 'number' ? nft.price : parseFloat(String(nft.price).replace(/[^0-9.]/g, '')) || 0;
        if (total < price) {
          setToast({ message: `Số dư SUI không đủ (cần ${price} SUI). Vui lòng nạp thêm.`, type: 'warning' });
          return;
        }
        setSelectedNFT(nft);
        setIsConfirmModalOpen(true);
      } catch (err) {
        console.error('Balance check failed', err);
        setToast({ message: 'Không thể kiểm tra số dư ví. Vui lòng thử lại.', type: 'error' });
      }
    })();
  };

  const confirmPurchase = async () => {
    console.log('Confirmed purchase for:', selectedNFT);

    // Call the buyNFT function here
    try {
      const nftObjectId = selectedNFT.id; // Replace with the actual NFT object ID
      const paymentCoinObjectId = ''; // Replace with the actual payment coin object ID
      await buyNFT({ nftObjectId, price: selectedNFT.price, paymentCoinObjectId, signAndExecuteTransaction });
      
      // Save to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('sui_nft_orders') || '[]');
      const newOrder = {
        id: `ORD-${Date.now()}`,
        name: selectedNFT?.name,
        collection: selectedNFT?.collection,
        price: selectedNFT?.price,
        image: selectedNFT?.image,
        date: new Date().toLocaleDateString('vi-VN'),
        status: 'Đã hoàn thành'
      };
      localStorage.setItem('sui_nft_orders', JSON.stringify([newOrder, ...existingOrders]));
      
      // Trigger Header update
      window.dispatchEvent(new Event('ordersUpdated'));

      setToast({
        message: `Chúc mừng! Bạn đã mua thành công ${selectedNFT?.name}`,
        type: 'success'
      });
      setIsConfirmModalOpen(false);
      setSelectedNFT(null);
    } catch (error) {
      setToast({
        message: 'Đã xảy ra lỗi khi mua NFT. Vui lòng thử lại sau.',
        type: 'error'
      });
      console.error('Purchase error:', error);
    }
  };

  // Hàm mua NFT thực tế trên Sui testnet
  async function buyNFT({ nftObjectId, price, paymentCoinObjectId, signAndExecuteTransaction }) {
    try {
      const tx = {
        kind: 'moveCall',
        data: {
          packageObjectId: NFT_MARKETPLACE_PACKAGE_ID,
          module: 'nft_marketplace',
          function: 'buy_nft',
          typeArguments: [],
          arguments: [
            nftObjectId, // object id của NFT muốn mua
            paymentCoinObjectId, // object id của đồng SUI dùng để thanh toán
          ],
          gasBudget: 10000000,
        },
      };
      const result = await signAndExecuteTransaction({ transaction: tx });

      try {
        const txHash = result?.digest || result?.txDigest || result?.transaction?.digest || result?.data?.digest;
        const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
        if (txHash) {
          await fetch(`${apiBase}/transactions/complete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              txHash,
              userAddress: currentAccount?.address,
              nftObjectId,
              amount: price,
              currency: 'SUI',
              status: 'completed'
            })
          });
          // open explorer in new tab for quick verification
          const explorer = `https://explorer.sui.io/txblock/${txHash}`;
          window.open(explorer, '_blank');
        }
      } catch (err) {
        console.warn('Failed to notify backend about transaction', err);
      }

      return result;
    } catch (error) {
      console.error('Buy NFT error:', error);
      throw error;
    }
  }

  // Hàm list (bán) NFT trên Sui testnet
  async function listNFT({ nftObjectId, price, signAndExecuteTransaction }) {
    try {
      const tx = {
        kind: 'moveCall',
        data: {
          packageObjectId: NFT_MARKETPLACE_PACKAGE_ID,
          module: 'nft_marketplace',
          function: 'list_nft',
          typeArguments: [],
          arguments: [
            nftObjectId, // object id của NFT muốn bán
            price
          ],
          gasBudget: 10000000,
        },
      };
      const result = await signAndExecuteTransaction({ transaction: tx });
      return result;
    } catch (error) {
      console.error('List NFT error:', error);
      throw error;
    }
  }

  const filteredNFTCount = mockNFTs?.length;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (currentAccount?.address) {
      fetchUserNFTs(currentAccount.address).then(setUserNFTs);
    }
  }, [currentAccount]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 md:mb-4">
              Thị trường iNFT
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Khám phá và giao dịch NFT thông minh với sự hỗ trợ của AI trên Sui
            </p>
          </div>

          <div className="mb-6 md:mb-8">
            <SearchBar
              onSearch={handleSearch}
              onSortChange={setCurrentSort}
              currentSort={currentSort} />

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="lg:col-span-3">
              <FeaturedCollections collections={mockCollections} />
            </div>
            <div className="space-y-6">
              <GasTracker />
            </div>
          </div>

          <div className="flex gap-6 md:gap-8">
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={() => setFilters({
                categories: [],
                priceRange: 'all',
                blockchains: [],
                aiConfidence: 0,
                hasOffers: false,
                onAuction: false,
                buyNow: false
              })}
              resultCount={filteredNFTCount}
              isMobileOpen={isFilterOpen}
              onMobileClose={() => setIsFilterOpen(false)} />


            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                    Tất cả iNFT & AI Art
                  </h2>
                  <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg text-sm font-medium text-primary data-text">
                    {filteredNFTCount}
                  </span>
                </div>

                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden px-4 py-2 bg-card border border-border rounded-lg hover:border-primary/30 transition-smooth flex items-center gap-2">

                  <Icon name="SlidersHorizontal" size={20} />
                  <span className="text-sm font-medium">Bộ lọc</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
                {(mockNFTs?.length ? mockNFTs : mockNFTs)?.map((nft) =>
                <NFTCard
                  key={nft?.id}
                  nft={nft}
                  onAddToWatchlist={handleAddToWatchlist}
                  onQuickBuy={handleQuickBuy} />

                )}
              </div>

              <div className="flex items-center justify-center gap-2">
                <Button variant="outline" iconName="ChevronLeft" size="sm" disabled>
                  Trước
                </Button>
                <div className="flex gap-2">
                  <button className="w-10 h-10 bg-primary text-primary-foreground rounded-lg font-medium">
                    1
                  </button>
                  <button className="w-10 h-10 bg-card border border-border rounded-lg hover:border-primary/30 transition-smooth">
                    2
                  </button>
                  <button className="w-10 h-10 bg-card border border-border rounded-lg hover:border-primary/30 transition-smooth">
                    3
                  </button>
                </div>
                <Button variant="outline" iconName="ChevronRight" iconPosition="right" size="sm">
                  Sau
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-12">
            <TradingActivity activities={mockActivities} />
          </div>

          {/* Hiển thị danh sách NFT của user */}
          <div className="mt-8 md:mt-12">
            <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
              NFT của bạn
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {userNFTs.length === 0 ? (
                <p className="text-center text-muted-foreground col-span-full">
                  Bạn chưa có NFT nào. Hãy khám phá và mua sắm trên thị trường!
                </p>
              ) : (
                userNFTs.map((nft) => (
                  <NFTCard
                    key={nft.objectId}
                    nft={{
                      id: nft.objectId,
                      name: nft.name,
                      collection: nft.collection,
                      image: nft.image,
                      price: nft.price,
                      onAuction: nft.onAuction,
                      auctionEnds: nft.auctionEnds,
                      owners: nft.owners,
                      volume: nft.volume,
                      aiConfidence: nft.aiConfidence,
                      verified: nft.verified
                    }}
                    onAddToWatchlist={handleAddToWatchlist}
                    onQuickBuy={handleQuickBuy}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scale-in">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Icon name="ShoppingCart" size={24} color="var(--color-primary)" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground">Xác nhận mua hàng</h3>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-xl">
                <img src={selectedNFT?.image} alt={selectedNFT?.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <p className="font-bold text-foreground">{selectedNFT?.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedNFT?.collection}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Giá sản phẩm</span>
                <span className="font-bold text-foreground">{selectedNFT?.price}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Phí mạng lưới (ước tính)</span>
                <span className="text-foreground">~0.001 SUI</span>
              </div>
              <div className="flex justify-between items-center py-2 pt-4">
                <span className="font-bold text-foreground">Tổng cộng</span>
                <span className="text-xl font-bold text-primary">{selectedNFT?.price}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setIsConfirmModalOpen(false)}
                className="flex-1 px-6 py-3 bg-muted hover:bg-muted/80 rounded-xl font-medium transition-smooth"
              >
                Hủy bỏ
              </button>
              <button 
                onClick={confirmPurchase}
                className="flex-1 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-medium transition-smooth shadow-lg shadow-primary/20"
              >
                Xác nhận Mua
              </button>
            </div>
          </div>
        </div>
      )}
    </div>);

};

export default NFTMarketplace;
