import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { fetchWithAdminCheck, logoutAdmin } from '../../utils/adminAuth';
import { useNavigate } from 'react-router-dom';

interface WaitlistEntry {
  id: string;
  email: string;
  project: string;
  message: string | null;
  created_at: string;
  converted_to_user: boolean;
  ip_address?: string;
}

type TimeFrame = 'all' | 'day' | 'week' | 'month';
type ChartData = { date: string; count: number }[];
type ProjectData = { project: string; count: number }[];

export default function WaitlistDashboard() {
  // Main state
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Analytics state
  const [timeframe, setTimeframe] = useState<TimeFrame>('month');
  const [signupsByDate, setSignupsByDate] = useState<ChartData>([]);
  const [signupsByProject, setSignupsByProject] = useState<ProjectData>([]);
  
  // Filtering state
  const [filter, setFilter] = useState<string>('all'); // 'all', 'converted', 'not-converted'
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{start: string, end: string}>({
    start: '', 
    end: ''
  });
  
  // Email state
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  
  // Ref for email export
  const emailExportRef = useRef<HTMLAnchorElement>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchWaitlistEntries();
  }, []);

  useEffect(() => {
    if (entries.length > 0) {
      generateAnalytics();
    }
  }, [entries, timeframe]);

  // Fetch waitlist entries with admin check
  const fetchWaitlistEntries = async () => {
    try {
      setLoading(true);
      
      // Use the admin check wrapper to ensure admin privileges
      const data = await fetchWithAdminCheck(async () => {
        const { data, error } = await supabase
          .from('waitlist')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data || [];
      });
      
      setEntries(data);
    } catch (err: any) {
      console.error('Error fetching waitlist entries:', err);
      setError(err.message || 'Failed to load waitlist entries');
      
      // If unauthorized, redirect to login
      if (err.message === 'Unauthorized access') {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // Generate analytics data
  const generateAnalytics = () => {
    // Calculate start date based on timeframe
    const now = new Date();
    let startDate = new Date();
    
    switch(timeframe) {
      case 'day':
        startDate.setDate(now.getDate() - 1);
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'all':
      default:
        // Just use earliest entry
        if (entries.length > 0) {
          const dates = entries.map(e => new Date(e.created_at));
          startDate = new Date(Math.min(...dates.map(d => d.getTime())));
        }
    }
    
    // Format for display
    const formatDate = (date: Date): string => {
      return date.toISOString().split('T')[0];
    };
    
    // Count signups by date
    const dateMap = new Map<string, number>();
    
    // Initialize all dates in range
    let current = new Date(startDate);
    while (current <= now) {
      dateMap.set(formatDate(current), 0);
      current.setDate(current.getDate() + 1);
    }
    
    // Count actual signups
    entries.forEach(entry => {
      const date = formatDate(new Date(entry.created_at));
      if (new Date(date) >= startDate) {
        dateMap.set(date, (dateMap.get(date) || 0) + 1);
      }
    });
    
    // Sort by date
    const chartData: ChartData = Array.from(dateMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
    
    // Generate by project
    const projectMap = new Map<string, number>();
    entries.forEach(entry => {
      projectMap.set(entry.project, (projectMap.get(entry.project) || 0) + 1);
    });
    
    const projectData: ProjectData = Array.from(projectMap.entries())
      .map(([project, count]) => ({ project, count }))
      .sort((a, b) => b.count - a.count);
    
    setSignupsByDate(chartData);
    setSignupsByProject(projectData);
  };

  // Export all entries as CSV
  const exportToCSV = () => {
    if (entries.length === 0) return;
    
    const filteredEntries = getFilteredEntries();
    
    // Create CSV content
    const headers = ['Email', 'Project', 'Message', 'Date', 'Converted to User'];
    const csvContent = [
      headers.join(','),
      ...filteredEntries.map(entry => [
        entry.email,
        entry.project,
        (entry.message || '').replace(/,/g, ' '), // Remove commas from messages
        new Date(entry.created_at).toLocaleString(),
        entry.converted_to_user ? 'Yes' : 'No'
      ].join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `waitlist-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Export just email addresses
  const exportEmailList = () => {
    if (entries.length === 0) return;
    
    // Get filtered entries or selected ones
    const entriesToExport = selectedEmails.size > 0 
      ? entries.filter(entry => selectedEmails.has(entry.id))
      : getFilteredEntries();
    
    // Create text content with just emails
    const emailsContent = entriesToExport.map(entry => entry.email).join('\n');
    
    // Create download link
    const blob = new Blob([emailsContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Use ref to access DOM element
    if (emailExportRef.current) {
      emailExportRef.current.href = url;
      emailExportRef.current.download = `waitlist-emails-${new Date().toISOString().split('T')[0]}.txt`;
      emailExportRef.current.click();
    }
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logoutAdmin();
      navigate('/admin/login');
    } catch (err: any) {
      console.error('Logout error:', err);
      setError(err.message || 'Failed to logout');
    }
  };
  
  // Handle email selection
  const toggleEmailSelection = (id: string) => {
    const newSelection = new Set(selectedEmails);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedEmails(newSelection);
  };
  
  // Handle select all
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedEmails(new Set());
    } else {
      setSelectedEmails(new Set(getFilteredEntries().map(entry => entry.id)));
    }
    setSelectAll(!selectAll);
  };
  
  // Send email (mock function - would connect to email service)
  const sendEmail = () => {
    // This is a placeholder - in a real app, you would connect to an email service API
    alert(`Email would be sent to ${selectedEmails.size} users with subject: ${emailSubject}`);
    setShowEmailModal(false);
    
    // In a real implementation, you might call an API:
    // const response = await fetch('/api/send-email', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     emails: Array.from(selectedEmails).map(id => entries.find(e => e.id === id)?.email),
    //     subject: emailSubject,
    //     body: emailBody
    //   })
    // });
  };
  
  // Filter entries based on current filter and search term
  const getFilteredEntries = () => {
    return entries.filter(entry => {
      // Filter based on converted status
      if (filter === 'converted' && !entry.converted_to_user) return false;
      if (filter === 'not-converted' && entry.converted_to_user) return false;
      
      // Filter by project
      if (projectFilter !== 'all' && entry.project !== projectFilter) return false;
      
      // Filter by date range
      if (dateRange.start && new Date(entry.created_at) < new Date(dateRange.start)) return false;
      if (dateRange.end && new Date(entry.created_at) > new Date(dateRange.end)) return false;
      
      // Filter based on search term (email or message)
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          entry.email.toLowerCase().includes(term) || 
          (entry.message && entry.message.toLowerCase().includes(term))
        );
      }
      
      return true;
    });
  };
  
  // Get unique projects for filter dropdown
  const getUniqueProjects = () => {
    const projects = new Set(entries.map(entry => entry.project));
    return Array.from(projects);
  };
  
  // Show stats
  const calculateStats = () => {
    const total = entries.length;
    const converted = entries.filter(e => e.converted_to_user).length;
    const conversionRate = total > 0 ? Math.round((converted / total) * 100) : 0;
    
    // Calculate new signups in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newSignups = entries.filter(e => new Date(e.created_at) >= sevenDaysAgo).length;
    
    return { total, converted, conversionRate, newSignups };
  };
  
  const filteredEntries = getFilteredEntries();
  const stats = calculateStats();
  const uniqueProjects = getUniqueProjects();
  
  return (
    <div className="min-h-screen bg-[#F2F2F2] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#0D0D0D]">Waitlist Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-[#3C3E40] text-white py-2 px-4 rounded hover:bg-opacity-90"
          >
            Logout
          </button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-500">Total Entries</h3>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-500">Converted Users</h3>
            <p className="text-2xl font-bold">{stats.converted}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-500">Conversion Rate</h3>
            <p className="text-2xl font-bold">{stats.conversionRate}%</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-500">New (Last 7 Days)</h3>
            <p className="text-2xl font-bold">{stats.newSignups}</p>
          </div>
        </div>
        
        {/* Analytics Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Signup Analytics</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setTimeframe('day')}
                className={`px-3 py-1 rounded text-sm ${timeframe === 'day' 
                  ? 'bg-[#D97904] text-white' 
                  : 'bg-gray-100 text-gray-700'}`}
              >
                Day
              </button>
              <button 
                onClick={() => setTimeframe('week')}
                className={`px-3 py-1 rounded text-sm ${timeframe === 'week' 
                  ? 'bg-[#D97904] text-white' 
                  : 'bg-gray-100 text-gray-700'}`}
              >
                Week
              </button>
              <button 
                onClick={() => setTimeframe('month')}
                className={`px-3 py-1 rounded text-sm ${timeframe === 'month' 
                  ? 'bg-[#D97904] text-white' 
                  : 'bg-gray-100 text-gray-700'}`}
              >
                Month
              </button>
              <button 
                onClick={() => setTimeframe('all')}
                className={`px-3 py-1 rounded text-sm ${timeframe === 'all' 
                  ? 'bg-[#D97904] text-white' 
                  : 'bg-gray-100 text-gray-700'}`}
              >
                All
              </button>
            </div>
          </div>
          
          {/* Simple Bar Chart */}
          <div className="mt-4" style={{ height: '200px' }}>
            {signupsByDate.length > 0 ? (
              <div className="relative h-full">
                <div className="flex items-end h-full space-x-1">
                  {signupsByDate.map((item, index) => {
                    const maxCount = Math.max(...signupsByDate.map(d => d.count));
                    const height = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="relative w-full">
                          <div 
                            className="bg-[#D97904] rounded-t"
                            style={{ height: `${Math.max(height, 1)}%` }}
                            title={`${item.date}: ${item.count} signups`}
                          ></div>
                        </div>
                        {signupsByDate.length < 15 && (
                          <div className="text-xs text-gray-500 w-full truncate text-center mt-1">
                            {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}
          </div>
          
          {/* Project Distribution */}
          <div className="mt-8">
            <h3 className="text-md font-medium mb-2">Signups by Project</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {signupsByProject.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-36 truncate font-medium">{item.project}</div>
                  <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#D97904] rounded-full"
                      style={{ width: `${(item.count / stats.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="ml-3 text-gray-700">{item.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Data Table Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
            {/* Advanced Filters */}
            <div className="flex flex-col space-y-4 md:w-3/4">
              <h3 className="text-sm font-medium text-gray-700">Filters</h3>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by email or message"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className="sm:w-40">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 border rounded w-full appearance-none bg-white pr-8 bg-no-repeat"
                    style={{ backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\")", backgroundPosition: "right 0.5rem center", backgroundSize: "1.5em 1.5em" }}
                  >
                    <option value="all">All Statuses</option>
                    <option value="converted">Converted</option>
                    <option value="not-converted">Not Converted</option>
                  </select>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="flex-1">
                  <select
                    value={projectFilter}
                    onChange={(e) => setProjectFilter(e.target.value)}
                    className="p-2 border rounded w-full appearance-none bg-white pr-8 bg-no-repeat"
                    style={{ backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\")", backgroundPosition: "right 0.5rem center", backgroundSize: "1.5em 1.5em" }}
                  >
                    <option value="all">All Projects</option>
                    {uniqueProjects.map(project => (
                      <option key={project} value={project}>{project}</option>
                    ))}
                  </select>
                </div>
                
                <div className="sm:w-40">
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    className="p-2 border rounded w-full"
                    placeholder="Start Date"
                  />
                </div>
                <div className="sm:w-40">
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    className="p-2 border rounded w-full"
                    placeholder="End Date"
                  />
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col space-y-2 md:w-1/4 md:pl-4">
              <h3 className="text-sm font-medium text-gray-700">Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={exportToCSV}
                  className="text-sm bg-[#3C3E40] text-white py-1.5 px-3 rounded hover:bg-opacity-90 disabled:opacity-50"
                  disabled={filteredEntries.length === 0}
                >
                  Export CSV
                </button>
                
                <button
                  onClick={exportEmailList}
                  className="text-sm bg-[#3C3E40] text-white py-1.5 px-3 rounded hover:bg-opacity-90 disabled:opacity-50"
                  disabled={filteredEntries.length === 0}
                >
                  Export Emails
                </button>
                
                <button
                  onClick={() => setShowEmailModal(true)}
                  className="text-sm bg-[#D97904] text-white py-1.5 px-3 rounded hover:bg-opacity-90 disabled:opacity-50 col-span-2"
                  disabled={selectedEmails.size === 0}
                >
                  Email Selected ({selectedEmails.size})
                </button>
              </div>
              
              <a 
                ref={emailExportRef} 
                className="hidden"
                href="#"
              >Export Email List</a>
            </div>
          </div>
          
          {error && <p className="text-red-600 mb-4">{error}</p>}
          
          {loading ? (
            <div className="flex justify-center my-8">
              <svg className="animate-spin h-8 w-8 text-[#D97904]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : filteredEntries.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              {entries.length === 0 ? 'No waitlist entries found.' : 'No entries match your filters.'}
            </p>
          ) : (
            <>
              <div className="mb-2 flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                    className="mr-2 rounded border-gray-300 text-[#D97904] focus:ring-[#D97904]"
                  />
                  <span className="text-sm text-gray-500">
                    {selectedEmails.size > 0 ? 
                      `${selectedEmails.size} selected` : 
                      'Select all entries'}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Showing {filteredEntries.length} of {entries.length} entries
                </div>
              </div>
              
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <span className="sr-only">Select</span>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEntries.map((entry) => (
                      <tr key={entry.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedEmails.has(entry.id)}
                            onChange={() => toggleEmailSelection(entry.id)}
                            className="rounded border-gray-300 text-[#D97904] focus:ring-[#D97904]"
                          />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">{entry.email}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{entry.project}</td>
                        <td className="px-4 py-4 max-w-xs truncate">{entry.message || '-'}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{new Date(entry.created_at).toLocaleString()}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {entry.converted_to_user ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Converted
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              Waiting
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
        
        {/* Email Composition Modal */}
        {showEmailModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Send Email to Recipients</h2>
                  <button 
                    onClick={() => setShowEmailModal(false)} 
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg mb-4 flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-600">
                    Sending to <span className="font-semibold">{selectedEmails.size} recipients</span>
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-[#D97904] focus:outline-none"
                      placeholder="Email subject"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-[#D97904] focus:outline-none"
                      rows={5}
                      placeholder="Email content"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    onClick={() => setShowEmailModal(false)}
                    className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendEmail}
                    className="px-4 py-2 bg-[#D97904] text-white rounded hover:bg-opacity-90 disabled:opacity-50"
                    disabled={!emailSubject}
                  >
                    Send Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 