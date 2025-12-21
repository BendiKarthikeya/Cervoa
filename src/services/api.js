const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class ApiService {
  async fetchDashboardData() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard`);
      if (!response.ok) throw new Error('Failed to fetch dashboard data');
      return await response.json();
    } catch (error) {
      console.error('Dashboard API error:', error);
      throw error;
    }
  }

  async fetchLeads() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/leads`);
      if (!response.ok) throw new Error('Failed to fetch leads');
      const data = await response.json();
      // Map API fields to UI expected fields
      return (data.leads || []).map(lead => ({
        ...lead,
        stage: lead.status || lead.stage || 'New', // Map status to stage
        lastActivity: lead.lastActivity || 'Recently'
      }));
    } catch (error) {
      console.error('Leads API error:', error);
      throw error;
    }
  }

  async fetchMeetings() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/meetings`);
      if (!response.ok) throw new Error('Failed to fetch meetings');
      const data = await response.json();
      // Map API fields to UI expected fields
      return (data.meetings || []).map(meeting => ({
        id: meeting.id,
        company: meeting.company,
        time: new Date(meeting.date).toLocaleString('en-US', { 
          month: 'numeric', 
          day: 'numeric', 
          year: 'numeric',
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        duration: meeting.duration || '30 min',
        link: meeting.link || 'zoom.us/j/123456789'
      }));
    } catch (error) {
      console.error('Meetings API error:', error);
      throw error;
    }
  }

  async updateLead(leadId, data) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/leads/${leadId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update lead');
      return await response.json();
    } catch (error) {
      console.error('Update lead error:', error);
      throw error;
    }
  }

  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) throw new Error('Backend health check failed');
      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }

  async triggerIntegration(action, payload = {}) {
    const allowed = ['discover', 'nurture', 'schedule', 'proposal', 'payment', 'delivery'];
    if (!allowed.includes(action)) throw new Error('Invalid integration action');

    try {
      const response = await fetch(`${API_BASE_URL}/api/integrations/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`Integration ${action} failed`);
      return await response.json();
    } catch (error) {
      console.error(`Integration ${action} error:`, error);
      throw error;
    }
  }
}

export default new ApiService();
