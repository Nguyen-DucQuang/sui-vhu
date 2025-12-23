import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Header from '../../components/ui/Header';
import ImageGallery from './components/ImageGallery';
import PriceSection from './components/PriceSection';
import NFTInfo from './components/NFTInfo';
import AIAnalysis from './components/AIAnalysis';
import PriceHistory from './components/PriceHistory';
import TransactionHistory from './components/TransactionHistory';
import SimilarNFTs from './components/SimilarNFTs';

const NFTDetails = () => {
  const [aiValuation, setAiValuation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Fetch AI Valuation from backend
    const fetchAIValuation = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/valuate-nft', {
          metadata: { name: "Cosmic Warrior #7804" }
        });
        setAiValuation(response.data);
      } catch (error) {
        console.error("Error fetching AI valuation:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAIValuation();
  }, []);

  const nftData = {
    id: "nft-001",
    name: "AI Cosmic Warrior #7804",
    description: "Một tác phẩm nghệ thuật số độc đáo thuộc bộ sưu tập AI Enhanced Warriors, thể hiện sự kết hợp hoàn hảo giữa trí tuệ nhân tạo và công nghệ blockchain Sui hiện đại.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_174669be9-1764677206555.png",
    imageAlt: "Digital artwork featuring futuristic warrior character with glowing neon blue armor and cosmic background with purple nebula clouds",
    price: "450",
    usdPrice: "1,284",
    priceChange: "15.3",
    aiConfidence: aiValuation ? aiValuation.confidence : 87,
    volume24h: "234.5K",
    floorPrice: "380",
    highestSale: "620",
    gasEstimate: "0.01",
    collection: "AI Enhanced Warriors",
    collectionAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e0b06c28-1763294358632.png",
    collectionAvatarAlt: "Profile picture of collection creator showing professional male with short dark hair wearing black shirt",
    tokenId: "#7804",
    blockchain: "Sui",
    ownerName: "SuiMaster_2025",
    ownerAddress: "0x65ab...8601",
    ownerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f1bd326f-1763293505308.png",
    ownerAvatarAlt: "Profile picture of NFT owner showing young Asian male with glasses wearing casual blue hoodie",
    ownerNFTs: "127",
    ownerFollowers: "8.4K",
    traits: [
    { type: "Background", value: "Cosmic Purple", rarity: 12.5 },
    { type: "Armor", value: "Neon Blue", rarity: 8.3 },
    { type: "AI Model", value: "Nexus-v2", rarity: 5.7 },
    { type: "Intelligence", value: "Dynamic", rarity: 15.2 }]

  };

  const aiAnalysisData = {
    prediction24h: aiValuation ? aiValuation.estimatedValue : "465.2",
    predictionChange: "15.6",
    predictionReason: aiValuation ? aiValuation.analysis : "Dựa trên xu hướng thị trường hiện tại và hoạt động giao dịch tăng cao, AI dự đoán giá sẽ tăng trong 24 giờ tới.",
    investmentTips: [
    "Bộ sưu tập đang có xu hướng tăng trưởng mạnh với khối lượng giao dịch tăng 45% trong tuần qua",
    "Đặc điểm hiếm của NFT này (AI Model: Nexus-v2 - 5.7%) làm tăng giá trị dài hạn",
    "Chủ sở hữu hiện tại có lịch sử giao dịch tốt với tỷ lệ thành công 89%",
    "Thời điểm mua tốt nhất là trong 6-12 giờ tới khi mạng lưới Sui đang ổn định"],

    sentiment: "Rất tích cực",
    activity: "Cao",
    marketInsight: "Thị trường iNFT đang trong giai đoạn bùng nổ năm 2025. Bộ sưu tập AI Enhanced Warriors đặc biệt được chú ý nhờ khả năng tương tác và học hỏi của các iNFT.",
    riskLevel: "Thấp",
    riskScore: 25,
    riskAnalysis: "Mức độ rủi ro thấp do tính thanh khoản cao trên Sui và sự hỗ trợ mạnh mẽ từ cộng đồng AI."
  };

  const priceHistoryData = [
  { date: "16/12", price: 320 },
  { date: "17/12", price: 350 },
  { date: "18/12", price: 380 },
  { date: "19/12", price: 410 },
  { date: "20/12", price: 390 },
  { date: "21/12", price: 430 },
  { date: "22/12", price: 450 }];


  const transactionHistoryData = [
  {
    type: "sale",
    event: "Bán",
    price: "450 SUI",
    from: "0x8a3f...2b1c",
    fromAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_187db6b95-1763299828229.png",
    fromAvatarAlt: "Profile picture of seller showing professional woman with long brown hair wearing business attire",
    to: "0x65ab...8601",
    toAvatar: "https://images.unsplash.com/photo-1609747645698-0cf46033aba3",
    toAvatarAlt: "Profile picture of buyer showing young Asian male with glasses wearing casual blue hoodie",
    time: "2 giờ trước"
  }];


  const similarNFTsData = [
  {
    id: 1,
    name: "AI Cosmic Warrior #8921",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_174669be9-1764677206555.png",
    imageAlt: "Digital artwork of futuristic warrior with glowing green armor standing in cyberpunk cityscape with neon lights",
    price: "420 SUI",
    change: "12.8",
    aiScore: 85
  }];


  return (
    <>
      <Helmet>
        <title>Chi tiết iNFT - {nftData.name} | AI NFT Market</title>
        <meta name="description" content={`Xem chi tiết và phân tích AI cho iNFT ${nftData.name}. Giá hiện tại ${nftData.price} SUI với độ tin cậy AI ${nftData.aiConfidence}%.`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 md:pt-28 pb-12 md:pb-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
              <ImageGallery nft={nftData} />
              
              <div className="space-y-6 md:space-y-8">
                <NFTInfo nft={nftData} />
                <PriceSection nft={nftData} />
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <AIAnalysis analysis={aiAnalysisData} />
              <PriceHistory history={priceHistoryData} />
              <TransactionHistory transactions={transactionHistoryData} />
              <SimilarNFTs nfts={similarNFTsData} />
            </div>
          </div>
        </main>
      </div>
    </>);

};

export default NFTDetails;
