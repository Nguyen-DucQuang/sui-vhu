import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/ui/Header';

function AdminAuthHeader() {
  const jwt = localStorage.getItem('admin_token');
  if (jwt) return `Bearer ${jwt}`;
  const token = localStorage.getItem('admin_auth');
  return token ? `Basic ${token}` : null;
}

const AdminDashboard = () => {
  const [loggedIn, setLoggedIn] = useState(!!(localStorage.getItem('admin_token') || localStorage.getItem('admin_auth')));
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [metrics, setMetrics] = useState(null);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [nfts, setNfts] = useState([]);

  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  // Upload form state
  const [uploadName, setUploadName] = useState('');
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadPrice, setUploadPrice] = useState('');
  const [uploadImage, setUploadImage] = useState(null);
  const [uploadAddress, setUploadAddress] = useState('');
  const [syncQueue, setSyncQueue] = useState(() => {
    try { return JSON.parse(localStorage.getItem('admin_sync_queue') || '[]'); } catch { return []; }
  });
  const [isSyncing, setIsSyncing] = useState(false);

  const doLogin = async () => {
    try {
      const res = await fetch(`${apiBase}/admin/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user, pass }) });
      const j = await res.json();
      if (j.success && j.token) {
        localStorage.setItem('admin_token', j.token);
        setLoggedIn(true);
        return;
      }
      alert('Sai thông tin đăng nhập admin');
    } catch (e) {
      alert('Không thể kết nối server để đăng nhập');
    }
  };

  const doLogout = () => {
    localStorage.removeItem('admin_auth');
    localStorage.removeItem('admin_token');
    setLoggedIn(false);
  };

  const fetchAll = async () => {
    const auth = AdminAuthHeader();
    try {
      const h = auth ? { Authorization: auth } : {};
      const [m, u, t, nft] = await Promise.all([
        fetch(`${apiBase}/admin/metrics`, { headers: h }).then(r => r.json()),
        fetch(`${apiBase}/admin/users`, { headers: h }).then(r => r.json()),
        fetch(`${apiBase}/admin/transactions`, { headers: h }).then(r => r.json()),
        fetch(`${apiBase}/admin/nfts`, { headers: h }).then(r => r.json()),
      ]);
      if (m.success) setMetrics(m.data);
      if (u.success) setUsers(u.data);
      if (t.success) setTransactions(t.data);
      if (nft.success) setNfts(nft.data);
    } catch (e) {
      console.error('Admin fetch error', e);
    }
  };

  // Defensive normalization to avoid crashes if backend returns unexpected shapes
  useEffect(() => {
    if (metrics && !Array.isArray(metrics?.recentTx)) {
      metrics.recentTx = Array.isArray(metrics?.recentTx) ? metrics.recentTx : [];
    }
    if (users && !Array.isArray(users)) setUsers(Array.isArray(users) ? users : []);
    if (transactions && !Array.isArray(transactions)) setTransactions(Array.isArray(transactions) ? transactions : []);
    if (nfts && !Array.isArray(nfts)) setNfts(Array.isArray(nfts) ? nfts : []);
  }, [metrics, users, transactions, nfts]);

  const handleImageChange = (e) => {
    const f = e?.target?.files?.[0];
    setUploadImage(f || null);
  };

  // Helpers for queueing/sync
  const saveQueue = (q) => { setSyncQueue(q); localStorage.setItem('admin_sync_queue', JSON.stringify(q)); };

  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while(n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
  };

  const readFileAsDataURL = (file) => new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = rej;
    fr.readAsDataURL(file);
  });

  const enqueueAction = (action) => {
    const q = [...syncQueue, action];
    saveQueue(q);
  };

  const processQueue = async () => {
    if (isSyncing || syncQueue.length === 0) return;
    setIsSyncing(true);
    const auth = AdminAuthHeader();
    const headers = auth ? { Authorization: auth } : {};
    const remaining = [];
    for (const a of syncQueue) {
      try {
        if (a.type === 'upload_nft') {
          const fd = new FormData();
          fd.append('name', a.payload.name);
          fd.append('description', a.payload.description);
          fd.append('price', a.payload.price || '');
          if (a.payload.publicAddress) fd.append('publicAddress', a.payload.publicAddress);
          if (a.payload.imageDataUrl) {
            const blob = dataURLtoBlob(a.payload.imageDataUrl);
            fd.append('image', blob, a.payload.imageName || 'upload.png');
          }
          const res = await fetch(`${apiBase}/admin/nfts`, { method: 'POST', headers, body: fd });
          if (!res.ok) throw new Error('Upload failed');
        }
        // other action types can be added here
      } catch (err) {
        remaining.push(a);
      }
    }
    saveQueue(remaining);
    setIsSyncing(false);
    if (remaining.length === 0) fetchAll();
  };

  // periodic queue processing
  useEffect(() => {
    const iv = setInterval(() => { processQueue(); }, 8000);
    return () => clearInterval(iv);
  }, [syncQueue, isSyncing]);

  const uploadNFT = async (e) => {
    e?.preventDefault();
    const auth = AdminAuthHeader();
    try {
      const headers = auth ? { Authorization: auth } : {};
      // Try immediate upload. If it fails, enqueue for background sync.
      try {
        const fd = new FormData();
        fd.append('name', uploadName);
        fd.append('description', uploadDesc);
        fd.append('publicAddress', uploadAddress);
        fd.append('price', uploadPrice);
        if (uploadImage) fd.append('image', uploadImage);
        const res = await fetch(`${apiBase}/admin/nfts`, { method: 'POST', headers, body: fd });
        if (res.ok) {
          setUploadName(''); setUploadDesc(''); setUploadPrice(''); setUploadImage(null);
          fetchAll();
          alert('NFT uploaded/created successfully');
          return;
        }
        throw new Error('Immediate upload failed');
      } catch (err) {
        // fallback: read image as data URL and enqueue
        const payload = { name: uploadName, description: uploadDesc, price: uploadPrice, publicAddress: uploadAddress };
        if (uploadImage) {
          try {
            const dataUrl = await readFileAsDataURL(uploadImage);
            payload.imageDataUrl = dataUrl;
            payload.imageName = uploadImage.name;
          } catch (e) {
            console.warn('Failed to read image for queue', e);
          }
        }
        enqueueAction({ type: 'upload_nft', payload, createdAt: Date.now() });
        setUploadName(''); setUploadDesc(''); setUploadPrice(''); setUploadImage(null);
        alert('Backend unreachable — NFT saved to local queue and will sync automatically');
      }
    } catch (err) {
      console.error('Upload error', err);
      alert('Upload error');
    }
  };

  useEffect(() => {
    if (loggedIn) fetchAll();
  }, [loggedIn]);

  // Subscribe to server-sent events for live updates with reconnection/backoff
  useEffect(() => {
    if (!loggedIn) return;
    const esRef = useRef?.current; // noop to hint linter; real refs below
    const eventSourceRef = { current: null };
    let reconnectTimer = null;
    let backoff = 1000;

    const connect = () => {
      const token = localStorage.getItem('admin_token') || localStorage.getItem('admin_auth');
      const url = `${apiBase}/admin/stream${token ? `?token=${encodeURIComponent(token)}` : ''}`;
      try {
        const es = new EventSource(url);
        eventSourceRef.current = es;
        es.onopen = () => {
          backoff = 1000; // reset backoff on success
          console.debug('SSE connected');
        };
        es.onmessage = (e) => {
          try {
            const payload = JSON.parse(e.data);
            if (payload?.type === 'user_connected') {
              setUsers(prev => [payload.data, ...prev.filter(u => u.address !== payload.data.address)]);
            }
            if (payload?.type === 'nft_created') {
              setNfts(prev => [payload.data, ...prev]);
            }
            if (payload?.type === 'transaction_created') {
              setTransactions(prev => [payload.data, ...prev]);
            }
          } catch (err) {
            console.warn('SSE parse error', err);
          }
        };
        es.onerror = (err) => {
          console.warn('SSE error, will attempt reconnect', err);
          try { es.close(); } catch (e) {}
          scheduleReconnect();
        };
      } catch (err) {
        console.warn('SSE connect failed', err);
        scheduleReconnect();
      }
    };

    const scheduleReconnect = () => {
      if (reconnectTimer) clearTimeout(reconnectTimer);
      reconnectTimer = setTimeout(() => {
        backoff = Math.min(backoff * 2, 30000);
        connect();
      }, backoff);
    };

    connect();

    return () => {
      try { if (eventSourceRef.current) eventSourceRef.current.close(); } catch (e) {}
      if (reconnectTimer) clearTimeout(reconnectTimer);
    };
  }, [loggedIn]);

  // Poll for updates while admin is logged in so purchases/changes show up
  useEffect(() => {
    let iv;
    if (loggedIn) {
      iv = setInterval(() => {
        fetchAll();
      }, 10000); // every 10s
    }
    return () => { if (iv) clearInterval(iv); };
  }, [loggedIn]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 px-6">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          {!loggedIn ? (
            <div className="max-w-md bg-card p-4 rounded-lg">
              <p className="mb-2">Đăng nhập admin (demo)</p>
              <input className="w-full mb-2 p-2" placeholder="User" value={user} onChange={e=>setUser(e.target.value)} />
              <input className="w-full mb-2 p-2" placeholder="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)} />
              <button className="px-4 py-2 bg-primary text-white rounded" onClick={doLogin}>Login</button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Metrics</h2>
                  <div className="mt-2">
                    <div>Total Users: {metrics?.totalUsers ?? '-'}</div>
                    <div>Total NFTs: {metrics?.totalNFTs ?? '-'}</div>
                    <div>Total Tx: {metrics?.totalTx ?? '-'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-sm bg-card p-2 rounded">
                      <div className="font-medium">Pending Sync</div>
                      <div className="text-xs text-muted-foreground">{syncQueue.length} items</div>
                    </div>
                    <button className="px-3 py-2 bg-primary text-white rounded ml-2" onClick={processQueue} disabled={isSyncing}>{isSyncing ? 'Syncing...' : 'Sync Now'}</button>
                    <button className="px-3 py-2 bg-muted rounded ml-2" onClick={doLogout}>Logout</button>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Recent Transactions</h3>
                <div className="overflow-x-auto bg-card rounded">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left">
                        <th className="p-2">Tx Hash</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Amount</th>
                        <th className="p-2">From</th>
                        <th className="p-2">To</th>
                        <th className="p-2">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(transactions || []).map((tx) => (
                        <tr key={tx.txHash} className="border-t">
                          <td className="p-2 break-words">{tx.txHash}</td>
                          <td className="p-2">{tx.status}</td>
                          <td className="p-2">{tx.amount} {tx.currency}</td>
                          <td className="p-2">{tx.from || '-'}</td>
                          <td className="p-2">{tx.to || '-'}</td>
                          <td className="p-2">{tx.time || tx.createdAt || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Users (latest)</h3>
                <div className="overflow-x-auto bg-card rounded">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left">
                        <th className="p-2">ID</th>
                        <th className="p-2">Address</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(users || []).map((u) => (
                        <tr key={u.id} className="border-t">
                          <td className="p-2">{u.id}</td>
                          <td className="p-2 break-words">{u.address}</td>
                          <td className="p-2">{u.email || '-'}</td>
                          <td className="p-2">{u.createdAt || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">NFTs (latest)</h3>
                <div className="overflow-x-auto bg-card rounded">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left">
                        <th className="p-2">ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Owner</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Listed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(nfts || []).map((n) => (
                        <tr key={n.id || n.objectId} className="border-t">
                          <td className="p-2">{n.id || n.objectId}</td>
                          <td className="p-2">{n.name || '-'}</td>
                          <td className="p-2 break-words">{n.ownerId || n.owner || '-'}</td>
                          <td className="p-2">{n.price ?? '-'}</td>
                          <td className="p-2">{n.listed ? 'Yes' : 'No'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 p-4 bg-card rounded">
                <h3 className="font-medium mb-3">Upload NFT</h3>
                <form onSubmit={uploadNFT} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input placeholder="Name" className="p-2 border rounded" value={uploadName} onChange={e=>setUploadName(e.target.value)} required />
                  <input placeholder="Public address (Sui)" className="p-2 border rounded" value={uploadAddress} onChange={e=>setUploadAddress(e.target.value)} required />
                  <input placeholder="Price (SUI)" className="p-2 border rounded" value={uploadPrice} onChange={e=>setUploadPrice(e.target.value)} />
                  <textarea placeholder="Description" className="p-2 border rounded md:col-span-2" value={uploadDesc} onChange={e=>setUploadDesc(e.target.value)} />
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                  <div className="md:col-span-2 flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Upload</button>
                    <button type="button" className="px-4 py-2 bg-muted rounded" onClick={()=>{setUploadName('');setUploadDesc('');setUploadPrice('');setUploadImage(null);}}>Reset</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
