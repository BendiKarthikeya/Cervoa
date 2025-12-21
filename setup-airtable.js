const AIRTABLE_TOKEN = 'YOUR_AIRTABLE_TOKEN_HERE';

// Step 1: Create a base first (you need to do this manually at airtable.com)
// Then get the base ID from the URL and update below
const BASE_ID = 'YOUR_BASE_ID_HERE'; // Get this after creating base

async function setupAirtableTables() {
  console.log('Setting up Airtable tables...\n');

  // Table schemas
  const tables = [
    {
      name: 'Leads',
      description: 'Lead discovery and tracking',
      fields: [
        { name: 'Company', type: 'singleLineText' },
        { name: 'Contact', type: 'singleLineText' },
        { name: 'Email', type: 'email' },
        { name: 'Phone', type: 'phoneNumber' },
        { name: 'Title', type: 'singleLineText' },
        { name: 'Score', type: 'number', options: { precision: 0 } },
        { name: 'Status', type: 'singleSelect', options: { 
          choices: [
            { name: 'New' },
            { name: 'Contacted' },
            { name: 'Qualified' },
            { name: 'Lost' }
          ]
        }},
        { name: 'Source', type: 'singleLineText' },
        { name: 'Value', type: 'currency', options: { precision: 2, symbol: '$' } },
        { name: 'LinkedIn', type: 'url' },
        { name: 'Website', type: 'url' },
        { name: 'Industry', type: 'singleLineText' },
        { name: 'Employee Count', type: 'number' },
        { name: 'Notes', type: 'multilineText' }
      ]
    },
    {
      name: 'Contacts',
      description: 'Email contacts for nurturing',
      fields: [
        { name: 'Email', type: 'email' },
        { name: 'Name', type: 'singleLineText' },
        { name: 'Company', type: 'singleLineText' },
        { name: 'List', type: 'singleLineText' },
        { name: 'Status', type: 'singleSelect', options: {
          choices: [
            { name: 'Active' },
            { name: 'Unsubscribed' },
            { name: 'Bounced' }
          ]
        }}
      ]
    },
    {
      name: 'Meetings',
      description: 'Scheduled meetings',
      fields: [
        { name: 'Company', type: 'singleLineText' },
        { name: 'Contact Name', type: 'singleLineText' },
        { name: 'Email', type: 'email' },
        { name: 'Date', type: 'dateTime', options: { dateFormat: { name: 'us' }, timeFormat: { name: '12hour' } } },
        { name: 'Duration', type: 'number', options: { precision: 0 } },
        { name: 'Meeting Type', type: 'singleLineText' },
        { name: 'Notes', type: 'multilineText' },
        { name: 'Status', type: 'singleSelect', options: {
          choices: [
            { name: 'Scheduled' },
            { name: 'Completed' },
            { name: 'Cancelled' },
            { name: 'No Show' }
          ]
        }}
      ]
    },
    {
      name: 'Proposals',
      description: 'Generated proposals',
      fields: [
        { name: 'Company', type: 'singleLineText' },
        { name: 'Contact', type: 'singleLineText' },
        { name: 'Date Sent', type: 'date', options: { dateFormat: { name: 'us' } } },
        { name: 'Value', type: 'currency', options: { precision: 2, symbol: '$' } },
        { name: 'Status', type: 'singleSelect', options: {
          choices: [
            { name: 'Draft' },
            { name: 'Sent' },
            { name: 'Accepted' },
            { name: 'Rejected' }
          ]
        }},
        { name: 'Proposal Link', type: 'url' },
        { name: 'Notes', type: 'multilineText' }
      ]
    },
    {
      name: 'Revenue',
      description: 'Payment tracking',
      fields: [
        { name: 'Company', type: 'singleLineText' },
        { name: 'Amount', type: 'currency', options: { precision: 2, symbol: '$' } },
        { name: 'Date', type: 'date', options: { dateFormat: { name: 'us' } } },
        { name: 'Status', type: 'singleSelect', options: {
          choices: [
            { name: 'Pending' },
            { name: 'Completed' },
            { name: 'Refunded' },
            { name: 'Failed' }
          ]
        }},
        { name: 'Payment Method', type: 'singleLineText' },
        { name: 'Transaction ID', type: 'singleLineText' },
        { name: 'Invoice URL', type: 'url' }
      ]
    }
  ];

  console.log('📋 Tables to create:');
  tables.forEach(table => {
    console.log(`  - ${table.name} (${table.fields.length} fields)`);
  });

  console.log('\n⚠️  IMPORTANT: You need to create these tables manually in Airtable.');
  console.log('    1. Go to https://airtable.com/create');
  console.log('    2. Create a new base called "Cervoa Demo"');
  console.log('    3. Use the table structure shown above');
  console.log('\n    OR use Airtable API to create them programmatically.');
  
  return tables;
}

// Instructions for manual setup
function printManualSetupInstructions() {
  console.log('\n' + '='.repeat(80));
  console.log('AIRTABLE MANUAL SETUP INSTRUCTIONS');
  console.log('='.repeat(80));
  console.log('\n1. Go to: https://airtable.com/create');
  console.log('2. Create a new base called: "Cervoa Demo"');
  console.log('3. Create 5 tables with these structures:\n');

  const tables = [
    {
      name: 'Leads',
      fields: 'Company, Contact, Email, Phone, Title, Score, Status, Source, Value, LinkedIn, Website, Industry, Employee Count, Notes'
    },
    {
      name: 'Contacts', 
      fields: 'Email, Name, Company, List, Status'
    },
    {
      name: 'Meetings',
      fields: 'Company, Contact Name, Email, Date, Duration, Meeting Type, Notes, Status'
    },
    {
      name: 'Proposals',
      fields: 'Company, Contact, Date Sent, Value, Status, Proposal Link, Notes'
    },
    {
      name: 'Revenue',
      fields: 'Company, Amount, Date, Status, Payment Method, Transaction ID, Invoice URL'
    }
  ];

  tables.forEach((table, i) => {
    console.log(`${i + 1}. ${table.name}`);
    console.log(`   Fields: ${table.fields}\n`);
  });

  console.log('4. After creating, get your Base ID from the URL');
  console.log('   URL format: https://airtable.com/appXXXXXXXXXX/...');
  console.log('   Your Base ID is: appXXXXXXXXXX\n');
}

setupAirtableTables().then(() => {
  printManualSetupInstructions();
});
