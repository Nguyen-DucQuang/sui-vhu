import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import MetricCard from './components/MetricCard';
import MarketChart from './components/MarketChart';
import CollectionRankingTable from './components/CollectionRankingTable';
import PredictionCard from './components/PredictionCard';
import GasOptimizer from './components/GasOptimizer';
import CorrelationMatrix from './components/CorrelationMatrix';
import SentimentAnalysis from './components/SentimentAnalysis';

const MarketAnalysis = () => {
  const [selectedBlockchain, setSelectedBlockchain] = useState('ethereum');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blockchainOptions = [
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'solana', label: 'Solana' },
  { value: 'polygon', label: 'Polygon' },
  { value: 'all', label: 'Tất cả' }];


  const categoryOptions = [
  { value: 'all', label: 'Tất cả danh mục' },
  { value: 'art', label: 'Nghệ thuật' },
  { value: 'gaming', label: 'Game' },
  { value: 'pfp', label: 'PFP' },
  { value: 'metaverse', label: 'Metaverse' }];


  const marketMetrics = [
  {
    title: 'Vốn hóa thị trường',
    value: '12.4B ETH',
    change: '+8.5%',
    changeType: 'positive',
    icon: 'DollarSign',
    iconColor: 'var(--color-success)',
    trend: true
  },
  {
    title: 'Khối lượng 24h',
    value: '245.8M ETH',
    change: '+15.2%',
    changeType: 'positive',
    icon: 'TrendingUp',
    iconColor: 'var(--color-primary)',
    trend: true
  },
  {
    title: 'Số lượng giao dịch',
    value: '48,392',
    change: '-3.1%',
    changeType: 'negative',
    icon: 'Activity',
    iconColor: 'var(--color-warning)',
    trend: true
  },
  {
    title: 'Người dùng hoạt động',
    value: '125,847',
    change: '+12.8%',
    changeType: 'positive',
    icon: 'Users',
    iconColor: 'var(--color-accent)',
    trend: true
  }];


  const priceChartData = [
  { time: '00:00', ethereum: 4.2, solana: 2.8, polygon: 1.5 },
  { time: '04:00', ethereum: 4.5, solana: 3.1, polygon: 1.6 },
  { time: '08:00', ethereum: 4.3, solana: 2.9, polygon: 1.4 },
  { time: '12:00', ethereum: 4.8, solana: 3.4, polygon: 1.8 },
  { time: '16:00', ethereum: 5.2, solana: 3.7, polygon: 2.0 },
  { time: '20:00', ethereum: 5.0, solana: 3.5, polygon: 1.9 },
  { time: '24:00', ethereum: 5.4, solana: 3.9, polygon: 2.1 }];


  const volumeChartData = [
  { time: '00:00', volume: 12.5, transactions: 3200 },
  { time: '04:00', volume: 15.8, transactions: 4100 },
  { time: '08:00', volume: 18.2, transactions: 4800 },
  { time: '12:00', volume: 22.4, transactions: 5600 },
  { time: '16:00', volume: 25.7, transactions: 6200 },
  { time: '20:00', volume: 23.1, transactions: 5800 },
  { time: '24:00', volume: 26.9, transactions: 6500 }];


  const topCollections = [
  {
    id: 1,
    name: 'CryptoPunks',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ec5cfa33-1765116624307.png",
    imageAlt: 'Pixelated digital art portrait of punk character with blue mohawk hairstyle and sunglasses on dark background',
    items: 10000,
    floorPrice: 45.2,
    volume: 1247.8,
    change: 12.5,
    aiScore: 94
  },
  {
    id: 2,
    name: 'Bored Ape Yacht Club',
    image: "https://images.unsplash.com/photo-1622815542375-9bee66676495",
    imageAlt: 'Cartoon illustration of bored ape character with brown fur wearing red cap and gold chain necklace',
    items: 10000,
    floorPrice: 38.7,
    volume: 982.4,
    change: 8.3,
    aiScore: 91
  },
  {
    id: 3,
    name: 'Azuki',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1af4f5907-1765965430289.png",
    imageAlt: 'Anime-style digital artwork of young character with red jacket and black hair in urban Japanese setting',
    items: 10000,
    floorPrice: 12.4,
    volume: 567.9,
    change: -2.1,
    aiScore: 87
  },
  {
    id: 4,
    name: 'Doodles',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_114da3c48-1764822088188.png",
    imageAlt: 'Colorful hand-drawn doodle character with rainbow hair and happy expression on pastel background',
    items: 10000,
    floorPrice: 8.9,
    volume: 423.6,
    change: 5.7,
    aiScore: 83
  },
  {
    id: 5,
    name: 'CloneX',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1973f2993-1764778196200.png",
    imageAlt: 'Futuristic 3D rendered avatar with metallic silver skin and glowing blue eyes in cyberpunk style',
    items: 20000,
    floorPrice: 6.2,
    volume: 389.2,
    change: 15.4,
    aiScore: 89
  }];


  const predictions = [
  {
    title: 'CryptoPunks',
    currentPrice: 45.2,
    predictedPrice: 52.8,
    confidence: 87,
    timeframe: 'Dự đoán 24 giờ',
    trend: 'bullish'
  },
  {
    title: 'Bored Apes',
    currentPrice: 38.7,
    predictedPrice: 41.3,
    confidence: 82,
    timeframe: 'Dự đoán 24 giờ',
    trend: 'bullish'
  },
  {
    title: 'Azuki',
    currentPrice: 12.4,
    predictedPrice: 11.8,
    confidence: 75,
    timeframe: 'Dự đoán 24 giờ',
    trend: 'bearish'
  },
  {
    title: 'Doodles',
    currentPrice: 8.9,
    predictedPrice: 9.2,
    confidence: 68,
    timeframe: 'Dự đoán 24 giờ',
    trend: 'neutral'
  }];


  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Dữ liệu đã được xuất thành công!');
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Phân tích thị trường - NFT Nexus AI</title>
        <meta name="description" content="Phân tích thị trường NFT với AI - Dự đoán giá, xu hướng và insights chuyên sâu" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-24 md:pt-28 pb-12">
          <div className="mb-8 md:mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-2">
                  Phân tích thị trường
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Dữ liệu và insights được cung cấp bởi AI để đưa ra quyết định đầu tư thông minh
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Select
                  options={blockchainOptions}
                  value={selectedBlockchain}
                  onChange={setSelectedBlockchain}
                  placeholder="Chọn blockchain"
                  className="w-full sm:w-auto" />

                <Select
                  options={categoryOptions}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  placeholder="Chọn danh mục"
                  className="w-full sm:w-auto" />

                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={handleExport}
                  loading={isExporting}
                  className="w-full sm:w-auto">

                  Xuất dữ liệu
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {marketMetrics?.map((metric, index) =>
              <MetricCard key={index} {...metric} />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <MarketChart
              title="Biểu đồ giá trung bình"
              data={priceChartData}
              dataKeys={['ethereum', 'solana', 'polygon']}
              colors={['var(--color-primary)', 'var(--color-accent)', 'var(--color-secondary)']}
              type="line" />

            <MarketChart
              title="Khối lượng giao dịch"
              data={volumeChartData}
              dataKeys={['volume', 'transactions']}
              colors={['var(--color-success)', 'var(--color-warning)']}
              type="bar" />

          </div>

          <div className="mb-6">
            <CollectionRankingTable
              collections={topCollections}
              title="Bảng xếp hạng bộ sưu tập" />

          </div>

          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 md:mb-6">
              Dự đoán giá AI
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {predictions?.map((prediction, index) =>
              <PredictionCard key={index} {...prediction} />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <GasOptimizer />
            <SentimentAnalysis />
          </div>

          <div className="mb-6">
            <CorrelationMatrix />
          </div>

          <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-primary/30 flex items-center justify-center flex-shrink-0">
                <Icon name="Sparkles" size={28} color="var(--color-primary)" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-heading font-bold mb-2">
                  Nâng cấp lên Premium Analytics
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4">
                  Truy cập các công cụ phân tích nâng cao, dự đoán AI chính xác hơn và cảnh báo thời gian thực
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="default" iconName="Zap" iconPosition="left">
                    Nâng cấp ngay
                  </Button>
                  <Button variant="outline">
                    Tìm hiểu thêm
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="border-t border-border bg-card mt-12">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                &copy; {new Date()?.getFullYear()} NFT Nexus AI. Tất cả quyền được bảo lưu.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  Điều khoản
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  Quyền riêng tư
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  Hỗ trợ
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>);

};

export default MarketAnalysis;