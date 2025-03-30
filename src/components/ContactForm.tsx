import React, { useState, useRef, useEffect } from 'react';
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

  const FormLabel: React.FC<{
    htmlFor: string;
    focused: boolean;
    hasValue: boolean;
    children: React.ReactNode;
  }> = ({ htmlFor, focused, hasValue, children }) => (
    <label
      htmlFor={htmlFor}
      className={`absolute left-3 transition-all duration-200 ${
        focused || hasValue
          ? '-top-6 text-sm text-boring-main'
          : 'top-3 text-boring-gray'
      }`}
    >
      {children}
    </label>
  );

  const InputWrapper: React.FC<{
    children: React.ReactNode;
    id: string;
  }> = ({ children, id }) => (
    <div className="relative mb-8 pt-6">
      {children}
    </div>
  );

  if (submitted) {
    return (
      <ScrollReveal>
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500 animate-bounce-subtle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-boring-dark mb-2">Thank You!</h3>
          <TypewriterText 
            text="Your message has been sent successfully. I'll get back to you soon."
            typingSpeed={50}
            className="text-boring-gray mb-8"
          />
          <RippleButton
            onClick={() => setSubmitted(false)}
            className="bg-boring-main text-boring-offwhite px-6 py-2 rounded-md font-medium"
          >
            Send another message
          </RippleButton>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm">
        <InputWrapper id="name">
          <FormLabel htmlFor="name" focused={focused === 'name'} hasValue={name.length > 0}>
            Name
          </FormLabel>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            required
            className="w-full border-b-2 border-boring-gray/30 focus:border-boring-main p-2 outline-none transition-colors duration-300 bg-transparent"
          />
        </InputWrapper>

        <InputWrapper id="email">
          <FormLabel htmlFor="email" focused={focused === 'email'} hasValue={email.length > 0}>
            Email
          </FormLabel>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            required
            className="w-full border-b-2 border-boring-gray/30 focus:border-boring-main p-2 outline-none transition-colors duration-300 bg-transparent"
          />
        </InputWrapper>

        <InputWrapper id="message">
          <FormLabel htmlFor="message" focused={focused === 'message'} hasValue={message.length > 0}>
            Message
          </FormLabel>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused(null)}
            required
            rows={4}
            className="w-full border-b-2 border-boring-gray/30 focus:border-boring-main p-2 outline-none transition-colors duration-300 bg-transparent resize-none"
          />
        </InputWrapper>

        <div className="flex items-center mb-8">
          <AnimatedCheckbox
            checked={subscribeToNewsletter}
            onChange={() => setSubscribeToNewsletter(!subscribeToNewsletter)}
            id="newsletter"
            label="Subscribe to newsletter"
          />
        </div>

        <div className="text-right">
          <RippleButton
            type="submit"
            className="bg-boring-main text-boring-offwhite px-6 py-2 rounded-md font-medium hover:shadow-md transition-all"
          >
            Send Message
          </RippleButton>
        </div>
      </form>
    </ScrollReveal>
  );
};

export default ContactForm; 