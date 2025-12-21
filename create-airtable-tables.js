const https = require('https');

const AIRTABLE_TOKEN = 'YOUR_AIRTABLE_TOKEN_HERE';

// You need to get this from creating a base first
// Go to airtable.com/create, create "Cervoa Demo", then get the base ID from URL
const BASE_ID = process.argv[2] || 'YOUR_BASE_ID_HERE';

if (BASE_ID === 'YOUR_BASE_ID_HERE') {
  console.error('\n❌ ERROR: You need to provide your Airtable Base ID');
  console.error('\nSteps:');
  console.error('1. Go to: https://airtable.com/create');
  console.error('2. Create a new base called "Cervoa Demo"');
  console.error('3. Copy the Base ID from the URL (format: appXXXXXXXXXX)');
  console.error('4. Run: node create-airtable-tables.js appXXXXXXXXXX\n');
  process.exit(1);
}

const tables = [
  {
    name: 'Leads',
    description: 'Lead discovery and tracking from Apollo',
    fields: [
      { name: 'Company', type: 'singleLineText' },
      { name: 'Contact', type: 'singleLineText' },
      { name: 'Email', type: 'email' },
      { name: 'Phone', type: 'phoneNumber' },
      { name: 'Title', type: 'singleLineText' },
      { name: 'Score', type: 'number', options: { precision: 0 } },
      { name: 'Status', type: 'singleSelect', options: { 
        choices: [
          { name: 'New', color: 'blueLight2' },
          { name: 'Contacted', color: 'yellowLight2' },
          { name: 'Qualified', color: 'greenLight2' },
          { name: 'Lost', color: 'redLight2' }
        ]
      }},
      { name: 'Source', type: 'singleLineText' },
      { name: 'Value', type: 'currency', options: { precision: 2, symbol: '$' } },
      { name: 'LinkedIn', type: 'url' },
      { name: 'Website', type: 'url' },
      { name: 'Industry', type: 'singleLineText' },
      { name: 'Employee Count', type: 'number', options: { precision: 0 } },
      { name: 'Notes', type: 'multilineText' }
    ]
  },
  {
    name: 'Contacts',
    description: 'Email contacts for nurturing campaigns',
    fields: [
      { name: 'Email', type: 'email' },
      { name: 'Name', type: 'singleLineText' },
      { name: 'Company', type: 'singleLineText' },
      { name: 'List', type: 'singleLineText' },
      { name: 'Status', type: 'singleSelect', options: {
        choices: [
          { name: 'Active', color: 'greenLight2' },
          { name: 'Unsubscribed', color: 'redLight2' },
          { name: 'Bounced', color: 'grayLight2' }
        ]
      }}
    ]
  },
  {
    name: 'Meetings',
    description: 'Scheduled meetings from Calendly',
    fields: [
      { name: 'Company', type: 'singleLineText' },
      { name: 'Contact Name', type: 'singleLineText' },
      { name: 'Email', type: 'email' },
      { name: 'Date', type: 'dateTime', options: { 
        dateFormat: { name: 'us' }, 
        timeFormat: { name: '12hour' },
        timeZone: 'client'
      }},
      { name: 'Duration', type: 'number', options: { precision: 0 } },
      { name: 'Meeting Type', type: 'singleLineText' },
      { name: 'Notes', type: 'multilineText' },
      { name: 'Status', type: 'singleSelect', options: {
        choices: [
          { name: 'Scheduled', color: 'blueLight2' },
          { name: 'Completed', color: 'greenLight2' },
          { name: 'Cancelled', color: 'redLight2' },
          { name: 'No Show', color: 'grayLight2' }
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
          { name: 'Draft', color: 'grayLight2' },
          { name: 'Sent', color: 'blueLight2' },
          { name: 'Accepted', color: 'greenLight2' },
          { name: 'Rejected', color: 'redLight2' }
        ]
      }},
      { name: 'Proposal Link', type: 'url' },
      { name: 'Notes', type: 'multilineText' }
    ]
  },
  {
    name: 'Revenue',
    description: 'Payment tracking from Stripe',
    fields: [
      { name: 'Company', type: 'singleLineText' },
      { name: 'Amount', type: 'currency', options: { precision: 2, symbol: '$' } },
      { name: 'Date', type: 'date', options: { dateFormat: { name: 'us' } } },
      { name: 'Status', type: 'singleSelect', options: {
        choices: [
          { name: 'Pending', color: 'yellowLight2' },
          { name: 'Completed', color: 'greenLight2' },
          { name: 'Refunded', color: 'redLight2' },
          { name: 'Failed', color: 'grayLight2' }
        ]
      }},
      { name: 'Payment Method', type: 'singleLineText' },
      { name: 'Transaction ID', type: 'singleLineText' },
      { name: 'Invoice URL', type: 'url' }
    ]
  }
];

function makeRequest(method, path, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.airtable.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function createTable(baseId, tableConfig) {
  console.log(`\n📋 Creating table: ${tableConfig.name}...`);
  
  try {
    const result = await makeRequest('POST', `/v0/meta/bases/${baseId}/tables`, {
      name: tableConfig.name,
      description: tableConfig.description,
      fields: tableConfig.fields
    });
    
    console.log(`✅ Successfully created: ${tableConfig.name} (${tableConfig.fields.length} fields)`);
    return result;
  } catch (error) {
    console.error(`❌ Error creating ${tableConfig.name}:`, error.message);
    throw error;
  }
}

async function setupAllTables() {
  console.log('\n🚀 Starting Airtable Setup...');
  console.log(`📦 Base ID: ${BASE_ID}`);
  console.log(`🔑 Token: ${AIRTABLE_TOKEN.substring(0, 20)}...`);
  console.log(`📊 Tables to create: ${tables.length}\n`);
  
  const results = [];
  
  for (const table of tables) {
    try {
      const result = await createTable(BASE_ID, table);
      results.push({ success: true, table: table.name, id: result.id });
      // Wait a bit between requests to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      results.push({ success: false, table: table.name, error: error.message });
    }
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('📊 SETUP SUMMARY');
  console.log('='.repeat(80));
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`\n✅ Successfully created: ${successful.length}/${tables.length} tables`);
  successful.forEach(r => console.log(`   - ${r.table} (${r.id})`));
  
  if (failed.length > 0) {
    console.log(`\n❌ Failed to create: ${failed.length} tables`);
    failed.forEach(r => console.log(`   - ${r.table}: ${r.error}`));
  }
  
  console.log('\n🎉 Setup complete!');
  console.log(`\n📝 Save this Base ID: ${BASE_ID}`);
  console.log('   Add it to API_KEYS_PRIVATE.txt\n');
  
  console.log('🔗 View your base at:');
  console.log(`   https://airtable.com/${BASE_ID}\n`);
}

setupAllTables().catch(error => {
  console.error('\n❌ Fatal error:', error.message);
  process.exit(1);
});
