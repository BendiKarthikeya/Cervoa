const path = require('path');
const fs = require('fs');

// Load environment variables from backend/.env
const envPath = path.join(__dirname, 'backend', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim();
    }
  });
}

const Airtable = require('airtable');

const base = new Airtable({ 
  apiKey: process.env.AIRTABLE_API_KEY 
}).base(process.env.AIRTABLE_BASE_ID);

const leadsTable = base('Leads');

// Apollo.io field mapping
const APOLLO_FIELDS_GUIDE = {
  // Personal Information
  'firstName': 'First Name',
  'lastName': 'Last Name',
  'fullName': 'Full Name',
  'email': 'Email',
  'phone': 'Phone',
  'linkedinUrl': 'LinkedIn URL',
  
  // Position Information
  'position': 'Position/Title',
  'seniority': 'Seniority',
  'functional': 'Functional Area',
  
  // Location
  'city': 'City',
  'state': 'State',
  'country': 'Country',
  
  // Organization Information
  'orgName': 'Company',
  'orgWebsite': 'Website',
  'orgLinkedinUrl': 'Company LinkedIn',
  'orgDescription': 'Company Description',
  'orgIndustry': 'Industry',
  'orgSize': 'Employee Count',
  'orgFoundedYear': 'Founded Year',
  'orgCity': 'Company City',
  'orgState': 'Company State',
  'orgCountry': 'Company Country',
  
  // Scoring & Metadata
  'ppeIndex': 'PPE Index',
  'ppeBatchIndex': 'PPE Batch Index',
  
  // Status Fields (existing)
  'Status': 'Status',
  'Score': 'Lead Score',
  'Value': 'Estimated Value',
  'Source': 'Source',
  'Notes': 'Notes'
};

// Sample Apollo lead data structure
const sampleApolloLead = {
  city: "Miami",
  country: "United States",
  email: "aallegue@cosabella.com",
  firstName: "Amelia",
  fullName: "Amelia Allegue",
  functional: "Operations", // or whatever functional area
  lastName: "Allegue",
  linkedinUrl: "http://www.linkedin.com/in/amelia-allegue-319632112",
  orgCity: "Miami",
  orgCountry: "United States",
  orgDescription: "Cosabella is a family owned Italian lingerie company...",
  orgFoundedYear: 1983,
  orgIndustry: ['apparel & fashion'],
  orgLinkedinUrl: ['http://www.linkedin.com/company/641254'],
  orgName: "Cosabella",
  orgSize: 45,
  orgState: "Florida",
  orgWebsite: "http://www.cosabella.com",
  phone: "",
  position: "Executive Assistant to 4 Owners - President, CEO-Creative Director, VP CCO & VP CCX",
  seniority: "entry",
  state: "Florida",
  ppeIndex: 1000,
  ppeBatchIndex: 0
};

console.log('📋 AIRTABLE LEADS TABLE - FIELD CONFIGURATION\n');
console.log('Your Leads table should have these fields:\n');

Object.entries(APOLLO_FIELDS_GUIDE).forEach(([apolloField, airtableField]) => {
  console.log(`✓ ${airtableField} (maps from Apollo: ${apolloField})`);
});

console.log('\n\n📝 FIELD TYPE RECOMMENDATIONS:\n');
console.log('Single Line Text:');
console.log('  - First Name, Last Name, Full Name, Position/Title');
console.log('  - City, State, Country, Company City, Company State, Company Country');
console.log('  - Company, Functional Area, Seniority, Source');
console.log('');
console.log('Email: Email');
console.log('');
console.log('Phone: Phone');
console.log('');
console.log('URL:');
console.log('  - LinkedIn URL, Website, Company LinkedIn');
console.log('');
console.log('Long Text:');
console.log('  - Company Description, Notes');
console.log('');
console.log('Single Select: Status');
console.log('  Options: New, Contacted, Qualified, Meeting Scheduled, Proposal Sent, Won, Lost');
console.log('');
console.log('Number:');
console.log('  - Employee Count, Founded Year, PPE Index, PPE Batch Index, Lead Score');
console.log('');
console.log('Currency: Estimated Value');
console.log('');
console.log('Multiple Select: Industry');
console.log('  (Apollo returns array of industries)');
console.log('');

console.log('\n\n🔧 TO UPDATE YOUR AIRTABLE:\n');
console.log('1. Go to: https://airtable.com/');
console.log('2. Open your base: app2xOYGyhjiBqpiU');
console.log('3. Open the Leads table');
console.log('4. Click "+" to add new fields with the names and types above');
console.log('5. For Status field, add these options:');
console.log('   - New (blue), Contacted (yellow), Qualified (green)');
console.log('   - Meeting Scheduled (purple), Proposal Sent (orange)');
console.log('   - Won (green), Lost (red)');
console.log('');

console.log('\n\n🤖 TESTING LEAD CREATION:\n');

// Function to create a lead from Apollo data
async function createLeadFromApollo(apolloData) {
  try {
    const airtableRecord = {
      'First Name': apolloData.firstName || '',
      'Last Name': apolloData.lastName || '',
      'Full Name': apolloData.fullName || '',
      'Email': apolloData.email || '',
      'Phone': apolloData.phone || '',
      'LinkedIn URL': apolloData.linkedinUrl || '',
      
      'Position/Title': apolloData.position || '',
      'Seniority': apolloData.seniority || '',
      'Functional Area': apolloData.functional || '',
      
      'City': apolloData.city || '',
      'State': apolloData.state || '',
      'Country': apolloData.country || '',
      
      'Company': apolloData.orgName || '',
      'Website': apolloData.orgWebsite || '',
      'Company LinkedIn': Array.isArray(apolloData.orgLinkedinUrl) ? apolloData.orgLinkedinUrl[0] : apolloData.orgLinkedinUrl || '',
      'Company Description': apolloData.orgDescription || '',
      'Industry': Array.isArray(apolloData.orgIndustry) ? apolloData.orgIndustry.join(', ') : apolloData.orgIndustry || '',
      'Employee Count': apolloData.orgSize || 0,
      'Founded Year': apolloData.orgFoundedYear || null,
      'Company City': apolloData.orgCity || '',
      'Company State': apolloData.orgState || '',
      'Company Country': apolloData.orgCountry || '',
      
      'PPE Index': apolloData.ppeIndex || 0,
      'PPE Batch Index': apolloData.ppeBatchIndex || 0,
      
      'Status': 'New',
      'Lead Score': calculateLeadScore(apolloData),
      'Source': 'Apollo.io'
    };

    const record = await leadsTable.create(airtableRecord);
    console.log('✅ Test lead created successfully!');
    console.log('Record ID:', record.getId());
    return record;
  } catch (error) {
    console.error('❌ Error creating lead:', error.message);
    console.error('\nThis likely means some fields are missing in your Airtable.');
    console.error('Please add the fields listed above to your Leads table first.');
    throw error;
  }
}

// Simple lead scoring algorithm
function calculateLeadScore(lead) {
  let score = 50; // Base score
  
  // Company size scoring
  if (lead.orgSize > 100) score += 20;
  else if (lead.orgSize > 50) score += 10;
  else if (lead.orgSize > 10) score += 5;
  
  // Seniority scoring
  if (lead.seniority === 'director' || lead.seniority === 'vp' || lead.seniority === 'c_suite') score += 30;
  else if (lead.seniority === 'manager') score += 15;
  
  // Has LinkedIn
  if (lead.linkedinUrl) score += 10;
  
  // Has phone
  if (lead.phone) score += 10;
  
  return Math.min(score, 100); // Cap at 100
}

// Only run test if --test flag is provided
if (process.argv.includes('--test')) {
  console.log('Creating test lead with sample Apollo data...\n');
  createLeadFromApollo(sampleApolloLead)
    .then(() => {
      console.log('\n✅ Success! Your Airtable is properly configured.');
      console.log('You can now use this structure in your n8n workflows.');
    })
    .catch(() => {
      console.log('\n⚠️  Please configure your Airtable fields first.');
    });
} else {
  console.log('Run with --test flag to create a test lead: node update-leads-table.js --test');
}

// Export for use in n8n workflows
module.exports = {
  createLeadFromApollo,
  calculateLeadScore,
  APOLLO_FIELDS_GUIDE
};
