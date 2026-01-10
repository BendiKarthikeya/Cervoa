# Backend Deployment Fix - Action Items

## ✅ Completed
1. ✅ Added Node.js version specification (`engines` field) in backend/package.json
2. ✅ Created render.yaml with proper Render configuration
3. ✅ Updated backend .env for production environment
4. ✅ Updated .env.example with production settings
5. ✅ Created RENDER_DEPLOYMENT.md guide
6. ✅ Committed and pushed changes to GitHub

## 🔧 Next Steps - ACTION REQUIRED

### 1. Configure Render Dashboard

Go to your Render service at: https://dashboard.render.com

**If service doesn't exist yet:**
- Click "New +" → "Web Service"
- Connect your GitHub repository: `BendiKarthikeya/Cervoa`
- Select the `main` branch
- Render should auto-detect the `render.yaml` configuration

**Set these Environment Variables in Render Dashboard:**
```
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://cervoa-two.vercel.app
AIRTABLE_API_KEY=<your_airtable_api_key>
AIRTABLE_BASE_ID=<your_airtable_base_id>
APOLLO_API_KEY=<your_apollo_api_key>
BREVO_API_KEY=<your_brevo_api_key>
CAL_COM_API_KEY=<your_cal_com_api_key>
```

### 2. Trigger Redeployment

Since we just pushed the fix, Render should automatically:
- Detect the new configuration
- Use Node.js 18+
- Build with `npm install`
- Start with `npm start`
- Bind to the correct PORT

### 3. Verify Deployment

Once deployed, test these endpoints:

1. **Health Check**: https://cervoa.onrender.com/health
   - Should return: `{"status":"ok","timestamp":"...","environment":"production"}`

2. **API Root**: https://cervoa.onrender.com/
   - Should return API information

3. **API Docs**: https://cervoa.onrender.com/api/docs
   - Should show Swagger UI

### 4. Update Frontend (if needed)

Verify your frontend environment variable:
```
VITE_API_URL=https://cervoa.onrender.com
```

This should already be set in your `.env` file (already confirmed).

## 🐛 Common Issues & Solutions

### Issue: "Build Failed" or "Module not found"
**Solution**: Render should now use Node 18+ due to the `engines` field we added.

### Issue: "Port already in use" or "Cannot bind to port"
**Solution**: Render automatically sets PORT=10000. Our server.js already uses `process.env.PORT`.

### Issue: "CORS errors"
**Solution**: Verify FRONTEND_URL in Render matches exactly: `https://cervoa-two.vercel.app`

### Issue: "Cannot connect to Airtable"
**Solution**: Double-check all API keys are set in Render dashboard (not in code).

## 📝 What Changed

1. **backend/package.json**: Added `"engines": {"node": ">=18.0.0"}` to specify Node.js version
2. **render.yaml**: Created deployment configuration with:
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
   - Health check: `/health`
   - Environment variable placeholders
3. **RENDER_DEPLOYMENT.md**: Complete deployment guide
4. **backend/.env**: Updated to production settings (not committed)

## 🔍 Monitoring

After deployment:
1. Check Render logs for any errors
2. Monitor the `/health` endpoint
3. Test API endpoints from your frontend
4. Watch for CORS errors in browser console

## Need Help?

If deployment still fails after these steps:
1. Check Render logs in the dashboard
2. Verify all environment variables are set correctly
3. Ensure the service is using the correct branch (`main`)
4. Check that rootDir is set to `backend` in Render settings
