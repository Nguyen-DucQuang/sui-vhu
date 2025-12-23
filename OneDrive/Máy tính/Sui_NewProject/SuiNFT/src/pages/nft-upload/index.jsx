import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentAccount, ConnectButton, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FileUploadZone from './components/FileUploadZone';
import MetadataForm from './components/MetadataForm';
import AIPricingAssistant from './components/AIPricingAssistant';
import ListingConfiguration from './components/ListingConfiguration';
import GasFeeCalculator from './components/GasFeeCalculator';
import NFTPreview from './components/NFTPreview';

const NFTUpload = () => {
  const navigate = useNavigate();
  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [metadata, setMetadata] = useState({
    name: '',
    description: '',
    collection: '',
    category: '',
    traits: [{ name: '', value: '' }],
    externalLink: ''
  });

  const [listingConfig, setListingConfig] = useState({
    listingType: 'fixed',
    price: '',
    blockchain: 'sui',
    auctionDuration: '7',
    buyNowPrice: '',
    royalty: '5',
    supply: '1',
    unlockableContent: false,
    unlockableText: '',
    explicitContent: false,
    lazyMinting: true
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, name: 'Tải file', icon: 'Upload' },
    { id: 2, name: 'Thông tin', icon: 'FileText' },
    { id: 3, name: 'Định giá', icon: 'DollarSign' },
    { id: 4, name: 'Xác nhận', icon: 'CheckCircle' }
  ];

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!selectedFile) {
        newErrors.file = 'Vui lòng chọn file để tải lên';
      }
    }

    if (step === 2) {
      if (!metadata?.name?.trim()) {
        newErrors.name = 'Tên NFT là bắt buộc';
      }
      if (!metadata?.description?.trim()) {
        newErrors.description = 'Mô tả là bắt buộc';
      }
      if (!metadata?.category) {
        newErrors.category = 'Vui lòng chọn danh mục';
      }
    }

    if (step === 3) {
      if (!listingConfig?.price || parseFloat(listingConfig?.price) <= 0) {
        newErrors.price = 'Giá phải lớn hơn 0';
      }
      if (!listingConfig?.blockchain) {
        newErrors.blockchain = 'Vui lòng chọn blockchain';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    try {
      const txb = new Transaction();
      // Replace with your actual package ID after deployment
      const PACKAGE_ID = "0x..."; 
      
      txb.moveCall({
        target: `${PACKAGE_ID}::nft_nexus::mint_to_sender`,
        arguments: [
          txb.pure(metadata.name),
          txb.pure(metadata.description),
          txb.pure("https://gateway.pinata.cloud/ipfs/Qm..."), // Mock URL
          txb.pure(85), // Mock AI score
        ],
      });

      signAndExecuteTransaction(
        {
          transaction: txb,
          chain: 'sui:testnet',
        },
        {
          onSuccess: (result) => {
            console.log('NFT minted successfully', result);
            setIsSubmitting(false);
            alert('NFT đã được tạo thành công trên Sui Testnet!');
            navigate('/wallet-management');
          },
          onError: (error) => {
            console.error('Minting failed', error);
            setIsSubmitting(false);
            alert('Lỗi khi tạo NFT: ' + error.message);
          },
        }
      );
    } catch (error) {
      console.error('Transaction preparation failed', error);
      setIsSubmitting(false);
      alert('Lỗi chuẩn bị giao dịch');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28 pb-12 md:pb-16 lg:pb-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {!account ? (
              <div className="flex flex-col items-center justify-center py-20 bg-card border border-border rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <Icon name="Wallet" size={40} color="var(--color-primary)" />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4 text-center">
                  Hãy liên kết ví Sui Wallet để có thể Đăng tải
                </h2>
                <p className="text-muted-foreground mb-8 text-center max-w-md px-6">
                  Bạn cần kết nối ví Sui để truy cập các tính năng tạo và niêm yết NFT trên thị trường AI 2025.
                </p>
                <div className="wallet-widget">
                  <ConnectButton connectText="Kết nối Ví Sui ngay" />
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8 md:mb-12">
                  <button
                    onClick={() => navigate('/homepage-dashboard')}
                    className="flex items-center gap-2 text-sm md:text-base text-muted-foreground hover:text-foreground transition-smooth mb-4 md:mb-6"
                  >
                    <Icon name="ArrowLeft" size={20} />
                    <span>Quay lại trang chủ</span>
                  </button>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 md:mb-4">
                    Tạo NFT mới
                  </h1>
                  <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
                    Tải lên tác phẩm của bạn và nhận gợi ý giá thông minh từ AI trên mạng lưới Sui
                  </p>
                </div>

                <div className="mb-8 md:mb-12">
                  <div className="flex items-center justify-between">
                    {steps?.map((step, index) => (
                      <React.Fragment key={step?.id}>
                        <div className="flex flex-col items-center gap-2 md:gap-3 flex-1">
                          <div
                            className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                              currentStep >= step?.id
                                ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            <Icon name={step?.icon} size={20} className="md:w-6 md:h-6" />
                          </div>
                          <span
                            className={`text-xs md:text-sm font-medium text-center ${
                              currentStep >= step?.id ? 'text-foreground' : 'text-muted-foreground'
                            }`}
                          >
                            {step?.name}
                          </span>
                        </div>
                        {index < steps?.length - 1 && (
                          <div
                            className={`h-0.5 flex-1 mx-2 md:mx-4 transition-all duration-300 ${
                              currentStep > step?.id ? 'bg-primary' : 'bg-border'
                            }`}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                  <div className="lg:col-span-2 space-y-6 md:space-y-8">
                    {currentStep === 1 && (
                      <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8">
                        <h2 className="text-xl md:text-2xl font-heading font-semibold mb-4 md:mb-6">
                          Tải lên tác phẩm
                        </h2>
                        <FileUploadZone
                          onFileSelect={setSelectedFile}
                          selectedFile={selectedFile}
                        />
                        {errors?.file && (
                          <p className="text-sm text-destructive mt-3">{errors?.file}</p>
                        )}
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8">
                        <h2 className="text-xl md:text-2xl font-heading font-semibold mb-4 md:mb-6">
                          Thông tin NFT
                        </h2>
                        <MetadataForm
                          formData={metadata}
                          onChange={setMetadata}
                          errors={errors}
                        />
                      </div>
                    )}

                    {currentStep === 3 && (
                      <>
                        <AIPricingAssistant
                          fileData={selectedFile}
                          metadata={metadata}
                        />
                        <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8">
                          <h2 className="text-xl md:text-2xl font-heading font-semibold mb-4 md:mb-6">
                            Cấu hình niêm yết
                          </h2>
                          <ListingConfiguration
                            config={listingConfig}
                            onChange={setListingConfig}
                            errors={errors}
                          />
                        </div>
                        <GasFeeCalculator
                          blockchain={listingConfig?.blockchain}
                          lazyMinting={listingConfig?.lazyMinting}
                        />
                      </>
                    )}

                    {currentStep === 4 && (
                      <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8">
                        <h2 className="text-xl md:text-2xl font-heading font-semibold mb-4 md:mb-6">
                          Xác nhận và tạo NFT
                        </h2>
                        <div className="space-y-4 md:space-y-6">
                          <div className="bg-muted/50 rounded-xl p-4 md:p-6">
                            <h3 className="text-base md:text-lg font-heading font-semibold mb-4">
                              Tóm tắt
                            </h3>
                            <div className="space-y-3 text-sm md:text-base">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Tên NFT</span>
                                <span className="font-medium">{metadata?.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Danh mục</span>
                                <span className="font-medium capitalize">{metadata?.category}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Loại niêm yết</span>
                                <span className="font-medium">
                                  {listingConfig?.listingType === 'fixed' ? 'Giá cố định' : 'Đấu giá'}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Giá</span>
                                <span className="font-medium">
                                  {listingConfig?.price} SUI
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Blockchain</span>
                                <span className="font-medium capitalize">Sui</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Phí bản quyền</span>
                                <span className="font-medium">{listingConfig?.royalty}%</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 md:p-6">
                            <div className="flex items-start gap-3">
                              <Icon name="AlertCircle" size={24} color="var(--color-accent)" className="flex-shrink-0" />
                              <div className="text-sm md:text-base">
                                <p className="font-medium mb-2">Lưu ý quan trọng:</p>
                                <ul className="space-y-1 text-muted-foreground">
                                  <li>• Sau khi tạo, bạn không thể thay đổi thông tin NFT</li>
                                  <li>• Đảm bảo bạn có đủ SUI để trả phí gas</li>
                                  <li>• NFT sẽ xuất hiện trên marketplace sau khi được xác nhận</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
                      {currentStep > 1 && (
                        <Button
                          variant="outline"
                          size="lg"
                          iconName="ArrowLeft"
                          iconPosition="left"
                          onClick={handleBack}
                          disabled={isSubmitting}
                          className="w-full sm:w-auto"
                        >
                          Quay lại
                        </Button>
                      )}
                      {currentStep < 4 ? (
                        <Button
                          variant="default"
                          size="lg"
                          iconName="ArrowRight"
                          iconPosition="right"
                          onClick={handleNext}
                          className="w-full sm:flex-1"
                        >
                          Tiếp tục
                        </Button>
                      ) : (
                        <Button
                          variant="default"
                          size="lg"
                          iconName="CheckCircle"
                          iconPosition="left"
                          onClick={handleSubmit}
                          loading={isSubmitting}
                          className="w-full sm:flex-1"
                        >
                          {isSubmitting ? 'Đang tạo NFT...' : 'Tạo NFT'}
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <NFTPreview
                      fileData={selectedFile}
                      metadata={metadata}
                      config={listingConfig}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NFTUpload;
