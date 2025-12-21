const https = require('https');

const APOLLO_API_KEY = 'VPJmhxyMOGxtXorNQnhOWQ';

console.log('🔍 Testing Apollo API Connection...\n');

const requestData = JSON.stringify({
  page: 1,
  per_page: 5,
  person_titles: ['CEO', 'CTO', 'Founder'],
  organization_num_employees_ranges: ['11-50', '51-200'],
  person_seniorities: ['c_level', 'owner']
});

const options = {
  hostname: 'api.apollo.io',
  path: '/v1/mixed_people/search',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'X-Api-Key': APOLLO_API_KEY,
    'Content-Length': Buffer.byteLength(requestData)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 200) {
      const response = JSON.parse(data);
      console.log('✅ Apollo API connection successful!\n');
      console.log(`📊 Results:`);
      console.log(`   - Total people found: ${response.pagination?.total_entries || 0}`);
      console.log(`   - Retrieved: ${response.people?.length || 0} leads\n`);
      
      if (response.people && response.people.length > 0) {
        console.log('📋 Sample leads:');
        response.people.slice(0, 3).forEach((person, i) => {
          console.log(`\n   ${i + 1}. ${person.name || 'N/A'}`);
          console.log(`      Company: ${person.organization?.name || 'N/A'}`);
          console.log(`      Title: ${person.title || 'N/A'}`);
          console.log(`      Email: ${person.email || 'N/A'}`);
          console.log(`      LinkedIn: ${person.linkedin_url || 'N/A'}`);
        });
      }
      
      console.log('\n\n🎉 Your Apollo API key is working perfectly!');
      console.log('✅ Ready to import workflows to n8n\n');
      
    } else {
      console.error(`❌ API Error (${res.statusCode}):`, data);
      try {
        const error = JSON.parse(data);
        console.error('Error details:', error);
      } catch (e) {
        console.error('Raw error:', data);
      }
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Connection error:', error.message);
});

req.write(requestData);
req.end();
