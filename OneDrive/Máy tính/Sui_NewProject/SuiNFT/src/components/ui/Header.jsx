import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@mysten/dapp-kit';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'price', message: 'CryptoPunk #7804 giá tăng 15%', time: '5 phút trước', read: false },
    { id: 2, type: 'transaction', message: 'Giao dịch hoàn tất thành công', time: '1 giờ trước', read: false },
    { id: 3, type: 'alert', message: 'Gas fee hiện tại: 45 Gwei', time: '2 giờ trước', read: true },
  ]);
  const [gasPrice, setGasPrice] = useState({ fast: 45, average: 35, slow: 25 });
  const [isGasExpanded, setIsGasExpanded] = useState(false);

  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const gasRef = useRef(null);

  const navigationItems = [
    { path: '/homepage-dashboard', label: 'Trang chủ', icon: 'Home' },
    { path: '/nft-marketplace', label: 'Thị trường', icon: 'Store' },
    { path: '/market-analysis', label: 'Phân tích', icon: 'TrendingUp' },
    { path: '/wallet-management', label: 'Quản lí Ví', icon: 'Wallet' },
    { path: '/nft-upload', label: 'Đăng tải', icon: 'Upload' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setIsSearchExpanded(false);
      }
      if (notificationRef?.current && !notificationRef?.current?.contains(event?.target)) {
        setIsNotificationOpen(false);
      }
      if (gasRef?.current && !gasRef?.current?.contains(event?.target)) {
        setIsGasExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Searching for:', searchQuery);
      setSearchQuery('');
      setIsSearchExpanded(false);
    }
  };

  const handleNotificationClick = (id) => {
    setNotifications(notifications?.map(notif => 
      notif?.id === id ? { ...notif, read: true } : notif
    ));
  };

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <>
      <button
        className="mobile-menu-button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
      </button>
      <header className="nav-header">
        <div className="container mx-auto h-full px-6">
          <div className="flex items-center justify-between h-full">
            <Link to="/homepage-dashboard" className="flex items-center gap-3">
              <div className="nav-header-logo">
                <Icon name="Zap" size={28} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-heading font-bold text-foreground hidden sm:block">
                Sui AI NFT Market 2025
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`nav-link ${location?.pathname === item?.path ? 'active' : ''}`}
                >
                  {item?.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <div ref={searchRef} className="relative hidden md:block">
                {isSearchExpanded ? (
                  <form onSubmit={handleSearchSubmit} className="flex items-center">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      placeholder="Tìm kiếm NFT..."
                      className="search-input w-64"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setIsSearchExpanded(false)}
                      className="ml-2 p-2 hover:bg-muted rounded-lg transition-smooth"
                    >
                      <Icon name="X" size={20} />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setIsSearchExpanded(true)}
                    className="p-2 hover:bg-muted rounded-lg transition-smooth"
                    aria-label="Open search"
                  >
                    <Icon name="Search" size={20} />
                  </button>
                )}
              </div>

              <div ref={gasRef} className="relative hidden lg:block">
                <button
                  onClick={() => setIsGasExpanded(!isGasExpanded)}
                  className="gas-tracker hover:border-primary/30 transition-smooth"
                >
                  <Icon name="Fuel" size={16} color="var(--color-accent)" />
                  <span className="text-accent">{gasPrice?.fast}</span>
                  <span className="text-muted-foreground text-xs">Gwei</span>
                </button>

                {isGasExpanded && (
                  <div className="dropdown-menu w-64">
                    <div className="p-4">
                      <h4 className="font-heading font-medium mb-3">Chi phí Gas</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                          <span className="text-sm">Nhanh</span>
                          <span className="data-text text-success">{gasPrice?.fast} Gwei</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                          <span className="text-sm">Trung bình</span>
                          <span className="data-text text-warning">{gasPrice?.average} Gwei</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                          <span className="text-sm">Chậm</span>
                          <span className="data-text text-muted-foreground">{gasPrice?.slow} Gwei</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div ref={notificationRef} className="relative">
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="relative p-2 hover:bg-muted rounded-lg transition-smooth"
                  aria-label="Notifications"
                >
                  <Icon name="Bell" size={20} />
                  {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                  )}
                </button>

                {isNotificationOpen && (
                  <div className="dropdown-menu">
                    <div className="p-4 border-b border-border">
                      <h4 className="font-heading font-medium">Thông báo</h4>
                    </div>
                    <div className="max-h-96 overflow-y-auto scrollbar-custom">
                      {notifications?.map((notif) => (
                        <div
                          key={notif?.id}
                          onClick={() => handleNotificationClick(notif?.id)}
                          className={`dropdown-item ${!notif?.read ? 'bg-primary/5' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            <Icon 
                              name={notif?.type === 'price' ? 'TrendingUp' : notif?.type === 'transaction' ? 'CheckCircle' : 'AlertCircle'} 
                              size={20} 
                              color={notif?.type === 'price' ? 'var(--color-success)' : notif?.type === 'transaction' ? 'var(--color-primary)' : 'var(--color-warning)'}
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{notif?.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notif?.time}</p>
                            </div>
                            {!notif?.read && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="wallet-widget">
                <ConnectButton connectText="Kết nối Ví" />
              </div>
            </div>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div className="mobile-nav-overlay animate-fade-in">
          <div className="flex flex-col h-full pt-20 px-6">
            <nav className="flex flex-col gap-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`nav-link flex items-center gap-3 ${location?.pathname === item?.path ? 'active' : ''}`}
                >
                  <Icon name={item?.icon} size={20} />
                  {item?.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 space-y-4">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  placeholder="Tìm kiếm NFT..."
                  className="search-input"
                />
              </form>

              <div className="gas-tracker w-full justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="Fuel" size={16} color="var(--color-accent)" />
                  <span className="text-sm">Gas Fee</span>
                </div>
                <span className="data-text text-accent">{gasPrice?.fast} Gwei</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
