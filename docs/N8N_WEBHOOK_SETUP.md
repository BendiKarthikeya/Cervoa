# n8n Webhook Setup for Add Leads Feature

## Step 1: Create n8n Webhook Workflow

In your n8n instance, create a new workflow with these steps:

### Step 1: Webhook Trigger
- **Type**: Webhook
- **Method**: POST
- **Path**: `/leads-import` (or your preferred path)
- **Authentication**: None (or add Bearer token for security)

```
URL: https://karthikeya007.app.n8n.cloud/webhook/leads-import
```

### Step 2: Parse Input Data
Add a node to handle the incoming JSON from the form:
```javascript
// The webhook will receive the form data structure:
{
  "personTitleIncludes": [...],
  "personTitleExtraIncludes": [...],
  "includeSimilarTitles": true/false,
  "seniorityIncludes": [...],
  "personFunctionIncludes": [...],
  "personLocationCountryIncludes": [...],
  "companyEmployeeSizeIncludes": [...],
  "companyIndustryIncludes": [...],
  "companyLocationCountryIncludes": [...],
  "companyKeywordIncludes": [...],
  "emailStatus": "verified|unverified",
  "hasEmail": true/false,
  "hasPhone": true/false,
  "totalResults": 100,
  "resetSavedProgress": false
}
```

### Step 3: Call Apollo/Apify API
Use the HTTP Request node to call the Apollo API or Apify Actor with the provided filters:

**For Apify Lead Scraper Actor:**
```
Method: POST
URL: https://api.apify.com/v2/acts/pipelinelabs/lead-scraper-apollo-zoominfo-lusha/runs
Headers:
  - Authorization: Bearer YOUR_APIFY_API_KEY
Body: 
  - Forward the form data as actor input
```

### Step 4: Store Results
- Save results to Airtable
- Update your dashboard database
- Return success response

### Step 5: Return Response
```javascript
{
  "success": true,
  "message": "Lead search started",
  "leadCount": 100,
  "status": "processing"
}
```

## Step 2: Update Frontend Webhook URL

In your React app, update the webhook URL in `src/App.jsx`:

```javascript
// Line ~65 in App.jsx
const handleAddLeadsSubmit = async (formData) => {
  try {
    const n8nWebhookUrl = 'https://karthikeya007.app.n8n.cloud/webhook/leads-import';
    // ... rest of the code
```

Replace `https://karthikeya007.app.n8n.cloud/webhook/leads-import` with your actual webhook URL.

## Step 3: Test the Integration

1. **Start the n8n workflow** - Make sure it's active/deployed
2. **Open the dashboard** - Navigate to http://localhost:5173
3. **Go to Leads tab** - Click the "Leads" navigation item
4. **Click "Add Leads"** - Opens the modal form
5. **Fill in search criteria** - Select at least some filters
6. **Click "Send to n8n Workflow"** - Should see a success message
7. **Check n8n** - Monitor the webhook execution and logs

## Troubleshooting

### Error: "Error sending to n8n"
- ✓ Verify webhook URL is correct
- ✓ Check if n8n workflow is active
- ✓ Ensure CORS is enabled if running locally
- ✓ Check browser console for detailed error

### Webhook not receiving data
- ✓ Verify webhook path in n8n matches the URL in code
- ✓ Check n8n webhook execution logs
- ✓ Test with curl or Postman first:
```bash
curl -X POST https://karthikeya007.app.n8n.cloud/webhook/leads-import \
  -H "Content-Type: application/json" \
  -d '{"personTitleIncludes": ["CEO"], "totalResults": 100}'
```

### Empty results
- ✓ Adjust filters to be less restrictive
- ✓ Check if Apollo/Apify API connection is working
- ✓ Verify API credentials in n8n

## Security Considerations

1. **Add Authentication**: Add Bearer token to webhook for security
2. **Validate Input**: Add validation in n8n before processing
3. **Rate Limiting**: Implement rate limits to prevent abuse
4. **Logging**: Log all lead imports for audit trails
5. **API Keys**: Never expose API keys in frontend code

## Testing Script

You can test the webhook directly using this curl command:

```bash
curl -X POST https://karthikeya007.app.n8n.cloud/webhook/leads-import \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_OPTIONAL_TOKEN" \
  -d '{
    "personTitleIncludes": ["CEO", "Founder"],
    "seniorityIncludes": ["C-Suite"],
    "personLocationCountryIncludes": ["United States"],
    "companyEmployeeSizeIncludes": ["51-100", "101-200"],
    "companyIndustryIncludes": ["Technology"],
    "emailStatus": "verified",
    "hasEmail": true,
    "totalResults": 100,
    "resetSavedProgress": false
  }'
```

## References

- [n8n Documentation](https://docs.n8n.io/)
- [Apify Lead Scraper Actor](https://apify.com/pipelinelabs/lead-scraper-apollo-zoominfo-lusha)
- [Add Leads Feature](./ADD_LEADS_FEATURE.md)
