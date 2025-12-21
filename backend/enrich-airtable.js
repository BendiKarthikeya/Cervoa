const Airtable = require('airtable');
require('dotenv').config();

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

async function safeUpdate(table, id, fields) {
  try {
    // Try to update all fields at once
    await base(table).update([{ id, fields }]);
    console.log(`  ✓ ${table}:${id} updated ${Object.keys(fields).length} field(s)`);
  } catch (e) {
    // If batch fails, try field-by-field to identify problematic fields
    console.log(`  ℹ Batch update failed for ${table}:${id}, trying field-by-field...`);
    for (const [key, value] of Object.entries(fields)) {
      try {
        await base(table).update([{ id, fields: { [key]: value } }]);
      } catch (fieldErr) {
        // Silently skip unknown fields
      }
    }
  }
}

async function run() {
  console.log('🔧 Enriching Airtable records with additional fields (best-effort)...');

  // Leads
  const leads = await base('Leads').select({ maxRecords: 5 }).all();
  const leadSamples = [
    { Contact: 'John Smith', Email: 'john@techcorp.com', Title: 'CTO', Score: 90, Status: 'New', Value: 45000, Source: 'Apollo' },
    { Contact: 'Sarah Chen', Email: 'sarah@innovatelabs.com', Title: 'VP Engineering', Score: 82, Status: 'Qualified', Value: 38000, Source: 'Clay' },
    { Contact: 'Mike Johnson', Email: 'mike@datastream.co', Title: 'Head of Data', Score: 78, Status: 'New', Value: 25000, Source: 'Apollo' },
    { Contact: 'Emma Davis', Email: 'emma@cloudfirst.com', Title: 'Architect', Score: 71, Status: 'New', Value: 30000, Source: 'Clay' },
    { Contact: 'David Lee', Email: 'david@aisolutions.ai', Title: 'CEO', Score: 88, Status: 'Qualified', Value: 52000, Source: 'Apollo' }
  ];
  for (let i = 0; i < leads.length; i++) {
    await safeUpdate('Leads', leads[i].id, leadSamples[i]);
  }

  // Contacts
  const contacts = await base('Contacts').select({ maxRecords: 5 }).all();
  const contactSamples = [
    { Email: 'john@techcorp.com', Company: 'TechCorp Inc', Title: 'CTO', LinkedIn: 'linkedin.com/in/johnsmith', Status: 'Active' },
    { Email: 'sarah@innovatelabs.com', Company: 'InnovateLabs', Title: 'VP Engineering', LinkedIn: 'linkedin.com/in/sarahchen', Status: 'Active' },
    { Email: 'mike@datastream.co', Company: 'DataStream Co', Title: 'Head of Data', LinkedIn: 'linkedin.com/in/mikejohnson', Status: 'Active' },
    { Email: 'emma@cloudfirst.com', Company: 'CloudFirst Ltd', Title: 'Architect', LinkedIn: 'linkedin.com/in/emmadavis', Status: 'Contacted' },
    { Email: 'david@aisolutions.ai', Company: 'AI Solutions Pro', Title: 'CEO', LinkedIn: 'linkedin.com/in/davidlee', Status: 'Active' }
  ];
  for (let i = 0; i < contacts.length; i++) {
    await safeUpdate('Contacts', contacts[i].id, contactSamples[i]);
  }

  // Meetings
  const meetings = await base('Meetings').select({ maxRecords: 5 }).all();
  const meetingSamples = [
    { 'Contact Name': 'John Smith', Email: 'john@techcorp.com', Date: new Date().toISOString(), Duration: '30 min', Status: 'Scheduled', 'Meeting Type': 'Discovery', Notes: 'Intro call' },
    { 'Contact Name': 'David Lee', Email: 'david@aisolutions.ai', Date: new Date().toISOString(), Duration: '45 min', Status: 'Scheduled', 'Meeting Type': 'Demo', Notes: 'Product demo' },
    { 'Contact Name': 'Sarah Chen', Email: 'sarah@innovatelabs.com', Date: new Date().toISOString(), Duration: '30 min', Status: 'Scheduled', 'Meeting Type': 'Follow-up', Notes: 'Proposal review' },
    { 'Contact Name': 'Mike Johnson', Email: 'mike@datastream.co', Date: new Date().toISOString(), Duration: '60 min', Status: 'Completed', 'Meeting Type': 'Discovery', Notes: 'Exploration' },
    { 'Contact Name': 'Emma Davis', Email: 'emma@cloudfirst.com', Date: new Date().toISOString(), Duration: '30 min', Status: 'Scheduled', 'Meeting Type': 'Introduction', Notes: 'First touch' }
  ];
  for (let i = 0; i < meetings.length; i++) {
    await safeUpdate('Meetings', meetings[i].id, meetingSamples[i]);
  }

  // Proposals
  const proposals = await base('Proposals').select({ maxRecords: 5 }).all();
  const proposalSamples = [
    { Company: 'TechCorp Inc', Value: 45000, Status: 'Sent', 'Date Sent': new Date().toISOString(), Notes: 'Enterprise migration' },
    { Company: 'AI Solutions Pro', Value: 52000, Status: 'Draft', 'Date Sent': new Date().toISOString(), Notes: 'AI integration' },
    { Company: 'InnovateLabs', Value: 38000, Status: 'Sent', 'Date Sent': new Date().toISOString(), Notes: 'Cloud setup' },
    { Company: 'DataStream Co', Value: 25000, Status: 'Under Review', 'Date Sent': new Date().toISOString(), Notes: 'Analytics platform' },
    { Company: 'CloudFirst Ltd', Value: 30000, Status: 'Draft', 'Date Sent': new Date().toISOString(), Notes: 'Multi-cloud' }
  ];
  for (let i = 0; i < proposals.length; i++) {
    await safeUpdate('Proposals', proposals[i].id, proposalSamples[i]);
  }

  // Revenue
  const revenues = await base('Revenue').select({ maxRecords: 5 }).all();
  const revenueSamples = [
    { Company: 'Global Tech Inc', Amount: 15000, Date: new Date().toISOString(), Status: 'Received' },
    { Company: 'Digital Solutions', Amount: 22000, Date: new Date().toISOString(), Status: 'Received' },
    { Company: 'Enterprise Corp', Amount: 28000, Date: new Date().toISOString(), Status: 'Received' },
    { Company: 'Startup Labs', Amount: 35000, Date: new Date().toISOString(), Status: 'Pending' },
    { Company: 'Tech Innovators', Amount: 48000, Date: new Date().toISOString(), Status: 'Pending' }
  ];
  for (let i = 0; i < revenues.length; i++) {
    await safeUpdate('Revenue', revenues[i].id, revenueSamples[i]);
  }

  console.log('✅ Enrichment attempt completed. Some fields may be skipped if not present in your base.');
}

run().catch(e => { console.error(e); process.exit(1); });
