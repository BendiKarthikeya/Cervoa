# 🚀 QUICK SETUP - START HERE

## ✅ What You Have Ready:
- Airtable Token: ✓ (saved in API_KEYS_PRIVATE.txt)
- Dashboard: ✓ (running at http://localhost:5173/)
- Workflows: ✓ (6 JSON files ready to import)

---

## 📋 DO THIS NOW (20 minutes):

### STEP 1: Create Airtable Base (5 min)

1. **Go to:** https://airtable.com/create
2. **Click:** "Start from scratch"
3. **Name it:** "Cervoa Demo"
4. **Delete the default table**

### STEP 2: Create 5 Tables (10 min)

**Table 1: Leads** (click + to add table)
- Company (text)
- Contact (text)
- Email (email)
- Phone (phone)
- Title (text)
- Score (number)
- Status (single select: New, Contacted, Qualified, Lost)
- Source (text)
- Value (currency)
- LinkedIn (url)
- Website (url)
- Industry (text)
- Employee Count (number)
- Notes (long text)

**Table 2: Contacts**
- Email (email)
- Name (text)
- Company (text)
- List (text)
- Status (single select: Active, Unsubscribed, Bounced)

**Table 3: Meetings**
- Company (text)
- Contact Name (text)
- Email (email)
- Date (date with time)
- Duration (number)
- Meeting Type (text)
- Notes (long text)
- Status (single select: Scheduled, Completed, Cancelled, No Show)

**Table 4: Proposals**
- Company (text)
- Contact (text)
- Date Sent (date)
- Value (currency)
- Status (single select: Draft, Sent, Accepted, Rejected)
- Proposal Link (url)
- Notes (long text)

**Table 5: Revenue**
- Company (text)
- Amount (currency)
- Date (date)
- Status (single select: Pending, Completed, Refunded, Failed)
- Payment Method (text)
- Transaction ID (text)
- Invoice URL (url)

### STEP 3: Get Your Base ID (1 min)

1. Look at your browser URL
2. It will be: `https://airtable.com/appXXXXXXXXXX/...`
3. Copy the `appXXXXXXXXXX` part
4. Paste it in `API_KEYS_PRIVATE.txt` under AIRTABLE_BASE_ID

### STEP 4: Get Apollo API Key (5 min)

1. **Go to:** https://www.apollo.io/
2. **Sign up** for free account
3. **Go to:** Settings → Integrations → API
4. **Copy your API key**
5. **Paste** in `API_KEYS_PRIVATE.txt` under APOLLO_API_KEY

---

## 🎯 APOLLO SEARCH CONFIGURATION

### What to search for in Apollo:

When you set up the workflow, use these parameters:

**Target Titles:**
- CEO
- CTO
- VP Engineering
- Head of Product
- Founder
- Co-Founder

**Company Size:**
- 11-50 employees
- 51-200 employees
- 201-500 employees

**Location:**
- United States (or your target region)

**Seniority:**
- Senior
- C-Level
- Owner

**Keywords:**
- SaaS
- B2B
- Software
- Technology
- Enterprise

### This will find you:
- Decision makers (CEOs, CTOs)
- From growing companies (11-500 employees)
- In the tech/software industry
- Ready to buy automation solutions

---

## 🔄 WHAT HAPPENS:

1. **Apollo** finds 25 leads matching your criteria
2. **n8n** grabs: company name, contact, email, phone, title, LinkedIn
3. **Airtable** stores all leads in "Leads" table
4. **Dashboard** shows the leads in real-time

---

## 📊 DATA FLOW:

```
Apollo API
    ↓ (finds leads)
n8n Workflow
    ↓ (processes data)
Airtable "Leads" Table
    ↓ (stores data)
Dashboard
    ↓ (displays data)
You see leads!
```

---

## ✅ CHECKLIST:

- [ ] Airtable base "Cervoa Demo" created
- [ ] 5 tables created with correct fields
- [ ] Base ID copied to API_KEYS_PRIVATE.txt
- [ ] Apollo account created
- [ ] Apollo API key copied to API_KEYS_PRIVATE.txt
- [ ] Ready to import workflows to n8n

---

## 🎉 NEXT STEP:

Once you complete the checklist above:

1. Go to: https://n8n.io/ and sign up
2. Open the config guide: `APOLLO_AIRTABLE_CONFIG.md`
3. Import: `Workflows/WORKFLOW_1_Apollo_Lead_Discovery.json`
4. Configure with your API keys
5. Run the workflow
6. Watch leads appear in Airtable!

---

## 🆘 NEED HELP?

- **Airtable setup:** See `APOLLO_AIRTABLE_CONFIG.md`
- **Workflow import:** See `Workflows/files/01_IMPORT_AND_TESTING_GUIDE.md`
- **Full guide:** See `GETTING_STARTED.md`

**You're 20 minutes away from your first leads! 🚀**
