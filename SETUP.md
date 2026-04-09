# 🔒 Security Update: Backend API Setup

The API key has been **removed from the HTML file** and moved to a secure backend server. This prevents your credentials from being exposed in the public codebase.

## ✅ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Your API Key
Create a `.env` file in the project root (copy from `.env.example`):
```
OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
PORT=3000
```

**Getting your OpenRouter API key:**
1. Go to https://openrouter.ai/keys
2. Create or copy your API key
3. Paste it in the `.env` file

### 3. Start the Backend Server
```bash
npm start
```

Server will run on `http://localhost:3001`

### 4. Access the Application
Open your browser to `http://localhost:3001` (⚠️ Port 3001, not 3000!)

The AI Tutor and Practice Similar Concept features will now work securely through the backend!

## 🔐 Security Notes

- ✅ API key is now **server-side only** (in `.env` file)
- ✅ Frontend never handles sensitive credentials
- ✅ `.env` file is in `.gitignore` (won't be committed to git)
- ✅ Rotate your old exposed API key as a precaution

## 🐛 Troubleshooting

**"Cannot GET /api/ai-tutor" error?**
- Make sure the backend server is running (`npm start`)
- Check that you're accessing `http://localhost:3000` (not file://)

**"API key not configured" error?**
- Check that `.env` file exists with your `OPENROUTER_API_KEY`
- Restart the server after creating/updating `.env`

**Buttons still show errors?**
- Open browser console (F12) to see detailed error messages
- Check server console for API response details

## 📝 Model Configuration

To use a different LLM, edit this line in `index.html` (line ~251):
```javascript
const aiModel = "openai/gpt-3.5-turbo";
```

Popular options:
- `"openai/gpt-3.5-turbo"` - Fast & cheap (default)
- `"openai/gpt-4-turbo"` - Better quality
- `"anthropic/claude-3-haiku"` - Good balance
- `"anthropic/claude-3-opus"` - Best quality
- `"meta-llama/llama-3-70b-instruct"` - Free open source

## 🚀 Production Deployment

For production, deploy the backend to:
- **Heroku** - Free tier available
- **Railway** - Simple deployment
- **Vercel** - Serverless option
- **AWS/GCP** - Full cloud options

Remember to set the `OPENROUTER_API_KEY` environment variable on your hosting platform!
