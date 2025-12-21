const Airtable = require('airtable');
require('dotenv').config();

const base = new Airtable({ 
  apiKey: process.env.AIRTABLE_API_KEY 
}).base(process.env.AIRTABLE_BASE_ID);

const tables = {
  leads: base('Leads'),
  contacts: base('Contacts'),
  meetings: base('Meetings'),
  proposals: base('Proposals'),
  revenue: base('Revenue')
};

// Simple data with common field names
const sampleData = {
  contacts: [
    { Name: 'John Smith' },
    { Name: 'Sarah Chen' },
    { Name: 'Mike Johnson' },
    { Name: 'Emma Davis' },
    { Name: 'David Lee' }
  ],
  leads: [
    { Company: 'TechCorp Inc' },
    { Company: 'InnovateLabs' },
    { Company: 'DataStream Co' },
    { Company: 'CloudFirst Ltd' },
    { Company: 'AI Solutions Pro' }
  ],
  meetings: [
    { Company: 'TechCorp Inc' },
    { Company: 'AI Solutions Pro' },
    { Company: 'InnovateLabs' },
    { Company: 'DataStream Co' },
    { Company: 'CloudFirst Ltd' }
  ],
  proposals: [
    { Company: 'TechCorp Inc' },
    { Company: 'AI Solutions Pro' },
    { Company: 'InnovateLabs' },
    { Company: 'DataStream Co' },
    { Company: 'CloudFirst Ltd' }
  ],
  revenue: [
    { Company: 'Global Tech Inc' },
    { Company: 'Digital Solutions' },
    { Company: 'Enterprise Corp' },
    { Company: 'Startup Labs' },
    { Company: 'Tech Innovators' }
  ]
};

async function createRecords(tableName, data) {
  console.log(`\n📝 Creating records in ${tableName}...`);
  
  try {
    const records = data.map(fields => ({ fields }));
    const created = await tables[tableName].create(records);
    console.log(`✅ Successfully created ${created.length} records in ${tableName}`);
    
    // Show what fields were created
    if (created.length > 0) {
      console.log(`   Fields: ${Object.keys(created[0].fields).join(', ')}`);
    }
    
    return created;
  } catch (error) {
    console.error(`❌ Error creating records in ${tableName}:`, error.message);
    if (error.statusCode === 422 && error.error) {
      console.error(`   Details: ${JSON.stringify(error.error, null, 2)}`);
    }
    return [];
  }
}

async function populateAll() {
  console.log('🚀 Populating Airtable with minimal sample data...\n');
  console.log(`Base ID: ${process.env.AIRTABLE_BASE_ID}\n`);
  
  const results = {};
  
  for (const [tableName, data] of Object.entries(sampleData)) {
    results[tableName] = await createRecords(tableName, data);
    await new Promise(resolve => setTimeout(resolve, 500)); // Rate limiting
  }
  
  console.log('\n✨ Population complete!');
  console.log('\n📊 Summary:');
  for (const [tableName, records] of Object.entries(results)) {
    console.log(`   - ${tableName}: ${records.length} records created`);
  }
}

populateAll()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
