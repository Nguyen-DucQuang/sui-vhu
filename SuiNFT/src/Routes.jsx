import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import NFTUpload from './pages/nft-upload';
import WalletManagement from './pages/wallet-management';
import HomepageDashboard from './pages/homepage-dashboard';
import NFTMarketplace from './pages/nft-marketplace';
import NFTDetails from './pages/nft-details';
import MarketAnalysis from './pages/market-analysis';
import Orders from './pages/orders';
import AdminDashboard from './admin/AdminDashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomepageDashboard />} />
        <Route path="/nft-upload" element={<NFTUpload />} />
        <Route path="/wallet-management" element={<WalletManagement />} />
        <Route path="/homepage-dashboard" element={<HomepageDashboard />} />
        <Route path="/nft-marketplace" element={<NFTMarketplace />} />
        <Route path="/nft-details" element={<NFTDetails />} />
        <Route path="/market-analysis" element={<MarketAnalysis />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
