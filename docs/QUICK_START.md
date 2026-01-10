# ⚡ Quick Start Guide - Add Leads Feature

## 🚀 Start Using in 3 Steps

### Step 1: Navigate to Leads
```
Click "Leads" in the left sidebar
```

### Step 2: Open Form
```
Click the blue "✨ + Add Leads" button (top-right)
```

### Step 3: Submit Search
```
1. Select job titles (e.g., CEO, Founder)
2. Choose seniority (e.g., C-Suite, VP)
3. Pick location (e.g., United States)
4. Select company size (e.g., 51-100 employees)
5. Choose industry (e.g., Technology)
6. Click "Send to n8n Workflow"
```

---

## 🔧 Configuration (One-Time Setup)

### Update Webhook URL

**File**: `src/App.jsx` (Line ~65)

Find this:
```javascript
const n8nWebhookUrl = 'https://karthikeya007.app.n8n.cloud/webhook/leads-import';
```

Replace with your actual n8n instance URL:
```javascript
const n8nWebhookUrl = 'https://YOUR_N8N_URL/webhook/leads-import';
```

---

## 📋 Form Fields Reference

### Person Information
- **Job Titles**: Select from Founder, CEO, Director, Manager, etc.
- **Add Custom Title**: Enter unique titles not in list
- **Seniority**: C-Suite, VP, Director, Manager, Senior, Owner, Founder
- **Department**: Sales, Marketing, Engineering, Operations, Finance, HR, Product
- **Location**: Filter by person's country
- **Similar Titles**: Toggle to include title variants (e.g., "CEO" + "Chief Executive Officer")

### Company Information
- **Location**: Filter by company HQ country
- **Size**: 1-10, 11-20, 21-50, 51-100, 101-200, 201-500, 501-1000, 1001+
- **Industry**: Technology, SaaS, E-commerce, Healthcare, Finance, etc.
- **Keywords**: Search company names/descriptions (e.g., "AI", "Software")

### Contact Quality
- **Email**: Verified only or Unverified
- **Must Have Email**: Toggle on/off
- **Must Have Phone**: Toggle on/off

### Results
- **Total Results**: How many leads to fetch (1-50,000)
- **Reset**: Start fresh search (don't use saved progress)

---

## ✅ Recommended Criteria

### B2B SaaS Companies
```
Job Titles: Founder, CEO, VP of Sales, VP of Marketing
Seniority: C-Suite, VP, Director
Countries: United States, United Kingdom, Canada
Size: 51-100, 101-200, 201-500
Industries: Technology, Software, SaaS, E-commerce
Keywords: SaaS, cloud, software, digital
Results: 500-1000
```

### Enterprise Sales Prospects
```
Job Titles: Chief Operating Officer, VP of Operations, Director
Seniority: C-Suite, VP
Countries: United States, Germany, France
Size: 201-500, 501-1000, 1001+
Industries: Financial Services, Technology, Insurance
Keywords: Enterprise, operations, transformation
Results: 200-500
```

### Startup Founders
```
Job Titles: Founder, Co-Founder, CEO & Founder
Seniority: Founder, C-Suite, Owner
Countries: United States, United Kingdom, India
Size: 1-10, 11-20, 21-50
Industries: Technology, Software, Internet, E-commerce
Keywords: AI, startup, tech, innovation
Results: 100-300
```

---

## 🎯 Example Usage

### Search for Tech Founders in US
1. Check: **Founder**, **Co-Founder**
2. Check: **Founder**, **C-Suite**
3. Check: **United States** (Person Location)
4. Check: **1-10**, **11-20**, **21-50**
5. Check: **Technology**, **Software**
6. Add Keyword: "AI"
7. Set Results: **500**
8. Click **Send to n8n Workflow**

### Search for Marketing Managers in UK
1. Check: **Director of Marketing**, **Marketing Manager**
2. Check: **Manager**, **Senior**
3. Check: **United Kingdom** (Person Location)
4. Check: **Marketing** (Department)
5. Check: **51-100**, **101-200**
6. Set Results: **200**
7. Click **Send to n8n Workflow**

---

## 🧪 Testing the Form

### Quick Test (No Results Expected)
```
✓ Check: Founder
✓ Check: CEO
✓ Set Total Results: 10
✓ Click "Send to n8n Workflow"
✓ Check browser console for POST request
```

### Full Test
```
✓ Select 3-5 job titles
✓ Select 1-2 seniority levels
✓ Select 2-3 countries
✓ Select 2-3 sizes
✓ Select 2-3 industries
✓ Add 1-2 keywords
✓ Toggle email & phone as needed
✓ Set results to 100-500
✓ Click "Send to n8n Workflow"
✓ Monitor n8n webhook logs
```

---

## ❌ Common Issues & Fixes

### Error: "Error sending to n8n"
**Cause**: Webhook URL incorrect or n8n not running
**Fix**: 
1. Check webhook URL in `src/App.jsx`
2. Verify n8n instance is running
3. Test webhook with curl:
```bash
curl -X POST https://YOUR_N8N/webhook/leads-import \
  -H "Content-Type: application/json" \
  -d '{"totalResults": 100}'
```

### Form Not Submitting
**Cause**: JavaScript error or validation failure
**Fix**:
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Try submitting with minimal criteria
4. Check Form state in React DevTools

### No Results Returned
**Cause**: Search criteria too restrictive
**Fix**:
1. Reduce number of selected filters
2. Use broader categories
3. Increase total results number
4. Remove "verified email only" filter
5. Check n8n workflow is processing

### Modal Won't Open
**Cause**: Component not imported or state issue
**Fix**:
1. Clear browser cache (Ctrl+Shift+Del)
2. Hard refresh page (Ctrl+F5)
3. Check console for import errors
4. Verify App.jsx has AddLeadsModal import

---

## 📊 Monitor Webhook

### View n8n Execution
1. Go to your n8n instance
2. Open the "leads-import" workflow
3. Click "Executions" tab
4. Look for recent runs
5. Click to see input/output data

### Test with curl
```bash
curl -X POST https://YOUR_N8N_INSTANCE/webhook/leads-import \
  -H "Content-Type: application/json" \
  -d '{
    "personTitleIncludes": ["CEO", "Founder"],
    "seniorityIncludes": ["C-Suite"],
    "companyEmployeeSizeIncludes": ["51-100"],
    "totalResults": 100
  }'
```

---

## 📞 Need Help?

### Read Documentation
- [Feature Guide](docs/ADD_LEADS_FEATURE.md) - How to use
- [Setup Guide](docs/N8N_WEBHOOK_SETUP.md) - n8n configuration
- [Visual Guide](docs/ADD_LEADS_VISUAL_GUIDE.md) - Form layout
- [Checklist](docs/IMPLEMENTATION_CHECKLIST.md) - Deployment

### Check Code
- [Modal Component](src/components/AddLeadsModal.jsx) - Form code
- [App.jsx](src/App.jsx) - Integration code

### Run Tests
1. Open browser DevTools
2. Check Console for errors
3. Check Network for POST requests
4. Check Application/Storage for issues

---

## 🎓 Tips & Tricks

### Pro Tips
- **Start Broad**: Use fewer filters first, then narrow down
- **Verify Data**: Check n8n logs after each submission
- **Monitor Quota**: Track API usage for Apollo/Apify
- **Save Criteria**: Note down criteria that work best
- **Test Often**: Submit test searches with small result counts

### Keyboard Shortcuts
- `Tab` - Move between form fields
- `Shift+Tab` - Move to previous field
- `Space` - Toggle checkbox
- `Enter` - Submit form
- `Esc` - Close modal

### Optimization
- Use 500-1000 results for initial searches
- Narrow by location for faster results
- Check email verification status
- Test with required email toggle first

---

## ✨ Features at a Glance

| Feature | Details |
|---------|---------|
| **Search Filters** | 15+ input controls |
| **Options Available** | 70+ predefined choices |
| **Custom Inputs** | Job titles + Keywords |
| **Result Size** | 1-50,000 leads |
| **API Integration** | n8n Webhooks |
| **Response Time** | Real-time feedback |
| **Error Handling** | Clear messages |
| **Mobile Support** | Full responsive |

---

**Quick Start Version**: 1.0.0
**Status**: Ready to Use ✅
**Last Updated**: January 10, 2026
