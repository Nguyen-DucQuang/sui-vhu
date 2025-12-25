import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NFTCard = ({ nft, onAddToWatchlist, onQuickBuy }) => {
  const navigate = useNavigate();
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  const handleWatchlistToggle = (e) => {
    e?.stopPropagation();
    setIsWatchlisted(!isWatchlisted);
    onAddToWatchlist(nft?.id);
  };

  const handleQuickBuy = (e) => {
    e?.stopPropagation();
    onQuickBuy(nft);
  };

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = async (e) => {
    e?.stopPropagation();
    try {
      setIsAnalyzing(true);
      const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
      const res = await fetch(`${base}/ai/valuate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metadata: nft })
      });
      const data = await res.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error('Analyze error', err);
      alert('Lỗi khi gọi AI.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCardClick = () => {
    navigate('/nft-details');
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-error';
  };

  const getPriceChangeColor = (change) => {
    return change >= 0 ? 'text-success' : 'text-error';
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-[0_0_24px_rgba(99,102,241,0.2)] transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={nft?.image}
          alt={nft?.imageAlt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-lg border border-border">
            <Icon name="Sparkles" size={14} color="var(--color-accent)" />
            <span className={`text-xs font-medium data-text ${getConfidenceColor(nft?.aiConfidence)}`}>
              {nft?.aiConfidence}%
            </span>
          </div>

          <div className="flex items-center gap-2">
            {nft?.isHot && (
              <div className="px-3 py-1 bg-error/90 backdrop-blur-sm rounded-lg flex items-center">
                <span className="text-xs font-medium text-error-foreground">🔥 Hot</span>
              </div>
            )}

            <button
              onClick={handleWatchlistToggle}
              className="p-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border hover:bg-background transition-smooth"
            >
              <Icon 
                name={isWatchlisted ? "Heart" : "Heart"} 
                size={16} 
                color={isWatchlisted ? "var(--color-error)" : "currentColor"}
                className={isWatchlisted ? "fill-current" : ""}
              />
            </button>
          </div>
        </div>

        {nft?.isHot && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-error/90 backdrop-blur-sm rounded-lg">
            <span className="text-xs font-medium text-error-foreground">🔥 Hot</span>
          </div>
        )}

        {nft?.onAuction && (
          <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-warning/90 backdrop-blur-sm rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={14} color="var(--color-warning-foreground)" />
              <span className="text-xs font-medium text-warning-foreground data-text">{nft?.auctionEnds}</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 space-y-3 flex flex-col flex-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Image
              src={nft?.collectionAvatar}
              alt={nft?.collectionAvatarAlt}
              className="w-5 h-5 rounded-full"
            />
            <span className="text-xs text-muted-foreground">{nft?.collection}</span>
            {nft?.verified && (
              <Icon name="BadgeCheck" size={14} color="var(--color-primary)" />
            )}
          </div>
          <h3 className="text-base font-heading font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-smooth">
            {nft?.name}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Giá hiện tại</p>
            <div className="flex items-center gap-2">
              <Icon name="Coins" size={16} color="var(--color-accent)" />
              <span className="text-lg font-heading font-bold text-foreground data-text">
                {typeof nft?.price === 'number' ? `${nft.price} SUI` : nft?.price}
              </span>
            </div>
          </div>
          
          <div className="text-right space-y-1">
            <p className="text-xs text-muted-foreground">24h</p>
            <div className={`flex items-center gap-1 ${getPriceChangeColor(nft?.priceChange24h)}`}>
              <Icon 
                name={nft?.priceChange24h >= 0 ? "TrendingUp" : "TrendingDown"} 
                size={14} 
              />
              <span className="text-sm font-medium data-text">
                {nft?.priceChange24h >= 0 ? '+' : ''}{nft?.priceChange24h}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-stretch gap-2 pt-2 border-t border-border mt-auto">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={handleCardClick}
            className="flex-1 h-9"
          >
            Chi tiết
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Sparkles"
            iconPosition="left"
            onClick={handleAnalyze}
            className="flex-1 h-9"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? 'Đang phân tích...' : 'Phân tích AI'}
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="ShoppingCart"
            iconPosition="left"
            onClick={handleQuickBuy}
            className="flex-1 h-9"
          >
            Mua ngay
          </Button>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <div className="flex items-center gap-1">
            <Icon name="Users" size={12} />
            <span>{nft?.owners} chủ sở hữu</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="BarChart3" size={12} />
            <span>{nft?.volume} ETH</span>
          </div>
        </div>
      </div>
      {analysisResult && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Kết quả phân tích AI</h4>
              <button onClick={() => setAnalysisResult(null)} className="text-muted-foreground">Đóng</button>
            </div>
            <div className="space-y-3 text-sm">
              {analysisResult.error ? (
                <p className="text-error">{analysisResult.message}</p>
              ) : (
                <>
                  <p><strong>Giá ước tính:</strong> {analysisResult.estimatedValue} {analysisResult.currency}</p>
                  <p><strong>Độ tin cậy:</strong> {analysisResult.confidence}%</p>
                  <div>
                    <strong>Phân tích:</strong>
                    <p className="mt-2 text-muted-foreground whitespace-pre-wrap">{String(analysisResult.analysis || analysisResult.description || analysisResult.ai || JSON.stringify(analysisResult.raw || {})).slice(0,2000)}</p>
                  </div>
                </>
              )}
            </div>
            <div className="mt-4 text-right">
              <button onClick={() => setAnalysisResult(null)} className="px-4 py-2 bg-muted rounded-lg">Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTCard;