import { useState, FormEvent } from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, you would send the form data to your backend
    // or a service like Formspree. For now, we'll just simulate a successful submission.
    console.log({ name, email, message });
    
    // Reset form fields
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(true);
    
    // Reset submission status after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      {submitted ? (
        <div className="text-center text-boring-main mb-4">
          <p className="text-lg font-medium">Thank you for your message!</p>
          <p>We'll get back to you soon.</p>
        </div>
      ) : (
        <>
          <p className="text-center mb-6">
            <a href="mailto:contact@theboringdev.com" className="text-boring-main hover:text-opacity-80 transition-all">
              contact@theboringdev.com
            </a>
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-boring-gray mb-1">Name</label>
              <input 
                type="text" 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-boring-slate/30 rounded-md focus:ring-boring-main focus:border-boring-main" 
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-boring-gray mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-boring-slate/30 rounded-md focus:ring-boring-main focus:border-boring-main" 
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-boring-gray mb-1">Message</label>
              <textarea 
                id="message" 
                rows={4} 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border border-boring-slate/30 rounded-md focus:ring-boring-main focus:border-boring-main"
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-boring-main text-boring-offwhite px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all"
            >
              Send Message
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ContactForm; 