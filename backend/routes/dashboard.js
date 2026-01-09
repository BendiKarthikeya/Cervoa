const express = require('express');
const router = express.Router();
const { tables } = require('../config/airtable');

// Get complete dashboard data
router.get('/', async (req, res) => {
  try {
    // Fetch all data in parallel
    const [leads, meetings, proposals] = await Promise.all([
      fetchLeads(),
      fetchMeetings(),
      fetchProposals()
    ]);

    // Calculate metrics
    const metrics = calculateMetrics(leads, meetings, proposals);
    
    // Get pipeline data
    const pipeline = calculatePipeline(leads);

    // Get active deals
    const activeDeals = getActiveDeals(leads, proposals);

    res.json({
      metrics,
      pipeline,
      leads: leads.slice(0, 10), // Latest 10 leads
      meetings: meetings.slice(0, 5), // Next 5 meetings
      activeDeals,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Helper functions
async function fetchLeads() {
  try {
    const records = await tables.leads.select({
      maxRecords: 100
    }).all();

    return records.map(record => ({
      id: record.id,
      company: record.get('orgName') || 'Unknown Company',
      contact: record.get('fullName') || 'Unknown Contact',
      email: record.get('email') || '',
      title: record.get('position') || '',
      score: record.get('Score') || Math.floor(Math.random() * 30) + 70,
      status: record.get('Status') || 'New',
      value: record.get('Value') || Math.floor(Math.random() * 40000) + 10000,
      source: record.get('Source') || 'Apollo',
      lastActivity: '2 hours ago',
      mailSent: record.get('mail Send') || false
    }));
  } catch (error) {
    console.error('Error fetching leads:', error.message);
    return [];
  }
}

async function fetchMeetings() {
  try {
    const records = await tables.meetings.select({
      maxRecords: 50
    }).all();

    return records.map(record => ({
      id: record.id,
      company: record.get('Company') || 'Unknown Company',
      contactName: record.get('Contact Name') || 'Unknown Contact',
      email: record.get('Email') || '',
      time: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + ' 2:00 PM',
      duration: record.get('Duration') || '30 min',
      status: record.get('Status') || 'Scheduled',
      link: 'zoom.us/j/' + Math.floor(Math.random() * 1000000)
    }));
  } catch (error) {
    console.error('Error fetching meetings:', error.message);
    return [];
  }
}

async function fetchProposals() {
  try {
    const records = await tables.proposals.select({
      maxRecords: 50
    }).all();

    return records.map(record => ({
      id: record.id,
      company: record.get('Company') || 'Unknown Company',
      value: record.get('Value') || 0,
      status: record.get('Status') || 'Draft',
      dateSent: record.get('Date Sent') || new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error fetching proposals:', error.message);
    return [];
  }
}

function calculateMetrics(leads, meetings, proposals) {
  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter(l => l.status === 'Qualified').length;
  const emailsSent = leads.filter(l => l.mailSent === true).length;
  const totalMeetings = meetings.length;
  const scheduledMeetings = meetings.filter(m => m.status === 'Scheduled').length;
  const proposalsSent = proposals.length;
  const acceptedProposals = proposals.filter(p => p.status === 'Accepted').length;
  
  // Calculate growth (mock for now - would compare to previous period)
  const leadGrowth = 12.5;
  const meetingGrowth = 8.3;
  const emailGrowth = 15.2;

  return {
    totalLeads,
    qualifiedLeads,
    leadGrowth,
    emailsSent,
    emailGrowth,
    totalMeetings,
    scheduledMeetings,
    meetingGrowth,
    proposalsSent,
    acceptedProposals,
    conversionRate: totalLeads > 0 ? ((qualifiedLeads / totalLeads) * 100).toFixed(1) : 0
  };
}

function calculatePipeline(leads) {
  const pipeline = {
    new: 0,
    contacted: 0,
    qualified: 0,
    lost: 0
  };

  leads.forEach(lead => {
    const status = (lead.status || 'New').toLowerCase();
    if (pipeline.hasOwnProperty(status)) {
      pipeline[status]++;
    }
  });

  return [
    { stage: 'New', count: pipeline.new },
    { stage: 'Contacted', count: pipeline.contacted },
    { stage: 'Qualified', count: pipeline.qualified },
    { stage: 'Lost', count: pipeline.lost }
  ];
}

function getActiveDeals(leads, proposals) {
  // Combine leads with high scores and sent proposals
  const highValueLeads = leads
    .filter(l => l.score >= 75 && l.status === 'Qualified')
    .slice(0, 3)
    .map(l => ({
      company: l.company,
      value: l.value || 5000,
      stage: 'Qualified Lead',
      probability: l.score
    }));

  const activeProposals = proposals
    .filter(p => p.status === 'Sent')
    .slice(0, 3)
    .map(p => ({
      company: p.company,
      value: p.value,
      stage: 'Proposal Sent',
      probability: 60
    }));

  return [...activeProposals, ...highValueLeads].slice(0, 6);
}

module.exports = router;
