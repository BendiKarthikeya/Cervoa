# Tool Rationale & Rough Costs

Assumptions: low/medium usage, USD monthly, starter tiers where possible. Adjust with real volume.

| Tool | Purpose | Est. Cost (low) | Est. Cost (med) | Notes |
| --- | --- | --- | --- | --- |
| Apollo | Lead discovery | $49 | $99 | Pay-per-seat; limit credits; throttle via schedules. |
| Clay | Enrichment | $0-49 | $149 | Pay per credit; constrain fields to essentials. |
| Brevo | Email nurture | $0 (300 emails/day) | $25 | Use list-based campaigns; warm-up domain. |
| Cal.com | Scheduling | $12 | $24 | Use one org; webhooks to n8n. |
| Gamma | Proposal generation | $20 | $40 | Use only post-meeting; cache templates. |
| Stripe | Payments | 2.9%+30¢ | same | No SaaS fee; webhooks to n8n. |
| Gumroad | Payments | 10% | 7-10% | Simpler but higher take rate. |
| Lovable | Delivery automation | $0-20 | $50 | Use on-demand triggers. |
| n8n | Orchestration | $0 self-host | $20-50 | Self-host to control costs. |
| Airtable | CRM store | $0 | $20 | Base + automations; upgrade if records grow. |

Cost control tactics:
- Rate-limit Apollo/Clay pulls; cache enriched leads; avoid duplicate enrich.
- Batch Brevo sends; use segments; enable unsubscribe handling.
- Trigger Gamma/Stripe/Lovable only after meeting intent or payment; avoid idle runs.
- Self-host n8n; keep logs short; rotate tokens.
