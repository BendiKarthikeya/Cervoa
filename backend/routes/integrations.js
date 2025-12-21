const express = require('express');

const router = express.Router();

const N8N_BASE_URL = process.env.N8N_BASE_URL;
const N8N_PAYMENT_WEBHOOK = process.env.N8N_PAYMENT_WEBHOOK;
const N8N_DELIVERY_WEBHOOK = process.env.N8N_DELIVERY_WEBHOOK;

async function forwardOrMock(res, label, webhookPath, payload, mock) {
  try {
    const target = webhookPath || (N8N_BASE_URL ? `${N8N_BASE_URL}/webhook/${label}` : null);
    if (!target) {
      return res.json({
        forwarded: false,
        message: 'n8n webhook not configured; returning mock response',
        data: mock,
      });
    }

    const response = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload || {}),
    });

    const data = await response.json().catch(() => ({}));

    return res.json({
      forwarded: true,
      target,
      status: response.status,
      data,
    });
  } catch (error) {
    console.error(`${label} integration error:`, error);
    return res.status(500).json({ error: `${label} integration failed`, message: error.message });
  }
}

router.post('/discover', async (req, res) => {
  return forwardOrMock(res, 'apollo-lead-discovery', null, req.body, {
    leadsCreated: 10,
    source: 'mock-apollo',
  });
});

router.post('/nurture', async (req, res) => {
  return forwardOrMock(res, 'brevo-nurture', null, req.body, {
    emailsQueued: 10,
    status: 'queued',
  });
});

router.post('/schedule', async (req, res) => {
  return forwardOrMock(res, 'cal-com-booking', null, req.body, {
    meetingId: 'mock-meeting',
    status: 'scheduled',
  });
});

router.post('/proposal', async (req, res) => {
  return forwardOrMock(res, 'gamma-proposal', null, req.body, {
    proposalUrl: 'https://gamma.app/mock-proposal',
    status: 'generated',
  });
});

router.post('/payment', async (req, res) => {
  return forwardOrMock(
    res,
    'payment-success',
    N8N_PAYMENT_WEBHOOK,
    req.body,
    {
      checkoutUrl: 'https://buy.stripe.com/mock-checkout',
      status: 'pending',
    }
  );
});

router.post('/delivery', async (req, res) => {
  return forwardOrMock(
    res,
    'deliver',
    N8N_DELIVERY_WEBHOOK,
    req.body,
    {
      deliveryStatus: 'queued',
      provider: 'Lovable',
    }
  );
});

module.exports = router;
