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

// Sample data
const sampleLeads = [
  {
    Company: 'TechCorp Inc',
    Contact: 'John Smith',
    Email: 'john.smith@techcorp.com',
    Phone: '+1-555-0101',
    Status: 'Qualified',
    Score: 92,
    Source: 'Apollo',
    Industry: 'Technology',
    Value: 45000,
    Notes: 'High potential client, interested in enterprise solution'
  },
  {
    Company: 'InnovateLabs',
    Contact: 'Sarah Chen',
    Email: 'sarah.chen@innovatelabs.com',
    Phone: '+1-555-0102',
    Status: 'Meeting Scheduled',
    Score: 85,
    Source: 'Clay',
    Industry: 'Software',
    Value: 38000,
    Notes: 'Looking for cloud migration solutions'
  },
  {
    Company: 'DataStream Co',
    Contact: 'Mike Johnson',
    Email: 'mike.j@datastream.io',
    Phone: '+1-555-0103',
    Status: 'Nurturing',
    Score: 78,
    Source: 'Apollo',
    Industry: 'Analytics',
    Value: 25000,
    Notes: 'Needs time to evaluate options'
  },
  {
    Company: 'CloudFirst Ltd',
    Contact: 'Emma Davis',
    Email: 'emma@cloudfirst.com',
    Phone: '+1-555-0104',
    Status: 'New',
    Score: 71,
    Source: 'Clay',
    Industry: 'Cloud Services',
    Value: 30000,
    Notes: 'Initial contact made, awaiting response'
  },
  {
    Company: 'AI Solutions Pro',
    Contact: 'David Lee',
    Email: 'david.lee@aisolutions.ai',
    Phone: '+1-555-0105',
    Status: 'Meeting Scheduled',
    Score: 88,
    Source: 'Apollo',
    Industry: 'AI/ML',
    Value: 52000,
    Notes: 'Very interested in AI integration services'
  }
];

const sampleContacts = [
  {
    Name: 'John Smith',
    Email: 'john.smith@techcorp.com',
    Phone: '+1-555-0101',
    Company: 'TechCorp Inc',
    Title: 'CTO',
    LinkedIn: 'linkedin.com/in/johnsmith',
    Status: 'Active'
  },
  {
    Name: 'Sarah Chen',
    Email: 'sarah.chen@innovatelabs.com',
    Phone: '+1-555-0102',
    Company: 'InnovateLabs',
    Title: 'VP Engineering',
    LinkedIn: 'linkedin.com/in/sarahchen',
    Status: 'Active'
  },
  {
    Name: 'Mike Johnson',
    Email: 'mike.j@datastream.io',
    Phone: '+1-555-0103',
    Company: 'DataStream Co',
    Title: 'Head of Data',
    LinkedIn: 'linkedin.com/in/mikejohnson',
    Status: 'Active'
  },
  {
    Name: 'Emma Davis',
    Email: 'emma@cloudfirst.com',
    Phone: '+1-555-0104',
    Company: 'CloudFirst Ltd',
    Title: 'Cloud Architect',
    LinkedIn: 'linkedin.com/in/emmadavis',
    Status: 'Contacted'
  },
  {
    Name: 'David Lee',
    Email: 'david.lee@aisolutions.ai',
    Phone: '+1-555-0105',
    Company: 'AI Solutions Pro',
    Title: 'CEO',
    LinkedIn: 'linkedin.com/in/davidlee',
    Status: 'Active'
  }
];

const sampleMeetings = [
  {
    Company: 'TechCorp Inc',
    Contact: 'John Smith',
    Date: new Date('2025-01-15T14:00:00').toISOString(),
    Duration: 30,
    Type: 'Discovery Call',
    Status: 'Scheduled',
    MeetingLink: 'https://zoom.us/j/123456789',
    Notes: 'Initial discovery to understand requirements'
  },
  {
    Company: 'AI Solutions Pro',
    Contact: 'David Lee',
    Date: new Date('2025-01-16T10:00:00').toISOString(),
    Duration: 45,
    Type: 'Demo',
    Status: 'Scheduled',
    MeetingLink: 'https://meet.google.com/xyz-abcd-efg',
    Notes: 'Product demo and technical discussion'
  },
  {
    Company: 'InnovateLabs',
    Contact: 'Sarah Chen',
    Date: new Date('2025-01-17T15:30:00').toISOString(),
    Duration: 30,
    Type: 'Follow-up',
    Status: 'Scheduled',
    MeetingLink: 'https://zoom.us/j/987654321',
    Notes: 'Follow up on proposal sent last week'
  },
  {
    Company: 'DataStream Co',
    Contact: 'Mike Johnson',
    Date: new Date('2025-01-10T11:00:00').toISOString(),
    Duration: 60,
    Type: 'Discovery Call',
    Status: 'Completed',
    MeetingLink: 'https://meet.google.com/abc-defg-hij',
    Notes: 'Discussed data migration needs'
  },
  {
    Company: 'CloudFirst Ltd',
    Contact: 'Emma Davis',
    Date: new Date('2025-01-18T13:00:00').toISOString(),
    Duration: 30,
    Type: 'Introduction',
    Status: 'Scheduled',
    MeetingLink: 'https://zoom.us/j/456789123',
    Notes: 'First meeting to introduce services'
  }
];

const sampleProposals = [
  {
    Company: 'TechCorp Inc',
    Title: 'Enterprise Cloud Migration',
    Value: 45000,
    Status: 'Sent',
    SentDate: new Date('2025-01-12').toISOString(),
    ValidUntil: new Date('2025-02-12').toISOString(),
    Notes: 'Comprehensive cloud migration proposal',
    Probability: 75
  },
  {
    Company: 'AI Solutions Pro',
    Title: 'AI Integration Services',
    Value: 52000,
    Status: 'Draft',
    SentDate: new Date('2025-01-14').toISOString(),
    ValidUntil: new Date('2025-02-14').toISOString(),
    Notes: 'Custom AI model integration',
    Probability: 60
  },
  {
    Company: 'InnovateLabs',
    Title: 'Cloud Infrastructure Setup',
    Value: 38000,
    Status: 'Sent',
    SentDate: new Date('2025-01-10').toISOString(),
    ValidUntil: new Date('2025-02-10').toISOString(),
    Notes: 'Full cloud infrastructure deployment',
    Probability: 70
  },
  {
    Company: 'DataStream Co',
    Title: 'Data Analytics Platform',
    Value: 25000,
    Status: 'Under Review',
    SentDate: new Date('2025-01-08').toISOString(),
    ValidUntil: new Date('2025-02-08').toISOString(),
    Notes: 'Analytics dashboard and reporting tools',
    Probability: 50
  },
  {
    Company: 'CloudFirst Ltd',
    Title: 'Multi-Cloud Strategy',
    Value: 30000,
    Status: 'Draft',
    SentDate: new Date('2025-01-15').toISOString(),
    ValidUntil: new Date('2025-02-15').toISOString(),
    Notes: 'Multi-cloud architecture consulting',
    Probability: 45
  }
];

const sampleRevenue = [
  {
    Company: 'Global Tech Inc',
    Amount: 15000,
    Date: new Date('2025-01-05').toISOString(),
    Type: 'New Business',
    Status: 'Received',
    Invoice: 'INV-2025-001',
    PaymentMethod: 'Bank Transfer'
  },
  {
    Company: 'Digital Solutions',
    Amount: 22000,
    Date: new Date('2025-02-08').toISOString(),
    Type: 'Renewal',
    Status: 'Received',
    Invoice: 'INV-2025-002',
    PaymentMethod: 'Credit Card'
  },
  {
    Company: 'Enterprise Corp',
    Amount: 28000,
    Date: new Date('2025-03-12').toISOString(),
    Type: 'New Business',
    Status: 'Received',
    Invoice: 'INV-2025-003',
    PaymentMethod: 'Bank Transfer'
  },
  {
    Company: 'Startup Labs',
    Amount: 35000,
    Date: new Date('2025-04-15').toISOString(),
    Type: 'Upsell',
    Status: 'Pending',
    Invoice: 'INV-2025-004',
    PaymentMethod: 'Wire Transfer'
  },
  {
    Company: 'Tech Innovators',
    Amount: 48000,
    Date: new Date('2025-05-20').toISOString(),
    Type: 'New Business',
    Status: 'Pending',
    Invoice: 'INV-2025-005',
    PaymentMethod: 'Credit Card'
  }
];

async function populateTable(tableName, data) {
  console.log(`\n📝 Populating ${tableName} table...`);
  
  try {
    // First, check if table already has data
    const existingRecords = await tables[tableName].select({ maxRecords: 1 }).firstPage();
    
    if (existingRecords.length > 0) {
      console.log(`⚠️  ${tableName} table already has data. Skipping...`);
      return;
    }

    // Insert records in batches of 10 (Airtable API limit)
    const batchSize = 10;
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      const records = batch.map(fields => ({ fields }));
      
      await tables[tableName].create(records);
      console.log(`✅ Created ${records.length} records in ${tableName}`);
    }
    
  } catch (error) {
    console.error(`❌ Error populating ${tableName}:`, error.message);
    if (error.statusCode === 422) {
      console.error('Field validation error. Please check that all field names match your Airtable base.');
    }
  }
}

async function populateAllTables() {
  console.log('🚀 Starting to populate Airtable with sample data...\n');
  console.log(`Base ID: ${process.env.AIRTABLE_BASE_ID}`);
  
  try {
    await populateTable('leads', sampleLeads);
    await populateTable('contacts', sampleContacts);
    await populateTable('meetings', sampleMeetings);
    await populateTable('proposals', sampleProposals);
    await populateTable('revenue', sampleRevenue);
    
    console.log('\n✨ All tables populated successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Leads: ${sampleLeads.length} records`);
    console.log(`   - Contacts: ${sampleContacts.length} records`);
    console.log(`   - Meetings: ${sampleMeetings.length} records`);
    console.log(`   - Proposals: ${sampleProposals.length} records`);
    console.log(`   - Revenue: ${sampleRevenue.length} records`);
    
  } catch (error) {
    console.error('\n💥 Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the population script
populateAllTables()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
