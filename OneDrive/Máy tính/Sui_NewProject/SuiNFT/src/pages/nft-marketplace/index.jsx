import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FilterPanel from './components/FilterPanel';
import NFTCard from './components/NFTCard';
import FeaturedCollections from './components/FeaturedCollections';
import TradingActivity from './components/TradingActivity';
import SearchBar from './components/SearchBar';
import GasTracker from './components/GasTracker';

const NFTMarketplace = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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

  const mockNFTs = [
  {
    id: 1,
    name: "AI Cosmic Warrior #7804",
    collection: "AI Enhanced Warriors",
    collectionAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e680bbef-1766336008860.png",
    collectionAvatarAlt: "Circular avatar showing futuristic warrior helmet with glowing blue visor against dark cosmic background",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_164746595-1765177655613.png",
    imageAlt: "Digital art of armored space warrior with glowing blue energy sword standing on alien planet surface with purple nebula sky",
    price: "450 SUI",
    priceChange24h: 15.3,
    aiConfidence: 92,
    verified: true,
    isHot: true,
    onAuction: false,
    owners: 1,
    volume: "234.5K"
  },
  {
    id: 2,
    name: "Intelligent Neon #3421",
    collection: "iNFT Neon Dreams",
    collectionAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_193a2e16c-1765384800150.png",
    collectionAvatarAlt: "Circular avatar featuring abstract neon geometric shapes in pink and cyan colors on black background",
    image: "https://images.unsplash.com/photo-1670387244588-a00344b5a57a",
    imageAlt: "Abstract digital artwork with flowing neon pink and cyan light trails forming geometric patterns against dark void",
    price: "280 SUI",
    priceChange24h: -5.2,
    aiConfidence: 78,
    verified: true,
    isHot: false,
    onAuction: true,
    auctionEnds: "2h 34m",
    owners: 3,
    volume: "156.2K"
  },
  {
    id: 3,
    name: "AI Cyber Punk Girl #1234",
    collection: "AI Cyber Punks",
    collectionAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_198d058cc-1764752913862.png",
    collectionAvatarAlt: "Circular avatar showing stylized cyberpunk character face with neon pink hair and tech implants",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_195ba070c-1764664767529.png",
    imageAlt: "Portrait of futuristic female character with neon pink hair, cybernetic eye implants, and holographic interface projections",
    price: "620 SUI",
    priceChange24h: 8.7,
    aiConfidence: 85,
    verified: true,
    isHot: true,
    onAuction: false,
    owners: 1,
    volume: "445.8K"
  }];


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
    console.log('Quick buy:', nft);
  };

  const filteredNFTCount = mockNFTs?.length;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 md:mb-4">
              Thị trường iNFT 2025
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
                {mockNFTs?.map((nft) =>
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
        </div>
      </main>
    </div>);

};

export default NFTMarketplace;
