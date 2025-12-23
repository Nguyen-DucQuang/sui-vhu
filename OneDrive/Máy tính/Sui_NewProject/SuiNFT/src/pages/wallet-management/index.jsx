import React, { useEffect } from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';
import Header from '../../components/ui/Header';
import PortfolioOverview from './components/PortfolioOverview';
import AssetAllocation from './components/AssetAllocation';
import NFTCollection from './components/NFTCollection';
import TransactionHistory from './components/TransactionHistory';
import WatchlistManager from './components/WatchlistManager';
import PerformanceChart from './components/PerformanceChart';
import WalletConnection from './components/WalletConnection';

const WalletManagement = () => {
  const account = useCurrentAccount();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const portfolioData = {
    totalValue: 4250,
    change24h: 230,
    changePercent: 5.7,
    suiBalance: 1560.8,
    aiNftValue: 2689.2
  };

  const allocationData = [
  { name: "AI Art NFTs", value: 1850, percentage: 43.5 },
  { name: "iNFT Gaming", value: 1230, percentage: 28.9 },
  { name: "RWA NFTs", value: 680, percentage: 16.0 },
  { name: "Collectibles", value: 320, percentage: 7.5 },
  { name: "Metaverse", value: 170, percentage: 4.1 }];


  const nftCollection = [
  {
    id: 1,
    name: "AI Cosmic Warrior #7804",
    collection: "AI Enhanced Warriors",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16669640f-1765518223390.png",
    imageAlt: "Digital pixel art portrait of punk character with blue mohawk hairstyle and sunglasses on dark background representing CryptoPunk NFT collection",
    purchasePrice: 420,
    currentValue: 580,
    aiConfidence: 92
  },
  {
    id: 2,
    name: "Intelligent Neon #3421",
    collection: "iNFT Neon Collection",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19ae4ba69-1765478516439.png",
    imageAlt: "Cartoon illustration of bored ape character with golden fur wearing red cap and blue jacket on yellow background from BAYC NFT series",
    purchasePrice: 650,
    currentValue: 720,
    aiConfidence: 88
  }];


  const transactions = [
  {
    id: 1,
    type: "buy",
    nftName: "AI Cosmic Warrior #7804",
    amount: 420,
    gasFee: 0.15,
    date: "22/12/2025 08:30",
    status: "completed"
  },
  {
    id: 2,
    type: "mint",
    nftName: "iNFT Neon #5432",
    amount: 50,
    gasFee: 0.12,
    date: "20/12/2025 18:15",
    status: "completed"
  }];


  const watchlist = [
  {
    id: 1,
    name: "Quantum AI #3100",
    collection: "Quantum AI Collection",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1520d37ba-1766401142734.png",
    imageAlt: "Rare pixel art CryptoPunk character with alien green skin wearing headband on black background from legendary NFT collection",
    currentPrice: 1250,
    priceChange: 8.3,
    alertPrice: 1100
  }];


  const performanceData = [
  { date: "16/12", value: 3820, roi: 0 },
  { date: "17/12", value: 3950, roi: 3.4 },
  { date: "18/12", value: 3780, roi: -1.0 },
  { date: "19/12", value: 4010, roi: 5.0 },
  { date: "20/12", value: 4130, roi: 8.1 },
  { date: "21/12", value: 4080, roi: 6.8 },
  { date: "22/12", value: 4250, roi: 11.3 }];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
          <div className="mb-6 md:mb-8 lg:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-2 md:mb-3">
              Quản lí Ví Sui AI
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
              Quản lý danh mục đầu tư iNFT và theo dõi hiệu suất AI của bạn năm 2025
            </p>
          </div>

          <div className="space-y-6 md:space-y-8 lg:space-y-10">
            <PortfolioOverview portfolioData={portfolioData} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <AssetAllocation allocationData={allocationData} />
              <PerformanceChart performanceData={performanceData} />
            </div>

            {!account && <WalletConnection />}

            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4 md:mb-6">
                Bộ sưu tập iNFT của bạn
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {nftCollection?.map((nft) =>
                <NFTCollection key={nft?.id} nft={nft} />
                )}
              </div>
            </div>

            <TransactionHistory transactions={transactions} />

            <WatchlistManager watchlist={watchlist} />
          </div>
        </div>
      </main>
    </div>);

};

export default WalletManagement;
