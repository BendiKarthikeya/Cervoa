const Airtable = require('airtable');

const base = new Airtable({ 
  apiKey: process.env.AIRTABLE_API_KEY 
}).base(process.env.AIRTABLE_BASE_ID);

// Table references
const tables = {
  leads: base('Leads'),
  contacts: base('Contacts'),
  meetings: base('Meetings'),
  proposals: base('Proposals'),
  revenue: base('Revenue')
};

module.exports = { base, tables };
