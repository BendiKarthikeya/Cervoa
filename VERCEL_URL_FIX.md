# Fix Double Slash API URL Issue - Vercel Update Required

## 🔍 Problem Identified
The frontend is making requests with double slashes:
```
❌ https://cervoa.onrender.com//api/dashboard (404)
✅ https://cervoa.onrender.com/api/dashboard (should work)
```

## 🎯 Root Cause
Your **Vercel environment variable** `VITE_API_URL` likely has a trailing slash or is incorrect.

## ✅ Solution: Update Vercel Environment Variable

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Select your project: **cervoa-two**
3. Go to **Settings** → **Environment Variables**

### Step 2: Update VITE_API_URL
Find the `VITE_API_URL` variable and set it to:
```
https://cervoa.onrender.com
```
**Important**: NO trailing slash!

### Step 3: Trigger Redeploy
After updating the environment variable:
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **"Redeploy"** button
   - OR -
4. Push a new commit to trigger auto-deployment

## 🧪 Alternative Quick Test
To verify this is the issue, you can temporarily test by:

1. **Check current Vercel env var:**
   ```bash
   vercel env pull
   cat .env.local
   ```

2. **If it shows a trailing slash, update it in Vercel dashboard**

## 📋 Vercel Environment Variables Checklist

Ensure these are set in Vercel:
```
VITE_API_URL=https://cervoa.onrender.com
VITE_N8N_WEBHOOK_URL=https://karthikeya007.app.n8n.cloud/webhook-test/0c88b1a4-94ba-493f-ab75-60a64394adaa
```

## ✅ Verification Steps

After redeployment:
1. Open: https://cervoa-two.vercel.app
2. Open browser DevTools (F12) → Console
3. Check network requests - should see:
   - ✅ `GET https://cervoa.onrender.com/api/dashboard` (200)
   - ✅ `GET https://cervoa.onrender.com/api/leads` (200)
   - ✅ `GET https://cervoa.onrender.com/api/meetings` (200)

## 🚀 Quick Commands (Optional)

If you have Vercel CLI installed:
```bash
# Pull current env vars
vercel env pull

# Check what's deployed
vercel env ls

# Update env var (interactive)
vercel env add VITE_API_URL

# Redeploy
vercel --prod
```

## 📌 Important Notes

1. **Environment variables in Vercel are NOT read from your .env file** - they must be set in the Vercel dashboard
2. **After changing env vars, you MUST redeploy** for changes to take effect
3. **Build-time variables** (VITE_*) are embedded during build, so redeploy is required

## Need Help?

If the issue persists:
1. Check Vercel deployment logs for build errors
2. Verify the API backend is accessible: https://cervoa.onrender.com/health
3. Check browser console for the exact URL being called
4. Ensure no service worker is caching old requests
