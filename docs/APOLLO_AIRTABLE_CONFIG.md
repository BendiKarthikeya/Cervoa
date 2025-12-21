# 🔌 APOLLO TO AIRTABLE INTEGRATION GUIDE

## Your Credentials
- **Airtable Token:** `YOUR_AIRTABLE_TOKEN_HERE`
- **Airtable Base ID:** Get this after creating your base (format: `appXXXXXXXXXX`)

---

## 📋 STEP 1: Set Up Airtable Tables (5 minutes)

### Quick Setup:
1. Go to: https://airtable.com/create
2. Create new base: **"Cervoa Demo"**
3. Create these 5 tables:

### Table 1: **Leads**
```
Fields:
- Company (Single line text)
- Contact (Single line text) 
- Email (Email)
- Phone (Phone number)
- Title (Single line text)
- Score (Number)
- Status (Single select: New, Contacted, Qualified, Lost)
- Source (Single line text)
- Value (Currency)
- LinkedIn (URL)
- Website (URL)
- Industry (Single line text)
- Employee Count (Number)
- Notes (Long text)
```

### Table 2: **Contacts**
```
Fields:
- Email (Email)
- Name (Single line text)
- Company (Single line text)
- List (Single line text)
- Status (Single select: Active, Unsubscribed, Bounced)
```

### Table 3: **Meetings**
```
Fields:
- Company (Single line text)
- Contact Name (Single line text)
- Email (Email)
- Date (Date with time)
- Duration (Number)
- Meeting Type (Single line text)
- Notes (Long text)
- Status (Single select: Scheduled, Completed, Cancelled, No Show)
```

### Table 4: **Proposals**
```
Fields:
- Company (Single line text)
- Contact (Single line text)
- Date Sent (Date)
- Value (Currency)
- Status (Single select: Draft, Sent, Accepted, Rejected)
- Proposal Link (URL)
- Notes (Long text)
```

### Table 5: **Revenue**
```
Fields:
- Company (Single line text)
- Amount (Currency)
- Date (Date)
- Status (Single select: Pending, Completed, Refunded, Failed)
- Payment Method (Single line text)
- Transaction ID (Single line text)
- Invoice URL (URL)
```

---

## 🎯 STEP 2: Configure Apollo Search

### What Data to Extract from Apollo:

When setting up Apollo search in n8n, use these search parameters:

#### **Target Audience:**
```json
{
  "person_titles": ["CEO", "CTO", "VP Engineering", "Head of Product", "Founder"],
  "organization_num_employees_ranges": ["11-50", "51-200", "201-500"],
  "organization_locations": ["United States"],
  "person_seniorities": ["senior", "c_level", "owner"]
}
```

#### **Industries to Target:**
```json
{
  "organization_industry_tag_ids": [
    "5567cd4773696439b10b0000",  // Software
    "5567cd4773696439b1180000",  // Technology
    "5567cd4773696439b11d0000",  // SaaS
    "5567cd4773696439b1050000"   // IT Services
  ]
}
```

---

## 🔄 STEP 3: n8n Workflow Configuration

### Apollo API Call Configuration:

```javascript
// Apollo API Endpoint
POST https://api.apollo.io/v1/mixed_people/search

// Headers
{
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
  "X-Api-Key": "YOUR_APOLLO_API_KEY"
}

// Request Body
{
  "page": 1,
  "per_page": 25,
  "person_titles": ["CEO", "CTO", "VP Engineering", "Founder"],
  "organization_num_employees_ranges": ["11-50", "51-200", "201-500"],
  "q_organization_keyword_tags": ["b2b saas", "enterprise software"],
  "organization_locations": ["United States"],
  "person_seniorities": ["senior", "c_level", "owner"]
}
```

### Data Mapping: Apollo → Airtable

Map these fields from Apollo response to Airtable:

```javascript
{
  "Company": "{{$json.organization.name}}",
  "Contact": "{{$json.name}}",
  "Email": "{{$json.email}}",
  "Phone": "{{$json.phone_numbers[0].sanitized_number}}",
  "Title": "{{$json.title}}",
  "Score": 75,  // Default score, can be calculated
  "Status": "New",
  "Source": "Apollo API",
  "LinkedIn": "{{$json.linkedin_url}}",
  "Website": "{{$json.organization.website_url}}",
  "Industry": "{{$json.organization.industry}}",
  "Employee Count": "{{$json.organization.estimated_num_employees}}",
  "Value": 5000  // Estimated deal value
}
```

---

## 📝 STEP 4: Apollo Search Prompt/Query

### In n8n HTTP Node, use this exact configuration:

**Method:** POST

**URL:** `https://api.apollo.io/v1/mixed_people/search`

**Headers:**
```
Content-Type: application/json
X-Api-Key: YOUR_APOLLO_API_KEY
```

**Body (JSON):**
```json
{
  "page": 1,
  "per_page": 25,
  "person_titles": [
    "Chief Executive Officer",
    "CEO",
    "CTO",
    "Chief Technology Officer",
    "VP of Engineering",
    "Head of Product",
    "Founder",
    "Co-Founder"
  ],
  "organization_num_employees_ranges": [
    "11-50",
    "51-200",
    "201-500"
  ],
  "organization_locations": [
    "United States"
  ],
  "person_seniorities": [
    "senior",
    "c_level",
    "owner"
  ],
  "q_organization_keyword_tags": [
    "saas",
    "software",
    "b2b",
    "technology"
  ]
}
```

---

## 🎯 STEP 5: Airtable API Configuration (in n8n)

### Create Record in Airtable:

**Method:** POST

**URL:** `https://api.airtable.com/v0/YOUR_BASE_ID/Leads`

**Headers:**
```
Authorization: Bearer YOUR_AIRTABLE_TOKEN_HERE
Content-Type: application/json
```

**Body:**
```json
{
  "fields": {
    "Company": "{{$json.organization.name}}",
    "Contact": "{{$json.name}}",
    "Email": "{{$json.email}}",
    "Phone": "{{$json.phone_numbers[0].sanitized_number}}",
    "Title": "{{$json.title}}",
    "Score": 75,
    "Status": "New",
    "Source": "Apollo",
    "Value": 5000,
    "LinkedIn": "{{$json.linkedin_url}}",
    "Website": "{{$json.organization.website_url}}",
    "Industry": "{{$json.organization.industry}}",
    "Employee Count": "{{$json.organization.estimated_num_employees}}"
  }
}
```

---

## 🚀 Quick Start Checklist

- [ ] Create Airtable base "Cervoa Demo"
- [ ] Create 5 tables with fields above
- [ ] Get Base ID from Airtable URL (appXXXXXXXXXX)
- [ ] Get Apollo API key from apollo.io settings
- [ ] Import WORKFLOW_1_Apollo_Lead_Discovery.json to n8n
- [ ] Update credentials in n8n:
  - [ ] Airtable token
  - [ ] Airtable base ID
  - [ ] Apollo API key
- [ ] Test workflow with "Execute Workflow" button
- [ ] Verify data appears in Airtable

---

## 💡 Tips for Best Results

### Apollo Search Strategy:

1. **Target Quality over Quantity**
   - Focus on specific titles (CEO, CTO)
   - Target companies with 50-500 employees
   - Use keyword filters: "saas", "b2b", "enterprise"

2. **Scoring Leads**
   - C-Level = 90 points
   - VP/Director = 75 points
   - Manager = 60 points
   - Factor in company size and industry fit

3. **Data Enrichment**
   - Apollo provides: email, phone, LinkedIn
   - Clay can add: technologies used, funding data
   - Combine both for complete profiles

---

## 🔍 Testing Your Setup

1. **Test Apollo API:**
```bash
curl -X POST https://api.apollo.io/v1/mixed_people/search \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: YOUR_APOLLO_KEY" \
  -d '{"per_page": 1, "person_titles": ["CEO"]}'
```

2. **Test Airtable API:**
```bash
curl "https://api.airtable.com/v0/YOUR_BASE_ID/Leads?maxRecords=3" \
  -H "Authorization: Bearer YOUR_AIRTABLE_TOKEN_HERE"
```

---

## 📊 Expected Results

After running the workflow:
- 25 leads per execution
- Leads appear in Airtable "Leads" table
- Each lead has: company, contact, email, title, score
- Ready for nurturing workflow

---

## 🆘 Troubleshooting

**No data in Airtable?**
- Check Base ID is correct
- Verify table name is exactly "Leads"
- Check token has write permissions

**Apollo returns no results?**
- Broaden search criteria
- Remove location filters
- Increase per_page to 50

**n8n workflow errors?**
- Check all credentials are saved
- Test each node individually
- View execution logs

---

**Next Step:** Import `WORKFLOW_1_Apollo_Lead_Discovery.json` to n8n and configure with your credentials!
