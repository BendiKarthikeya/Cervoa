require('dotenv').config();
const Airtable = require('airtable');

console.log('Testing Airtable connection...');
console.log('API Key:', process.env.AIRTABLE_API_KEY ? '✓ Found' : '✗ Missing');
console.log('Base ID:', process.env.AIRTABLE_BASE_ID ? '✓ Found' : '✗ Missing');

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

// Test Leads table
console.log('\nTesting Leads table...');
base('Leads').select({
  maxRecords: 3
}).firstPage()
  .then(records => {
    console.log('✓ Leads table - Found', records.length, 'records');
    if (records.length > 0) {
      console.log('Sample record fields:', Object.keys(records[0].fields));
    }
  })
  .catch(err => {
    console.error('✗ Leads table error:', err.message);
  });

// Test other tables
setTimeout(() => {
  Promise.all([
    base('Contacts').select({maxRecords: 1}).firstPage().then(() => '✓ Contacts').catch(e => '✗ Contacts: ' + e.message),
    base('Meetings').select({maxRecords: 1}).firstPage().then(() => '✓ Meetings').catch(e => '✗ Meetings: ' + e.message),
    base('Proposals').select({maxRecords: 1}).firstPage().then(() => '✓ Proposals').catch(e => '✗ Proposals: ' + e.message),
    base('Revenue').select({maxRecords: 1}).firstPage().then(() => '✓ Revenue').catch(e => '✗ Revenue: ' + e.message),
  ]).then(results => {
    console.log('\nTable status:');
    results.forEach(r => console.log(r));
    process.exit(0);
  });
}, 1000);
