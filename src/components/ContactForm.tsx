import React, { useState } from 'react';
import { AnimatedCheckbox } from './InteractiveElements';
import { RippleButton, ScrollReveal, TypewriterText } from './EnhancedInteractiveElements';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, message, subscribeToNewsletter });
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setSubscribeToNewsletter(false);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="text-center">
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 bg-boring-main/20 rounded-full flex items-center justify-center text-boring-main animate-bounce-subtle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-bold text-boring-offwhite mb-2">Thank You!</h3>
        <TypewriterText 
          text="Your message has been sent. I'll get back to you soon."
          typingSpeed={50}
          className="text-boring-offwhite/70 text-sm mb-5"
        />
        <RippleButton
          onClick={() => setSubmitted(false)}
          className="bg-boring-main/40 text-boring-offwhite px-4 py-1.5 rounded-md text-sm font-medium hover:bg-boring-main/70 transition-colors"
        >
          Send another message
        </RippleButton>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-xs font-medium text-boring-offwhite/80 mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-transparent border border-boring-offwhite/30 focus:border-boring-main rounded-sm px-3 py-1.5 outline-none transition-colors duration-300 text-boring-offwhite text-sm"
        />
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-xs font-medium text-boring-offwhite/80 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-transparent border border-boring-offwhite/30 focus:border-boring-main rounded-sm px-3 py-1.5 outline-none transition-colors duration-300 text-boring-offwhite text-sm"
        />
      </div>

      {/* Message Input */}
      <div>
        <label htmlFor="message" className="block text-xs font-medium text-boring-offwhite/80 mb-1">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={2}
          className="w-full bg-transparent border border-boring-offwhite/30 focus:border-boring-main rounded-sm px-3 py-1.5 outline-none transition-colors duration-300 text-boring-offwhite text-sm resize-none"
        />
      </div>

      {/* Newsletter Checkbox */}
      <div className="flex items-center">
        <AnimatedCheckbox
          checked={subscribeToNewsletter}
          onChange={() => setSubscribeToNewsletter(!subscribeToNewsletter)}
          id="newsletter"
          label="Subscribe to newsletter"
          labelColor="text-boring-offwhite/80"
        />
      </div>

      {/* Submit Button */}
      <div className="text-right">
        <RippleButton
          type="submit"
          className="bg-boring-main/60 text-boring-offwhite px-4 py-1.5 rounded-sm font-medium hover:bg-boring-main/80 transition-colors text-sm"
        >
          Send Message
        </RippleButton>
      </div>
    </form>
  );
};

export default ContactForm; 