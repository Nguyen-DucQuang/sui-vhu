const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock AI Valuation Logic
// Helper: ensure we have a fetch function (Node 18+ has global fetch)
let _fetch = typeof fetch !== 'undefined' ? fetch : null;
try {
    if (!_fetch) _fetch = require('node-fetch');
} catch (e) {}

// Call Google Gemini (Generative Language) if API key is present in env
async function callGemini(promptText) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) return null;

    const url = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate?key=${apiKey}`;
    const body = {
        prompt: { text: promptText },
        temperature: 0.2,
        maxOutputTokens: 256
    };

    try {
        const res = await _fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        // Google generative responses often include `candidates` or `output` fields
        if (data?.candidates && data.candidates.length > 0) {
            return data.candidates[0].content || data.candidates[0].text || JSON.stringify(data.candidates[0]);
        }
        if (data?.output) return data.output;
        return JSON.stringify(data);
    } catch (err) {
        console.error('Gemini call error:', err?.message || err);
        return null;
    }
}

// Valuation logic — prefer Gemini result, fall back to mock
const valuateNFT = async (metadata) => {
        // Try to call Gemini with a concise valuation prompt
        const prompt = `You are an AI assistant that estimates the market value of a digital NFT represented by the following metadata: ${JSON.stringify(metadata)}\n\nReturn a JSON object with fields: estimatedValue (number), currency (string), confidence (0-100 integer), analysis (short text in Vietnamese).`;
        const geminiResp = await callGemini(prompt);
        if (geminiResp) {
            // Attempt to parse JSON from model output
            try {
                const parsed = JSON.parse(geminiResp);
                return {
                    estimatedValue: parsed.estimatedValue?.toString?.() || parsed.estimatedValue || '0',
                    currency: parsed.currency || 'SUI',
                    confidence: parsed.confidence || 80,
                    analysis: parsed.analysis || parsed.explanation || geminiResp,
                    aiSource: 'gemini'
                };
            } catch (e) {
                // If parsing fails, include raw output
                return {
                    estimatedValue: '0',
                    currency: 'SUI',
                    confidence: 80,
                    analysis: geminiResp,
                    aiSource: 'gemini_raw'
                };
            }
        }

        // Fallback mock calculation
        const basePrice = 100; // Base SUI
        const rarityMultiplier = Math.random() * 5 + 1;
        const marketSentiment = 1.2; // Bullish
        const estimatedValue = basePrice * rarityMultiplier * marketSentiment;
        const confidence = Math.floor(Math.random() * 15 + 80); // 80-95%
        return {
                estimatedValue: estimatedValue.toFixed(2),
                currency: 'SUI',
                confidence,
                analysis: `Dựa trên phân tích AI về các đặc tính và xu hướng thị trường 2025, NFT này có độ hiếm cao và tiềm năng tăng trưởng mạnh. (fallback)`,
                aiSource: 'mock'
        };
};

// API Endpoints
app.post('/api/valuate-nft', async (req, res) => {
    const { metadata } = req.body;
    console.log('Received valuation request, metadata:', metadata);
    try {
        const valuation = await valuateNFT(metadata);
        // If Gemini produced a raw string, attempt to log a short preview for debugging (never log API keys)
        if (valuation?.aiSource && valuation.aiSource.startsWith('gemini')) {
            console.log('Valuation result (source):', valuation.aiSource);
            if (valuation.analysis) console.log('Valuation analysis preview:', String(valuation.analysis).slice(0, 300));
        } else {
            console.log('Valuation result (mock):', valuation);
        }
        res.json(valuation);
    } catch (err) {
        console.error('Valuation error:', err);
        res.status(500).json({ error: 'Valuation failed' });
    }
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
