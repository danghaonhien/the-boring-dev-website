import { useState } from 'react';
import { supabase, sanitizeInput, handleSupabaseError } from '../utils/supabaseClient';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate email format
  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Form validation
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Limit message length to prevent abuse
    if (message && message.length > 1000) {
      setError('Message is too long. Please keep it under 1000 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get client IP address for rate limiting (if server supports it)
      const clientIp = await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(() => null);

      // Sanitize inputs before sending to database
      const sanitizedEmail = sanitizeInput(email);
      const sanitizedMessage = message ? sanitizeInput(message) : null;

      const { error: supabaseError } = await supabase
        .from('waitlist')
        .insert({
          email: sanitizedEmail,
          message: sanitizedMessage,
          project: 'Reword This',
          ip_address: clientIp // This will be used for rate limiting
        });

      if (supabaseError) {
        throw supabaseError;
      }

      // Clear form and show success
      setEmail('');
      setMessage('');
      setSubmitted(true);
    } catch (err: any) {
      // Use the enhanced error handler
      setError(handleSupabaseError(err, 'Failed to join waitlist. Please try again later.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg">
        <h3 className="text-xl font-bold text-green-600 mb-2">You're on the waitlist! 🎉</h3>
        <p className="text-gray-700">We'll notify you when Reword This Premium is available.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#D97904] focus:outline-none"
          disabled={isSubmitting}
          maxLength={254} // Standard email length limit
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Why are you interested? (optional)
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what you're hoping to use Premium for..."
          className="w-full p-2 border rounded focus:ring-2 focus:ring-[#D97904] focus:outline-none"
          rows={3}
          disabled={isSubmitting}
          maxLength={1000} // Prevent excessively long messages
        />
      </div>
      
      {error && (
        <div className="text-red-600 text-sm p-2 bg-red-50 rounded">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        className="bg-[#D97904] text-white px-4 py-2 rounded hover:bg-opacity-90 w-full font-medium flex items-center justify-center"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Join the Waitlist'
        )}
      </button>
      
      <p className="text-xs text-gray-500 text-center mt-2">
        We'll never share your email with anyone else.
      </p>
    </form>
  );
} 