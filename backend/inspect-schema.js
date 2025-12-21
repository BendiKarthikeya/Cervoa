const Airtable = require('airtable');
require('dotenv').config();

const base = new Airtable({ 
  apiKey: process.env.AIRTABLE_API_KEY 
}).base(process.env.AIRTABLE_BASE_ID);

async function inspectTables() {
  const tables = ['Leads', 'Contacts', 'Meetings', 'Proposals', 'Revenue'];
  
  console.log('🔍 Inspecting Airtable Schema...\n');
  
  for (const tableName of tables) {
    console.log(`\n=== ${tableName} Table ===`);
    try {
      const records = await base(tableName).select({ maxRecords: 1 }).firstPage();
      if (records.length > 0) {
        console.log('✅ Fields found:', Object.keys(records[0].fields));
        console.log('Sample data:', records[0].fields);
      } else {
        console.log('⚠️  Table is empty - cannot inspect fields');
        
        // Try to get table schema from Airtable metadata API
        console.log('Attempting to create a minimal test record...');
        try {
          await base(tableName).create([{ fields: { Name: 'Test' } }]);
          console.log('✅ Created test record');
          
          // Delete it
          const testRecords = await base(tableName).select({ maxRecords: 1 }).firstPage();
          if (testRecords.length > 0) {
            await base(tableName).destroy([testRecords[0].id]);
            console.log('🗑️  Deleted test record');
          }
        } catch (err) {
          console.log('❌ Could not create test record:', err.message);
        }
      }
    } catch (error) {
      console.log('❌ Error accessing table:', error.message);
    }
  }
}

inspectTables()
  .then(() => {
    console.log('\n✅ Inspection complete!');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
