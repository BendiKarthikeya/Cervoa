const express = require('express');
const router = express.Router();
const { tables } = require('../config/airtable');

// Cal.com webhook handler
router.post('/cal-com', async (req, res) => {
  try {
    const { triggerEvent, payload } = req.body;
    
    console.log('Cal.com webhook received:', triggerEvent);

    if (triggerEvent === 'BOOKING_CREATED') {
      const { startTime, endTime, attendees, title, uid } = payload;
      
      // Extract attendee info
      const attendee = attendees && attendees[0];
      if (!attendee) {
        return res.status(400).json({ error: 'No attendee information' });
      }

      // Calculate duration in minutes
      const start = new Date(startTime);
      const end = new Date(endTime);
      const duration = Math.round((end - start) / 60000);

      // Save to Airtable Meetings table
      await tables.meetings.create([
        {
          fields: {
            'Company': attendee.email.split('@')[1] || 'Unknown',
            'Contact Name': attendee.name,
            'Email': attendee.email,
            'Date': startTime,
            'Duration': duration,
            'Meeting Type': title || '30 Min Meeting',
            'Status': 'Scheduled',
            'Notes': `Cal.com booking ID: ${uid}`
          }
        }
      ]);

      console.log('Meeting saved to Airtable:', attendee.email);
      
      res.json({ 
        success: true, 
        message: 'Meeting saved',
        bookingId: uid 
      });
    } else {
      res.json({ success: true, message: 'Event received but not processed' });
    }
  } catch (error) {
    console.error('Cal.com webhook error:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
});

// Health check for webhooks
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    webhooks: {
      calCom: '/api/webhooks/cal-com'
    }
  });
});

module.exports = router;
