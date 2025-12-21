import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Area, AreaChart
} from 'recharts';
import { 
  TrendingUp, Users, Target, DollarSign, Calendar, 
  CheckCircle, AlertCircle, Zap, Settings, Menu, X
} from 'lucide-react';
import apiService from './services/api';

export default function SalesAutomationDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [leadsData, setLeadsData] = useState([]);
  const [meetingsData, setMeetingsData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all data in parallel
        const [dashboard, leads, meetings] = await Promise.all([
          apiService.fetchDashboardData(),
          apiService.fetchLeads(),
          apiService.fetchMeetings()
        ]);

        setDashboardData(dashboard);
        setLeadsData(leads);
        setMeetingsData(meetings);
        setLastUpdated(new Date());
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };
fallbackLeads = [
    { id: 1, company: 'TechCorp Inc', contact: 'John Smith', score: 92, stage: 'Proposal Sent', value: 45000, lastActivity: '2 hours ago', source: 'Apollo' },
    { id: 2, company: 'InnovateLabs', contact: 'Sarah Chen', score: 85, stage: 'Meeting Scheduled', value: 38000, lastActivity: '1 day ago', source: 'Clay' },
    { id: 3, company: 'DataStream Co', contact: 'Mike Johnson', score: 78, stage: 'Nurturing', value: 25000, lastActivity: '3 days ago', source: 'Apollo' },
    { id: 4, company: 'CloudFirst Ltd', contact: 'Emma Davis', score: 71, stage: 'First Contact', value: 30000, lastActivity: '1 week ago', source: 'Clay' },
    { id: 5, company: 'AI Solutions', contact: 'David Lee', score: 88, stage: 'Meeting Scheduled', value: 52000, lastActivity: '5 hours ago', source: 'Apollo' },
  ];

  const fallbackDeals = [
    { id: 1, client: 'TechCorp Inc', value: 45000, stage: 'Proposal Sent', daysInStage: 5, nextAction: 'Send Follow-up', probability: 75 },
    { id: 2, client: 'AI Solutions', value: 52000, stage: 'Meeting Scheduled', daysInStage: 2, nextAction: 'Conduct Meeting', probability: 60 },
    { id: 3, client: 'InnovateLabs', value: 38000, stage: 'Proposal Sent', daysInStage: 3, nextAction: 'Check Proposal Status', probability: 70 },
  ];

  const activeDeals = dashboardData?.activeDeals || fallbackDeals;

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

  const leadsData = [
    { id: 1, company: 'TechCorp Inc', contact: 'John Smith', score: 92, stage: 'Proposal Sent', value: 45000, lastActivity: '2 hours ago', source: 'Apollo' },
    { id: 2, company: 'InnovateLabs', contact: 'Sarah Chen', score: 85, stage: 'Meeting Scheduled', value: 38000, lastActivity: '1 day ago', source: 'Clay' },
    { id: 3, company: 'DataStream Co', contact: 'Mike Johnson', score: 78, stage: 'Nurturing', value: 25000, lastActivity: '3 days ago', source: 'Apollo' },
    { id: 4, company: 'CloudFirst Ltd', contact: 'Emma Davis', score: 71, stage: 'First Contact', value: 30000, lastActivity: '1 week ago', source: 'Clay' },
    { id: 5, company: 'AI Solutions', contact: 'David Lee', score: 88, stage: 'Meeting Scheduled', value: 52000, lastActivity: '5 hours ago', source: 'Apollo' },
  ];

  const activeDeals = [
    { id: 1, client: 'TechCorp Inc', value: 45000, stage: 'Proposal Sent', daysInStage: 5, nextAction: 'Send Follow-up', probability: 75 },
    { idfallbackMeetings = [
    { id: 1, company: 'TechCorp Inc', time: '2024-01-15 2:00 PM', duration: '30 min', link: 'zoom.us/j/123' },
    { id: 2, company: 'AI Solutions', time: '2024-01-16 10:00 AM', duration: '45 min', link: 'meet.google.com/xyz' },
    { id: 3, company: 'DataStream Co', time: '2024-01-17 3:30 PM', duration: '30 min', link: 'zoom.us/j/456' },
  ];

  const defaultMetrics = [
    { label: 'Total Pipeline', value: '$560K', change: '+22%', icon: Target, color: 'from-blue-600 to-blue-400' },
    { label: 'Closed This Month', value: '$95K', change: '+42%', icon: DollarSign, color: 'from-green-600 to-green-400' },
    { label: 'Active Leads', value: '284', change: '+18%', icon: Users, color: 'from-purple-600 to-purple-400' },
    { label: 'Conversion Rate', value: '4.2%', change: '+0.8%', icon: TrendingUp, color: 'from-orange-600 to-orange-400' },
  ];

  const metrics = dashboardData?.metrics ? [
    { label: 'Total Pipeline', value: `$${(dashboardData.metrics.totalPipeline / 1000).toFixed(0)}K`, change: dashboardData.metrics.pipelineChange || '+22%', icon: Target, color: 'from-blue-600 to-blue-400' },
    { label: 'Closed This Month', value: `$${(dashboardData.metrics.closedThisMonth / 1000).toFixed(0)}K`, change: dashboardData.metrics.closedChange || '+42%', icon: DollarSign, color: 'from-green-600 to-green-400' },
    { label: 'Active Leads', value: String(dashboardData.metrics.activeLeads || 0), change: dashboardData.metrics.leadsChange || '+18%', icon: Users, color: 'from-purple-600 to-purple-400' },
    { label: 'Conversion Rate', value: `${dashboardData.metrics.conversionRate || 0}%`, change: dashboardData.metrics.conversionChange || '+0.8%', icon: TrendingUp, color: 'from-orange-600 to-orange-400' },
  ] : defaultMetrics
  const metrics = [
    { label: 'Total Pipeline', value: '$560K', change: '+22%', icon: Target, color: 'from-blue-600 to-blue-400' },
    { label: 'Closed This Month', value: '$95K', change: '+42%', icon: DollarSign, color: 'from-green-600 to-green-400' },
    { label: 'Active Leads', value: '284', change: '+18%', icon: Users, color: 'from-purple-600 to-purple-400' },
    { label: 'Conversion Rate', value: '4.2%', change: '+0.8%', icon: TrendingUp, color: 'from-orange-600 to-orange-400' },
  ];

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
            { id: 'deals', label: 'Active Deals', icon: Target },
            { id: 'calendar', label: 'Calendar', icon: Calendar },
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
                {loading ? 'Loading...' : lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : 'Last updated: 2 minutes ago'}
              </p>
              {error && <p className="text-sm text-red-400 mt-1">⚠️ {error}</p>}
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
              <p className="text-sm text-blue-300/70">Last updated: 2 minutes ago</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="relative group cursor-pointer"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-lg`}></div>
                    <div className="relative bg-slate-800/80 backdrop-blur border border-blue-400/20 rounded-xl p-6 hover:border-blue-400/40 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${metric.color}`}>
                          <metric.icon className="text-white" size={24} />
                        </div>
                        <span className="text-green-400 text-sm font-semibold">{metric.change}</span>
                      </div>
                      <p className="text-blue-300/70 text-sm mb-1">{metric.label}</p>
                      <p className="text-3xl font-black text-white">{metric.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-slate-800/80 backdrop-blur border border-blue-400/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Monthly Revenue</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#404060" />
                      <XAxis dataKey="month" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" />
                      <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #0EA5E9' }} />
                      <Area type="monotone" dataKey="revenue" stroke="#0EA5E9" fill="url(#colorRevenue)" />
                      <Area type="monotone" dataKey="target" stroke="#6366F1" strokeDasharray="5 5" fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Conversion Rates */}
                <div className="bg-slate-800/80 backdrop-blur border border-blue-400/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Conversion Rates</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={conversionRates}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#404060" />
                      <XAxis dataKey="stage" angle={-45} textAnchor="end" height={80} stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" />
                      <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #0EA5E9' }} />
                      <Bar dataKey="rate" fill="#0EA5E9" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sales Funnel */}
              <div className="bg-slate-800/80 backdrop-blur border border-blue-400/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Sales Funnel</h3>
                <div className="space-y-4">
                  {funnelData.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-300 font-semibold">{item.stage}</span>
                        <span className="text-sm text-blue-300/70">{item.count} leads • ${item.value.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(item.count / funnelData[0].count) * 100}%`,
                            background: `linear-gradient(90deg, ${stageColors[item.stage]}, ${stageColors[item.stage]}dd)`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Leads Tab */}
          {activeTab === 'leads' && (
            <div className="bg-slate-800/80 backdrop-blur border border-blue-400/20 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-blue-400/20">
                <h3 cdisplayLeads"text-lg font-bold text-white">All Leads</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-blue-400/10">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Company</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Contact</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Score</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Stage</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Value</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Activity</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-300">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leadsData.map((lead) => (
                      <tr key={lead.id} className="border-b border-blue-400/10 hover:bg-blue-500/10 transition-colors">
                        <td className="px-6 py-4 text-white font-medium">{lead.company}</td>
                        <td className="px-6 py-4 text-blue-300">{lead.contact}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreBadgeColor(lead.score)}`}>
                            {lead.score}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStageBadgeColor(lead.stage)}`}>
                            {lead.stage}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white font-semibold">${lead.value.toLocaleString()}</td>
                        <td className="px-6 py-4 text-blue-300/70 text-sm">{lead.lastActivity}</td>
                        <td className="px-6 py-4">
                          <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">→</button>
                        </td>
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
            <div className="bg-slate-800/80 backdrop-blur border border-blue-400/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-6">Upcoming Meetings</h3>
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                    <div className="flex items-center space-x-4">
                      <Calendar className="text-cyan-400" size={24} />
                      <div>
                        <p className="text-white font-semibold">{meeting.company}</p>
                        <p className="text-blue-300/70 text-sm">{meeting.time} • {meeting.duration}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 border border-cyan-400/30 text-sm font-medium">
                      Join Meeting
                    </button>
                  </div>
                ))}
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
    </div>
  );
}
