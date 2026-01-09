const express = require('express');
const router = express.Router();
const { tables } = require('../config/airtable');

// Get all leads
router.get('/', async (req, res) => {
  try {
    const { status, limit = 50 } = req.query;
    
    let filterFormula = '';
    if (status) {
      filterFormula = `{Status} = "${status}"`;
    }

    const records = await tables.leads.select({
      maxRecords: parseInt(limit),
      ...(filterFormula && { filterByFormula: filterFormula })
    }).all();

    const leads = records.map(record => ({
      id: record.id,
      company: record.get('orgName') || 'Unknown Company',
      contact: record.get('fullName') || 'Unknown Contact',
      email: record.get('email') || '',
      phone: record.get('phone') || '',
      title: record.get('position') || '',
      score: record.get('Score') || 0,
      status: record.get('Status') || 'New',
      value: record.get('Value') || 0,
      source: record.get('Source') || 'Unknown',
      linkedin: record.get('linkedinUrl') || '',
      website: record.get('orgWebsite') || '',
      industry: Array.isArray(record.get('orgIndustry')) ? record.get('orgIndustry').join(', ') : (record.get('orgIndustry') || ''),
      employeeCount: record.get('orgSize') || 0,
      seniority: record.get('seniority') || '',
      location: record.get('country') || '',
      created: record.get('Created') || new Date().toISOString()
    }));

    res.json({ leads, count: leads.length });
  } catch (error) {
    console.error('Leads error:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// Get single lead
router.get('/:id', async (req, res) => {
  try {
    const record = await tables.leads.find(req.params.id);
    
    const lead = {
      id: record.id,
      company: record.get('orgName'),
      contact: record.get('fullName'),
      email: record.get('email'),
      phone: record.get('phone'),
      title: record.get('position'),
      score: record.get('Score'),
      status: record.get('Status'),
      value: record.get('Value'),
      source: record.get('Source'),
      linkedin: record.get('linkedinUrl'),
      website: record.get('orgWebsite'),
      industry: record.get('orgIndustry'),
      employeeCount: record.get('orgSize'),
      seniority: record.get('seniority'),
      location: record.get('country'),
      notes: record.get('Notes'),
      created: record.get('Created')
    };

    res.json(lead);
  } catch (error) {
    console.error('Lead error:', error);
    res.status(404).json({ error: 'Lead not found' });
  }
});

// Update lead status
router.patch('/:id', async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const updates = {};
    if (status) updates.Status = status;
    if (notes) updates.Notes = notes;

    const record = await tables.leads.update(req.params.id, updates);
    
    res.json({ 
      message: 'Lead updated successfully',
      id: record.id 
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Failed to update lead' });
  }
});

module.exports = router;
