import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react'; 
import axios from 'axios';

const ContactForm = () => { 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isError, setIsError] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { 
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    };

    setIsSubmitted(false); 
    setIsError(false); 
    setSubmitMessage('Sending your message...'); 

    try {
      await axios.post('/api/contact', formData);

      setIsSubmitted(true);
      setSubmitMessage('Your message has been sent successfully!');

      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');
      setMessage('');

    } catch (error) {
      console.error('Error submitting form:', error);
      setIsError(true);
      setSubmitMessage('Failed to send message. Please try again later.');
    } finally {
      setTimeout(() => {
        setIsSubmitted(false);
        setIsError(false);
        setSubmitMessage('');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-inter">
      <div className="bg-gray-800 rounded-2xl shadow-lg flex flex-col lg:flex-row w-full max-w-6xl overflow-hidden">
        <div className="lg:w-1/2 p-8 lg:p-16 bg-gray-900 text-white flex flex-col justify-center rounded-l-2xl">
          <h2 className="text-4xl font-bold mb-6 text-white">Get in touch</h2>
          <p className="text-gray-300 mb-10 leading-relaxed">
            Proin volutpat consequat porttitor cras nullam gravida at. Orci molestie a eu arcu. Sed ut tincidunt integer elementum id sem. Arcu sed malesuada et magna.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin className="text-gray-400 mr-4 mt-1" size={20} />
              <p className="text-gray-300">
                545 Mavis Island <br />
                Chicago, IL 99191
              </p>
            </div>
            <div className="flex items-center">
              <Phone className="text-gray-400 mr-4" size={20} />
              <p className="text-gray-300">+1 (555) 234-5678</p>
            </div>
            <div className="flex items-center">
              <Mail className="text-gray-400 mr-4" size={20} />
              <p className="text-gray-300">hello@example.com</p>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 p-8 lg:p-16 bg-gray-800 flex flex-col justify-center rounded-r-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-300 mb-2">
                  First name
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-300 mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                required
              />
            </div>

            <div>
              <label htmlFor="phone-number" className="block text-sm font-medium text-gray-300 mb-2">
                Phone number
              </label>
              <input
                type="tel"
                id="phone-number"
                name="phone-number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 resize-y"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-300"
            >
              Send message
            </button>

            {submitMessage && (
              <div className={`mt-4 p-3 rounded-lg text-center ${isError ? 'bg-red-500' : 'bg-green-500'} text-white`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
