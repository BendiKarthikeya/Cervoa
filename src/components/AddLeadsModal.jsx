import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const AddLeadsModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    // Person filters
    personTitleIncludes: [],
    personTitleExtraIncludes: [],
    includeSimilarTitles: false,
    seniorityIncludes: [],
    personFunctionIncludes: [],
    personLocationCountryIncludes: [],
    
    // Company filters
    companyEmployeeSizeIncludes: [],
    companyIndustryIncludes: [],
    companyLocationCountryIncludes: [],
    companyKeywordIncludes: [],
    
    // Email/Phone filters
    emailStatus: 'verified',
    hasEmail: true,
    hasPhone: false,
    
    // Results
    totalResults: 100,
    resetSavedProgress: false
  });

  const [customTitle, setCustomTitle] = useState('');
  const [customKeyword, setCustomKeyword] = useState('');

  const jobTitles = [
    'Founder', 'Chief Executive Officer', 'Co-Founder', 'Director Of Marketing',
    'Chief Operating Officer', 'Chief Technology Officer', 'Chief Financial Officer',
    'VP of Sales', 'VP of Marketing', 'Sales Director', 'Marketing Manager',
    'Head of Sales', 'Account Executive', 'Business Development Manager',
    'Director Of Operations', 'Director Of Sales', 'CEO & Founder'
  ];

  const seniorityLevels = [
    'C-Suite', 'VP', 'Director', 'Manager', 'Senior', 'Owner', 'Founder'
  ];

  const departments = [
    'Sales', 'Marketing', 'Engineering', 'Operations', 'Finance',
    'Human Resources', 'Product Management', 'Business Development'
  ];

  const countries = [
    'United States', 'United Kingdom', 'India', 'Canada', 'Australia',
    'Germany', 'France', 'Netherlands', 'Brazil', 'Mexico'
  ];

  const industries = [
    'Technology', 'Software', 'SaaS', 'E-commerce', 'Financial Services',
    'Healthcare', 'Insurance', 'Manufacturing', 'Retail', 'Education',
    'Media & Entertainment', 'Telecommunications', 'Real Estate',
    'Consumer Goods', 'Apparel & Fashion', 'Internet'
  ];

  const companySizes = [
    '1-10', '11-20', '21-50', '51-100', '101-200',
    '201-500', '501-1000', '1001-2000', '2001-5000', '5001-10000', '10001+'
  ];

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const handleAddCustomTitle = () => {
    if (customTitle && !formData.personTitleExtraIncludes.includes(customTitle)) {
      setFormData(prev => ({
        ...prev,
        personTitleExtraIncludes: [...prev.personTitleExtraIncludes, customTitle]
      }));
      setCustomTitle('');
    }
  };

  const handleAddCustomKeyword = () => {
    if (customKeyword && !formData.companyKeywordIncludes.includes(customKeyword)) {
      setFormData(prev => ({
        ...prev,
        companyKeywordIncludes: [...prev.companyKeywordIncludes, customKeyword]
      }));
      setCustomKeyword('');
    }
  };

  const handleRemoveItem = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter(v => v !== value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800/95 border border-blue-400/30 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800/95 border-b border-blue-400/20 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Plus size={24} className="text-cyan-400" />
            Add New Leads
          </h2>
          <button
            onClick={onClose}
            className="text-blue-300 hover:text-white transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Person Information */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-blue-400/20 pb-2">
              👤 Person Information
            </h3>

            {/* Job Titles */}
            <div>
              <label className="block text-blue-300 font-semibold mb-2 text-sm">Job Titles</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                {jobTitles.map(title => (
                  <label key={title} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.personTitleIncludes.includes(title)}
                      onChange={() => handleMultiSelect('personTitleIncludes', title)}
                      className="w-4 h-4 rounded border-blue-400/30 bg-slate-700 text-cyan-500"
                    />
                    <span className="text-blue-300 text-sm">{title}</span>
                  </label>
                ))}
              </div>
              
              {/* Custom Title Input */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Add custom title..."
                  className="flex-1 px-3 py-2 bg-slate-700 border border-blue-400/20 rounded-lg text-white placeholder-blue-300/50 text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddCustomTitle}
                  className="px-4 py-2 bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 rounded-lg hover:bg-cyan-500/30 transition-colors text-sm"
                >
                  Add
                </button>
              </div>

              {/* Display custom titles */}
              {formData.personTitleExtraIncludes.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-slate-700/30 rounded-lg">
                  {formData.personTitleExtraIncludes.map(title => (
                    <span key={title} className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 rounded-full text-sm flex items-center gap-2">
                      {title}
                      <button
                        type="button"
                        onClick={() => handleRemoveItem('personTitleExtraIncludes', title)}
                        className="text-cyan-400 hover:text-cyan-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Seniority Level */}
            <div>
              <label className="block text-blue-300 font-semibold mb-2 text-sm">Seniority Level</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {seniorityLevels.map(level => (
                  <label key={level} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.seniorityIncludes.includes(level)}
                      onChange={() => handleMultiSelect('seniorityIncludes', level)}
                      className="w-4 h-4 rounded border-blue-400/30 bg-slate-700 text-cyan-500"
                    />
                    <span className="text-blue-300 text-sm">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-blue-300 font-semibold mb-2 text-sm">Department/Function</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {departments.map(dept => (
                  <label key={dept} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.personFunctionIncludes.includes(dept)}
                      onChange={() => handleMultiSelect('personFunctionIncludes', dept)}
                      className="w-4 h-4 rounded border-blue-400/30 bg-slate-700 text-cyan-500"
                    />
                    <span className="text-blue-300 text-sm">{dept}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Person Location */}
            <div>
              <label className="block text-blue-300 font-semibold mb-2 text-sm">Person Location (Country)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {countries.map(country => (
                  <label key={country} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.personLocationCountryIncludes.includes(country)}
                      onChange={() => handleMultiSelect('personLocationCountryIncludes', country)}
                      className="w-4 h-4 rounded border-blue-400/30 bg-slate-700 text-cyan-500"
                    />
                    <span className="text-blue-300 text-sm">{country}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Include Similar Titles */}
            <label className="flex items-center gap-2 cursor-pointer p-3 bg-slate-700/30 rounded-lg">
              <input
                type="checkbox"
                checked={formData.includeSimilarTitles}
                onChange={(e) => setFormData(prev => ({ ...prev, includeSimilarTitles: e.target.checked }))}
                className="w-4 h-4 rounded border-blue-400/30 bg-slate-700 text-cyan-500"
              />
              <span className="text-blue-300 text-sm">Include people with similar titles</span>
            </label>
          </section>

          {/* Company Information */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-blue-400/20 pb-2">
              🏢 Company Information
            </h3>

            {/* Company Location */}
            <div>
              <label className="block text-blue-300 font-semibold mb-2 text-sm">Company Country</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {countries.map(country => (
                  <label key={country} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.companyLocationCountryIncludes.includes(country)}
                      onChange={() => handleMultiSelect('companyLocationCountryIncludes', country)}
                      className="w-4 h-4 rounded border-blue-400/30 bg-slate-700 text-cyan-500"
                    />
                    <span className="text-blue-300 text-sm">{country}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Company Size */}
            <div>
              <label className="block text-blue-300 font-semibold mb-2 text-sm">Employee Range</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {companySizes.map(size => (
                  <label key={size} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.companyEmployeeSizeIncludes.includes(size)}
                      onChange={() => handleMultiSelect('companyEmployeeSizeIncludes', size)}
                      className="w-4 h-4 rounded border-blue-400/30 bg-slate-700 text-cyan-500"
                    />
                    <span className="text-blue-300 text-sm">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-blue-300 font-semibold mb-2 text-sm">Industry</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {industries.map(industry => (
                  <label key={industry} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.companyIndustryIncludes.includes(industry)}
                      onChange={() => handleMultiSelect('companyIndustryIncludes', industry)}
                      className="w-4 h-4 rounded border-blue-400/30 bg-slate-700 text-cyan-500"
                    />
                    <span className="text-blue-300 text-sm">{industry}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Company Keywords */}
            <div>
              <label className="block text-blue-300 font-semibold mb-2 text-sm">Company Keywords</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={customKeyword}
                  onChange={(e) => setCustomKeyword(e.target.value)}
                  placeholder="Add keyword (e.g., 'AI', 'software')..."
                  className="flex-1 px-3 py-2 bg-slate-700 border border-blue-400/20 rounded-lg text-white placeholder-blue-300/50 text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddCustomKeyword}
                  className="px-4 py-2 bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 rounded-lg hover:bg-cyan-500/30 transition-colors text-sm"
                >
                  Add
                </button>
              </div>

              {/* Display custom keywords */}
              {formData.companyKeywordIncludes.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-slate-700/30 rounded-lg">
                  {formData.companyKeywordIncludes.map(keyword => (
                    <span key={keyword} className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 rounded-full text-sm flex items-center gap-2">
                      {keyword}
                      <button
                        type="button"
                        onClick={() => handleRemoveItem('companyKeywordIncludes', keyword)}
                        className="text-cyan-400 hover:text-cyan-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Contact Quality */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-blue-400/20 pb-2">
              ✉️ Contact Quality
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-blue-300 font-semibold mb-2 text-sm">Email Status</label>
                <select
                  value={formData.emailStatus}
                  onChange={(e) => setFormData(prev => ({ ...prev, emailStatus: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 border border-blue-400/20 rounded-lg text-white text-sm"
                >
                  <option value="verified">Verified Only</option>
                  <option value="unverified">Unverified</option>
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer p-3 bg-slate-700/30 rounded-lg">
                <input
                  type="checkbox"
                  checked={formData.hasEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, hasEmail: e.target.checked }))}
                  className="w-4 h-4 rounded border-blue-400/30 bg-slate-700 text-cyan-500"
                />
                <span className="text-blue-300 text-sm">Must have email</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-3 bg-slate-700/30 rounded-lg">
                <input
                  type="checkbox"
                  checked={formData.hasPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, hasPhone: e.target.checked }))}
                  className="w-4 h-4 rounded border-blue-400/30 bg-slate-700 text-cyan-500"
                />
                <span className="text-blue-300 text-sm">Must have phone</span>
              </label>
            </div>
          </section>

          {/* Results */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-blue-400/20 pb-2">
              📊 Results
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-blue-300 font-semibold mb-2 text-sm">Total Results to Fetch (Max: 50,000)</label>
                <input
                  type="number"
                  value={formData.totalResults}
                  onChange={(e) => setFormData(prev => ({ ...prev, totalResults: Math.min(50000, parseInt(e.target.value) || 0) }))}
                  min="1"
                  max="50000"
                  className="w-full px-3 py-2 bg-slate-700 border border-blue-400/20 rounded-lg text-white text-sm"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer p-3 bg-slate-700/30 rounded-lg h-fit">
                <input
                  type="checkbox"
                  checked={formData.resetSavedProgress}
                  onChange={(e) => setFormData(prev => ({ ...prev, resetSavedProgress: e.target.checked }))}
                  className="w-4 h-4 rounded border-blue-400/30 bg-slate-700 text-cyan-500"
                />
                <span className="text-blue-300 text-sm">Reset saved progress</span>
              </label>
            </div>
          </section>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-blue-400/20">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/30"
            >
              Send to n8n Workflow
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-700 text-blue-300 font-bold rounded-lg hover:bg-slate-600 transition-all border border-blue-400/20"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadsModal;
