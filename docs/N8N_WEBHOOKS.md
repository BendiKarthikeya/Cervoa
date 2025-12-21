# n8n Webhook Wiring

Expose these webhooks from your n8n host and set envs accordingly.

- Cal.com booking → `{{N8N_BASE_URL}}/webhook/cal-com-booking`
- Payment success (Stripe/Gumroad) → `{{N8N_BASE_URL}}/webhook/payment-success`
- Delivery trigger (Lovable) → `{{N8N_BASE_URL}}/webhook/deliver`
- Proposal (Gamma) → `{{N8N_BASE_URL}}/webhook/gamma-proposal`

Payload expectations
- Cal.com: see `WORKFLOW_3_Cal_Meeting_Tracking_SIMPLIFIED.json`; expects `payload.startTime`, `payload.endTime`, `payload.attendees[0]`.
- Payment: include `amount`, `currency`, `email`, `product`, `paymentId`, `status`, `provider`.
- Delivery: include `customerEmail`, `orderId`, `package`.
- Proposal: include `company`, `title`, `value`, `notes`, optional `proposalUrl`.

Env vars to set
- Backend: `N8N_BASE_URL`, optional specific `N8N_PAYMENT_WEBHOOK`, `N8N_DELIVERY_WEBHOOK`.
- Frontend: optionally `VITE_N8N_BASE_URL` if calling n8n directly.

UI buttons (Demo Flow) should POST minimal JSON to backend stubs, which forward to n8n webhooks when configured.
