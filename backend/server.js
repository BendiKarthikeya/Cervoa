const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const dashboardRoutes = require('./routes/dashboard');
const leadsRoutes = require('./routes/leads');
const meetingsRoutes = require('./routes/meetings');
const brevoRoutes = require('./routes/brevo');
const webhooksRoutes = require('./routes/webhooks');
const integrationsRoutes = require('./routes/integrations');

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
      'https://cervoa-two.vercel.app',
      process.env.FRONTEND_URL
    ].filter(Boolean);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Swagger/OpenAPI setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Cervoa Sales Automation API',
    version: '1.0.0',
    description: 'API endpoints for dashboard, leads, meetings, and webhooks.',
  },
  servers: [
    { url: `http://localhost:${PORT}`, description: 'Local' }
  ],
  components: {
    schemas: {
      Lead: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          company: { type: 'string' },
          contact: { type: 'string' },
          email: { type: 'string' },
          status: { type: 'string' },
          score: { type: 'number' }
        }
      },
      Meeting: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          company: { type: 'string' },
          date: { type: 'string', format: 'date-time' },
          duration: { type: 'string' },
          status: { type: 'string' }
        }
      },
      IntegrationRequest: {
        type: 'object',
        additionalProperties: true,
        example: { leadId: 'rec123', email: 'user@example.com' }
      },
      IntegrationResponse: {
        type: 'object',
        properties: {
          forwarded: { type: 'boolean' },
          target: { type: 'string' },
          status: { type: 'integer' },
          data: { type: 'object' }
        }
      }
    }
  },
  paths: {
    '/api/leads': {
      get: {
        summary: 'List leads',
        responses: {
          200: {
            description: 'Array of leads',
            content: { 'application/json': { schema: { type: 'object', properties: { leads: { type: 'array', items: { $ref: '#/components/schemas/Lead' } } } } } }
          }
        }
      }
    },
    '/api/meetings': {
      get: {
        summary: 'List meetings',
        responses: {
          200: {
            description: 'Array of meetings',
            content: { 'application/json': { schema: { type: 'object', properties: { meetings: { type: 'array', items: { $ref: '#/components/schemas/Meeting' } } } } } }
          }
        }
      }
    },
    '/api/integrations/{action}': {
      post: {
        summary: 'Trigger integration action',
        parameters: [
          {
            in: 'path',
            name: 'action',
            required: true,
            schema: { type: 'string', enum: ['discover','nurture','schedule','proposal','payment','delivery'] }
          }
        ],
        requestBody: {
          required: false,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/IntegrationRequest' } } }
        },
        responses: {
          200: {
            description: 'Integration response',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/IntegrationResponse' } } }
          }
        }
      }
    }
  }
};

const swaggerOptions = {
  swaggerDefinition,
  apis: [], // Using inline definitions; add route annotations later if desired
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/meetings', meetingsRoutes);
app.use('/api/brevo', brevoRoutes);
app.use('/api/webhooks', webhooksRoutes);
app.use('/api/integrations', integrationsRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Cervoa Sales Automation API',
    version: '1.0.0',
    endpoints: {
      dashboard: '/api/dashboard',
      leads: '/api/leads',
      meetings: '/api/meetings',
      webhooks: '/api/webhooks',
      integrations: '/api/integrations'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Cervoa Backend API running on port ${PORT}`);
  console.log(`📊 Dashboard API: http://localhost:${PORT}/api/dashboard`);
  console.log(` Health check: http://localhost:${PORT}/health`);
  console.log(`📘 API Docs: http://localhost:${PORT}/api/docs`);
});

module.exports = app;
