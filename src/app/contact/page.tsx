"use client";

import React, { useState, useRef, useEffect } from 'react';

interface FormData {
  name: string;
  subject: string;
  email: string;
  body: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    subject: '',
    email: '',
    body: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea when body changes
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = `${ta.scrollHeight}px`;
    }
  }, [formData.body]);

  // Hide banner after 5 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (success) {
      timer = setTimeout(() => setSuccess(false), 5000);
    }
    return () => clearTimeout(timer);
  }, [success]);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (formData.name.trim().length < 3) {
      errs.name = 'Full name must be at least 3 characters.';
    }
    if (formData.subject.trim().length < 3) {
      errs.subject = 'Subject must be at least 3 characters.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (formData.body.trim().length < 3) {
      errs.body = 'Message must be at least 3 characters.';
    }
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Contact form submitted:', formData);
      setFormData({ name: '', subject: '', email: '', body: '' });
      setErrors({});
      setSuccess(true);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white pt-40 mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">Contact Us</h1>
      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-800 rounded-md">
          Thank you! Your message has been sent.
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="body" className="block text-sm font-medium mb-1">Message</label>
          <textarea
            ref={textareaRef}
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none overflow-hidden"
            rows={1}
          />
          {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-400 hover:bg-purple-500 text-white font-medium rounded-md px-4 py-2 transition"
        >Submit</button>
      </form>
    </div>
  );
};

export default ContactPage;
