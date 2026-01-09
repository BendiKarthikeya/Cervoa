import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Area, AreaChart
} from 'recharts';
import { 
  TrendingUp, Users, Target, DollarSign, Calendar, 
  CheckCircle, AlertCircle, Zap, Settings, Menu, X, Plus, Mail
} from 'lucide-react';
import apiService from './services/api';
import AddLeadsModal from './components/AddLeadsModal';

export default function SalesAutomationDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [leadsData, setLeadsData] = useState([]);
  const [meetingsData, setMeetingsData] = useState([]);
  const [brevoStats, setBrevoStats] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [integrationLogs, setIntegrationLogs] = useState([]);
  const [isAddLeadsModalOpen, setIsAddLeadsModalOpen] = useState(false);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all data in parallel
        const [dashboard, leads, meetings, brevo] = await Promise.all([
          apiService.fetchDashboardData(),
          apiService.fetchLeads(),
          apiService.fetchMeetings(),
          apiService.fetchBrevoStats()
        ]);

        setDashboardData(dashboard);
        setLeadsData(leads);
        setMeetingsData(meetings);
        setBrevoStats(brevo);
        setLastUpdated(new Date());
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();

    // Refresh data every 2 minutes
    const interval = setInterval(fetchData, 120000);
    return () => clearInterval(interval);
  }, []);

  // Handle add leads form submission
  const handleAddLeadsSubmit = async (formData) => {
    try {
      // Send the form data to n8n workflow
      const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
      
      console.log('📤 Sending to webhook:', n8nWebhookUrl);
      console.log('📊 Form data:', formData);
      
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      console.log('📬 Response status:', response.status);
      const responseText = await response.text();
      console.log('📋 Response body:', responseText);

      if (response.ok) {
        alert('✅ Leads search started! Check n8n for progress.');
        setIsAddLeadsModalOpen(false);
      } else {
        alert(`❌ Error: HTTP ${response.status}\n\nWebhook might not exist or n8n server not responding.\n\nCheck console (F12) for details.`);
      }
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      alert(`❌ Network Error:\n\n${error.message}\n\nCheck console (F12) for details.`);
    }
  };

  // Fallback data
  const fallbackLeads = [
    { id: 1, company: 'TechCorp Inc', contact: 'John Smith', score: 92, stage: 'Proposal Sent', value: 45000, lastActivity: '2 hours ago', source: 'Apollo' },
    { id: 2, company: 'InnovateLabs', contact: 'Sarah Chen', score: 85, stage: 'Meeting Scheduled', value: 38000, lastActivity: '1 day ago', source: 'Clay' },
    { id: 3, company: 'DataStream Co', contact: 'Mike Johnson', score: 78, stage: 'Nurturing', value: 25000, lastActivity: '3 days ago', source: 'Apollo' },
    { id: 4, company: 'CloudFirst Ltd', contact: 'Emma Davis', score: 71, stage: 'First Contact', value: 30000, lastActivity: '1 week ago', source: 'Clay' },
    { id: 5, company: 'AI Solutions', contact: 'David Lee', score: 88, stage: 'Meeting Scheduled', value: 52000, lastActivity: '5 hours ago', source: 'Apollo' },
  ];

  const displayLeads = leadsData.length > 0 ? leadsData : fallbackLeads;

  const funnelData = dashboardData?.pipeline || [
    { stage: 'Leads', count: 284, value: 0 },
    { stage: 'Contacts', count: 142, value: 0 },
    { stage: 'Meetings', count: 38, value: 285000 },
    { stage: 'Proposals', count: 12, value: 180000 },
    { stage: 'Won', count: 4, value: 95000 }
  ];

  const conversionRates = [
    { stage: 'Leads→Contacts', rate: 50 },
    { stage: 'Contacts→Meetings', rate: 27 },
    { stage: 'Meetings→Proposals', rate: 32 },
    { stage: 'Proposals→Won', rate: 33 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 15000, target: 20000 },
    { month: 'Feb', revenue: 22000, target: 20000 },
    { month: 'Mar', revenue: 28000, target: 25000 },
    { month: 'Apr', revenue: 35000, target: 30000 },
    { month: 'May', revenue: 48000, target: 40000 },
    { month: 'Jun', revenue: 62000, target: 50000 }
  ];

  const fallbackDeals = [
    { id: 1, client: 'TechCorp Inc', value: 45000, stage: 'Proposal Sent', daysInStage: 5, nextAction: 'Send Follow-up', probability: 75 },
    { id: 2, client: 'AI Solutions', value: 52000, stage: 'Meeting Scheduled', daysInStage: 2, nextAction: 'Conduct Meeting', probability: 60 },
    { id: 3, client: 'InnovateLabs', value: 38000, stage: 'Proposal Sent', daysInStage: 3, nextAction: 'Check Proposal Status', probability: 70 },
  ];

  const activeDeals = dashboardData?.activeDeals || fallbackDeals;

  const fallbackMeetings = [
    { id: 1, company: 'TechCorp Inc', time: '2024-01-15 2:00 PM', duration: '30 min', link: 'zoom.us/j/123' },
    { id: 2, company: 'AI Solutions', time: '2024-01-16 10:00 AM', duration: '45 min', link: 'meet.google.com/xyz' },
    { id: 3, company: 'DataStream Co', time: '2024-01-17 3:30 PM', duration: '30 min', link: 'zoom.us/j/456' },
  ];

  const upcomingMeetings = meetingsData.length > 0 ? meetingsData : fallbackMeetings;

  const defaultMetrics = [
    { label: 'Total Pipeline', value: '$560K', change: '+22%', icon: Target, color: 'from-blue-600 to-blue-400' },
    { label: 'Closed This Month', value: '$95K', change: '+42%', icon: DollarSign, color: 'from-green-600 to-green-400' },
    { label: 'Active Leads', value: '284', change: '+18%', icon: Users, color: 'from-purple-600 to-purple-400' },
    { label: 'Conversion Rate', value: '4.2%', change: '+0.8%', icon: TrendingUp, color: 'from-orange-600 to-orange-400' },
  ];

  const metrics = dashboardData?.metrics ? [
    { label: 'Total Leads', value: String(dashboardData.metrics.totalLeads || 0), change: `+${dashboardData.metrics.leadGrowth || 0}%`, icon: Users, color: 'from-purple-600 to-purple-400' },
    { label: 'Emails Sent', value: String(dashboardData.metrics.emailsSent || 0), change: `+${dashboardData.metrics.emailGrowth || 0}%`, icon: Mail, color: 'from-cyan-600 to-cyan-400' },
    { label: 'Meetings', value: String(dashboardData.metrics.totalMeetings || 0), change: `+${dashboardData.metrics.meetingGrowth || 0}%`, icon: Calendar, color: 'from-blue-600 to-blue-400' },
    { label: 'Conversion Rate', value: `${dashboardData.metrics.conversionRate || 0}%`, change: '+0.8%', icon: TrendingUp, color: 'from-orange-600 to-orange-400' },
  ] : defaultMetrics;

  const stageColors = {
    'Leads': '#3B82F6',
    'Contacts': '#8B5CF6',
    'Meetings': '#EC4899',
    'Proposals': '#F59E0B',
    'Won': '#10B981'
  };

  const getScoreBadgeColor = (score) => {
    if (score >= 85) return 'bg-green-100 text-green-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getStageBadgeColor = (stage) => {
    const stages = {
      'First Contact': 'bg-blue-100 text-blue-800',
      'Nurturing': 'bg-purple-100 text-purple-800',
      'Meeting Scheduled': 'bg-pink-100 text-pink-800',
      'Proposal Sent': 'bg-yellow-100 text-yellow-800',
      'Won': 'bg-green-100 text-green-800'
    };
    return stages[stage] || 'bg-gray-100 text-gray-800';
  };

  const baseFunnelCount = funnelData && funnelData.length > 0 && funnelData[0].count > 0 ? funnelData[0].count : 1;

  const runIntegration = async (action, payload) => {
    const label = action.toUpperCase();
    setIntegrationLogs(prev => [{ action: label, status: 'pending', at: new Date().toLocaleTimeString() }, ...prev].slice(0, 20));
    try {
      const res = await apiService.triggerIntegration(action, payload);
      setIntegrationLogs(prev => [{ action: label, status: 'ok', at: new Date().toLocaleTimeString(), details: res }, ...prev].slice(0, 20));
    } catch (err) {
      setIntegrationLogs(prev => [{ action: label, status: 'error', at: new Date().toLocaleTimeString(), details: err.message }, ...prev].slice(0, 20));
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900/80 backdrop-blur border-r border-blue-400/10 transition-all duration-300 flex flex-col`}>
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Cervoa</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-blue-400 hover:text-cyan-300">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'leads', label: 'Leads', icon: Users },
            { id: 'calendar', label: 'Calendar', icon: Calendar },
            { id: 'deals', label: 'Active Deals', icon: Target },
            { id: 'demo', label: 'Demo Flow', icon: Zap },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                  : 'text-blue-300 hover:bg-blue-900/30'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-4xl font-black text-white mb-2">Sales Dashboard</h2>
              <p className="text-blue-300/70">End-to-End Agentic Sales Automation</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-300/70">
                {loading ? 'Loading...' : lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : 'Last updated: 2 minutes ago'}
              </p>
              {error && <p className="text-sm text-red-400 mt-1">⚠️ {error}</p>}
              <div className="flex gap-2 mt-3">
                <button className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 text-sm border border-blue-400/30">
                  Export Report
                </button>
                <button className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 text-sm border border-cyan-400/30">
                  Connect n8n
                </button>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="relative group cursor-pointer"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-lg`}></div>
                    <div className="relative bg-slate-800/80 backdrop-blur border border-blue-400/20 rounded-xl p-5 hover:border-blue-400/40 transition-all min-h-24">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${metric.color}`}>
                          <metric.icon className="text-white" size={24} />
                        </div>
                        <span className="text-green-400 text-xs font-semibold">{metric.change}</span>
                      </div>
                      <p className="text-blue-300/70 text-xs mb-1">{metric.label}</p>
                      <p className="text-3xl font-black text-white">{metric.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Brevo Email Section - Chart + Cards Layout */}
              {brevoStats && (
                <>
                  {/* Row 1: Chart Full Width */}
                  <div className="bg-slate-800/80 backdrop-blur border border-blue-400/20 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">📧 Email Funnel</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Total Mails', value: parseInt(brevoStats.emailsSent) || 0, color: '#3B82F6' },
                        { label: 'Delivered', value: parseInt(brevoStats.emailsDelivered) || 0, color: '#06B6D4' },
                        { label: 'Opens', value: parseInt(brevoStats.opens) || 0, color: '#10B981' },
                        { label: 'Bounces', value: parseInt(brevoStats.hardBounces) || 0, color: '#EF4444' }
                      ].map((item, idx) => {
                        const maxValue = parseInt(brevoStats.emailsSent) || 1;
                        const widthPercent = (item.value / maxValue) * 100;
                        return (
                          <div key={idx} className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-slate-300 font-medium">{item.label}</p>
                              <p className="text-xs text-slate-400 font-semibold">{item.value}</p>
                            </div>
                            <div className="w-full bg-slate-700/50 rounded-full h-6 overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all flex items-center justify-end pr-2"
                                style={{
                                  backgroundColor: item.color,
                                  width: `${widthPercent}%`,
                                  minWidth: '30px'
                                }}
                              >
                                {widthPercent > 15 && <span className="text-xs text-white font-bold">{Math.round(widthPercent)}%</span>}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Row 2: All 4 Cards in One Line */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-slate-800/80 backdrop-blur border border-cyan-400/20 rounded-xl p-5">
                      <p className="text-cyan-300/70 text-xs mb-2">📨 Emails Sent</p>
                      <p className="text-2xl font-bold text-cyan-300">{brevoStats.emailsSent || 0}</p>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-green-400/20 rounded-xl p-5">
                      <p className="text-green-300/70 text-xs mb-2">✅ Delivery Rate</p>
                      <p className="text-2xl font-bold text-green-300">{brevoStats.deliveryRate}%</p>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-blue-400/20 rounded-xl p-5">
                      <p className="text-blue-300/70 text-xs mb-2">👁️ Open Rate</p>
                      <p className="text-2xl font-bold text-blue-300">{brevoStats.openRate}%</p>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-red-400/20 rounded-xl p-5">
                      <p className="text-red-300/70 text-xs mb-2">❌ Hard Bounces</p>
                      <p className="text-2xl font-bold text-red-300">{brevoStats.hardBounces || 0}</p>
                    </div>
                  </div>

                </>
              )}
            </>
          )}

          {/* Leads Tab */}
          {activeTab === 'leads' && (
            <div className="bg-slate-800/80 backdrop-blur border border-blue-400/20 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-blue-400/20 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">All Leads</h3>
                <button
                  onClick={() => setIsAddLeadsModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/30"
                >
                  <Plus size={18} />
                  Add Leads
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-blue-400/10 bg-slate-700/30">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300">Company</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300">Contact</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300">Title</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300">Phone</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300">Industry</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayLeads.map((lead) => (
                      <tr key={lead.id} className="border-b border-blue-400/10 hover:bg-blue-500/10 transition-colors">
                        <td className="px-4 py-3 text-white font-medium text-sm">{lead.company || 'N/A'}</td>
                        <td className="px-4 py-3 text-blue-300 text-sm">{lead.contact || 'N/A'}</td>
                        <td className="px-4 py-3 text-blue-300 text-sm">{lead.title || 'N/A'}</td>
                        <td className="px-4 py-3 text-blue-300 text-xs truncate max-w-xs">{lead.email || 'N/A'}</td>
                        <td className="px-4 py-3 text-blue-300 text-sm">{lead.phone || 'N/A'}</td>
                        <td className="px-4 py-3 text-blue-300 text-sm">{lead.industry || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Deals Tab */}
          {activeTab === 'deals' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeDeals.map((deal) => (
                <div key={deal.id} className="bg-slate-800/80 backdrop-blur border border-blue-400/20 rounded-xl p-6 hover:border-blue-400/40 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-white font-bold">{deal.client}</h4>
                      <p className="text-blue-300/70 text-sm">${deal.value.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-semibold text-lg">{deal.probability}%</p>
                      <p className="text-blue-300/70 text-xs">probability</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-lg p-3 mb-4">
                    <p className="text-blue-300 text-sm font-medium mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStageBadgeColor(deal.stage)}`}>
                        {deal.stage}
                      </span>
                    </p>
                    <p className="text-blue-300/70 text-xs">Days in stage: {deal.daysInStage}</p>
                  </div>

                  <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-lg p-3 mb-4">
                    <p className="text-cyan-300 font-semibold text-sm">{deal.nextAction}</p>
                  </div>

                  <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                    Update Deal
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Calendar Tab */}
          {activeTab === 'calendar' && (
            <div className="bg-slate-800/80 backdrop-blur border border-blue-400/20 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-blue-400/20">
                <h3 className="text-lg font-bold text-white">Meetings & Events</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-blue-400/10 bg-slate-700/30">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300">Company</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300">Attendees</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300">Start Time</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300">Duration</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300">Title</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-blue-300">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meetingsData && meetingsData.length > 0 ? (
                      meetingsData.map((meeting) => (
                        <tr key={meeting.id} className="border-b border-blue-400/10 hover:bg-blue-500/10 transition-colors">
                          <td className="px-4 py-3 text-white font-medium text-sm">{meeting.company || 'N/A'}</td>
                          <td className="px-4 py-3 text-blue-300 text-sm">{meeting.contactName || 'N/A'}</td>
                          <td className="px-4 py-3 text-blue-300 text-xs truncate max-w-xs">{meeting.email || 'N/A'}</td>
                          <td className="px-4 py-3 text-blue-300 text-sm">
                            {meeting.date ? new Date(meeting.date).toLocaleDateString() + ' ' + new Date(meeting.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                          </td>
                          <td className="px-4 py-3 text-blue-300 text-sm">{meeting.duration || '30 min'}</td>
                          <td className="px-4 py-3 text-blue-300 text-sm">{meeting.meetingType || 'Meeting'}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              meeting.status === 'Scheduled' ? 'bg-green-500/20 text-green-300' :
                              meeting.status === 'Completed' ? 'bg-blue-500/20 text-blue-300' :
                              'bg-yellow-500/20 text-yellow-300'
                            }`}>
                              {meeting.status || 'Scheduled'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-blue-300/70 text-xs truncate max-w-xs">{meeting.notes || '-'}</td>
                                                  <td className="px-4 py-3">
                                                    {meeting.videoUrl && (
                                                      <a
                                                        href={meeting.videoUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
                                                      >
                                                        📞 Join
                                                      </a>
                                                    )}
                                                  </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="px-4 py-8 text-center text-blue-300/50">
                          No meetings scheduled
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Demo Flow Tab */}
          {activeTab === 'demo' && (
            <div className="space-y-6">
              <div className="bg-slate-800/80 backdrop-blur border border-blue-400/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">Demo Flow</h3>
                <p className="text-blue-300/70 text-sm mb-4">Trigger each step or forward to n8n webhooks if configured.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'discover', label: 'Discover & Enrich (Apollo/Clay)' },
                    { id: 'nurture', label: 'Nurture via Brevo' },
                    { id: 'schedule', label: 'Schedule via Cal.com' },
                    { id: 'proposal', label: 'Generate Proposal (Gamma)' },
                    { id: 'payment', label: 'Collect Payment (Stripe/Gumroad)' },
                    { id: 'delivery', label: 'Trigger Delivery (Lovable)' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => runIntegration(item.id, { demo: true, timestamp: new Date().toISOString() })}
                      className="w-full bg-slate-700/60 border border-blue-400/20 rounded-lg p-4 text-left hover:border-blue-400/50 hover:bg-slate-700 transition-all"
                    >
                      <p className="text-white font-semibold mb-1">{item.label}</p>
                      <p className="text-blue-300/70 text-xs">Calls /api/integrations/{item.id}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/80 backdrop-blur border border-blue-400/20 rounded-xl p-6">
                <h4 className="text-md font-bold text-white mb-3">Activity Log</h4>
                <div className="space-y-2 max-h-64 overflow-auto">
                  {integrationLogs.length === 0 && <p className="text-blue-300/70 text-sm">No actions yet.</p>}
                  {integrationLogs.map((log, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-slate-700/40 rounded-lg p-3">
                      <div>
                        <p className="text-white text-sm font-semibold">{log.action}</p>
                        {log.details && <p className="text-blue-300/70 text-xs truncate">{typeof log.details === 'string' ? log.details : JSON.stringify(log.details)}</p>}
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-semibold ${log.status === 'ok' ? 'text-green-400' : log.status === 'pending' ? 'text-yellow-300' : 'text-red-400'}`}>{log.status}</p>
                        <p className="text-blue-300/70 text-[11px]">{log.at}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-slate-800/80 backdrop-blur border border-blue-400/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-6">API Connections</h3>
              <div className="space-y-4">
                {['Apollo', 'Clay', 'Brevo', 'Calendly', 'Stripe', 'Airtable'].map((tool) => (
                  <div key={tool} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-semibold">{tool}</p>
                      <p className="text-green-400 text-sm">✓ Connected</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 text-sm border border-blue-400/30">
                      Reconfigure
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add Leads Modal */}
      <AddLeadsModal
        isOpen={isAddLeadsModalOpen}
        onClose={() => setIsAddLeadsModalOpen(false)}
        onSubmit={handleAddLeadsSubmit}
      />
    </div>
  );
}
