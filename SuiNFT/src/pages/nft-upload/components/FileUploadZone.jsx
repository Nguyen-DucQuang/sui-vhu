import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FileUploadZone = ({ onFileSelect, selectedFile }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleDragOver = useCallback((e) => {
    e?.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e?.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    setIsDragging(false);
    
    const files = e?.dataTransfer?.files;
    if (files?.length > 0) {
      handleFileSelection(files?.[0]);
    }
  }, []);

  const handleFileSelection = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'model/gltf-binary'];
    const maxSize = 100 * 1024 * 1024; // 100MB

    if (!validTypes?.includes(file?.type)) {
      alert('Định dạng file không được hỗ trợ. Vui lòng chọn ảnh, video hoặc mô hình 3D.');
      return;
    }

    if (file?.size > maxSize) {
      alert('Kích thước file vượt quá 100MB. Vui lòng chọn file nhỏ hơn.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e?.target?.result);
    };
    reader?.readAsDataURL(file);

    onFileSelect(file);
  };

  const handleFileInput = (e) => {
    const files = e?.target?.files;
    if (files?.length > 0) {
      handleFileSelection(files?.[0]);
    }
  };

  const removeFile = () => {
    setPreviewUrl(null);
    onFileSelect(null);
  };

  return (
    <div className="w-full">
      {!previewUrl ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl transition-all duration-300 ${
            isDragging 
              ? 'border-primary bg-primary/10 scale-[1.02]' 
              : 'border-border hover:border-primary/50 bg-card'
          }`}
        >
          <input
            type="file"
            id="file-upload"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            accept="image/*,video/*,.glb,.gltf"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-primary/20 rounded-full flex items-center justify-center mb-4 md:mb-6">
              <Icon name="Upload" size={32} color="var(--color-primary)" className="md:w-10 md:h-10 lg:w-12 lg:h-12" />
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold mb-2 md:mb-3 text-center">
              Kéo thả file hoặc nhấn để chọn
            </h3>
            <p className="text-sm md:text-base text-muted-foreground text-center mb-4 md:mb-6 max-w-md">
              Hỗ trợ: JPG, PNG, GIF, WEBP, MP4, WEBM, GLB, GLTF
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Image" size={16} />
                <span>Ảnh</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Video" size={16} />
                <span>Video</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Box" size={16} />
                <span>3D Model</span>
              </div>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mt-4 md:mt-6">
              Kích thước tối đa: 100MB
            </p>
          </div>
        </div>
      ) : (
        <div className="relative bg-card border border-border rounded-xl overflow-hidden">
          <div className="aspect-video w-full bg-muted flex items-center justify-center">
            {selectedFile?.type?.startsWith('image/') ? (
              <Image
                src={previewUrl}
                alt="Preview of uploaded NFT artwork showing the selected image file"
                className="w-full h-full object-contain"
              />
            ) : selectedFile?.type?.startsWith('video/') ? (
              <video
                src={previewUrl}
                controls
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Icon name="Box" size={64} color="var(--color-primary)" />
                <p className="text-sm md:text-base text-muted-foreground">Mô hình 3D đã tải lên</p>
              </div>
            )}
          </div>
          <div className="p-4 md:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
              <Icon name="FileCheck" size={24} color="var(--color-success)" />
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base font-medium truncate">{selectedFile?.name}</p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {(selectedFile?.size / (1024 * 1024))?.toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-2 hover:bg-destructive/10 rounded-lg transition-smooth flex-shrink-0"
              aria-label="Remove uploaded file"
            >
              <Icon name="Trash2" size={20} color="var(--color-destructive)" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;