import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricCard from './components/MetricCard';
import NFTCard from './components/NFTCard';
import CollectionCard from './components/CollectionCard';
import MarketChart from './components/MarketChart';
import AIRecommendation from './components/AIRecommendation';
import QuickAction from './components/QuickAction';

const HomepageDashboard = () => {
  const navigate = useNavigate();
  const collectionsScrollRef = useRef(null);
  const [activeTab, setActiveTab] = useState('featured');

  const marketMetrics = [
  {
    icon: 'TrendingUp',
    title: 'Tổng khối lượng SUI',
    value: '850.5K SUI',
    change: '+15.8%',
    changeType: 'positive',
    subtitle: 'Khối lượng giao dịch 24 giờ',
    iconColor: 'var(--color-primary)'
  },
  {
    icon: 'Coins',
    title: 'Vốn hóa NFT AI',
    value: '$231.9B',
    change: '+33.0%',
    changeType: 'positive',
    subtitle: 'Dự báo CAGR đến 2030',
    iconColor: 'var(--color-accent)'
  },
  {
    icon: 'Activity',
    title: 'Tâm lý thị trường AI',
    value: 'Hưng phấn',
    change: '85/100',
    changeType: 'positive',
    subtitle: 'Chỉ số AI tổng hợp 2025',
    iconColor: 'var(--color-success)'
  },
  {
    icon: 'Zap',
    title: 'Dự đoán iNFT',
    value: '+25.2%',
    change: 'Rất Cao',
    changeType: 'positive',
    subtitle: 'Độ tin cậy AI: 94%',
    iconColor: 'var(--color-warning)'
  }];


  const featuredNFTs = [
  {
    id: 1,
    name: 'AI Cosmic Warrior #7804',
    collection: 'AI Enhanced Warriors',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_174669be9-1764677206555.png",
    imageAlt: 'Digital artwork featuring futuristic warrior character with glowing blue armor and cosmic background with stars and nebula',
    price: '450 SUI',
    prediction: 15.2,
    aiConfidence: 89,
    isHot: true,
    creatorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18142c6fb-1763296479151.png",
    creatorAvatarAlt: 'Professional headshot of Asian man with short black hair wearing dark blue shirt'
  },
  {
    id: 2,
    name: 'Intelligent Neon #2341',
    collection: 'iNFT Neon Collection',
    image: "https://images.unsplash.com/photo-1729136106051-8548c666c8f2",
    imageAlt: 'Abstract digital art with vibrant neon pink and purple geometric shapes against dark background',
    price: '320 SUI',
    prediction: 22.8,
    aiConfidence: 92,
    isHot: true,
    creatorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b6143575-1763294522920.png",
    creatorAvatarAlt: 'Professional headshot of Caucasian woman with blonde hair in white blouse'
  },
  {
    id: 3,
    name: 'AI Cyber Punk #5678',
    collection: 'AI Cyber Punks',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_174669be9-1764677206555.png",
    imageAlt: 'Cyberpunk style digital portrait with neon green and pink lighting effects on futuristic character',
    price: '580 SUI',
    prediction: 18.5,
    aiConfidence: 85,
    isHot: false,
    creatorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_116742dea-1763296857162.png",
    creatorAvatarAlt: 'Professional headshot of Hispanic man with beard wearing black t-shirt'
  }];


  const trendingCollections = [
  {
    id: 1,
    name: 'AI Cosmic Warriors',
    items: '10,000',
    bannerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_17749e154-1765722529876.png",
    bannerImageAlt: 'Banner image showing collection of futuristic warrior characters with glowing armor in cosmic setting',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_18597336c-1765777054961.png",
    logoAlt: 'Collection logo featuring abstract geometric design in neon colors',
    floorPrice: '350 SUI',
    volume24h: '125K',
    change24h: '+15.2%',
    aiScore: 92,
    verified: true
  },
  {
    id: 2,
    name: 'iNFT Neon Dreams',
    items: '8,500',
    bannerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1d51086c1-1764994331814.png",
    bannerImageAlt: 'Banner showing vibrant neon abstract art collection with pink and purple geometric patterns',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_15a255283-1765752841260.png",
    logoAlt: 'Collection logo with cyberpunk style neon design elements',
    floorPrice: '280 SUI',
    volume24h: '98K',
    change24h: '+22.8%',
    aiScore: 89,
    verified: true
  }];


  const priceChartData = [
  { time: '00:00', sui: 1.2, ai_index: 85 },
  { time: '04:00', sui: 1.25, ai_index: 87 },
  { time: '08:00', sui: 1.22, ai_index: 86 },
  { time: '12:00', sui: 1.35, ai_index: 90 },
  { time: '16:00', sui: 1.32, ai_index: 89 },
  { time: '20:00', sui: 1.45, ai_index: 92 },
  { time: '24:00', sui: 1.55, ai_index: 95 }];


  const volumeChartData = [
  { time: '00:00', value: 12000 },
  { time: '04:00', value: 14500 },
  { time: '08:00', value: 13500 },
  { time: '12:00', value: 16800 },
  { time: '16:00', value: 15200 },
  { time: '20:00', value: 18900 },
  { time: '24:00', value: 21000 }];


  const aiRecommendations = [
  {
    id: 1,
    name: 'Quantum AI Realm #3456',
    collection: 'Quantum AI Collection',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15d9f3641-1765946802168.png",
    imageAlt: 'Digital artwork featuring quantum physics inspired abstract design with swirling energy patterns',
    price: '380 SUI',
    potential: 28,
    confidence: 94,
    reason: 'AI phát hiện xu hướng iNFT tăng mạnh dựa trên tương tác người dùng và RWA tokenization'
  },
  {
    id: 2,
    name: 'Future AI Vision #7890',
    collection: 'AI Vision Series',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_167a31594-1764692789850.png",
    imageAlt: 'Futuristic digital art showing holographic interface with glowing blue and purple elements',
    price: '420 SUI',
    potential: 32,
    confidence: 91,
    reason: 'Mô hình AI dự đoán giá trị iNFT tăng dựa trên khả năng học hỏi và phát triển của tài sản'
  }];


  const quickActions = [
  {
    icon: 'Wallet',
    title: 'Quản lí Ví Sui',
    description: 'Xem portfolio NFT AI và lịch sử giao dịch trên Sui',
    onClick: () => navigate('/wallet-management'),
    iconColor: 'var(--color-primary)'
  },
  {
    icon: 'TrendingUp',
    title: 'Phân tích AI 2025',
    description: 'Khám phá xu hướng iNFT và dự đoán AI chi tiết',
    onClick: () => navigate('/market-analysis'),
    iconColor: 'var(--color-success)'
  },
  {
    icon: 'Upload',
    title: 'Mint AI NFT',
    description: 'Sử dụng AI để tạo và mint NFT trực tiếp lên Sui',
    onClick: () => navigate('/nft-upload'),
    iconColor: 'var(--color-accent)'
  },
  {
    icon: 'Store',
    title: 'Thị trường iNFT',
    description: 'Duyệt qua hàng nghìn NFT thông minh được AI đề xuất',
    onClick: () => navigate('/nft-marketplace'),
    iconColor: 'var(--color-warning)'
  }];


  const handleViewNFTDetails = (nftId) => {
    navigate('/nft-details', { state: { nftId } });
  };

  const scrollCollections = (direction) => {
    if (collectionsScrollRef?.current) {
      const scrollAmount = 300;
      collectionsScrollRef?.current?.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
              Sui AI NFT Market 2025
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Thị trường NFT nâng cao AI: Thông minh hơn, Minh bạch hơn và Giá trị hơn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {marketMetrics?.map((metric, index) =>
            <MetricCard key={index} {...metric} />
            )}
          </div>

          <div className="mb-8 md:mb-12">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center gap-2 md:gap-3">
                <Icon name="Sparkles" size={24} color="var(--color-primary)" />
                <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground">
                  iNFT & AI Art Nổi bật
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('featured')}
                  className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-lg transition-smooth ${
                  activeTab === 'featured' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`
                  }>

                  Nổi bật
                </button>
                <button
                  onClick={() => setActiveTab('trending')}
                  className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-lg transition-smooth ${
                  activeTab === 'trending' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`
                  }>

                  Xu hướng
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {featuredNFTs?.map((nft) =>
              <NFTCard key={nft?.id} nft={nft} onViewDetails={handleViewNFTDetails} />
              )}
            </div>

            <div className="text-center mt-6 md:mt-8">
              <Button
                variant="outline"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={() => navigate('/nft-marketplace')}>

                Khám phá iNFT Market
              </Button>
            </div>
          </div>

          <div className="mb-8 md:mb-12">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center gap-2 md:gap-3">
                <Icon name="TrendingUp" size={24} color="var(--color-success)" />
                <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground">
                  Bộ sưu tập AI Xu hướng
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollCollections('left')}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-card border border-border hover:border-primary/30 flex items-center justify-center transition-smooth"
                  aria-label="Scroll left">

                  <Icon name="ChevronLeft" size={20} />
                </button>
                <button
                  onClick={() => scrollCollections('right')}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-card border border-border hover:border-primary/30 flex items-center justify-center transition-smooth"
                  aria-label="Scroll right">

                  <Icon name="ChevronRight" size={20} />
                </button>
              </div>
            </div>

            <div
              ref={collectionsScrollRef}
              className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-custom pb-4">

              {trendingCollections?.map((collection) =>
              <CollectionCard key={collection?.id} collection={collection} />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            <MarketChart data={priceChartData} title="Biến động SUI & AI Index" type="line" />
            <MarketChart data={volumeChartData} title="Khối lượng giao dịch iNFT" type="area" />
          </div>

          <div className="mb-8 md:mb-12">
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <Icon name="Lightbulb" size={24} color="var(--color-accent)" />
              <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground">
                Đề xuất AI Thông minh
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {aiRecommendations?.map((recommendation) =>
              <AIRecommendation
                key={recommendation?.id}
                recommendation={recommendation}
                onViewDetails={handleViewNFTDetails} />

              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <Icon name="Zap" size={24} color="var(--color-primary)" />
              <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground">
                Truy cập nhanh
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {quickActions?.map((action, index) =>
              <QuickAction key={index} {...action} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default HomepageDashboard;
