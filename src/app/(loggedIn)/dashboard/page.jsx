"use client";

import axios from 'axios';
import React, { useState } from 'react';

const checkboxOptions = [
  { id: 'opt1', label: 'Include AI Analysis', value: 'ai_analysis' },
  { id: 'opt2', label: 'Generate Summary', value: 'summary' },
  { id: 'opt3', label: 'Translate to Spanish', value: 'translate_es' },
  { id: 'opt4', label: 'Check for Plagiarism', value: 'plagiarism_check' },
  { id: 'opt5', label: 'Format for Web', value: 'format_web' },
  { id: 'opt6', label: 'Add Keywords', value: 'add_keywords' },
  { id: 'opt7', label: 'Optimize for SEO', value: 'optimize_seo' },
  { id: 'opt8', label: 'Proofread Content', value: 'proofread' },
];

export default function MyStateForm() {
  const [largeText, setLargeText] = useState('');
  const [smallText, setSmallText] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [errors, setErrors] = useState({});

  const handleLargeTextChange = (e) => {
    setLargeText(e.target.value);
    if (errors.largeText && e.target.value.trim() !== '') {
      setErrors(prev => ({ ...prev, largeText: '' }));
    }
  };

  const handleSmallTextChange = (e) => {
    setSmallText(e.target.value);
    if (e.target.value.length > 200) {
      setErrors(prev => ({ ...prev, smallText: 'Max 200 characters reached' }));
    } else {
      setErrors(prev => ({ ...prev, smallText: '' }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prevSelectedOptions) => {
      if (checked) {
        return [...prevSelectedOptions, value];
      } else {
        return prevSelectedOptions.filter((option) => option !== value);
      }
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (largeText.trim() === '') {
      newErrors.largeText = 'Main content is required';
    }
    if (smallText.length > 200) {
      newErrors.smallText = 'Brief description exceeds 200 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      var formData = {
        largeText,
        smallText,
        selectedOptions,
      };
    }
    const backupData = formData;
    setLargeText("")
    setSmallText("")
    setSelectedOptions([])
    await axios.post("/api/website-generation",backupData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center p-4 font-inter">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-200">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Content Generation Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Large Text Area */}
          <div>
            <label htmlFor="largeText" className="block text-lg font-medium text-gray-700 mb-2">
              Main Content Input
            </label>
            <textarea
              id="largeText"
              rows="10"
              placeholder="Enter your main content here..."
              value={largeText}
              onChange={handleLargeTextChange}
              className={`w-full p-4 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-y text-gray-800 placeholder-gray-400 text-base ${
                errors.largeText ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.largeText && <p className="mt-1 text-sm text-red-600">{errors.largeText}</p>}
          </div>

          {/* Small Text Area */}
          <div>
            <label htmlFor="smallText" className="block text-lg font-medium text-gray-700 mb-2">
              Brief Description
            </label>
            <textarea
              id="smallText"
              rows="3"
              placeholder="Provide a short description (optional)..."
              value={smallText}
              onChange={handleSmallTextChange}
              className={`w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-y text-gray-800 placeholder-gray-400 text-sm ${
                errors.smallText ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.smallText && <p className="mt-1 text-sm text-red-600">{errors.smallText}</p>}
          </div>

          {/* Checkbox Selections */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Select Generation Options
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {checkboxOptions.map((option) => (
                <div key={option.id} className="flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    id={option.id}
                    value={option.value}
                    checked={selectedOptions.includes(option.value)}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor={option.id} className="ml-3 text-base text-gray-800 cursor-pointer">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-300 ease-in-out text-xl
                         hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Generate Content
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
