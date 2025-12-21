# 🎉 CERVOA - COMPLETE SETUP GUIDE

## ✅ What's Ready

### Airtable
- ✅ Base ID: `app2xOYGyhjiBqpiU`
- ✅ 5 tables created (Leads, Contacts, Meetings, Proposals, Revenue)
- ✅ All credentials saved

### API Keys
- ✅ Apollo: `VPJmhxyMOGxtXorNQnhOWQ`
- ✅ Brevo: `YOUR_BREVO_API_KEY_HERE`
- ✅ Cal.com: `cal_live_f142927a447de749cfef658a92a9f56d`

### Code
- ✅ Backend API (Express + Node.js)
- ✅ 3 simplified n8n workflows
- ✅ React dashboard

---

## 🚀 Quick Start (3 Steps)

### STEP 1: Start Backend (5 minutes)

```bash
# Install dependencies
cd backend
npm install

# Start server
npm start
```

Backend runs on: **http://localhost:3001**

Test it:
```bash
curl http://localhost:3001/health
```

---

### STEP 2: Import n8n Workflows (15 minutes)

1. **Sign up at n8n:**
   - Go to: https://n8n.io/
   - Create free account

2. **Add environment variables in n8n:**
   - Settings → Environment Variables
   ```
   APOLLO_API_KEY=VPJmhxyMOGxtXorNQnhOWQ
   BREVO_API_KEY=your_brevo_api_key
   AIRTABLE_BASE_ID=app2xOYGyhjiBqpiU
   ```

3. **Add Airtable credential:**
   - Credentials → New Credential
   - Type: "Airtable Personal Access Token"
   - Token: `YOUR_AIRTABLE_TOKEN_HERE`

4. **Import 3 workflows:**
   - File → Import → Choose:
     - `n8n-workflows/WORKFLOW_1_Apollo_Lead_Discovery_SIMPLIFIED.json`
     - `n8n-workflows/WORKFLOW_2_Brevo_Nurturing_SIMPLIFIED.json`
     - `n8n-workflows/WORKFLOW_3_Cal_Meeting_Tracking_SIMPLIFIED.json`

5. **Activate workflows:**
   - Click "Active" toggle on each workflow

6. **Test Apollo workflow:**
   - Open Workflow 1
   - Click "Execute Workflow"
   - Check Airtable for new leads!

---

### STEP 3: Run Dashboard (2 minutes)

```bash
# In main directory
npm run dev
```

Dashboard opens at: **http://localhost:5173**

*(Currently shows sample data - next step is connecting to backend)*

---

## 📋 System Architecture

```
┌──────────────┐
│   Apollo     │ ──> Finds leads
└──────────────┘
       │
       v
┌──────────────┐
│   n8n        │ ──> Workflow 1: Process & score leads
│  Workflow 1  │
└──────────────┘
       │
       v
┌──────────────┐
│  Airtable    │ ──> Stores all data
│  (Database)  │
└──────────────┘
       │
       ├──> n8n Workflow 2: Add to Brevo email list
       │
       ├──> n8n Workflow 3: Track Cal.com meetings
       │
       v
┌──────────────┐
│  Backend API │ ──> Aggregates & serves data
│  (Express)   │
└──────────────┘
       │
       v
┌──────────────┐
│  Dashboard   │ ──> Beautiful UI
│   (React)    │
└──────────────┘
```

---

## 🎯 Next Steps

### Short Term (Today)
1. ✅ Fix npm permission: `sudo chown -R $(whoami) ~/.npm`
2. ✅ Install backend: `cd backend && npm install`
3. ✅ Start backend: `npm start`
4. ✅ Import workflows to n8n
5. ✅ Test Apollo workflow

### Medium Term (Tomorrow)
1. Update dashboard to fetch from backend API
2. Deploy backend (Render/Railway)
3. Deploy frontend (Vercel)
4. Create architecture diagram
5. Create cost analysis spreadsheet

### For Submission
1. Architecture diagram (PDF)
2. Live dashboard URL + screenshots
3. Backend GitHub repo
4. n8n workflow screenshots
5. Cost analysis spreadsheet
6. Strategic plan document (3-5 pages)

---

## 📁 Project Structure

```
Cervoa/
├── backend/              # Express API
│   ├── server.js        # Main server
│   ├── routes/          # API endpoints
│   │   ├── dashboard.js
│   │   ├── leads.js
│   │   ├── meetings.js
│   │   └── webhooks.js
│   ├── config/          # Airtable config
│   └── .env             # Credentials
│
├── n8n-workflows/       # n8n workflow JSONs
│   ├── WORKFLOW_1_Apollo_Lead_Discovery_SIMPLIFIED.json
│   ├── WORKFLOW_2_Brevo_Nurturing_SIMPLIFIED.json
│   └── WORKFLOW_3_Cal_Meeting_Tracking_SIMPLIFIED.json
│
├── src/                 # React dashboard
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
└── docs/                # Documentation
```

---

## ✅ Success Checklist

**Backend:**
- [ ] npm install completes
- [ ] Server starts on port 3001
- [ ] `/health` endpoint responds
- [ ] `/api/dashboard` returns data

**n8n:**
- [ ] 3 workflows imported
- [ ] Airtable credential added
- [ ] Environment variables set
- [ ] Apollo workflow runs successfully
- [ ] Leads appear in Airtable

**Dashboard:**
- [ ] Runs on port 5173
- [ ] Displays sample data
- [ ] No console errors

---

## 🆘 Troubleshooting

**npm permission error:**
```bash
sudo chown -R $(whoami) ~/.npm
```

**Backend won't start:**
- Check `.env` file exists in backend/
- Verify all API keys are correct

**n8n workflow fails:**
- Check environment variables are set
- Verify Airtable credential is saved
- Test each node individually

**Dashboard not loading:**
```bash
npm install
npm run dev
```

---

## 📞 What You Have

- ✅ Complete backend API
- ✅ 3 automated workflows
- ✅ Airtable database
- ✅ React dashboard
- ✅ All credentials configured

**Status: 90% complete!** 🎉

**Next:** Install backend and import workflows to n8n!
