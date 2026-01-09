# Add Leads Feature - n8n Integration

## Overview
A new "Add Leads" button has been added to the Leads tab that opens a comprehensive modal form for searching and importing leads from Apollo/Apify.

## Features

### ✅ Form Sections

#### 👤 Person Information
- **Job Titles**: Select from 18+ predefined titles or add custom ones
- **Seniority Level**: Filter by C-Suite, VP, Director, Manager, Senior, Owner, Founder
- **Department/Function**: Sales, Marketing, Engineering, Operations, Finance, HR, Product, Business Development
- **Person Location**: Filter contacts by country
- **Include Similar Titles**: Toggle to expand title search to known variants

#### 🏢 Company Information
- **Company Country**: Target companies in specific countries
- **Employee Range**: 1-10, 11-20, 21-50, 51-100, 101-200, 201-500, 501-1000, 1001-2000, 2001-5000, 5001-10000, 10001+
- **Industry**: 15+ industry options (Technology, SaaS, E-commerce, Healthcare, etc.)
- **Company Keywords**: Add custom keywords to search company names/descriptions

#### ✉️ Contact Quality
- **Email Status**: Verified only or Unverified
- **Must Have Email**: Toggle requirement
- **Must Have Phone**: Toggle requirement

#### 📊 Results
- **Total Results**: Set number of leads to fetch (1-50,000)
- **Reset Saved Progress**: Start fresh search if needed

## How to Use

1. **Navigate to Leads Tab**: Click on the "Leads" tab in the sidebar
2. **Click "Add Leads" Button**: Located in the top-right of the leads section
3. **Configure Search Criteria**: 
   - Select desired job titles, seniority levels, departments
   - Choose company locations, sizes, and industries
   - Add custom keywords if needed
   - Adjust email/phone requirements
   - Set the total number of results to fetch
4. **Submit**: Click "Send to n8n Workflow" to submit the search
5. **Monitor**: Check your n8n instance for execution progress

## n8n Integration

The form sends JSON to your n8n webhook with this structure:
```json
{
  "personTitleIncludes": ["Founder", "CEO", ...],
  "personTitleExtraIncludes": ["Custom Title", ...],
  "includeSimilarTitles": false,
  "seniorityIncludes": ["C-Suite", "VP", ...],
  "personFunctionIncludes": ["Sales", "Marketing", ...],
  "personLocationCountryIncludes": ["United States", ...],
  "companyEmployeeSizeIncludes": ["51-100", "101-200", ...],
  "companyIndustryIncludes": ["Technology", "SaaS", ...],
  "companyLocationCountryIncludes": ["United Kingdom", ...],
  "companyKeywordIncludes": ["AI", "software", ...],
  "emailStatus": "verified",
  "hasEmail": true,
  "hasPhone": false,
  "totalResults": 100,
  "resetSavedProgress": false
}
```

## Next Steps

1. **Update n8n Webhook URL**: Modify `handleAddLeadsSubmit()` function in `App.jsx` with your actual webhook endpoint
2. **Test the Form**: Try searching with different criteria
3. **Monitor Execution**: Watch n8n for lead import workflow execution
4. **Refine Filters**: Adjust form to match your ideal prospect profile

## File References
- **Modal Component**: [src/components/AddLeadsModal.jsx](src/components/AddLeadsModal.jsx)
- **Main App**: [src/App.jsx](src/App.jsx) - Line 360 (Add Leads button)

## Technical Details
- **Framework**: React 18
- **UI Components**: Lucide React icons
- **Styling**: Tailwind CSS
- **Form State**: React hooks (useState)
- **HTTP Method**: POST to n8n webhook
- **Data Format**: JSON

