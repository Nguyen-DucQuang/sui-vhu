import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ImageGallery = ({ nft }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const images = [
  { url: nft?.image, alt: nft?.imageAlt },
  { url: "https://img.rocket.new/generatedImages/rocket_gen_img_15503e261-1765960975253.png", alt: "Detailed view of vibrant digital artwork showing intricate geometric patterns in neon blue and purple colors" },
  { url: "https://img.rocket.new/generatedImages/rocket_gen_img_15503e261-1765960975253.png", alt: "Close-up perspective of NFT artwork highlighting unique texture details and color gradients in electric blue tones" },
  { url: "https://img.rocket.new/generatedImages/rocket_gen_img_1f563d9cb-1766333441260.png", alt: "Alternative angle of digital collectible showing full composition with vibrant neon accents and futuristic design elements" }];


  return (
    <div className="space-y-4">
      <div className="relative bg-card rounded-xl overflow-hidden border border-border aspect-square">
        <Image
          src={images?.[selectedImage]?.url}
          alt={images?.[selectedImage]?.alt}
          className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
          onClick={() => setIsZoomed(!isZoomed)} />

        
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 bg-background/80 backdrop-blur-sm rounded-lg hover:bg-background transition-smooth"
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}>

            <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={20} />
          </button>
          <button
            className="p-2 bg-background/80 backdrop-blur-sm rounded-lg hover:bg-background transition-smooth"
            aria-label="Share NFT">

            <Icon name="Share2" size={20} />
          </button>
        </div>

        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-success/20 backdrop-blur-sm rounded-lg border border-success/30">
            <Icon name="CheckCircle" size={16} color="var(--color-success)" />
            <span className="text-xs font-medium text-success">Đã xác minh</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {images?.map((img, index) =>
        <button
          key={index}
          onClick={() => setSelectedImage(index)}
          className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-smooth ${
          selectedImage === index ? 'border-primary shadow-[0_0_12px_rgba(99,102,241,0.4)]' : 'border-border hover:border-primary/50'}`
          }>

            <Image
            src={img?.url}
            alt={img?.alt}
            className="w-full h-full object-cover" />

          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <div className="bg-muted/50 rounded-lg p-3 md:p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Eye" size={16} color="var(--color-primary)" />
            <span className="text-xs md:text-sm text-muted-foreground">Lượt xem</span>
          </div>
          <p className="text-lg md:text-xl font-heading font-bold">12,847</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 md:p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Heart" size={16} color="var(--color-error)" />
            <span className="text-xs md:text-sm text-muted-foreground">Yêu thích</span>
          </div>
          <p className="text-lg md:text-xl font-heading font-bold">3,421</p>
        </div>
      </div>
    </div>);

};

export default ImageGallery;