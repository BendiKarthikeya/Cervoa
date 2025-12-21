# N8N WORKFLOW IMPLEMENTATION GUIDE
## Complete API Configurations & Workflow Templates

---

## QUICK START: 5 WORKFLOWS YOU NEED TO BUILD

These are the core workflows that will impress Cervoa. Build ALL FIVE and show them the exported JSON.

---

## WORKFLOW 1: APOLLO LEAD DISCOVERY TO AIRTABLE

### What It Does:
Finds leads on Apollo every morning, enriches them with Clay, scores them, and adds them to Airtable

### Step-by-Step Setup:

#### **Step 1: Get Apollo API Credentials**
```
1. Go to: https://app.apollo.io/settings/integrations/api
2. Copy: "API Key"
3. Save it in n8n as:
   - Credential Name: "Apollo Lead API"
   - API Key: [paste key]
```

#### **Step 2: Get Airtable API Credentials**
```
1. Go to: https://airtable.com/account/tokens
2. Create token with these scopes:
   - data.records:read
   - data.records:write
   - schema.bases:read
3. Save in n8n as:
   - Credential Name: "Airtable Main"
   - Token: [paste token]
   - Base ID: [from https://airtable.com/api - select your base]
```

#### **Step 3: Build the Workflow in n8n**

**Node 1: Schedule Trigger**
```
Name: "Daily Lead Discovery"
Type: "Schedule"
Settings:
  - Trigger time: 09:00 AM
  - Timezone: Your timezone
  - Recurrence: Daily
```

**Node 2: Apollo Search**
```
Name: "Search Apollo for Leads"
Type: "HTTP Request"
Settings:
  - Method: POST
  - URL: https://api.apollo.io/v1/targeted_leads/search
  - Authentication: API Key
    - Header Name: "X-Api-Key"
    - Header Value: {{ $credentials.apolloLeadAPI.apiKey }}
  - Body (JSON):
    {
      "per_page": 50,
      "person_titles": ["CEO", "Founder", "VP Sales"],
      "company_size": ["11-50", "51-200", "201-1000"],
      "industries": ["B2B", "SaaS", "Technology"],
      "keywords": "automation",
      "limit": 50
    }
  - Return JSON: true
```

**Node 3: Clay Enrichment Loop**
```
Name: "Enrich with Clay"
Type: "Loop"
Settings:
  - Loop over: {{ $node["Search Apollo for Leads"].json.body.targeted_leads }}
  
  Inside Loop - HTTP Request Node:
  Name: "Clay Enrich"
  Type: "HTTP Request"
  Settings:
    - Method: POST
    - URL: https://api.clayhq.com/api/v4/contacts/enrich
    - Headers:
      - Content-Type: application/json
      - Authorization: Bearer {{ $credentials.clayAPI.token }}
    - Body:
      {
        "email": "{{ $item.json.email }}",
        "full_name": "{{ $item.json.first_name }} {{ $item.json.last_name }}"
      }
    - Return JSON: true
```

**Node 4: Score Leads**
```
Name: "Calculate Lead Score"
Type: "Set" (to transform data)
Settings:
  - Lead Score = 
    (If company_size >= 200: +30) +
    (If funding > $1M: +25) +
    (If recent activity: +20) +
    (If title match: +15) +
    (If keyword match: +10)
  
  Formula in n8n:
  {{ 
    (($item.json.company_size > 200 ? 30 : 0) +
     ($item.json.funding > 1000000 ? 25 : 0) +
     ($item.json.last_activity > 7 ? 20 : 0) +
     ($item.json.email ? 15 : 0) +
     ($item.json.company_description.toLowerCase().includes("automation") ? 10 : 0))
  }}
```

**Node 5: Add to Airtable**
```
Name: "Save to Airtable"
Type: "Airtable"
Settings:
  - Credential: "Airtable Main"
  - Method: "append"
  - Base ID: [your base]
  - Table: "Leads"
  - Fields:
    - Company Name: {{ $item.json.company_name }}
    - Contact Name: {{ $item.json.first_name }} {{ $item.json.last_name }}
    - Email: {{ $item.json.email }}
    - Lead Score: {{ $item.json.leadScore }}
    - Source: "Apollo"
    - Status: "New"
    - Phone: {{ $item.json.phone }}
    - Company Size: {{ $item.json.company_size }}
    - Industry: {{ $item.json.industry }}
    - Funding: {{ $item.json.funding }}
```

**Node 6: Slack Notification**
```
Name: "Notify Team"
Type: "Slack"
Settings:
  - Select Channel: #sales
  - Message:
    "🎯 New Leads Added ({{ $node["Save to Airtable"].json.records.length }})
    
    Top Lead: {{ $node["Save to Airtable"].json.records[0].fields.company_name }}
    Score: {{ $node["Save to Airtable"].json.records[0].fields.leadScore }}/100"
```

---

## WORKFLOW 2: LEAD NURTURING WITH BREVO SEQUENCES

### What It Does:
When a new lead is added to Airtable, automatically adds them to a Brevo email sequence

### Setup:

#### **Get Brevo API Credentials**
```
1. Go to: https://app.brevo.com/settings/keys/api
2. Copy API Key (starts with "xkeysib-")
3. Also create a contact list:
   - Go to Contacts → Lists
   - Create: "Nurture Sequence #1"
   - Note the list ID
4. Save in n8n:
   - Credential Name: "Brevo Email"
   - API Key: [paste key]
```

#### **Build Workflow:**

**Node 1: Airtable Trigger**
```
Name: "New Lead Added"
Type: "Airtable Trigger"
Settings:
  - Credential: "Airtable Main"
  - Base ID: [your base]
  - Table: "Leads"
  - Trigger on: Record created
```

**Node 2: Check if Email Valid**
```
Name: "Validate Email"
Type: "IF"
Settings:
  - Condition: 
    {{ $trigger.json.fields.email != null && 
       $trigger.json.fields.email.includes("@") }}
```

**Node 3: Check if Already in Brevo**
```
Name: "Get Brevo Contact"
Type: "HTTP Request"
Settings:
  - Method: GET
  - URL: https://api.brevo.com/v3/contacts/{{ $trigger.json.fields.email }}
  - Headers:
    - api-key: {{ $credentials.brevoEmail.apiKey }}
  - Return JSON: true
```

**Node 4: Create or Update in Brevo**
```
Name: "Add to Brevo"
Type: "HTTP Request"
Settings:
  - Method: POST
  - URL: https://api.brevo.com/v3/contacts
  - Headers:
    - api-key: {{ $credentials.brevoEmail.apiKey }}
    - Content-Type: application/json
  - Body:
    {
      "email": "{{ $trigger.json.fields.email }}",
      "attributes": {
        "FIRSTNAME": "{{ $trigger.json.fields.contactName.split(' ')[0] }}",
        "LASTNAME": "{{ $trigger.json.fields.contactName.split(' ')[1] }}",
        "COMPANY": "{{ $trigger.json.fields.companyName }}",
        "PHONENUMBER": "{{ $trigger.json.fields.phone }}"
      },
      "listIds": [3],  // List ID for "Nurture Sequence #1"
      "emailBlacklisted": false
    }
```

**Node 5: Log Activity in Airtable**
```
Name: "Update Lead Status"
Type: "Airtable"
Settings:
  - Method: "update"
  - Base ID: [your base]
  - Table: "Leads"
  - Record ID: {{ $trigger.json.id }}
  - Fields:
    - Status: "Nurturing"
    - Added to Brevo: {{ now().format('YYYY-MM-DD') }}
```

---

## WORKFLOW 3: MEETING AUTO-SCHEDULING (CALENDLY INTEGRATION)

### What It Does:
When Calendly meeting is booked, update Airtable, send confirmation, add to Google Calendar

### Setup:

#### **Get Calendly Webhook URL**
```
1. In n8n, create this workflow first
2. Add a Webhook trigger node (copy the URL)
3. Go to Calendly: https://calendly.com/settings/integrations/webhooks
4. Add webhook URL
5. Subscribe to: "invitee.created" event
```

#### **Build Workflow:**

**Node 1: Calendly Webhook Trigger**
```
Name: "Meeting Booked"
Type: "Webhook"
Settings:
  - Method: POST
  - Authentication: None (for MVP)
  - Copy webhook URL to Calendly settings
```

**Node 2: Extract Meeting Details**
```
Name: "Parse Meeting Data"
Type: "Set"
Settings:
  Extract from webhook:
  - Contact Email: {{ $json.payload.invitee.email }}
  - Contact Name: {{ $json.payload.invitee.name }}
  - Meeting Time: {{ $json.payload.event.start_time }}
  - Duration: {{ $json.payload.event.duration }} minutes
  - Event ID: {{ $json.payload.event.uri }}
```

**Node 3: Find Lead in Airtable**
```
Name: "Get Lead Record"
Type: "Airtable"
Settings:
  - Method: "query"
  - Base ID: [your base]
  - Table: "Leads"
  - Condition: Email = {{ $json.email }}
```

**Node 4: Update Lead Status**
```
Name: "Update to Meeting Scheduled"
Type: "Airtable"
Settings:
  - Method: "update"
  - Record ID: {{ $node["Get Lead Record"].json.records[0].id }}
  - Fields:
    - Status: "Meeting Scheduled"
    - Meeting Date: {{ $json.meetingTime }}
    - Meeting Duration: {{ $json.duration }}
    - Calendly Event ID: {{ $json.eventID }}
    - Last Activity: {{ now().format('YYYY-MM-DD HH:mm') }}
```

**Node 5: Add to Google Calendar**
```
Name: "Create Google Calendar Event"
Type: "Google Calendar"
Settings:
  - Calendar ID: primary
  - Summary: "Demo with {{ $json.contactName }}"
  - Start Time: {{ $json.meetingTime }}
  - End Time: {{ $json.meetingTime | add minutes: $json.duration }}
  - Description: "Lead: {{ $json.contactName }} ({{ $json.email }})"
  - Attendees: {{ $json.email }}, your-email@company.com
```

**Node 6: Send Reminder Email (Brevo)**
```
Name: "Send Confirmation Email"
Type: "HTTP Request"
Settings:
  - Method: POST
  - URL: https://api.brevo.com/v3/smtp/email
  - Headers:
    - api-key: {{ $credentials.brevoEmail.apiKey }}
  - Body:
    {
      "sender": {
        "name": "Your Team",
        "email": "sales@yourcompany.com"
      },
      "to": [
        {
          "email": "{{ $json.email }}",
          "name": "{{ $json.contactName }}"
        }
      ],
      "subject": "Confirmed: Your Demo on {{ $json.meetingTime.format('MMM DD') }}",
      "htmlContent": "<h1>You're all set!</h1><p>Meeting confirmed for {{ $json.meetingTime.format('MMM DD @ h:mm A') }}</p><p><a href='{{ $json.calendarLink }}'>Add to Calendar</a></p>"
    }
```

---

## WORKFLOW 4: PROPOSAL GENERATION (POST-MEETING)

### What It Does:
After meeting, generate a proposal using Gamma, send via Brevo, track in Airtable

### Setup:

#### **Get Gamma API**
```
1. Sign up: https://gamma.app
2. Go to Settings → API
3. Get API token
4. Save in n8n as "Gamma AI"
```

#### **Build Workflow:**

**Node 1: Manual Trigger or Scheduled Check**
```
Name: "Check for Completed Meetings"
Type: "Schedule" (every 6 hours)
OR Webhook for manual trigger
```

**Node 2: Query Completed Meetings**
```
Name: "Find Meetings to Propose"
Type: "Airtable"
Settings:
  - Method: "query"
  - Table: "Leads"
  - Filter: 
    Status = "Meeting Scheduled" 
    AND 
    Meeting Date <= TODAY()
    AND
    Proposal Sent = blank
```

**Node 3: Generate Proposal with Gamma**
```
Name: "Create Proposal"
Type: "HTTP Request"
Settings:
  - Method: POST
  - URL: https://api.gamma.app/v1/generate
  - Headers:
    - Authorization: Bearer {{ $credentials.gammaAI.token }}
  - Body:
    {
      "template": "business_proposal",
      "inputs": {
        "company_name": "{{ $item.json.fields.companyName }}",
        "contact_name": "{{ $item.json.fields.contactName }}",
        "project_description": "Based on our meeting, here's our recommended approach",
        "price": 5000,
        "timeline": "4 weeks implementation",
        "deliverables": "Automation setup, training, 30-day support",
        "company_logo": "{{ your_company_logo_url }}"
      }
    }
  - Return JSON: true
```

**Node 4: Save Proposal PDF**
```
Name: "Save to Drive"
Type: "Google Drive"
Settings:
  - Operation: Upload
  - File Name: "Proposal_{{ $item.json.fields.companyName }}_{{ now().format('YYYY-MM-DD') }}.pdf"
  - Folder ID: [your proposals folder]
  - Content: {{ $node["Create Proposal"].json.pdf_url }}
```

**Node 5: Send via Email**
```
Name: "Email Proposal"
Type: "HTTP Request"
Settings:
  - Method: POST
  - URL: https://api.brevo.com/v3/smtp/email
  - Headers:
    - api-key: {{ $credentials.brevoEmail.apiKey }}
  - Body:
    {
      "to": [{"email": "{{ $item.json.fields.email }}"}],
      "subject": "Your Custom Proposal - {{ $item.json.fields.companyName }}",
      "htmlContent": "<h2>Your proposal is ready!</h2><p>Following our discussion, I've prepared a custom proposal for your project.</p><p><a href='{{ $node["Save to Drive"].json.webViewLink }}'>View Proposal</a></p>",
      "attachment": [
        {
          "content": "{{ $node["Create Proposal"].json.pdf_base64 }}",
          "name": "Proposal.pdf"
        }
      ]
    }
```

**Node 6: Update Airtable**
```
Name: "Mark Proposal Sent"
Type: "Airtable"
Settings:
  - Method: "update"
  - Record ID: {{ $item.json.id }}
  - Fields:
    - Status: "Proposal Sent"
    - Proposal Sent Date: {{ now().format('YYYY-MM-DD') }}
    - Proposal Link: {{ $node["Save to Drive"].json.webViewLink }}
    - Follow-up Date: {{ now().add('days', 3).format('YYYY-MM-DD') }}
```

---

## WORKFLOW 5: PAYMENT PROCESSING & DEAL CLOSING

### What It Does:
Generate payment link, send to customer, process payment, mark deal closed

### Setup:

#### **Get Stripe API**
```
1. Login to Stripe: https://dashboard.stripe.com
2. Settings → API Keys
3. Copy: Restricted API Key (restrict to: Write charges, Read customers)
4. Save in n8n as "Stripe API"
```

#### **Build Workflow:**

**Node 1: Webhook Trigger (Manual or Scheduled)**
```
Name: "Proposal Accepted / Ready for Payment"
Type: "Webhook" or "Airtable Trigger"
Settings:
  If Airtable Trigger:
    - Field "Ready for Payment" = checked
```

**Node 2: Get Customer Info**
```
Name: "Query Customer Details"
Type: "Airtable"
Settings:
  - Query for lead details
  - Extract: email, company name, contact name, deal value
```

**Node 3: Create Stripe Payment Link**
```
Name: "Generate Payment Link"
Type: "Stripe"
Settings:
  - Operation: "Create Payment Link"
  - Line Items:
    - Name: "Sales Automation Setup & Implementation"
    - Amount: {{ $item.json.dealValue * 100 }} (in cents)
    - Currency: "usd"
    - Quantity: 1
  - Customer Email: {{ $item.json.email }}
  - Success URL: https://yoursite.com/success
  - Cancel URL: https://yoursite.com/cancelled
```

**Node 4: Send Payment Email**
```
Name: "Email Payment Link"
Type: "HTTP Request"
Settings:
  - Method: POST
  - URL: https://api.brevo.com/v3/smtp/email
  - Body:
    {
      "to": [{"email": "{{ $item.json.email }}"}],
      "subject": "Payment Due - {{ $item.json.companyName }}",
      "htmlContent": "<h2>Ready to get started?</h2><p>Click below to complete payment and we'll begin immediately.</p><p><a href='{{ $node["Generate Payment Link"].json.url }}' style='background: #0066cc; color: white; padding: 10px 20px; text-decoration: none;'>Pay Now</a></p>"
    }
```

**Node 5: Listen for Payment**
```
Name: "Stripe Payment Webhook"
Type: "Webhook"
Settings:
  - Set up in Stripe: Settings → Webhooks
  - Listen for: "checkout.session.completed"
  - Filter: {{ $json.data.object.payment_status == "paid" }}
```

**Node 6: Create Invoice**
```
Name: "Generate Invoice"
Type: "HTTP Request"
Settings:
  - Method: POST
  - URL: https://api.stripe.com/v1/invoices
  - Headers:
    - Authorization: Bearer {{ $credentials.stripeAPI.secretKey }}
  - Body:
    {
      "customer": "{{ $json.customer_id }}",
      "collection_method": "charge_automatically",
      "days_until_due": 0
    }
```

**Node 7: Update Deal Status**
```
Name: "Mark Deal as Won"
Type: "Airtable"
Settings:
  - Method: "update"
  - Record ID: {{ $item.json.airtableID }}
  - Fields:
    - Status: "Won"
    - Deal Closed Date: {{ now().format('YYYY-MM-DD') }}
    - Amount Paid: {{ $json.amount_paid / 100 }}
    - Invoice ID: {{ $node["Generate Invoice"].json.id }}
    - Next Action: "Send delivery kickoff"
```

**Node 8: Trigger Delivery Workflow**
```
Name: "Start Delivery Project"
Type: "HTTP Request" (to Lovable or internal API)
Settings:
  - Method: POST
  - Create new project record in "Projects" Airtable table
  - Generate client portal access
  - Schedule kickoff meeting
```

---

## WORKFLOW 6: BONUS - PIPELINE SYNC & REPORTING

### What It Does:
Sync everything to a live dashboard for reporting

**Simple Approach: One-way sync to Airtable**

```
Node 1: Scheduled Trigger (Every hour)

Node 2-7: Sync from each tool:
  - Brevo Contacts → Airtable "Contacts" table
  - Stripe Transactions → Airtable "Revenue" table
  - Calendly Events → Airtable "Meetings" table
  - Gamma Proposals → Airtable "Proposals" table

Node 8: Calculate Metrics
  - Total Pipeline Value: SUM(all proposals + active deals)
  - Conversion Rate: (Won deals / Total leads) × 100
  - Average Deal Size: Total won / number of deals
  - Cycle Time: AVERAGE(days from lead to won)

Node 9: Update Dashboard
  - Push to metrics Airtable base
  - Update Google Sheet
  - Send Slack report
```

---

## HOW TO EXPORT & SUBMIT

### Export Your Workflows:

```
For Each Workflow:
1. Open in n8n
2. Click menu (3 dots) → Download
3. Save as: workflow_[name].json
4. This creates a file you can share

Importing Later:
1. In n8n: New → Import
2. Upload the .json file
3. Re-authenticate credentials
4. Done!
```

### What to Include in Submission:

```
📁 Cervoa_Submission/
├── 📄 Architecture_Diagram.pdf
├── 📄 Dashboard_UI.jsx (or .html)
├── 📄 Cost_Analysis.md
├── 📄 Strategic_Plan.md
├── 📁 n8n_Workflows/
│   ├── 1_Lead_Discovery.json
│   ├── 2_Nurturing.json
│   ├── 3_Meeting_Scheduling.json
│   ├── 4_Proposal_Generation.json
│   ├── 5_Payment_Processing.json
│   └── 6_Dashboard_Sync.json
├── 📄 API_Keys_Reference.md (no actual keys!)
└── 📄 README.md (how to set up)
```

---

## TESTING EACH WORKFLOW

**Workflow 1 (Apollo)**: 
- Run manually
- Check Airtable has new records ✓

**Workflow 2 (Brevo)**: 
- Manually create Airtable record
- Verify contact added to Brevo ✓

**Workflow 3 (Calendly)**: 
- Book test meeting in Calendly
- Verify Airtable updated + Google Calendar event ✓

**Workflow 4 (Gamma)**: 
- Manually trigger
- Check proposal PDF generated ✓

**Workflow 5 (Stripe)**: 
- Test payment link
- Verify Airtable updated after payment ✓

**Workflow 6 (Sync)**: 
- Run manually
- Check all tables synced ✓

---

## QUICK REFERENCE: API ENDPOINTS

| Tool | Endpoint | Method | Key Header |
|------|----------|--------|------------|
| Apollo | `https://api.apollo.io/v1/` | POST | X-Api-Key |
| Clay | `https://api.clayhq.com/api/v4/` | POST | Authorization: Bearer |
| Brevo | `https://api.brevo.com/v3/` | POST | api-key |
| Calendly | `https://calendly.com/api/v1/` | GET/POST | Authorization: Bearer |
| Airtable | `https://api.airtable.com/v0/` | Any | Authorization: Bearer |
| Stripe | `https://api.stripe.com/v1/` | POST | Authorization: Bearer |
| Gamma | `https://api.gamma.app/v1/` | POST | Authorization: Bearer |
| Google Calendar | `https://www.googleapis.com/calendar/v3/` | POST | Authorization: Bearer |

---

## COMMON TROUBLESHOOTING

**"Authorization failed"**
- Check API key is correct
- Check key hasn't expired
- Check header name is exact (case-sensitive)

**"Field not found in Airtable"**
- Verify field name (including spaces)
- Check field type matches (text vs number)
- Use Field ID instead of name if issues persist

**"Rate limit exceeded"**
- Apollo: 500 calls/month free, upgrade for more
- Clay: Space out enrichment requests
- Brevo: 5 requests/second limit
- Add "Wait" nodes between requests if needed

**"Data not syncing"**
- Check trigger is configured correctly
- Verify n8n workflow is active
- Check connection credentials are valid
- Run manually to test

---

## PRO TIPS

1. **Use "Continue on Fail"** for non-critical steps
2. **Add error handling** with Try/Catch nodes
3. **Log everything** to understand data flow
4. **Test with dummy data** before going live
5. **Use environment variables** for API keys (don't hardcode)
6. **Monitor execution history** in n8n dashboard

Good luck with your implementation!
