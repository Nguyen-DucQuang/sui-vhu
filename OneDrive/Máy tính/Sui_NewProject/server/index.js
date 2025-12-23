const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock AI Valuation Logic
const valuateNFT = (metadata) => {
    const basePrice = 100; // Base SUI
    const rarityMultiplier = Math.random() * 5 + 1;
    const marketSentiment = 1.2; // Bullish
    
    const estimatedValue = basePrice * rarityMultiplier * marketSentiment;
    const confidence = Math.floor(Math.random() * 15 + 80); // 80-95%
    
    return {
        estimatedValue: estimatedValue.toFixed(2),
        currency: 'SUI',
        confidence,
        analysis: `Dựa trên phân tích AI về các đặc tính và xu hướng thị trường 2025, NFT này có độ hiếm cao và tiềm năng tăng trưởng mạnh.`
    };
};

// API Endpoints
app.post('/api/valuate-nft', (req, res) => {
    const { metadata } = req.body;
    const valuation = valuateNFT(metadata);
    res.json(valuation);
});

app.post('/api/classify-nft', (req, res) => {
    const { traits } = req.body;
    // Mock classification
    const categories = ['Art', 'Gaming', 'Collectibles', 'Utility'];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    res.json({
        category,
        rarityScore: Math.floor(Math.random() * 100),
        aiInsight: `NFT này được phân loại là ${category} với các đặc tính độc đáo.`
    });
});

app.get('/api/market-trends', (req, res) => {
    res.json({
        sentiment: 'Hưng phấn',
        topCategories: ['iNFT', 'RWA', 'AI Art'],
        prediction24h: '+15.2%'
    });
});

app.listen(PORT, () => {
    console.log(`AI Backend server running on port ${PORT}`);
});
