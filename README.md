# Cervoa - Sales Automation Platform

> **End-to-end agentic sales automation system** for lead discovery, email nurturing, meeting scheduling, proposal generation, and client delivery.

[![Deployed on Vercel](https://img.shields.io/badge/Frontend-Vercel-black)](https://cervoa-two.vercel.app)
[![Backend on Render](https://img.shields.io/badge/Backend-Render-46E3B7)](https://cervoa.onrender.com)

## 🌐 Live Demo

- **Frontend**: https://cervoa-two.vercel.app
- **Backend API**: https://cervoa.onrender.com
- **API Docs**: https://cervoa.onrender.com/api/docs

## 🎯 What It Does

Cervoa automates your entire sales pipeline:

1. **Lead Discovery** → Apollo.io integration for finding prospects
2. **Email Nurturing** → Brevo campaigns with automated follow-ups
3. **Meeting Scheduling** → Cal.com integration with n8n webhooks
4. **Proposal Generation** → Gamma.app integration for pitch decks
5. **Payment Processing** → Stripe webhooks for conversion tracking
6. **Client Delivery** → Lovable.dev automation for onboarding

All orchestrated through **n8n workflows** with real-time dashboard tracking.

## 🏗️ Architecture

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│  React Frontend │─────▶│  Express Backend │─────▶│    Airtable     │
│   (Vercel)      │      │    (Render)      │      │   (Database)    │
└─────────────────┘      └──────────────────┘      └─────────────────┘
                                   │
                                   ├─────▶ Brevo (Email)
                                   ├─────▶ Cal.com (Meetings)
                                   ├─────▶ Apollo (Leads)
                                   └─────▶ n8n (Workflows)
```

**Tech Stack:**
- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express
- **Database**: Airtable
- **Automation**: n8n Cloud
- **Deployment**: Vercel (Frontend) + Render (Backend)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (required for Vite)
- npm or yarn
- Git

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/BendiKarthikeya/Cervoa.git
cd Cervoa

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..
```

### 2. Environment Setup

**Frontend** (`.env` in root):
```env
VITE_API_URL=http://localhost:3001
VITE_N8N_WEBHOOK_URL=your_n8n_webhook_url
```

**Backend** (`backend/.env`):
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# API Keys
AIRTABLE_API_KEY=your_key
AIRTABLE_BASE_ID=your_base_id
APOLLO_API_KEY=your_key
BREVO_API_KEY=your_key
CAL_COM_API_KEY=your_key
```

> 📝 See `backend/.env.example` for all available options

### 3. Run Development Servers

```bash
# Terminal 1: Backend API
cd backend
npm run dev
# Running at http://localhost:3001

# Terminal 2: Frontend
npm run dev
# Running at http://localhost:5173
```

### 4. Access the Application

- Dashboard: http://localhost:5173
- API Docs: http://localhost:3001/api/docs
- Health Check: http://localhost:3001/health

## 📁 Project Structure

```
Cervoa/
├── backend/               # Express API server
│   ├── server.js         # Main server file
│   ├── routes/           # API endpoints
│   │   ├── dashboard.js
│   │   ├── leads.js
│   │   ├── meetings.js
│   │   ├── brevo.js
│   │   └── webhooks.js
│   └── config/           # Service configurations
├── src/                  # React frontend
│   ├── App.jsx          # Main application
│   ├── components/       # UI components
│   └── services/         # API service layer
├── docs/                 # Documentation
│   ├── START_HERE.md
│   ├── ARCHITECTURE.md
│   ├── RENDER_DEPLOYMENT.md
│   └── VERCEL_URL_FIX.md
├── n8n-workflows/        # n8n workflow definitions
│   ├── WORKFLOW_1_Apollo_Lead_Discovery_SIMPLIFIED.json
│   ├── WORKFLOW_2_Brevo_Nurturing_SIMPLIFIED.json
│   ├── WORKFLOW_3_Cal_Meeting_Tracking_SIMPLIFIED.json
│   ├── WORKFLOW_4_Payment_Success.json
│   ├── WORKFLOW_5_Delivery_Lovable.json
│   └── WORKFLOW_6_Proposal_Gamma.json
└── render.yaml           # Render deployment config
```

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/dashboard` | GET | Dashboard statistics |
| `/api/leads` | GET | List all leads |
| `/api/leads/:id` | PUT | Update lead |
| `/api/meetings` | GET | List all meetings |
| `/api/brevo/stats` | GET | Email campaign stats |
| `/api/webhooks/*` | POST | n8n webhook handlers |
| `/api/integrations/:action` | POST | Trigger workflows |

## 🤖 n8n Workflows

Import the workflows from `n8n-workflows/` into your n8n instance:

1. **Lead Discovery** - Apollo.io → Airtable
2. **Email Nurturing** - Brevo campaigns with triggers
3. **Meeting Tracking** - Cal.com webhook processing
4. **Payment Success** - Stripe webhook handling
5. **Client Delivery** - Lovable.dev automation
6. **Proposal Generation** - Gamma.app integration

> See [docs/N8N_IMPORT_GUIDE.md](docs/N8N_IMPORT_GUIDE.md) for detailed setup

## 🚢 Deployment

### Frontend (Vercel)

```bash
# Automatic deployment on push to main branch
git push origin main
```

**Environment Variables in Vercel:**
- `VITE_API_URL=https://cervoa.onrender.com`
- `VITE_N8N_WEBHOOK_URL=<your_n8n_webhook>`

### Backend (Render)

Automatically deploys via `render.yaml` configuration.

**Environment Variables in Render:**
- `NODE_ENV=production`
- `PORT=10000`
- `FRONTEND_URL=https://cervoa-two.vercel.app`
- All API keys (Airtable, Apollo, Brevo, Cal.com)

> 📖 See [docs/RENDER_DEPLOYMENT.md](docs/RENDER_DEPLOYMENT.md) for detailed setup

## 💰 Cost Breakdown

| Service | Cost | Plan |
|---------|------|------|
| Vercel (Frontend) | **$0** | Free Hobby |
| Render (Backend) | **$0** | Free (750hrs/month) |
| Airtable | **$0-20** | Free/Plus |
| n8n Cloud | **$20** | Starter |
| Brevo | **$0** | Free (300 emails/day) |
| Cal.com | **$0-12** | Free/Pro |
| Apollo.io | **$0-49** | Free tier (60 credits) |

**Total: ~$20-50/month** for production-ready system

> 💡 See [docs/TOOL_COSTS.md](docs/TOOL_COSTS.md) for optimization strategies

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [START_HERE.md](docs/START_HERE.md) | Quick start guide |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System architecture |
| [GETTING_STARTED.md](docs/GETTING_STARTED.md) | Comprehensive setup |
| [RENDER_DEPLOYMENT.md](docs/RENDER_DEPLOYMENT.md) | Backend deployment |
| [VERCEL_URL_FIX.md](docs/VERCEL_URL_FIX.md) | Troubleshooting frontend |
| [N8N_WORKFLOWS_SETUP_GUIDE.md](docs/N8N_WORKFLOWS_SETUP_GUIDE.md) | Workflow setup |

## 🔧 Development

```bash
# Frontend development
npm run dev           # Start Vite dev server
npm run build         # Build for production
npm run preview       # Preview production build

# Backend development
cd backend
npm run dev           # Start with nodemon (auto-reload)
npm start             # Start production server
```

## 🧪 Testing

```bash
# Test backend health
curl http://localhost:3001/health

# Test API endpoints
curl http://localhost:3001/api/dashboard
curl http://localhost:3001/api/leads
curl http://localhost:3001/api/meetings
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is for demonstration and portfolio purposes.

## 🙋 Support

For questions or issues:
- Open an issue on GitHub
- Check [docs/](docs/) for detailed guides
- Review API documentation at `/api/docs`

## 🎉 Features

- ✅ Real-time dashboard with lead & meeting tracking
- ✅ Automated email campaigns via Brevo
- ✅ Meeting scheduling with Cal.com integration
- ✅ n8n workflow orchestration
- ✅ Airtable database backend
- ✅ RESTful API with Swagger documentation
- ✅ Deployed on Vercel + Render (free tier)
- ✅ Production-ready with proper error handling
- ✅ Clean, documented codebase

---

**Built with ❤️ for automating sales workflows**
