const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files
app.use(express.static('./'));

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

// AI Tutor endpoint
app.post('/api/ai-tutor', async (req, res) => {
    try {
        const { prompt, model } = req.body;

        if (!process.env.OPENROUTER_API_KEY) {
            return res.status(500).json({
                error: { message: 'API key not configured on server' }
            });
        }

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: model || 'openai/gpt-3.5-turbo',
                messages: [
                    {
                        role: "system",
                        content: "You are an expert tutor for aptitude tests. Be helpful, concise, and accurate."
                    },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 1000
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
                },
                timeout: 30000
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('AI Tutor Error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            error: {
                message: error.response?.data?.error?.message || error.message
            }
        });
    }
});

// Generate Similar Question endpoint
app.post('/api/generate-question', async (req, res) => {
    try {
        const { prompt, model } = req.body;

        if (!process.env.OPENROUTER_API_KEY) {
            return res.status(500).json({
                error: { message: 'API key not configured on server' }
            });
        }

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: model || 'openai/gpt-3.5-turbo',
                messages: [
                    {
                        role: "system",
                        content: "You are an expert test creator. Return ONLY valid JSON without any markdown formatting or extra text."
                    },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 500
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
                },
                timeout: 30000
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('Generate Question Error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            error: {
                message: error.response?.data?.error?.message || error.message
            }
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log('Make sure OPENROUTER_API_KEY is set in .env file');
});
