# N8N WORKFLOWS - COMPLETE SETUP GUIDE

## 📋 Overview

You have 6 complete, production-ready workflows. Here's what each does:

| # | Workflow | Trigger | Purpose | Output |
|---|----------|---------|---------|--------|
| 1 | Apollo Lead Discovery | Hourly Schedule | Find & enrich leads | Airtable records, Slack alert |
| 2 | Lead Nurturing | New lead created | Add to Brevo sequences | Email campaigns start |
| 3 | Meeting Scheduling | Calendly webhook | Book meeting, sync calendar | Google Calendar + Airtable update |
| 4 | Proposal Generation | Daily check | Generate AI proposals | Google Drive + Email + Airtable |
| 5 | Payment Processing | Status change | Create payment link | Stripe link + Airtable |
| 6 | Pipeline Sync | Hourly | Sync all data & report | Airtable + Google Sheets + Slack |

---

## 🚀 QUICK START SETUP (30 minutes)

### Step 1: Create Environment Variables (5 min)

In your n8n cloud environment, set these:

```
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXX/YYY/ZZZ
GOOGLE_SHEET_ID=1xxxxxxxxxxxxxxxxxxxxxx
```

### Step 2: Create API Credentials in n8n (10 min)

Go to n8n Settings → Credentials and create these:

1. **Apollo API**
   - Type: Custom API
   - Header: X-Api-Key
   - Value: [Your Apollo API key]

2. **Clay API**
   - Type: Custom API
   - Header: Authorization: Bearer [token]
   - Value: [Your Clay API token]

3. **Brevo API**
   - Type: Custom API
   - Header: api-key
   - Value: [Your Brevo API key]

4. **Stripe API**
   - Type: Basic Auth OR Custom
   - Secret Key: [Your Stripe secret key]

5. **Airtable API**
   - Type: Airtable
   - Token: [Your Airtable personal token]

6. **Google Calendar OAuth2**
   - Type: Google OAuth2
   - Scope: https://www.googleapis.com/auth/calendar

7. **Google Drive OAuth2**
   - Type: Google OAuth2
   - Scope: https://www.googleapis.com/auth/drive

8. **Calendly API**
   - Type: Custom
   - Header: Authorization: Bearer [token]

9. **Anthropic API** (for Claude)
   - Type: Custom
   - Header: x-api-key
   - Value: [Your Anthropic API key]

10. **Google Sheets OAuth2**
    - Type: Google OAuth2
    - Scope: https://www.googleapis.com/auth/spreadsheets

### Step 3: Import Workflows (10 min)

For each workflow JSON file:

1. In n8n: Click "+" → "Import from file"
2. Select WORKFLOW_X_[Name].json
3. Confirm credentials are connected
4. Click "Save"
5. Enable the workflow (toggle switch)

---

## 📁 Workflow 1: Apollo Lead Discovery

**File**: `WORKFLOW_1_Apollo_Lead_Discovery.json`

**What it does**: 
- Every hour, searches Apollo for leads matching your criteria
- Enriches with Clay data
- Calculates lead score
- Saves to Airtable
- Notifies Slack

**Prerequisites**:
- Apollo API key
- Clay API token
- Airtable base with "Leads" table
- Slack webhook URL

**To customize**:
- Edit "Apollo Search Leads" node → Body section
- Change "person_titles", "company_size", "industries"
- Change search keywords from "automation" to your target

**Test it**:
1. Click "Test Workflow" or "Execute Workflow"
2. Check Airtable for new records
3. Check Slack for notification

---

## 📧 Workflow 2: Lead Nurturing

**File**: `WORKFLOW_2_Lead_Nurturing_Brevo.json`

**What it does**:
- Triggers when new lead added to Airtable
- Validates email address
- Adds to Brevo contact list
- Enrolls in nurture sequence
- Updates Airtable status
- Sends Slack notification

**Prerequisites**:
- Brevo API key
- Brevo list created (note the list ID = 3)
- Airtable base with "Leads" table

**To customize**:
- Change list ID in "Add to Nurture List" node (currently 3)
- Customize email attributes in "Add to Brevo" body
- Change Slack webhook URL

**Test it**:
1. Add a test record to Airtable "Leads" table
2. Workflow should trigger automatically
3. Check Brevo for contact added
4. Verify Airtable status changed to "Nurturing"

---

## 📅 Workflow 3: Calendly Meeting Scheduling

**File**: `WORKFLOW_3_Calendly_Meeting_Scheduling.json`

**What it does**:
- Receives webhook from Calendly when meeting booked
- Extracts meeting details
- Finds lead in Airtable
- Creates Google Calendar event
- Sends confirmation email
- Updates Airtable with meeting details
- Sends Slack alert

**Prerequisites**:
- Calendly account connected (need to create webhook)
- Google Calendar OAuth2
- Brevo API key
- Airtable base

**To set up Calendly webhook**:
1. Open this workflow in n8n
2. Get the webhook URL from "Calendly Webhook Trigger" node
3. Go to Calendly.com → Settings → Integrations → Webhooks
4. Add webhook with your URL
5. Subscribe to: "invitee.created"

**Test it**:
1. Book a test meeting in Calendly
2. Check Google Calendar for event
3. Check email for confirmation
4. Verify Airtable updated

---

## 📄 Workflow 4: Proposal Generation

**File**: `WORKFLOW_4_Proposal_Generation.json`

**What it does**:
- Daily at 6 PM, checks for completed meetings
- Uses Claude AI to generate proposal
- Saves to Google Drive
- Sends via Brevo email
- Updates Airtable with link
- Sends Slack notification

**Prerequisites**:
- Anthropic API key (for Claude)
- Google Drive OAuth2
- Brevo API key
- Airtable base

**To customize**:
- Edit Claude prompt in "Generate Proposal with Claude" node
- Change trigger time from 6 PM to your preferred time
- Customize email template

**Test it**:
1. Create Airtable record with Status = "Meeting Scheduled"
2. Manually trigger workflow
3. Check Google Drive for PDF
4. Check email for proposal
5. Verify Airtable updated

---

## 💳 Workflow 5: Payment Processing

**File**: `WORKFLOW_5_Payment_Processing.json`

**What it does**:
- Triggers when lead status = "Ready for Payment"
- Creates Stripe payment link
- Sends payment email
- Creates revenue record
- Listens for payment webhook
- Updates deal to "Won" when paid
- Sends confirmation email + Slack alert

**Prerequisites**:
- Stripe API key
- Brevo API key
- Airtable base with "Leads" and "Revenue" tables
- Stripe webhook configured

**To set up Stripe webhook**:
1. Get webhook URL from "Stripe Payment Webhook" node
2. Go to Stripe Dashboard → Developers → Webhooks
3. Add webhook endpoint: your URL
4. Subscribe to: "checkout.session.completed"

**To customize**:
- Change deal value from 5000 to your standard price
- Edit email templates
- Change success/cancel URLs

**Test it**:
1. Update Airtable record Status → "Ready for Payment"
2. Workflow triggers, creates Stripe link
3. Check email for payment link
4. Open link and complete test payment (use Stripe test card: 4242 4242 4242 4242)
5. Verify deal marked as "Won" + email sent

---

## 📊 Workflow 6: Pipeline Sync & Reporting

**File**: `WORKFLOW_6_Pipeline_Sync_Reporting.json`

**What it does**:
- Every hour, syncs all data sources
- Fetches from: Brevo, Stripe, Airtable, Calendly
- Calculates: Pipeline value, conversion rate, avg deal size
- Updates: Airtable metrics table
- Exports: Google Sheets
- Reports: Slack dashboard
- Syncs: Meetings to Airtable

**Prerequisites**:
- All other APIs (Airtable, Brevo, Stripe, Calendly)
- Google Sheets OAuth2
- Google Sheet created (get ID from URL: /spreadsheets/d/**[ID]**/edit)
- Slack webhook

**To set up Google Sheet**:
1. Create new Google Sheet
2. Rename first sheet to "Metrics"
3. Copy sheet ID from URL
4. Add to environment variables: GOOGLE_SHEET_ID=...

**To customize**:
- Edit metric formulas in "Calculate Pipeline Metrics"
- Change sync frequency from hourly to daily/weekly
- Edit Slack message format

**Test it**:
1. Manually trigger workflow
2. Check Airtable "Metrics" table has new record
3. Check Google Sheet has new row
4. Check Slack for dashboard message

---

## 🔧 COMMON CUSTOMIZATIONS

### Change Trigger Time
For scheduled workflows (1, 4, 6):
1. Open workflow
2. Click "Schedule Trigger" node
3. Change "triggerTimes" field

Example (6 AM every day):
```json
"triggerTimes": [
  {
    "mode": "everyDay",
    "hour": 6,
    "minute": 0
  }
]
```

### Change Airtable Field Names
In any node using Airtable:
1. Click the Airtable node
2. Map field names exactly as they appear in your base
3. Use field names, not field IDs

Example:
```
{{ $trigger.json.fields['Company Name'] }}
```

### Add to Different Brevo List
In Workflow 2:
1. Edit "Add to Nurture List" node
2. Change `"listIds": [3]` to your list ID
3. Get list ID from Brevo → Contacts → Lists

### Customize Email Templates
In any Brevo email node:
1. Edit the "htmlContent" field
2. Use merge tags: {{ variable_name }}
3. Add HTML formatting
4. Test in preview

---

## 🚨 TROUBLESHOOTING

### "Authorization failed"
- Check API key is correct
- Verify key hasn't expired
- Check header name (api-key vs Authorization vs x-api-key)

### "Field not found in Airtable"
- Verify exact field name (case-sensitive, spaces count)
- Use field names, not IDs
- Check field exists in table

### "Webhook not triggering"
- Verify webhook URL in trigger matches external service
- Ensure webhook is active (Calendly, Stripe settings)
- Check request body format matches expected

### "Loop not processing all items"
- Ensure loop source returns array
- Check filter formula is correct
- Verify data exists in source

### "Scheduled workflow not running"
- Check workflow is enabled (toggle switch = ON)
- Verify time zone is correct
- Check n8n instance has execution credits

---

## 📊 AIRTABLE TABLE STRUCTURE

Create these tables in your Airtable base:

### Table: Leads
```
- Company Name (Text)
- Contact Name (Text)
- Email (Email)
- Phone (Phone Number)
- Lead Score (Number)
- Source (Single Select: Apollo, Clay, Manual)
- Status (Single Select: New, Nurturing, Meeting Scheduled, Proposal Sent, Won)
- Company Size (Text)
- Industry (Text)
- Website (URL)
- LinkedIn URL (URL)
- Years in Business (Number)
- Deal Value (Currency)
- Last Activity (Date)
- Meeting Date (Date)
- Meeting Time (Text)
- Meeting Duration (Text)
- Proposal Sent Date (Date)
- Proposal Link (URL)
- Brevo Contact ID (Text)
- Calendly Event ID (Text)
```

### Table: Revenue
```
- Company (Text, Link to Leads)
- Amount (Currency)
- Date (Date)
- Status (Single Select: Pending Payment, Paid)
- Payment Link (URL)
- Stripe Session ID (Text)
- Contact Email (Email)
```

### Table: Metrics
```
- Date (Date)
- Total Leads (Number)
- New Leads (Number)
- Nurturing (Number)
- Meetings (Number)
- Proposals (Number)
- Won Deals (Number)
- Pipeline Value (Currency)
- Avg Deal Size (Currency)
- Conversion Rate (Percent)
```

### Table: Meetings
```
- Company (Text)
- Date (Date)
- Time (Text)
- Duration (Number)
- Contact (Text)
- Email (Email)
- Notes (Long Text)
- Calendly Event ID (Text)
```

---

## ✅ DEPLOYMENT CHECKLIST

Before going live:

- [ ] All API keys added to n8n credentials
- [ ] Airtable tables created with correct fields
- [ ] Brevo list created (for Workflow 2)
- [ ] Calendly webhook added
- [ ] Stripe webhook added
- [ ] Google Calendar OAuth2 enabled
- [ ] Google Drive OAuth2 enabled
- [ ] Google Sheets document created
- [ ] Slack webhook URL added
- [ ] Environment variables set (BASE_ID, WEBHOOK_URL, SHEET_ID)
- [ ] Each workflow tested individually
- [ ] All workflows enabled
- [ ] Monitoring: Check Slack for alerts daily

---

## 📞 SUPPORT

If workflow fails:
1. Check error message in workflow execution history
2. Verify all credentials are active
3. Test API endpoints manually with Postman
4. Check Airtable base for required tables/fields
5. Review webhook configurations in external tools

---

**Ready to deploy? Import all 6 workflows and watch your sales process automate!**
