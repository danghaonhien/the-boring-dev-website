import { useState, useEffect } from 'react';
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
}

export default function WaitlistDashboard() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all'); // 'all', 'converted', 'not-converted'
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchWaitlistEntries();
  }, []);

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

  // Export entries as CSV
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
  
  // Filter entries based on current filter and search term
  const getFilteredEntries = () => {
    return entries.filter(entry => {
      // Filter based on converted status
      if (filter === 'converted' && !entry.converted_to_user) return false;
      if (filter === 'not-converted' && entry.converted_to_user) return false;
      
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
  
  const filteredEntries = getFilteredEntries();
  
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
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div>
                <input
                  type="text"
                  placeholder="Search by email or message"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-2 border rounded w-full md:w-64"
                />
              </div>
              <div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="p-2 border rounded w-full"
                >
                  <option value="all">All Entries</option>
                  <option value="converted">Converted to Users</option>
                  <option value="not-converted">Not Converted</option>
                </select>
              </div>
            </div>
            
            {/* Export Button */}
            <button
              onClick={exportToCSV}
              className="bg-[#D97904] text-white py-2 px-4 rounded hover:bg-opacity-90 disabled:opacity-50"
              disabled={filteredEntries.length === 0}
            >
              Export to CSV
            </button>
          </div>
          
          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#F2F2F2] p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Entries</p>
              <p className="text-2xl font-bold">{entries.length}</p>
            </div>
            <div className="bg-[#F2F2F2] p-4 rounded-lg">
              <p className="text-sm text-gray-500">Converted to Users</p>
              <p className="text-2xl font-bold">
                {entries.filter(e => e.converted_to_user).length}
              </p>
            </div>
            <div className="bg-[#F2F2F2] p-4 rounded-lg">
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-bold">
                {entries.length > 0 
                  ? `${Math.round((entries.filter(e => e.converted_to_user).length / entries.length) * 100)}%`
                  : '0%'
                }
              </p>
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
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEntries.map((entry) => (
                    <tr key={entry.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{entry.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{entry.project}</td>
                      <td className="px-6 py-4">{entry.message || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(entry.created_at).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
          )}
        </div>
      </div>
    </div>
  );
} 