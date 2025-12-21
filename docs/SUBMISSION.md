# Cervoa Sales Automation — Assignment Submission

**Candidate**: Karthikeya  
**Date**: December 21, 2025  
**Assignment**: End-to-End Agentic Sales Automation  

---

## 📋 Deliverables Overview

This submission provides a complete, production-ready sales automation system addressing all three core requirements:

### ✅ 1. System Architecture & UI Interface

**Architecture Diagram**: See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- Visual mermaid diagram showing flow: Apollo/Clay → Airtable → Brevo → Cal.com → Gamma → Stripe/Gumroad → Lovable
- n8n orchestration layer connecting all services
- Express backend API + React/Vite dashboard

**Ready-to-Use UI**: 
- React dashboard with live metrics, leads table, meetings calendar
- **Demo Flow tab** with one-click triggers for each integration step
- Activity log showing integration responses
- Live at `http://localhost:5173` after `npm run dev`

**Backend API**:
- Documented at `http://localhost:3001/api/docs` (Swagger)
- Endpoints: `/api/dashboard`, `/api/leads`, `/api/meetings`, `/api/webhooks`, `/api/integrations/*`
- Integration stubs forward to n8n webhooks when configured

### ✅ 2. Tool Rationale & Cost Estimates

**Cost Analysis**: See [docs/TOOL_COSTS.md](docs/TOOL_COSTS.md)
- Per-tool breakdown with low/medium usage estimates
- Apollo ($49-99), Clay ($0-149), Brevo ($0-25), Cal.com ($12-24), Gamma ($20-40), Stripe (2.9%+30¢), n8n (self-host $0-20), Airtable ($0-20)
- **Total estimated cost**: ~$250/mo fixed + variable transaction fees
- **Revenue model**: 10 clients at $299/mo = $2990/mo (91% margin)

**Cost Control Tactics**:
- Rate limiting Apollo/Clay pulls
- Batch Brevo sends
- Self-host n8n ($10-20 VPS vs $50 cloud)
- Airtable free tier optimization
- Fallback hierarchies (Apollo → Clay → manual CSV)

### ✅ 3. Strategic Thinking & Scalability

**Strategic Plan**: See [docs/STRATEGY.md](docs/STRATEGY.md)

**Productization**:
- Multi-tenant SaaS with white-label capability
- Tiered pricing: Starter ($99), Pro ($299), Enterprise ($999)
- Self-service onboarding wizard (15 min setup)
- Target: Sales ops managers at 10-50 person B2B SaaS startups

**AI Voice Agent Rollout** (Phased):
- Phase 1 (Month 3-4): Inbound qualification pre-call (Vapi/Bland, ~$0.10/min)
- Phase 2 (Month 6-8): Outbound follow-up for stale leads
- Phase 3 (Month 10+): Post-sale onboarding calls
- Cost management: Tier-based limits (Pro: 50 min/mo, Enterprise: unlimited)

**Automated Social Distribution**:
- n8n monitors Airtable for "Won" deals → generates LinkedIn/Twitter post via OpenAI
- Auto-schedules via Buffer ($6/mo)
- Manual approval queue to prevent AI errors
- Goal: 10% of new leads from social within 6 months

**Scalability Architecture**:
- Horizontal n8n scaling (stateless workflows)
- Airtable → Postgres migration path for >10K records
- Frontend on Vercel (free tier CDN)
- Monitoring: n8n logs, Slack alerts, Sentry errors

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Airtable account + API key
- Apollo, Brevo, Cal.com accounts (optional but recommended)
- n8n instance (local or cloud)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Add your keys to .env
npm run dev
# API: http://localhost:3001
# Docs: http://localhost:3001/api/docs
```

### Frontend Setup
```bash
npm install
echo "VITE_API_URL=http://localhost:3001" > .env
npm run dev
# UI: http://localhost:5173
# Try the "Demo Flow" tab!
```

### Seed Sample Data
```bash
cd backend
node populate-airtable.js
```

### n8n Workflows
Import these JSONs into your n8n instance:
- `n8n-workflows/WORKFLOW_1_Apollo_Lead_Discovery_SIMPLIFIED.json`
- `n8n-workflows/WORKFLOW_2_Brevo_Nurturing_SIMPLIFIED.json`
- `n8n-workflows/WORKFLOW_3_Cal_Meeting_Tracking_SIMPLIFIED.json`
- `n8n-workflows/WORKFLOW_4_Payment_Success.json`
- `n8n-workflows/WORKFLOW_5_Delivery_Lovable.json`
- `n8n-workflows/WORKFLOW_6_Proposal_Gamma.json`

Set `N8N_BASE_URL` in `backend/.env` to enable webhook forwarding.

---

## 📁 Repository Structure

```
Cervoa/
├── backend/              # Express API
│   ├── routes/           # Dashboard, leads, meetings, webhooks, integrations
│   ├── config/           # Airtable connection
│   ├── server.js         # Main server with Swagger
│   ├── populate-airtable.js
│   └── .env.example
├── src/                  # React/Vite frontend
│   ├── App.jsx           # Main dashboard with Demo Flow tab
│   ├── services/api.js   # API client
│   └── index.css
├── docs/                 # All documentation
│   ├── ARCHITECTURE.md   # System diagram
│   ├── TOOL_COSTS.md     # Cost analysis
│   ├── STRATEGY.md       # Strategic plan
│   ├── N8N_WEBHOOKS.md   # Webhook wiring guide
│   └── START_HERE.md
├── n8n-workflows/        # Ready-to-import JSONs
│   ├── WORKFLOW_1-6_*.json
│   └── README.md
├── Workflows/            # Detailed workflow files
├── scripts/              # Utility scripts
├── README.md             # Main project guide
└── package.json
```

---

## 🎯 Key Features Demonstrated

### End-to-End Automation
1. **Discovery**: Apollo searches for leads daily, scores them, saves to Airtable
2. **Enrichment**: Clay enriches lead data on-demand
3. **Nurture**: Brevo watches Airtable, adds contacts to email sequences
4. **Scheduling**: Cal.com bookings webhook to n8n → Airtable meetings
5. **Proposals**: Gamma generates proposal drafts from meeting notes
6. **Payments**: Stripe/Gumroad checkout → revenue tracking
7. **Delivery**: Lovable triggers post-payment workflows

### Production-Ready Code
- Express backend with CORS, error handling, Swagger docs
- React frontend with real-time API integration
- n8n workflows with error handling and response nodes
- Environment-based configuration
- Git-ignored secrets

### Commercial Thinking
- Multi-tier pricing model
- Cost optimization strategies
- Competitive positioning vs HubSpot/Clay/Zapier
- 12-month growth targets
- Referral program design

### AI Integration Roadmap
- Phased voice agent rollout
- Cost-per-tier budgeting
- Guardrails (opt-in, rate limits)
- Social automation with approval flow

---

## 📊 Demo Metrics (Sample Data)

When you run the system with populated Airtable:
- **Total Leads**: 5 (can scale to 100s)
- **Meetings Scheduled**: 5
- **Proposals Sent**: 5
- **Revenue Tracked**: 5 records
- **Dashboard**: Live metrics, pipeline funnel, conversion rates
- **Demo Flow**: 6 integration triggers with activity log

---

## 🔗 Integration Points

### Configured & Working
- ✅ Airtable (Leads, Contacts, Meetings, Proposals, Revenue)
- ✅ Express backend with Swagger
- ✅ React dashboard with demo flow
- ✅ n8n workflow JSONs (import-ready)

### Requires Your Keys
- 🔑 Apollo API key (for lead discovery)
- 🔑 Brevo API key (for email nurturing)
- 🔑 Cal.com API key (for meeting webhooks)
- 🔑 Stripe/Gumroad (for payment tracking)
- 🔑 n8n base URL (for webhook forwarding)

### Optional Enhancements
- Gamma proposal generation (mock endpoint ready)
- Lovable delivery automation (webhook ready)
- OpenAI social post generation
- Vapi/Bland voice agents

---

## 🎓 What This Demonstrates

### Technical Expertise
- Full-stack development (Node.js, React)
- API integration & orchestration (n8n)
- Database design (Airtable schema)
- Documentation (Swagger, Markdown)
- DevOps awareness (self-hosting, VPS)

### Product Thinking
- User-centric UI (dashboard tabs, demo flow)
- Self-service onboarding design
- Tiered feature gating
- Metrics-driven (conversion funnel, cost-per-lead)

### Business Acumen
- Cost modeling & margin analysis
- Competitive positioning
- Go-to-market strategy
- Phased feature rollout (MVP → voice AI → social)

### Strategic Planning
- 12-month roadmap
- Scaling architecture (Postgres migration path)
- Security & compliance (GDPR, SOC 2)
- Growth levers (referrals, partnerships, content)

---

## 📝 Next Steps (Post-Submission)

If selected for next round:
1. Live demo walkthrough (15 min)
2. Q&A on architecture decisions
3. Code review & optimization opportunities
4. Discuss custom client requirements
5. Roadmap prioritization workshop

---

## 📧 Contact

**Karthikeya**  
GitHub: [github.com/BendiKarthikeya/Cervoa](https://github.com/BendiKarthikeya/Cervoa)

---

**Thank you for reviewing this submission!**

This project represents a complete, production-ready sales automation system built with commercial viability, cost efficiency, and scalability in mind. Every component—from the architecture diagram to the strategic roadmap—was designed to demonstrate both technical execution and business thinking.

I'm excited to discuss how this system can evolve to serve Cervoa's clients and contribute to the team's growth.
