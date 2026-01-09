# 🎨 Add Leads Feature - Visual Guide & Quick Reference

## 🖼️ What You'll See in the UI

### Leads Tab Location
```
┌─────────────────────────────────────────┐
│  SIDEBAR                                │
├─────────────────────────────────────────┤
│ 📊 Overview  (selected = highlighted)   │
│ 👥 Leads     (THIS TAB)                 │
│ 💼 Deals                                │
│ 📞 Meetings                             │
│ 🔧 Integrations                        │
└─────────────────────────────────────────┘
```

### Leads Tab with Add Button
```
┌──────────────────────────────────────────────────────┐
│ All Leads                    [+ Add Leads] ← NEW!    │
├──────────────────────────────────────────────────────┤
│ Company  │ Contact  │ Score │ Stage │ Value │ Action │
├──────────────────────────────────────────────────────┤
│ TechCorp │ John... │  92   │ Proposal │ $45K │   →   │
│ ...      │ ...    │  ...  │ ...     │ ...  │       │
└──────────────────────────────────────────────────────┘
```

### Modal Form (What Opens When You Click "Add Leads")

```
┌─────────────────────────────────────────────────────┐
│  ✕ Add New Leads                                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 👤 PERSON INFORMATION                              │
│  ├─ Job Titles                                      │
│  │  ☑ Founder    ☑ CEO    ☐ Director ☐ Manager    │
│  │  ☐ VP Sales   ☐ ...                             │
│  │  [Add custom title...] [Add]                     │
│  │  ✨ Custom Title ×  ✨ Another Title ×           │
│  │                                                  │
│  ├─ Seniority Level                                 │
│  │  ☑ C-Suite  ☑ VP  ☐ Director  ☐ Manager        │
│  │                                                  │
│  ├─ Department/Function                             │
│  │  ☑ Sales  ☑ Marketing  ☐ Engineering           │
│  │                                                  │
│  ├─ Person Location (Country)                       │
│  │  ☑ United States  ☑ India  ☐ UK  ☐ Canada      │
│  │                                                  │
│  └─ ☑ Include people with similar titles           │
│                                                     │
│ 🏢 COMPANY INFORMATION                              │
│  ├─ Company Country                                 │
│  │  ☑ United Kingdom  ☑ USA  ☐ France             │
│  │                                                  │
│  ├─ Employee Range                                  │
│  │  ☑ 51-100  ☑ 101-200  ☐ 201-500               │
│  │                                                  │
│  ├─ Industry                                        │
│  │  ☑ Technology  ☑ SaaS  ☐ E-commerce            │
│  │                                                  │
│  └─ Company Keywords                                │
│     [AI, software...] [Add]                         │
│     ✨ AI ×  ✨ software ×                          │
│                                                     │
│ ✉️ CONTACT QUALITY                                  │
│  ├─ Email Status: [Verified] ▼                      │
│  ├─ ☑ Must have email                              │
│  └─ ☐ Must have phone                              │
│                                                     │
│ 📊 RESULTS                                          │
│  ├─ Total Results to Fetch: [100]                  │
│  └─ ☐ Reset saved progress                         │
│                                                     │
│ [Send to n8n Workflow] [Cancel]                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 🎨 Color Scheme

| Element | Color | Hex Code |
|---------|-------|----------|
| Background | Dark Slate | #1e293b |
| Border | Blue | #0ea5e9 |
| Text | White | #ffffff |
| Label Text | Blue | #93c5fd |
| Accent | Cyan/Blue | #06b6d4 |
| Hover Button | Bright Cyan | #06b6d4 |
| Success | Green | #4ade80 |
| Error | Red | #ef4444 |

## 📱 Responsive Breakpoints

```
Mobile (< 768px)
├─ Single column for checkboxes
├─ Full-width inputs
└─ Stacked buttons

Tablet (768px - 1024px)
├─ 2-3 columns for checkboxes
├─ Wider form
└─ Side-by-side buttons

Desktop (> 1024px)
├─ 3-4 columns for checkboxes
├─ Multi-column layout
└─ Full-featured display
```

## 🔄 Form State Management

```javascript
// Initial State
{
  personTitleIncludes: [],              // Selected titles
  personTitleExtraIncludes: [],         // Custom titles
  includeSimilarTitles: false,          // Toggle
  seniorityIncludes: [],                // Selected levels
  personFunctionIncludes: [],           // Selected depts
  personLocationCountryIncludes: [],    // Selected countries
  companyEmployeeSizeIncludes: [],      // Selected sizes
  companyIndustryIncludes: [],          // Selected industries
  companyLocationCountryIncludes: [],   // Company countries
  companyKeywordIncludes: [],           // Keywords
  emailStatus: 'verified',              // verified/unverified
  hasEmail: true,                       // Boolean
  hasPhone: false,                      // Boolean
  totalResults: 100,                    // 1-50000
  resetSavedProgress: false             // Boolean
}
```

## 🎯 User Actions Flow

```
1. User clicks "Leads" tab
       ↓
2. Leads table displays
       ↓
3. User clicks "Add Leads" button
       ↓
4. Modal opens with form
       ↓
5. User selects/inputs criteria
   ├─ Checkboxes for multiple select
   ├─ Dropdowns for single select
   └─ Text inputs for custom values
       ↓
6. User clicks "Send to n8n Workflow"
       ↓
7. Form validates data
       ↓
8. Data sent as JSON to n8n webhook
       ↓
9. Success/Error message shown
       ↓
10. Modal closes (on success)
```

## 📊 Form Sections Breakdown

### Section 1: Person Information (👤)
- **Purpose**: Filter by job titles, seniority, department, location
- **Inputs**: 5 multi-select fields + 1 text input + 1 toggle
- **Default**: All unchecked except includeSimilarTitles = false

### Section 2: Company Information (🏢)
- **Purpose**: Filter by company location, size, industry, keywords
- **Inputs**: 4 multi-select fields + 1 text input
- **Default**: All unchecked

### Section 3: Contact Quality (✉️)
- **Purpose**: Set email/phone requirements and verification status
- **Inputs**: 1 dropdown + 2 toggles
- **Default**: verified, hasEmail = true, hasPhone = false

### Section 4: Results Configuration (📊)
- **Purpose**: Set result count and reset options
- **Inputs**: 1 number input + 1 toggle
- **Default**: totalResults = 100, resetSavedProgress = false

## 🎨 Interactive Elements

### Checkboxes
```
☑ Checked      ☐ Unchecked
  
Hover effect: Background highlight
Active effect: Blue checkmark
```

### Custom Tags/Chips
```
✨ Tag Name ×
  
Hover on ×: Color change to red
Click ×: Remove tag from list
```

### Buttons
```
[Primary Button]    - Cyan gradient, hover darker
[Secondary Button]  - Gray, hover darker
[Close (×)]         - Subtle, hover color change
```

### Text Inputs
```
[Input field...]
  
Border: Blue on hover
Focus: Blue border + bright
Text: White
Placeholder: Dimmed blue
```

## 📈 Data Flow Diagram

```
┌──────────────┐
│   Browser    │ ← User visits http://localhost:5173
└──────┬───────┘
       │
       ↓ Clicks "Leads" tab
┌──────────────┐
│  React App   │ Renders leads table
└──────┬───────┘
       │
       ↓ Clicks "Add Leads" button
┌──────────────┐
│  Modal Form  │ Opens with form controls
└──────┬───────┘
       │
       ↓ Fills in criteria (multi-select)
┌──────────────┐
│  Form State  │ Updates in React state
└──────┬───────┘
       │
       ↓ Clicks "Send to n8n Workflow"
┌──────────────┐
│   Validation │ Checks data validity
└──────┬───────┘
       │
       ↓ POST JSON to webhook
┌──────────────┐
│   n8n MCP    │ Receives and processes
└──────┬───────┘
       │
       ↓ Calls Apollo/Apify API
┌──────────────┐
│  Apollo API  │ Returns leads data
└──────┬───────┘
       │
       ↓ Processes & stores
┌──────────────┐
│  Database    │ Stores lead records
└──────────────┘
```

## ⌨️ Keyboard Navigation

```
Tab        → Move to next form element
Shift+Tab  → Move to previous form element
Space      → Toggle checkbox/dropdown
Enter      → Submit form
Esc        → Close modal
```

## 🎯 Form Validation Rules

| Field | Rule | Error |
|-------|------|-------|
| Total Results | 1-50,000 | Auto-caps at 50,000 |
| Job Title | Not empty if adding custom | Shows alert |
| Keyword | Not empty if adding custom | Shows alert |
| Email Status | Must select one | Default: verified |

## 🚀 Performance Notes

- Component is lazy-loaded (only on demand)
- Form state in component (not global)
- No API calls until form submit
- Async submit with loading state
- Error handling with user feedback

---

**Visual Guide Version**: 1.0.0
**Last Updated**: January 10, 2026
