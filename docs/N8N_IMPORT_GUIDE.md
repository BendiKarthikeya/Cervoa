# 🎯 N8N WORKFLOW SETUP - QUICK GUIDE

## ✅ Backend Status
- Backend code ready in `/backend` folder
- To install later (needs password): `sudo chown -R $(whoami) ~/.npm && npm install`
- To start: `npm start` (runs on port 3001)

---

## 📋 3 WORKFLOWS TO PASTE IN N8N

### Step 1: Sign up for n8n
Go to: https://n8n.io/ and create free account

### Step 2: Add Credentials in n8n

**Environment Variables** (Settings → Environment Variables):
```
APOLLO_API_KEY=VPJmhxyMOGxtXorNQnhOWQ
BREVO_API_KEY=your_brevo_api_key
AIRTABLE_BASE_ID=app2xOYGyhjiBqpiU
```

**Airtable Credential** (Credentials → Add Credential → Airtable Personal Access Token):
- Name: Airtable Personal Access Token
- Token: `YOUR_AIRTABLE_TOKEN_HERE`

---

## 📁 WORKFLOW FILES

Your workflow JSON files are in: `/n8n-workflows/`

1. **WORKFLOW_1_Apollo_Lead_Discovery_SIMPLIFIED.json**
2. **WORKFLOW_2_Brevo_Nurturing_SIMPLIFIED.json**  
3. **WORKFLOW_3_Cal_Meeting_Tracking_SIMPLIFIED.json**

---

## 🚀 How to Import

### Method 1: Import from File (Recommended)
1. In n8n, click "Add workflow" → "Import from file"
2. Select each JSON file from `n8n-workflows/` folder
3. Repeat for all 3 workflows

### Method 2: Copy/Paste JSON
1. Open the workflow JSON file in a text editor
2. Copy all the JSON content
3. In n8n, click "Add workflow" → "Import from URL or file"
4. Paste the JSON
5. Click "Import"

---

## ✅ After Import

For each workflow:
1. **Check credentials** - Make sure Airtable credential is linked
2. **Activate workflow** - Toggle "Active" switch
3. **Test** - Click "Execute Workflow"

---

## 🧪 Testing

**Workflow 1 (Apollo):**
- Click "Execute Workflow"
- Wait 10-20 seconds
- Check Airtable Leads table for new leads
- Should see 25 leads from Apollo

**Workflow 2 (Brevo):**
- Manually add a lead to Airtable with Status="New"
- Workflow should automatically add to Brevo
- Check lead status changes to "Contacted"

**Workflow 3 (Cal.com):**
- Copy webhook URL from workflow
- Add to Cal.com: Settings → Developer → Webhooks
- Book a test meeting
- Check Airtable Meetings table

---

## 🔗 Your Credentials Summary

**Airtable:**
- Base ID: `app2xOYGyhjiBqpiU`
- Token: `YOUR_AIRTABLE_TOKEN_HERE`

**Apollo:**
- API Key: `VPJmhxyMOGxtXorNQnhOWQ`

**Brevo:**
- API Key: `YOUR_BREVO_API_KEY_HERE`

**Cal.com:**
- API Key: `cal_live_f142927a447de749cfef658a92a9f56d`

---

## 📞 Next Steps

1. ✅ Import 3 workflows to n8n
2. ✅ Add credentials
3. ✅ Test Apollo workflow
4. ✅ Later: Install & start backend with password
5. ✅ Deploy everything

**Ready to go! 🚀**
