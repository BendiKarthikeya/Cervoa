# Render Deployment Guide for Cervoa Backend

## Quick Setup

### 1. Create Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `cervoa-backend`
   - **Region**: Oregon (or closest to you)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 2. Set Environment Variables

In Render dashboard, add these environment variables:

```
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://cervoa-two.vercel.app
AIRTABLE_API_KEY=<your_key>
AIRTABLE_BASE_ID=<your_base_id>
APOLLO_API_KEY=<your_key>
BREVO_API_KEY=<your_key>
CAL_COM_API_KEY=<your_key>
```

### 3. Deploy

Click "Create Web Service" and Render will automatically deploy your backend.

## Health Check

Your backend will be available at: `https://cervoa.onrender.com`

Test with: `https://cervoa.onrender.com/health`

## Common Issues

### Issue 1: Build Fails
- **Solution**: Ensure `engines` field in package.json specifies Node >= 18.0.0

### Issue 2: Environment Variables Missing
- **Solution**: Double-check all required env vars are set in Render dashboard

### Issue 3: CORS Errors
- **Solution**: Verify FRONTEND_URL matches your Vercel deployment URL exactly

### Issue 4: Port Already in Use
- **Solution**: Render automatically assigns PORT=10000, ensure your server uses `process.env.PORT`

## Auto-Deploy

Render automatically deploys when you push to the `main` branch.

## Monitoring

- View logs in Render dashboard under "Logs" tab
- Monitor health endpoint: `/health`
- Check API docs: `/api/docs`
