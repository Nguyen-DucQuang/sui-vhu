import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const MetadataForm = ({ formData, onChange, errors }) => {
  const collectionOptions = [
    { value: 'cryptopunks', label: 'CryptoPunks' },
    { value: 'bored-apes', label: 'Bored Ape Yacht Club' },
    { value: 'azuki', label: 'Azuki' },
    { value: 'doodles', label: 'Doodles' },
    { value: 'moonbirds', label: 'Moonbirds' },
    { value: 'create-new', label: '+ Tạo bộ sưu tập mới' }
  ];

  const categoryOptions = [
    { value: 'art', label: 'Nghệ thuật' },
    { value: 'collectibles', label: 'Sưu tầm' },
    { value: 'gaming', label: 'Game' },
    { value: 'photography', label: 'Nhiếp ảnh' },
    { value: 'music', label: 'Âm nhạc' },
    { value: 'virtual-worlds', label: 'Thế giới ảo' },
    { value: 'sports', label: 'Thể thao' },
    { value: 'utility', label: 'Tiện ích' }
  ];

  const handleInputChange = (field, value) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <Input
          label="Tên NFT"
          type="text"
          placeholder="Nhập tên cho NFT của bạn"
          value={formData?.name}
          onChange={(e) => handleInputChange('name', e?.target?.value)}
          error={errors?.name}
          required
          description="Tên sẽ hiển thị trên marketplace"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Mô tả <span className="text-destructive">*</span>
        </label>
        <textarea
          value={formData?.description}
          onChange={(e) => handleInputChange('description', e?.target?.value)}
          placeholder="Mô tả chi tiết về NFT của bạn..."
          rows={4}
          className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-250 resize-none"
        />
        {errors?.description && (
          <p className="text-xs text-destructive mt-1">{errors?.description}</p>
        )}
        <p className="text-xs text-muted-foreground mt-2">
          Markdown được hỗ trợ. {formData?.description?.length}/1000 ký tự
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Select
          label="Bộ sưu tập"
          options={collectionOptions}
          value={formData?.collection}
          onChange={(value) => handleInputChange('collection', value)}
          placeholder="Chọn bộ sưu tập"
          searchable
          description="Nhóm NFT vào bộ sưu tập"
        />

        <Select
          label="Danh mục"
          options={categoryOptions}
          value={formData?.category}
          onChange={(value) => handleInputChange('category', value)}
          placeholder="Chọn danh mục"
          required
          error={errors?.category}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-3">
          Thuộc tính (Traits)
        </label>
        <div className="space-y-3">
          {formData?.traits?.map((trait, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                type="text"
                placeholder="Tên thuộc tính (vd: Background)"
                value={trait?.name}
                onChange={(e) => {
                  const newTraits = [...formData?.traits];
                  newTraits[index].name = e?.target?.value;
                  handleInputChange('traits', newTraits);
                }}
              />
              <Input
                type="text"
                placeholder="Giá trị (vd: Blue)"
                value={trait?.value}
                onChange={(e) => {
                  const newTraits = [...formData?.traits];
                  newTraits[index].value = e?.target?.value;
                  handleInputChange('traits', newTraits);
                }}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => handleInputChange('traits', [...formData?.traits, { name: '', value: '' }])}
          className="mt-3 text-sm text-primary hover:text-primary/80 transition-smooth flex items-center gap-2"
        >
          + Thêm thuộc tính
        </button>
      </div>
      <div>
        <Input
          label="External Link"
          type="url"
          placeholder="https://yoursite.com/item/123"
          value={formData?.externalLink}
          onChange={(e) => handleInputChange('externalLink', e?.target?.value)}
          description="Link đến website hoặc thông tin bổ sung"
        />
      </div>
    </div>
  );
};

export default MetadataForm;