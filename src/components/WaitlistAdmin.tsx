import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

interface WaitlistEntry {
  id: string;
  email: string;
  project: string;
  message: string | null;
  created_at: string;
}

export default function WaitlistAdmin() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Simple admin password authentication (should be replaced with proper Supabase Auth)
  const authenticateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a placeholder - in production, use proper authentication
    if (password === 'admin-password-placeholder') {
      setAuthenticated(true);
      fetchWaitlistEntries();
    } else {
      setError('Invalid password');
    }
  };

  // Fetch waitlist entries
  const fetchWaitlistEntries = async () => {
    try {
      setLoading(true);
      
      // This requires proper authentication in production
      const { data, error: fetchError } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (fetchError) throw fetchError;
      
      setEntries(data || []);
    } catch (err: any) {
      console.error('Error fetching waitlist entries:', err);
      setError(err.message || 'Failed to load waitlist entries');
    } finally {
      setLoading(false);
    }
  };

  // Export entries as CSV
  const exportToCSV = () => {
    if (entries.length === 0) return;
    
    // Create CSV content
    const headers = ['Email', 'Project', 'Message', 'Date'];
    const csvContent = [
      headers.join(','),
      ...entries.map(entry => [
        entry.email,
        entry.project,
        entry.message || '',
        new Date(entry.created_at).toLocaleString()
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

  if (!authenticated) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Admin Authentication</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={authenticateAdmin}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Admin Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#D97904] text-white py-2 px-4 rounded hover:bg-opacity-90"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Waitlist Entries</h2>
        <button
          onClick={exportToCSV}
          className="bg-[#D97904] text-white py-2 px-4 rounded hover:bg-opacity-90"
          disabled={entries.length === 0}
        >
          Export to CSV
        </button>
      </div>
      
      {error && <p className="text-red-600 mb-4">{error}</p>}
      
      {loading ? (
        <p>Loading entries...</p>
      ) : entries.length === 0 ? (
        <p>No waitlist entries found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.project}</td>
                  <td className="px-6 py-4">{entry.message || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(entry.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 