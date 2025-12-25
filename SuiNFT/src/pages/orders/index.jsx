import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';
import Toast from '../../components/ui/Toast';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const loadOrders = () => {
      const savedOrders = JSON.parse(localStorage.getItem('sui_nft_orders') || '[]');
      setOrders(savedOrders);
    };

    loadOrders();
    window.addEventListener('storage', loadOrders);
    window.addEventListener('ordersUpdated', loadOrders);
    return () => {
      window.removeEventListener('storage', loadOrders);
      window.removeEventListener('ordersUpdated', loadOrders);
    };
  }, []);

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    localStorage.setItem('sui_nft_orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    window.dispatchEvent(new Event('ordersUpdated'));
    setToast({
      message: 'Đã xóa đơn hàng thành công',
      type: 'success'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Icon name="ShoppingCart" size={32} color="var(--color-primary)" />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">Đơn hàng của tôi</h1>
              <p className="text-muted-foreground">Quản lý các giao dịch NFT của bạn trên Sui Network</p>
            </div>
          </div>
          <div className="bg-card border border-border px-4 py-2 rounded-xl">
            <span className="text-sm text-muted-foreground">Tổng số đơn: </span>
            <span className="font-bold text-primary">{orders.length}</span>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-card border border-border rounded-3xl p-20 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="ShoppingBag" size={40} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Chưa có đơn hàng nào</h3>
            <p className="text-muted-foreground mb-8">Hãy khám phá thị trường và sở hữu những iNFT đầu tiên của bạn.</p>
            <a href="/nft-marketplace" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-smooth">
              Đi đến Thị trường
            </a>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-card border border-border rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 hover:border-primary/30 transition-smooth group">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                  <img src={order.image} alt={order.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Sản phẩm</p>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-smooth">{order.name}</h3>
                    <p className="text-xs text-muted-foreground">{order.id}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Giá trị</p>
                    <p className="font-bold text-primary">{order.price} SUI</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Ngày mua</p>
                    <p className="text-foreground">{order.date}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Trạng thái</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Đã hoàn thành' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="flex-1 md:flex-none px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-smooth"
                  >
                    Chi tiết
                  </button>
                  <button 
                    onClick={() => handleDeleteOrder(order.id)}
                    className="flex-1 md:flex-none px-4 py-2 bg-error/10 text-error hover:bg-error hover:text-error-foreground rounded-lg text-sm font-medium transition-smooth"
                    title="Xóa đơn hàng"
                  >
                    <Icon name="Trash2" size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-lg w-full shadow-2xl animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-heading font-bold">Chi tiết đơn hàng</h3>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-muted rounded-lg transition-smooth">
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex gap-6 p-4 bg-muted/30 rounded-2xl">
                <img src={selectedOrder.image} alt={selectedOrder.name} className="w-32 h-32 rounded-xl object-cover shadow-lg" />
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-1">{selectedOrder.name}</h4>
                  <p className="text-primary font-medium mb-2">{selectedOrder.collection}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Hash" size={14} />
                    <span>{selectedOrder.id}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-xl">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Giá thanh toán</p>
                  <p className="text-lg font-bold text-primary">{selectedOrder.price} SUI</p>
                </div>
                <div className="p-4 border border-border rounded-xl">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Ngày giao dịch</p>
                  <p className="text-lg font-bold text-foreground">{selectedOrder.date}</p>
                </div>
              </div>

              <div className="p-4 border border-border rounded-xl">
                <p className="text-xs text-muted-foreground uppercase mb-2">Trạng thái đơn hàng</p>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="font-medium text-success">Giao dịch đã được xác nhận trên Sui Network</span>
                </div>
              </div>

              <button 
                onClick={() => setSelectedOrder(null)}
                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-smooth shadow-lg shadow-primary/20"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
};

export default OrdersPage;
