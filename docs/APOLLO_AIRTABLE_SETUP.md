# AIRTABLE LEADS TABLE - APOLLO.IO CONFIGURATION

## 📊 Quick Setup Guide

Your Apollo.io leads data needs these fields in Airtable:

### ✅ FIELDS TO ADD (29 total)

#### 👤 Personal Information (6 fields)
| Field Name | Type | Apollo Source |
|------------|------|---------------|
| First Name | Single Line Text | `firstName` |
| Last Name | Single Line Text | `lastName` |
| Full Name | Single Line Text | `fullName` |
| Email | Email | `email` |
| Phone | Phone | `phone` |
| LinkedIn URL | URL | `linkedinUrl` |

#### 💼 Position Information (3 fields)
| Field Name | Type | Apollo Source |
|------------|------|---------------|
| Position/Title | Single Line Text | `position` |
| Seniority | Single Line Text | `seniority` |
| Functional Area | Single Line Text | `functional` |

#### 📍 Location (3 fields)
| Field Name | Type | Apollo Source |
|------------|------|---------------|
| City | Single Line Text | `city` |
| State | Single Line Text | `state` |
| Country | Single Line Text | `country` |

#### 🏢 Company Information (9 fields)
| Field Name | Type | Apollo Source |
|------------|------|---------------|
| Company | Single Line Text | `orgName` |
| Website | URL | `orgWebsite` |
| Company LinkedIn | URL | `orgLinkedinUrl[0]` |
| Company Description | Long Text | `orgDescription` |
| Industry | Multiple Select | `orgIndustry` |
| Employee Count | Number | `orgSize` |
| Founded Year | Number | `orgFoundedYear` |
| Company City | Single Line Text | `orgCity` |
| Company State | Single Line Text | `orgState` |
| Company Country | Single Line Text | `orgCountry` |

#### 📈 Scoring & Metadata (3 fields)
| Field Name | Type | Apollo Source |
|------------|------|---------------|
| PPE Index | Number | `ppeIndex` |
| PPE Batch Index | Number | `ppeBatchIndex` |
| Lead Score | Number | Calculated |

#### 🎯 Status Fields (4 fields)
| Field Name | Type | Options |
|------------|------|---------|
| Status | Single Select | New, Contacted, Qualified, Meeting Scheduled, Proposal Sent, Won, Lost |
| Estimated Value | Currency | USD $ |
| Source | Single Line Text | "Apollo.io" |
| Notes | Long Text | - |

---

## 🚀 STEP-BY-STEP SETUP

### 1. Open Your Airtable Base
Visit: https://airtable.com/app2xOYGyhjiBqpiU

### 2. Open the Leads Table
Click on "Leads" in the left sidebar

### 3. Add Each Field
Click the "+" button next to the last column and add each field from the tables above

### 4. Configure Status Field
When adding the Status field:
- Type: Single Select
- Options:
  - New (🔵 Blue)
  - Contacted (🟡 Yellow)  
  - Qualified (🟢 Green)
  - Meeting Scheduled (🟣 Purple)
  - Proposal Sent (🟠 Orange)
  - Won (🟢 Green)
  - Lost (🔴 Red)

### 5. Configure Industry Field
- Type: Multiple Select
- Add options as needed (e.g., "apparel & fashion", "technology", "retail", etc.)

---

## 🧪 TEST THE CONFIGURATION

Once you've added all fields, test with the sample Apollo lead:

```bash
cd backend
node update-leads-table.js --test
```

This will create a test lead from the Cosabella sample data.

---

## 🤖 FOR N8N WORKFLOW

In your n8n Apollo workflow, map the fields like this:

```javascript
{
  "First Name": "{{$json.firstName}}",
  "Last Name": "{{$json.lastName}}",
  "Full Name": "{{$json.fullName}}",
  "Email": "{{$json.email}}",
  "Phone": "{{$json.phone}}",
  "LinkedIn URL": "{{$json.linkedinUrl}}",
  "Position/Title": "{{$json.position}}",
  "Seniority": "{{$json.seniority}}",
  "Functional Area": "{{$json.functional}}",
  "City": "{{$json.city}}",
  "State": "{{$json.state}}",
  "Country": "{{$json.country}}",
  "Company": "{{$json.orgName}}",
  "Website": "{{$json.orgWebsite}}",
  "Company LinkedIn": "{{$json.orgLinkedinUrl[0]}}",
  "Company Description": "{{$json.orgDescription}}",
  "Industry": "{{$json.orgIndustry.join(', ')}}",
  "Employee Count": "{{$json.orgSize}}",
  "Founded Year": "{{$json.orgFoundedYear}}",
  "Company City": "{{$json.orgCity}}",
  "Company State": "{{$json.orgState}}",
  "Company Country": "{{$json.orgCountry}}",
  "PPE Index": "{{$json.ppeIndex}}",
  "PPE Batch Index": "{{$json.ppeBatchIndex}}",
  "Status": "New",
  "Source": "Apollo.io",
  "Lead Score": "{{$node['Calculate Score'].json.score}}"
}
```

---

## 📝 SAMPLE DATA (from Cosabella)

```json
{
  "firstName": "Amelia",
  "lastName": "Allegue",
  "fullName": "Amelia Allegue",
  "email": "aallegue@cosabella.com",
  "phone": "",
  "linkedinUrl": "http://www.linkedin.com/in/amelia-allegue-319632112",
  "position": "Executive Assistant to 4 Owners",
  "seniority": "entry",
  "functional": "Operations",
  "city": "Miami",
  "state": "Florida",
  "country": "United States",
  "orgName": "Cosabella",
  "orgWebsite": "http://www.cosabella.com",
  "orgLinkedinUrl": ["http://www.linkedin.com/company/641254"],
  "orgDescription": "Cosabella is a family owned Italian lingerie company...",
  "orgIndustry": ["apparel & fashion"],
  "orgSize": 45,
  "orgFoundedYear": 1983,
  "orgCity": "Miami",
  "orgState": "Florida",
  "orgCountry": "United States",
  "ppeIndex": 1000,
  "ppeBatchIndex": 0
}
```

---

## ✅ CHECKLIST

- [ ] All 29 fields added to Airtable Leads table
- [ ] Status field configured with all options
- [ ] Industry field set as Multiple Select
- [ ] Test lead created successfully
- [ ] n8n workflow updated with field mappings
- [ ] Backend API tested with new structure

---

## 🔗 Related Files

- Script: `/backend/update-leads-table.js`
- n8n Workflow: `/n8n-workflows/WORKFLOW_1_Apollo_Lead_Discovery_SIMPLIFIED.json`
- Backend Config: `/backend/config/airtable.js`
- API Routes: `/backend/routes/leads.js`
