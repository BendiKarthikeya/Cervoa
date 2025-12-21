const express = require('express');
const router = express.Router();
const { tables } = require('../config/airtable');

// Get all meetings
router.get('/', async (req, res) => {
  try {
    const { status, limit = 50 } = req.query;
    
    let filterFormula = '';
    if (status) {
      filterFormula = `{Status} = "${status}"`;
    }

    const records = await tables.meetings.select({
      maxRecords: parseInt(limit),
      ...(filterFormula && { filterByFormula: filterFormula })
    }).all();

    const meetings = records.map(record => ({
      id: record.id,
      company: record.get('Company') || 'Unknown Company',
      contactName: record.get('Contact Name') || 'Unknown Contact',
      email: record.get('Email') || '',
      date: record.get('Date') || new Date().toISOString(),
      duration: record.get('Duration') || '30 min',
      meetingType: record.get('Meeting Type') || 'Discovery',
      status: record.get('Status') || 'Scheduled',
      notes: record.get('Notes') || ''
    }));

    res.json({ meetings, count: meetings.length });
  } catch (error) {
    console.error('Meetings error:', error);
    res.status(500).json({ error: 'Failed to fetch meetings' });
  }
});

// Get upcoming meetings
router.get('/upcoming', async (req, res) => {
  try {
    const now = new Date().toISOString();
    
    const records = await tables.meetings.select({
      maxRecords: 20,
      filterByFormula: `AND({Date} >= "${now}", {Status} = "Scheduled")`,
      sort: [{ field: 'Date', direction: 'asc' }]
    }).all();

    const meetings = records.map(record => ({
      id: record.id,
      company: record.get('Company'),
      contactName: record.get('Contact Name'),
      email: record.get('Email'),
      date: record.get('Date'),
      duration: record.get('Duration'),
      meetingType: record.get('Meeting Type')
    }));

    res.json({ meetings, count: meetings.length });
  } catch (error) {
    console.error('Upcoming meetings error:', error);
    res.status(500).json({ error: 'Failed to fetch upcoming meetings' });
  }
});

module.exports = router;
