import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate, useParams, useNavigate } from 'react-router-dom';
import { postalService } from './services/dataService';
import { PostalRecord, SearchType, SearchFilters, DashboardStats } from './types';

// --- Helper Components ---

// Manages Document Title, Favicon, and Meta Description dynamically
const SiteMeta = () => {
  useEffect(() => {
    const updateMeta = () => {
      const title = localStorage.getItem('site_title') || 'Zip Code Finder';
      const desc = localStorage.getItem('site_desc') || 'A modern, aesthetic Pakistan Pincode Finder.';
      const favicon = localStorage.getItem('site_favicon');

      // Update Title
      document.title = title;

      // Update Meta Description
      let metaDesc = document.querySelector("meta[name='description']");
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', desc);

      // Update Favicon
      if (favicon) {
        let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.head.appendChild(link);
        }
        link.href = favicon;
      }

      // Inject Custom Code (AdSense, Custom Meta, Analytics)
      const injectCustomCode = () => {
          const head = document.head;
          const id = 'custom-injected-code';
          let container = document.getElementById(id);
          if(container) container.remove();
          
          const adsense = localStorage.getItem('site_adsense') || '';
          const meta = localStorage.getItem('site_custom_meta') || '';
          const analytics = localStorage.getItem('site_analytics_head') || '';

          if (adsense || meta || analytics) {
              container = document.createElement('div');
              container.id = id;
              // Container is hidden, but its contents (scripts/meta) work in head
              container.style.display = 'none'; 
              
              try {
                  // Create a range to parse HTML string into nodes (executes scripts)
                  const range = document.createRange();
                  range.selectNode(head);
                  // Combine all code blocks
                  const fragment = range.createContextualFragment(meta + analytics + adsense);
                  container.appendChild(fragment);
                  head.appendChild(container);
              } catch (e) {
                  console.error("Failed to inject custom code", e);
              }
          }
      };
      injectCustomCode();
    };

    updateMeta();
    // Listen for storage changes (optional, mostly for multi-tab sync, but good practice)
    window.addEventListener('storage', updateMeta);
    window.addEventListener('site-config-updated', updateMeta);
    return () => {
        window.removeEventListener('storage', updateMeta);
        window.removeEventListener('site-config-updated', updateMeta);
    };
  }, []);

  return null;
};

// --- Components ---

// 1. Navbar
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [siteName, setSiteName] = useState('Zip Code Finder');
  const [siteLogo, setSiteLogo] = useState('');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Initial load
    setSiteName(localStorage.getItem('site_name') || 'Zip Code Finder');
    setSiteLogo(localStorage.getItem('site_logo') || '');

    // Custom event listener for instant updates from Admin panel
    const handleConfigChange = () => {
        setSiteName(localStorage.getItem('site_name') || 'Zip Code Finder');
        setSiteLogo(localStorage.getItem('site_logo') || '');
    };
    window.addEventListener('site-config-updated', handleConfigChange);
    return () => window.removeEventListener('site-config-updated', handleConfigChange);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-purple-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              {siteLogo ? (
                <img src={siteLogo} alt="Logo" className="w-8 h-8 object-contain rounded-lg" />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
                    <i className="fa-solid fa-map-location-dot"></i>
                </div>
              )}
              <span className="font-bold text-xl text-gray-800 dark:text-white tracking-tight">
                {siteName.split(' ').map((word, i) => (
                    <span key={i} className={i === 1 ? "text-[#8B5CF6]" : ""}>{word} </span>
                ))}
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-[#8B5CF6] dark:hover:text-[#8B5CF6] font-medium transition">Home</Link>
            <Link to="/features" className="text-gray-600 dark:text-gray-300 hover:text-[#8B5CF6] dark:hover:text-[#8B5CF6] font-medium transition">Features</Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-[#8B5CF6] dark:hover:text-[#8B5CF6] font-medium transition">About</Link>
            <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-[#8B5CF6] dark:hover:text-[#8B5CF6] font-medium transition">Contact</Link>
            <Link to="/admin" className="px-5 py-2 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#8B5CF6] transition shadow-sm">Admin Login</Link>
            <button 
              onClick={toggleTheme} 
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center justify-center"
              aria-label="Toggle Dark Mode"
            >
              <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="text-gray-600 dark:text-yellow-400"
            >
              <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-xl`}></i>
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-white hover:text-[#8B5CF6] focus:outline-none">
              <i className={`fa-solid ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-purple-100 dark:border-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-[#8B5CF6] hover:bg-purple-50 dark:hover:bg-gray-800">Home</Link>
             <Link to="/features" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-[#8B5CF6] hover:bg-purple-50 dark:hover:bg-gray-800">Features</Link>
             <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-[#8B5CF6] hover:bg-purple-50 dark:hover:bg-gray-800">About</Link>
             <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-[#8B5CF6] hover:bg-purple-50 dark:hover:bg-gray-800">Contact</Link>
             <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-[#8B5CF6] hover:bg-purple-50 dark:hover:bg-gray-800">Admin</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

// 2. Home Page Components
const SearchTabs = ({ activeTab, setActiveTab }: { activeTab: SearchType, setActiveTab: (t: SearchType) => void }) => {
  const tabs = [
    { type: SearchType.PINCODE, icon: 'fa-hashtag' },
    { type: SearchType.CITY, icon: 'fa-city' },
    { type: SearchType.STATE, icon: 'fa-map' },
    { type: SearchType.OFFICE, icon: 'fa-building' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.type}
          onClick={() => setActiveTab(tab.type)}
          className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 border backdrop-blur-md
            ${activeTab === tab.type 
              ? 'bg-white text-[#8B5CF6] border-white shadow-lg transform scale-105 ring-2 ring-purple-200 ring-opacity-50 dark:ring-purple-900' 
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40'}`}
        >
          <i className={`fa-solid ${tab.icon}`}></i>
          {tab.type}
        </button>
      ))}
    </div>
  );
};

const ResultCard: React.FC<{ record: PostalRecord }> = ({ record }) => {
  const [copied, setCopied] = useState(false);
  const [shareStatus, setShareStatus] = useState('');

  // Robust copy helper
  const copyText = async (text: string): Promise<boolean> => {
    try {
      // Try modern API first
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('Clipboard API failed, trying legacy fallback', err);
      // Legacy fallback for iframes/older browsers
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Ensure it's not visible but part of the DOM
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
      } catch (fallbackErr) {
        console.error('Legacy copy failed', fallbackErr);
        return false;
      }
    }
  };

  const handleCopyPincode = async () => {
    if (record.pincode) {
      const success = await copyText(record.pincode);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleCopyDetails = async () => {
    const details = `Postal Office: ${record.officeName}
Type: ${record.officeType || 'Sub Post Office'}
Pincode: ${record.pincode}
City: ${record.city}
District: ${record.district}
Province: ${record.province}
Country: ${record.country}
Delivery Status: ${record.deliveryStatus}

Find any Post or Zip Code instantly!
We appreciate you using our website.
Need more info? Visit: https://mrshahzad.com`;

    const success = await copyText(details);
    if (success) {
      setShareStatus('Copied');
    } else {
      setShareStatus('Failed');
    }
    setTimeout(() => setShareStatus(''), 2000);
  };

  const handleViewMap = () => {
      const query = `${record.officeName}, ${record.city}, ${record.province}, Pakistan`;
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 hover:scale-[1.02] hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full">
      <div className="p-5 flex-grow">
        {/* Header: Name and Status */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 leading-tight pr-2">{record.officeName}</h3>
          <div className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
            record.deliveryStatus === 'Delivery' 
            ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800' 
            : 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800'
          }`}>
            <i className={`fa-solid ${record.deliveryStatus === 'Delivery' ? 'fa-circle-check' : 'fa-circle-xmark'}`}></i>
            {record.deliveryStatus === 'Delivery' ? 'Delivery' : 'Non-Delivery'}
          </div>
        </div>
        
        {/* Pincode Badge with Copy Functionality */}
        <div className="mb-5 flex items-center gap-2">
           <button 
             onClick={handleCopyPincode}
             className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white px-4 py-1.5 rounded-lg font-bold text-lg shadow-sm hover:opacity-90 transition-opacity focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-800"
             title="Copy Pincode"
           >
              {record.pincode}
              <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'} text-xs ml-1 opacity-75 group-hover:opacity-100 transition-opacity`}></i>
           </button>
           
           {copied && (
             <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-md border border-emerald-100 dark:border-emerald-800 animate-pulse flex items-center">
               <i className="fa-solid fa-check-circle mr-1"></i> Copied!
             </span>
           )}
        </div>

        {/* Details List */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-3 text-sm">
             <i className="fa-solid fa-map-location w-5 text-[#8B5CF6] text-center"></i>
             <span className="font-bold text-gray-700 dark:text-gray-300">District:</span>
             <span className="text-gray-600 dark:text-gray-400">{record.district}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
             <i className="fa-solid fa-flag w-5 text-[#EC4899] text-center"></i>
             <span className="font-bold text-gray-700 dark:text-gray-300">State:</span>
             <span className="text-gray-600 dark:text-gray-400">{record.province}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
             <i className="fa-solid fa-globe w-5 text-blue-500 text-center"></i>
             <span className="font-bold text-gray-700 dark:text-gray-300">Country:</span>
             <span className="text-gray-600 dark:text-gray-400">{record.country}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
             <i className="fa-solid fa-city w-5 text-indigo-500 text-center"></i>
             <span className="font-bold text-gray-700 dark:text-gray-300">Location:</span>
             <span className="text-gray-600 dark:text-gray-400">{record.city}</span>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-100 dark:border-gray-700 mx-5"></div>

      {/* Footer Actions */}
      <div className="p-5 pt-3 flex justify-between items-end">
         <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Type</span>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{record.officeType || 'Sub Post Office'}</span>
         </div>
         
         <div className="flex gap-4">
             <button 
                onClick={handleViewMap}
                className="group flex flex-col items-center gap-0.5 text-gray-400 dark:text-gray-500 hover:text-[#8B5CF6] dark:hover:text-[#8B5CF6] transition-colors"
             >
                  <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-700 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/50 flex items-center justify-center transition-colors">
                     <i className="fa-solid fa-map-location-dot text-sm"></i>
                  </div>
                  <span className="text-[10px] font-bold">View Map</span>
             </button>
             <button 
                onClick={handleCopyDetails}
                className="group flex flex-col items-center gap-0.5 text-gray-400 dark:text-gray-500 hover:text-[#EC4899] dark:hover:text-[#EC4899] transition-colors"
             >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${shareStatus ? 'bg-pink-100 dark:bg-pink-900/50 text-[#EC4899]' : 'bg-gray-50 dark:bg-gray-700 group-hover:bg-pink-50 dark:group-hover:bg-pink-900/50'}`}>
                     <i className={`fa-solid ${shareStatus === 'Copied' ? 'fa-check' : 'fa-copy'} text-sm`}></i>
                  </div>
                  <span className="text-[10px] font-bold">{shareStatus || 'Copy'}</span>
             </button>
         </div>
      </div>
    </div>
  );
};

const FilterBar = ({ 
    filters, 
    setFilters, 
    provinces, 
    districts 
}: { 
    filters: SearchFilters, 
    setFilters: any, 
    provinces: string[], 
    districts: string[] 
}) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center transition-colors">
        <select 
            className="w-full sm:w-48 bg-white dark:bg-gray-700 px-4 py-2.5 rounded-full border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] outline-none cursor-pointer hover:border-purple-200 dark:hover:border-purple-700 transition shadow-sm"
            value={filters.province}
            onChange={(e) => setFilters({...filters, province: e.target.value, district: ''})}
        >
            <option value="">All States</option>
            {provinces.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        <select 
            className="w-full sm:w-48 bg-white dark:bg-gray-700 px-4 py-2.5 rounded-full border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] outline-none cursor-pointer hover:border-purple-200 dark:hover:border-purple-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            value={filters.district}
            onChange={(e) => setFilters({...filters, district: e.target.value})}
            disabled={!districts.length}
        >
            <option value="">{filters.province ? 'All Districts' : 'Select State First'}</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        
        <select 
            className="w-full sm:w-48 bg-white dark:bg-gray-700 px-4 py-2.5 rounded-full border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] outline-none cursor-pointer hover:border-purple-200 dark:hover:border-purple-700 transition shadow-sm"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
        >
            <option value="">All Delivery Status</option>
            <option value="Delivery">Delivery</option>
            <option value="Non-Delivery">Non-Delivery</option>
        </select>

        { (filters.province || filters.district || filters.status) && 
            <button 
                onClick={() => setFilters({ province: '', district: '', status: '' })}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold transition hover:shadow-lg transform hover:-translate-y-0.5"
            >
                <i className="fa-solid fa-xmark mr-2"></i> Clear Filters
            </button>
        }
    </div>
);

// --- Modern Card Components for Quick Access ---

const PincodeCard = ({ code, city, province, onClick }: any) => (
  <div 
    onClick={onClick}
    className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform origin-top-right"></div>
    
    <div className="relative z-10">
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]">
          {code}
        </span>
      </div>
      <h3 className="text-gray-800 dark:text-gray-100 font-bold text-lg leading-tight">{city}</h3>
      <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">{province}</p>
    </div>

    <div className="mt-6 flex items-center text-sm font-bold text-[#8B5CF6] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
      <span>Search Now</span>
      <i className="fa-solid fa-arrow-right ml-2"></i>
    </div>
  </div>
);

const CityCard = ({ city, province, onClick }: any) => (
  <div 
    onClick={onClick}
    className="group bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-purple-200 dark:hover:border-purple-700 transition-all cursor-pointer flex items-center gap-4"
  >
    <div className="w-14 h-14 rounded-xl bg-gray-50 dark:bg-gray-700 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/30 flex items-center justify-center text-gray-400 dark:text-gray-400 group-hover:text-[#8B5CF6] transition-colors duration-300">
      <i className="fa-solid fa-city text-xl"></i>
    </div>
    <div>
      <h3 className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-[#8B5CF6] transition-colors">{city}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{province}</p>
    </div>
  </div>
);

const OfficeCard = ({ name, location, onClick }: any) => (
  <div 
    onClick={onClick}
    className="group bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all cursor-pointer relative overflow-hidden"
  >
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8B5CF6] to-[#EC4899] opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className="flex items-start justify-between">
        <div>
            <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm mb-1 group-hover:text-[#EC4899] transition-colors">{name}</h3>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <i className="fa-solid fa-location-dot mr-1.5 text-gray-300 dark:text-gray-600"></i>
                {location}
            </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:bg-pink-50 dark:group-hover:bg-pink-900/30 group-hover:text-[#EC4899] transition-all">
             <i className="fa-solid fa-building text-xs"></i>
        </div>
    </div>
  </div>
);

const SectionTitle = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            {title}
        </h2>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">{subtitle}</p>
    </div>
);

const Home = () => {
  const [activeTab, setActiveTab] = useState<SearchType>(SearchType.PINCODE);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PostalRecord[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({ province: '', district: '', status: '' });
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [siteName, setSiteName] = useState('Pakistan');

  // Derived state: We only show results if user has typed something or selected a filter
  const hasActiveFilters = filters.province !== '' || filters.district !== '' || filters.status !== '';
  const showResults = query.trim().length > 0 || hasActiveFilters;

  // Initial Load
  useEffect(() => {
    const allData = postalService.getAll();
    setResults(allData);
    setProvinces(Array.from(new Set(allData.map(d => d.province))).sort());
    setDistricts(postalService.getDistricts()); // Initial all districts
    setSiteName(localStorage.getItem('site_name')?.replace('Zip Code Finder', '') || 'Pakistan');
  }, []);

  // Update Districts when Province changes
  useEffect(() => {
      setDistricts(postalService.getDistricts(filters.province));
  }, [filters.province]);

  // Search Logic
  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      
      let data = postalService.search(query, activeTab as any);
      
      // Apply Filters
      if (filters.province) data = data.filter(d => d.province === filters.province);
      if (filters.district) data = data.filter(d => d.district === filters.district);
      if (filters.status) data = data.filter(d => d.deliveryStatus === filters.status);
      
      setResults(data);
      setLoading(false);
    };
    performSearch();
  }, [query, activeTab, filters]);

  const handleStartOver = () => {
      setQuery('');
      setFilters({ province: '', district: '', status: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 font-inter transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#8B5CF6] via-[#a855f7] to-[#EC4899] pt-32 pb-48 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        {/* Decorational Blobs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-pink-300 opacity-20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-5xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-sm">
                Search {siteName} <span className="text-yellow-300">Pincodes</span>
            </h1>
            <p className="text-lg sm:text-xl text-purple-100 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                Find complete postal information instantly. Locate pincodes, districts, and post office details.
            </p>

            {/* Search Container - Modern Glass & Floating Card */}
            <div className="max-w-3xl mx-auto">
                <SearchTabs activeTab={activeTab} setActiveTab={(t) => { setActiveTab(t); setResults([]); setQuery(''); }} />
                
                <div className="relative group">
                    {/* Glow effect behind */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    
                    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex items-center p-2 transition-transform transform focus-within:scale-[1.01]">
                         {/* Icon */}
                         <div className="pl-6 pr-3 text-gray-400 dark:text-gray-500 text-xl">
                             <i className="fa-solid fa-magnifying-glass"></i>
                         </div>
                         
                         {/* Input */}
                         <input 
                             type="text" 
                             value={query}
                             onChange={(e) => setQuery(e.target.value)}
                             placeholder={`Search by ${activeTab}...`}
                             className="flex-grow py-4 px-2 text-gray-800 dark:text-gray-100 bg-transparent outline-none text-lg placeholder-gray-400 dark:placeholder-gray-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                         />
                         
                         {/* Action Button */}
                         <button 
                            className={`bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] hover:from-[#7c3aed] hover:to-[#db2777] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-purple-200 dark:shadow-none transition-all transform active:scale-95 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none`}
                         >
                            {loading ? (
                                <>
                                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                                    <span>Searching...</span>
                                </>
                            ) : (
                                <>
                                    <span>Search</span>
                                    <i className="fa-solid fa-arrow-right text-xs"></i>
                                </>
                            )}
                         </button>
                    </div>
                </div>
                
                <div className="mt-6 text-purple-100 text-sm font-medium opacity-80">
                    Instant results • Comprehensive Database • Smart Filters
                </div>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
         <FilterBar filters={filters} setFilters={setFilters} provinces={provinces} districts={districts} />

         {showResults ? (
            <>
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-3">
                        <i className="fa-solid fa-circle-check text-emerald-500 text-2xl"></i>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Results Found</h2>
                        <span className="hidden sm:block text-gray-400 dark:text-gray-500 text-sm font-medium border-l pl-3 border-gray-300 dark:border-gray-600">
                             {results.length} matches found
                        </span>
                    </div>
                    
                    <button 
                        type="button"
                        onClick={handleStartOver}
                        className="px-5 py-2 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-bold border border-gray-200 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-500 dark:hover:text-red-400 hover:border-red-200 transition-all shadow-sm flex items-center gap-2"
                    >
                        <i className="fa-solid fa-rotate-left"></i> Start Over
                    </button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-100 dark:border-gray-700 border-t-[#8B5CF6] mb-4"></div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Searching database...</p>
                    </div>
                ) : (
                    <>
                        {results.length === 0 ? (
                            <div className="text-center py-24 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className="w-20 h-20 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fa-solid fa-magnifying-glass-location text-3xl text-gray-300 dark:text-gray-500"></i>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">No matches found</h3>
                                <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                                {results.map((record) => (
                                    <ResultCard key={record.id} record={record} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </>
         ) : null}
         
         {/* Quick Access / Popular */}
         {!showResults && (
             <div className="mb-20 space-y-16">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] mb-2">Quick Access</h2>
                    <p className="text-gray-500 dark:text-gray-400">Popular searches to get you started instantly</p>
                 </div>

                 {/* Popular Pincodes */}
                 <div>
                    <SectionTitle title="Trending Pincodes" subtitle="Most searched postal codes this week" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {pin: '44000', city: 'Islamabad', sub: 'Capital Territory'},
                            {pin: '54000', city: 'Lahore', sub: 'Punjab'},
                            {pin: '75500', city: 'Karachi', sub: 'Sindh'},
                            {pin: '25000', city: 'Peshawar', sub: 'Khyber Pakhtunkhwa'},
                            {pin: '87300', city: 'Quetta', sub: 'Balochistan'},
                            {pin: '46000', city: 'Rawalpindi', sub: 'Punjab'}
                        ].map(item => (
                             <PincodeCard 
                                key={item.pin}
                                code={item.pin}
                                city={item.city}
                                province={item.sub}
                                onClick={() => { setActiveTab(SearchType.PINCODE); setQuery(item.pin); }}
                            />
                        ))}
                    </div>
                 </div>

                 {/* Popular Cities */}
                 <div>
                    <SectionTitle title="Major Cities" subtitle="Browse pincodes by metropolitan areas" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            {city: 'Islamabad', sub: 'Federal Capital'},
                            {city: 'Lahore', sub: 'Punjab'},
                            {city: 'Karachi', sub: 'Sindh'},
                            {city: 'Peshawar', sub: 'KPK'},
                            {city: 'Quetta', sub: 'Balochistan'},
                            {city: 'Faisalabad', sub: 'Punjab'}
                        ].map(item => (
                            <CityCard 
                                key={item.city}
                                city={item.city}
                                province={item.sub}
                                onClick={() => { setActiveTab(SearchType.CITY); setQuery(item.city); }}
                            />
                        ))}
                    </div>
                 </div>

                 {/* Post Offices */}
                 <div>
                    <SectionTitle title="Popular Post Offices" subtitle="Frequently visited GPOs and branches" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            {name: 'G.P.O Islamabad', loc: 'Islamabad'}, 
                            {name: 'G.P.O Lahore', loc: 'Punjab'}, 
                            {name: 'G.P.O Karachi', loc: 'Sindh'}, 
                            {name: 'Saddar', loc: 'Rawalpindi'},
                            {name: 'Clifton', loc: 'Karachi'},
                            {name: 'Model Town', loc: 'Lahore'}
                        ].map(office => (
                            <OfficeCard 
                                key={office.name}
                                name={office.name}
                                location={office.loc}
                                onClick={() => { setActiveTab(SearchType.OFFICE); setQuery(office.name); }}
                            />
                        ))}
                    </div>
                 </div>
             </div>
         )}
      </div>
      <Footer />
    </div>
  );
};

// 3. Admin Components

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check localStorage or defaults
    const validUser = localStorage.getItem('admin_username') || 'ochgroup';
    const validPass = localStorage.getItem('admin_password') || 'cWzXJ3wz@MRS';

    if (username === validUser && password === validPass) {
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fade-in transform transition-all">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#d8b4fe] to-[#fbcfe8] rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-inner">
             <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] rounded-full flex items-center justify-center shadow-lg">
                <i className="fa-solid fa-user text-2xl"></i>
             </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
          <p className="text-gray-500 text-sm mt-1">Sign in to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-500 text-sm p-3 rounded-lg text-center font-medium flex items-center justify-center gap-2">
               <i className="fa-solid fa-circle-exclamation"></i> {error}
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition text-gray-700 bg-gray-50 focus:bg-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition text-gray-700 bg-gray-50 focus:bg-white placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white font-bold py-3.5 rounded-lg shadow-lg shadow-purple-200 hover:shadow-xl hover:opacity-95 transition transform active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-400 hover:text-[#8B5CF6] transition">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

const AdminSidebar = ({ onLogout }: { onLogout: () => void }) => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;
    
    return (
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen flex flex-col flex-shrink-0 hidden md:flex z-30 relative transition-colors">
            <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-700">
                 <span className="font-extrabold text-xl text-gray-800 dark:text-white">Admin<span className="text-[#8B5CF6]">Panel</span></span>
            </div>
            <div className="flex-1 py-6 px-3 space-y-1">
                <Link to="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${isActive('/admin') ? 'bg-purple-50 dark:bg-gray-700 text-[#8B5CF6]' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                    <i className="fa-solid fa-chart-pie w-5"></i> Dashboard
                </Link>
                <Link to="/admin/manage" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${isActive('/admin/manage') ? 'bg-purple-50 dark:bg-gray-700 text-[#8B5CF6]' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                    <i className="fa-solid fa-list-check w-5"></i> Manage Items
                </Link>
                <Link to="/admin/add" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${isActive('/admin/add') ? 'bg-purple-50 dark:bg-gray-700 text-[#8B5CF6]' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                    <i className="fa-solid fa-circle-plus w-5"></i> Add New Item
                </Link>
                <Link to="/admin/settings" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${isActive('/admin/settings') ? 'bg-purple-50 dark:bg-gray-700 text-[#8B5CF6]' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                    <i className="fa-solid fa-gear w-5"></i> Settings
                </Link>
                
                <div className="border-t border-gray-100 dark:border-gray-700 my-4 pt-4">
                    <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition text-left">
                        <i className="fa-solid fa-right-from-bracket w-5"></i> Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

const AdminDashboard = () => {
    const [stats, setStats] = useState<DashboardStats>({ 
        totalPincodes: 0, 
        totalCities: 0, 
        totalOffices: 0, 
        totalProvinces: 0,
        totalDistricts: 0,
        officesByType: {}
    });
    
    useEffect(() => {
        setStats(postalService.getStats());
    }, []);

    const StatCard = ({ title, value, icon, color, bg }: { title: string, value: number, icon: string, color: string, bg: string }) => (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center transition hover:shadow-md">
            <div className={`w-14 h-14 rounded-xl ${bg} dark:bg-opacity-10 ${color} flex items-center justify-center text-2xl mr-5`}>
                <i className={`fa-solid ${icon}`}></i>
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{value}</h3>
            </div>
        </div>
    );

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">Last updated: Just now</span>
            </div>
            
            {/* Primary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                <StatCard title="Total Pincodes" value={stats.totalPincodes} icon="fa-hashtag" color="text-blue-600 dark:text-blue-400" bg="bg-blue-50" />
                <StatCard title="Total Cities" value={stats.totalCities} icon="fa-city" color="text-purple-600 dark:text-purple-400" bg="bg-purple-50" />
                <StatCard title="Post Offices" value={stats.totalOffices} icon="fa-building" color="text-pink-600 dark:text-pink-400" bg="bg-pink-50" />
                <StatCard title="Districts" value={stats.totalDistricts} icon="fa-map-location-dot" color="text-indigo-600 dark:text-indigo-400" bg="bg-indigo-50" />
                <StatCard title="Provinces" value={stats.totalProvinces} icon="fa-map" color="text-orange-600 dark:text-orange-400" bg="bg-orange-50" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Office Types Breakdown */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Offices by Type</h2>
                    <div className="space-y-5">
                        {Object.entries(stats.officesByType)
                             .sort(([, a], [, b]) => (b as number) - (a as number)) // Sort by count descending
                             .map(([type, count]) => (
                             <div key={type}>
                                <div className="flex justify-between text-sm mb-1.5">
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{type}</span>
                                    <span className="text-gray-900 dark:text-gray-100 font-bold">{count}</span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                                    <div 
                                        className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] h-2.5 rounded-full transition-all duration-1000" 
                                        style={{ width: `${Math.max(((count as number) / stats.totalOffices) * 100, 5)}%` }}
                                    ></div>
                                </div>
                             </div>
                        ))}
                         {Object.keys(stats.officesByType).length === 0 && <p className="text-gray-500 text-sm text-center py-4">No data available</p>}
                    </div>
                </div>

                {/* System Status */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">System Status</h2>
                    <div className="space-y-4">
                         <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-green-700 dark:text-green-400 font-medium text-sm">Database Connected</span>
                            </div>
                            <i className="fa-solid fa-database text-green-400"></i>
                        </div>
                         <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                                <span className="text-blue-700 dark:text-blue-400 font-medium text-sm">Version 1.0.0</span>
                            </div>
                            <i className="fa-solid fa-code-branch text-blue-400"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EditItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState<PostalRecord | null>(null);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (id) {
            const record = postalService.getById(id);
            if (record) {
                setForm(record);
            } else {
                navigate('/admin/manage');
            }
        }
    }, [id, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form) {
            postalService.updateRecord(form);
            setMsg('Record updated successfully!');
            setTimeout(() => {
                navigate('/admin/manage');
            }, 1000);
        }
    };

    if (!form) return null;

    return (
        <div className="p-8 max-w-4xl">
             <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Postal Record</h1>
                <button onClick={() => navigate('/admin/manage')} className="text-sm text-gray-500 hover:text-[#8B5CF6] font-medium flex items-center gap-2">
                    <i className="fa-solid fa-arrow-left"></i> Back to List
                </button>
             </div>
             
             {msg && <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                 <i className="fa-solid fa-check-circle"></i> {msg}
             </div>}

             <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pincode</label>
                        <input required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-800 dark:text-gray-100" 
                            value={form.pincode} onChange={e => setForm({...form, pincode: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Office Name</label>
                        <input required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-800 dark:text-gray-100" 
                            value={form.officeName} onChange={e => setForm({...form, officeName: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
                        <input required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-800 dark:text-gray-100" 
                             value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">District</label>
                        <input required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-800 dark:text-gray-100" 
                             value={form.district} onChange={e => setForm({...form, district: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Province/State</label>
                        <select className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-800 dark:text-gray-100"
                             value={form.province} onChange={e => setForm({...form, province: e.target.value})}>
                                 {['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Islamabad', 'Gilgit-Baltistan', 'Azad Kashmir'].map(p => (
                                     <option key={p} value={p}>{p}</option>
                                 ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Delivery Status</label>
                        <select className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-800 dark:text-gray-100"
                             value={form.deliveryStatus} onChange={e => setForm({...form, deliveryStatus: e.target.value as any})}>
                            <option value="Delivery">Delivery</option>
                            <option value="Non-Delivery">Non-Delivery</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Office Type</label>
                        <select className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-800 dark:text-gray-100"
                             value={form.officeType || 'Sub Post Office'} onChange={e => setForm({...form, officeType: e.target.value})}>
                            <option value="General Post Office">General Post Office (GPO)</option>
                            <option value="Sub Post Office">Sub Post Office</option>
                            <option value="Branch Office">Branch Office</option>
                        </select>
                    </div>
                </div>
                <div className="pt-4 flex gap-4">
                    <button type="button" onClick={() => navigate('/admin/manage')} className="px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">Cancel</button>
                    <button type="submit" className="w-full md:w-auto md:min-w-[200px] py-3 bg-[#8B5CF6] hover:bg-[#7c3aed] text-white font-bold rounded-xl shadow-lg shadow-purple-200 dark:shadow-none transition">
                        <i className="fa-solid fa-save mr-2"></i> Update Record
                    </button>
                </div>
             </form>
        </div>
    );
};

const ManageItems = () => {
    const [items, setItems] = useState<PostalRecord[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setItems(postalService.getAll());
    }, []);

    const refresh = () => setItems(postalService.getAll());

    const handleDelete = (id: string) => {
        if(window.confirm("Are you sure you want to delete this record?")) {
            postalService.deleteRecord(id);
            refresh();
        }
    }

    const filteredItems = items.filter(item => 
        item.pincode.includes(search) || 
        item.officeName.toLowerCase().includes(search.toLowerCase()) ||
        item.city.toLowerCase().includes(search.toLowerCase()) ||
        item.province.toLowerCase().includes(search.toLowerCase()) ||
        item.deliveryStatus.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Items</h1>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search records..." 
                        className="pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-[#8B5CF6] outline-none w-full sm:w-64"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 font-bold uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Pincode</th>
                                <th className="px-6 py-4">Office Name</th>
                                <th className="px-6 py-4">City</th>
                                <th className="px-6 py-4">Province</th>
                                <th className="px-6 py-4">Delivery Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {filteredItems.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{item.pincode}</td>
                                    <td className="px-6 py-4">{item.officeName}</td>
                                    <td className="px-6 py-4">{item.city}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{item.province}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${
                                            item.deliveryStatus === 'Delivery' 
                                            ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800' 
                                            : 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800'
                                        }`}>
                                            {item.deliveryStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-3">
                                        <Link 
                                            to={`/admin/edit/${item.id}`}
                                            className="text-[#8B5CF6] hover:text-[#7c3aed] font-medium transition"
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-500 hover:text-red-600 font-medium transition"
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredItems.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No records found matching your search.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const AddItem = () => {
    const [form, setForm] = useState({
        pincode: '',
        officeName: '',
        city: '',
        district: '',
        province: 'Punjab',
        deliveryStatus: 'Delivery',
        country: 'Pakistan',
        officeType: 'General Post Office'
    });
    const [msg, setMsg] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postalService.addRecord(form as Omit<PostalRecord, 'id'>);
        setMsg('Record added successfully!');
        setForm({
             pincode: '', officeName: '', city: '', district: '', province: 'Punjab', deliveryStatus: 'Delivery', country: 'Pakistan', officeType: 'General Post Office'
        });
        setTimeout(() => setMsg(''), 3000);
    };

    return (
        <div className="p-8 max-w-4xl">
             <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Add New Postal Record</h1>
             
             {msg && <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                 <i className="fa-solid fa-check-circle"></i> {msg}
             </div>}

             <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pincode</label>
                        <input required type="text" placeholder="e.g. 54000" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-800 dark:text-gray-100" 
                            value={form.pincode} onChange={e => setForm({...form, pincode: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Office Name</label>
                        <input required type="text" placeholder="e.g. Lahore GPO" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-800 dark:text-gray-100" 
                            value={form.officeName} onChange={e => setForm({...form, officeName: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
                        <input required type="text" placeholder="e.g. Lahore" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-800 dark:text-gray-100" 
                             value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">District</label>
                        <input required type="text" placeholder="e.g. Lahore" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-800 dark:text-gray-100" 
                             value={form.district} onChange={e => setForm({...form, district: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Province/State</label>
                        <select className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-800 dark:text-gray-100"
                             value={form.province} onChange={e => setForm({...form, province: e.target.value})}>
                                 {['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Islamabad', 'Gilgit-Baltistan', 'Azad Kashmir'].map(p => (
                                     <option key={p} value={p}>{p}</option>
                                 ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Delivery Status</label>
                        <select className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-800 dark:text-gray-100"
                             value={form.deliveryStatus} onChange={e => setForm({...form, deliveryStatus: e.target.value})}>
                            <option value="Delivery">Delivery</option>
                            <option value="Non-Delivery">Non-Delivery</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Office Type</label>
                        <select className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-800 dark:text-gray-100"
                             value={form.officeType} onChange={e => setForm({...form, officeType: e.target.value})}>
                            <option value="General Post Office">General Post Office (GPO)</option>
                            <option value="Sub Post Office">Sub Post Office</option>
                            <option value="Branch Office">Branch Office</option>
                        </select>
                    </div>
                </div>
                <div className="pt-4">
                    <button type="submit" className="w-full md:w-auto md:min-w-[200px] py-3 bg-[#8B5CF6] hover:bg-[#7c3aed] text-white font-bold rounded-xl shadow-lg shadow-purple-200 dark:shadow-none transition">
                        <i className="fa-solid fa-save mr-2"></i> Save Record
                    </button>
                </div>
             </form>
        </div>
    );
};

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState<'general' | 'account' | 'code'>('general');
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');

    // General Settings State
    const [generalSettings, setGeneralSettings] = useState({
        websiteName: localStorage.getItem('site_name') || 'Zip Code Finder',
        websiteTitle: localStorage.getItem('site_title') || 'Zip Code Finder - Pakistan',
        metaDescription: localStorage.getItem('site_desc') || 'A modern, aesthetic Pakistan Pincode Finder.',
        footerCredit: localStorage.getItem('site_footer') || 'Zip Code Finder. All rights reserved.',
        websiteLogo: localStorage.getItem('site_logo') || '',
        favicon: localStorage.getItem('site_favicon') || ''
    });

    // Account Settings State
    const [username, setUsername] = useState(() => localStorage.getItem('admin_username') || 'ochgroup');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Custom Code Settings State
    const [customCode, setCustomCode] = useState({
        adSense: localStorage.getItem('site_adsense') || '',
        adsTxt: localStorage.getItem('site_ads_txt') || '',
        metaTags: localStorage.getItem('site_custom_meta') || '',
        analyticsHead: localStorage.getItem('site_analytics_head') || ''
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'websiteLogo' | 'favicon') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setGeneralSettings(prev => ({ ...prev, [field]: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const saveGeneralSettings = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('site_name', generalSettings.websiteName);
        localStorage.setItem('site_title', generalSettings.websiteTitle);
        localStorage.setItem('site_desc', generalSettings.metaDescription);
        localStorage.setItem('site_footer', generalSettings.footerCredit);
        if (generalSettings.websiteLogo) localStorage.setItem('site_logo', generalSettings.websiteLogo);
        if (generalSettings.favicon) localStorage.setItem('site_favicon', generalSettings.favicon);
        
        // Dispatch event to update UI components immediately
        window.dispatchEvent(new Event('site-config-updated'));
        window.dispatchEvent(new Event('storage')); // For SiteMeta

        setMsg('General settings updated successfully!');
        setTimeout(() => setMsg(''), 3000);
    };

    const saveAccountSettings = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMsg('');

        if (password && password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        localStorage.setItem('admin_username', username);
        if (password) {
            localStorage.setItem('admin_password', password);
        }

        setMsg('Account credentials updated successfully!');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => setMsg(''), 3000);
    };

    const saveCustomCode = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('site_adsense', customCode.adSense);
        localStorage.setItem('site_ads_txt', customCode.adsTxt);
        localStorage.setItem('site_custom_meta', customCode.metaTags);
        localStorage.setItem('site_analytics_head', customCode.analyticsHead);
        
        window.dispatchEvent(new Event('site-config-updated'));
        setMsg('Custom code updated successfully!');
        setTimeout(() => setMsg(''), 3000);
    };

    return (
        <div className="p-8 max-w-5xl">
             <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Settings</h1>

             {/* Tabs */}
             <div className="flex flex-wrap gap-4 border-b border-gray-200 dark:border-gray-700 mb-8">
                <button 
                    onClick={() => setActiveTab('general')}
                    className={`pb-3 px-4 text-sm font-bold transition-colors relative ${
                        activeTab === 'general' 
                        ? 'text-[#8B5CF6] border-b-2 border-[#8B5CF6]' 
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                >
                    General Settings
                </button>
                <button 
                    onClick={() => setActiveTab('code')}
                    className={`pb-3 px-4 text-sm font-bold transition-colors relative ${
                        activeTab === 'code' 
                        ? 'text-[#8B5CF6] border-b-2 border-[#8B5CF6]' 
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                >
                    Custom Code (Ads & Meta)
                </button>
                <button 
                    onClick={() => setActiveTab('account')}
                    className={`pb-3 px-4 text-sm font-bold transition-colors relative ${
                        activeTab === 'account' 
                        ? 'text-[#8B5CF6] border-b-2 border-[#8B5CF6]' 
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                >
                    Account Security
                </button>
             </div>
             
             {msg && <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-2 animate-fade-in">
                 <i className="fa-solid fa-check-circle"></i> {msg}
             </div>}

             {error && <div className="bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-2 animate-fade-in">
                 <i className="fa-solid fa-circle-exclamation"></i> {error}
             </div>}

             {activeTab === 'general' && (
                 <form onSubmit={saveGeneralSettings} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#8B5CF6] outline-none"
                                    value={generalSettings.websiteName} onChange={e => setGeneralSettings({...generalSettings, websiteName: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website Title (Browser Tab)</label>
                                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#8B5CF6] outline-none"
                                    value={generalSettings.websiteTitle} onChange={e => setGeneralSettings({...generalSettings, websiteTitle: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Description</label>
                                <textarea rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#8B5CF6] outline-none resize-none"
                                    value={generalSettings.metaDescription} onChange={e => setGeneralSettings({...generalSettings, metaDescription: e.target.value})} />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Footer Credit</label>
                                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#8B5CF6] outline-none"
                                    value={generalSettings.footerCredit} onChange={e => setGeneralSettings({...generalSettings, footerCredit: e.target.value})} />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website Logo</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-600">
                                        {generalSettings.websiteLogo ? (
                                            <img src={generalSettings.websiteLogo} alt="Logo Preview" className="w-full h-full object-contain" />
                                        ) : (
                                            <i className="fa-solid fa-image text-gray-400 text-2xl"></i>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'websiteLogo')} 
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" />
                                        <p className="text-xs text-gray-400 mt-1">Recommended: PNG, JPG (Max 1MB)</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Favicon</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-600">
                                        {generalSettings.favicon ? (
                                            <img src={generalSettings.favicon} alt="Favicon" className="w-8 h-8 object-contain" />
                                        ) : (
                                            <i className="fa-solid fa-globe text-gray-400"></i>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <input type="file" accept="image/x-icon,image/png" onChange={(e) => handleFileChange(e, 'favicon')} 
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                         <button type="submit" className="px-8 py-3 bg-[#8B5CF6] hover:bg-[#7c3aed] text-white font-bold rounded-xl shadow-lg shadow-purple-200 dark:shadow-none transition">
                            Save General Settings
                        </button>
                    </div>
                 </form>
             )}

            {activeTab === 'code' && (
                 <form onSubmit={saveCustomCode} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 space-y-8 animate-fade-in">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Google AdSense Code 
                            <span className="text-xs text-gray-500 ml-2">(Injects into &lt;head&gt;)</span>
                        </label>
                        <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#8B5CF6] outline-none font-mono text-sm"
                            placeholder="<script async src=...></script>"
                            value={customCode.adSense} onChange={e => setCustomCode({...customCode, adSense: e.target.value})} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Analytics (Head Tag)
                            <span className="text-xs text-gray-500 ml-2">(e.g. Google Analytics, Pixel Code)</span>
                        </label>
                        <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#8B5CF6] outline-none font-mono text-sm"
                            placeholder="<script>...</script>"
                            value={customCode.analyticsHead} onChange={e => setCustomCode({...customCode, analyticsHead: e.target.value})} />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Ads.txt Content
                            <span className="text-xs text-gray-500 ml-2">(Viewable at /#/ads.txt)</span>
                        </label>
                        <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#8B5CF6] outline-none font-mono text-sm"
                            placeholder="google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0"
                            value={customCode.adsTxt} onChange={e => setCustomCode({...customCode, adsTxt: e.target.value})} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Custom Meta Tags 
                            <span className="text-xs text-gray-500 ml-2">(Verification tags, OpenGraph, etc.)</span>
                        </label>
                        <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#8B5CF6] outline-none font-mono text-sm"
                            placeholder='<meta name="google-site-verification" content="..." />'
                            value={customCode.metaTags} onChange={e => setCustomCode({...customCode, metaTags: e.target.value})} />
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                         <button type="submit" className="px-8 py-3 bg-[#8B5CF6] hover:bg-[#7c3aed] text-white font-bold rounded-xl shadow-lg shadow-purple-200 dark:shadow-none transition">
                            Save Custom Code
                        </button>
                    </div>
                 </form>
             )}

             {activeTab === 'account' && (
                 <form onSubmit={saveAccountSettings} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 space-y-6 animate-fade-in">
                    <div className="max-w-xl space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400"><i className="fa-solid fa-user"></i></span>
                                <input required type="text" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-800 dark:text-gray-100" 
                                    value={username} onChange={e => setUsername(e.target.value)} />
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-white mb-4">Change Password</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-3.5 text-gray-400"><i className="fa-solid fa-lock"></i></span>
                                        <input type="password" placeholder="Leave blank to keep current" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-800 dark:text-gray-100" 
                                            value={password} onChange={e => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-3.5 text-gray-400"><i className="fa-solid fa-lock"></i></span>
                                        <input type="password" placeholder="Confirm new password" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-800 dark:text-gray-100" 
                                            value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="pt-4">
                            <button type="submit" className="w-full md:w-auto px-8 py-3 bg-[#8B5CF6] hover:bg-[#7c3aed] text-white font-bold rounded-xl shadow-lg shadow-purple-200 dark:shadow-none transition">
                                Update Credentials
                            </button>
                        </div>
                    </div>
                 </form>
             )}
        </div>
    );
};

const AdminLayout = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('admin_auth') === 'true';
    });

    const handleLogin = () => {
        localStorage.setItem('admin_auth', 'true');
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_auth');
        setIsAuthenticated(false);
    };

    if (!isAuthenticated) {
        return <AdminLogin onLogin={handleLogin} />;
    }

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden font-inter transition-colors">
            <AdminSidebar onLogout={handleLogout} />
            <div className="flex-1 overflow-auto relative">
                {/* Mobile Admin Header */}
                <div className="md:hidden h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 shadow-sm sticky top-0 z-20">
                    <span className="font-bold text-lg text-gray-800 dark:text-white">Admin Panel</span>
                    <button onClick={handleLogout} className="text-sm text-red-500 font-medium">Exit</button>
                </div>
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/add" element={<AddItem />} />
                    <Route path="/manage" element={<ManageItems />} />
                    <Route path="/edit/:id" element={<EditItem />} />
                    <Route path="/settings" element={<AdminSettings />} />
                </Routes>
            </div>
        </div>
    );
}

// 5. Utility Page: Ads.txt Viewer
const AdsTxtViewer = () => {
    const content = localStorage.getItem('site_ads_txt') || '';
    return (
        <pre className="p-4 font-mono text-sm whitespace-pre-wrap bg-white text-black">
            {content}
        </pre>
    );
};

const About = () => (
    <div className="min-h-screen flex flex-col font-inter bg-slate-50 dark:bg-gray-900 transition-colors">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-16 max-w-4xl text-center">
            <div className="mb-8 inline-block">
                <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg mx-auto transform rotate-3">
                     <i className="fa-solid fa-map-location-dot"></i>
                </div>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">About Zip Code Finder</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
                Zip Code Finder is the ultimate utility designed for citizens and businesses in Pakistan. 
                We bridge the gap between you and the postal network with accuracy, speed, and a beautiful user experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-2xl mx-auto">
                 <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
                     <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 text-[#8B5CF6] rounded-xl flex items-center justify-center text-xl mb-4 mx-auto">
                         <i className="fa-solid fa-database"></i>
                     </div>
                     <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Accurate Data</h3>
                     <p className="text-sm text-gray-500 dark:text-gray-400">Reliable pincodes and office details sourced from official records.</p>
                 </div>
                 <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
                     <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-500 rounded-xl flex items-center justify-center text-xl mb-4 mx-auto">
                         <i className="fa-solid fa-mobile-screen"></i>
                     </div>
                     <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Responsive</h3>
                     <p className="text-sm text-gray-500 dark:text-gray-400">Works perfectly on mobile, tablet, and desktop devices.</p>
                 </div>
            </div>
        </div>
        <Footer />
    </div>
);

const Features = () => (
    <div className="min-h-screen flex flex-col font-inter bg-slate-50 dark:bg-gray-900 transition-colors">
        <Navbar />
        <div className="flex-grow pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Powerful Features</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Everything you need to manage and find postal information in Pakistan with ease and efficiency.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { icon: "fa-magnifying-glass", title: "Smart Search", desc: "Instantly search by Pincode, City, Post Office name, or Province with our intelligent filter system." },
                    { icon: "fa-bolt", title: "Instant Results", desc: "Get lightning-fast search results from our optimized local database without page reloads." },
                    { icon: "fa-chart-pie", title: "Admin Dashboard", desc: "Comprehensive analytics view for administrators to track database statistics and distribution." },
                    { icon: "fa-moon", title: "Dark Mode", desc: "Seamlessly switch between light and dark themes for a comfortable viewing experience in any environment." },
                    { icon: "fa-mobile-screen", title: "Fully Responsive", desc: "Designed to look and work perfectly on all devices, from large desktops to mobile phones." },
                    { icon: "fa-database", title: "Data Management", desc: "Robust admin tools to add, edit, and remove postal records to keep the database up-to-date." }
                ].map((feature, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-700 transition duration-300 group">
                        <div className="w-14 h-14 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/30 group-hover:text-[#8B5CF6] transition-colors mb-6">
                            <i className={`fa-solid ${feature.icon} text-2xl`}></i>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-[#8B5CF6] transition-colors">{feature.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
        <Footer />
    </div>
);

const Contact = () => (
    <div className="min-h-screen flex flex-col font-inter bg-slate-50 dark:bg-gray-900 transition-colors">
        <Navbar />
        <div className="flex-grow pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Get in Touch</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Have questions or suggestions? We'd love to hear from you.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Contact Information</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-[#8B5CF6] flex-shrink-0">
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email Us</p>
                                    <a href="mailto:support@zipcodefinder.com" className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-[#8B5CF6] transition">support@zipcodefinder.com</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-pink-50 dark:bg-pink-900/30 flex items-center justify-center text-[#EC4899] flex-shrink-0">
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Call Us</p>
                                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200">+92 42 1234 5678</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 flex-shrink-0">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Visit Us</p>
                                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                        123 Innovation Center,<br/>
                                        Ferozepur Road, Lahore,<br/>
                                        Pakistan
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                                <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                            <input type="text" placeholder="How can we help?" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                            <textarea rows={4} placeholder="Write your message here..." className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#8B5CF6] outline-none transition resize-none"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] hover:from-[#7c3aed] hover:to-[#db2777] text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-200 dark:shadow-none transition transform active:scale-95">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <Footer />
    </div>
);

const Privacy = () => (
    <div className="min-h-screen flex flex-col font-inter bg-slate-50 dark:bg-gray-900 transition-colors">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
            <div className="prose dark:prose-invert max-w-none">
                <p className="mb-4 text-gray-600 dark:text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                    At Zip Code Finder, we prioritize your privacy. This policy outlines the minimal data we collect and how it is used.
                    Currently, our application operates as a client-side utility and does not store personal user data on our servers.
                </p>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-6 mb-4">Data Collection</h2>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                    We do not collect personal identification information such as names, addresses, or phone numbers unless voluntarily submitted through our contact forms.
                </p>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-6 mb-4">Cookies</h2>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                    We use local storage to remember your theme preference (Light/Dark mode). No tracking cookies are used for advertising purposes.
                </p>
            </div>
        </div>
        <Footer />
    </div>
);

const Terms = () => (
    <div className="min-h-screen flex flex-col font-inter bg-slate-50 dark:bg-gray-900 transition-colors">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Terms & Conditions</h1>
            <div className="prose dark:prose-invert max-w-none">
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                    Welcome to Zip Code Finder. By using our website, you agree to comply with and be bound by the following terms.
                </p>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-6 mb-4">Use of Information</h2>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                    The content provided on Zip Code Finder is for general information purposes only. While we strive for accuracy, we do not guarantee the completeness or timeliness of the postal data.
                </p>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-6 mb-4">Limitation of Liability</h2>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                    Zip Code Finder shall not be held liable for any incorrect postal deliveries or issues arising from the use of the information provided on this site. Always verify critical information with official post office sources.
                </p>
            </div>
        </div>
        <Footer />
    </div>
);

const Footer = () => {
    const [footerText, setFooterText] = useState(`© ${new Date().getFullYear()} Zip Code Finder. All rights reserved.`);
    const [siteName, setSiteName] = useState('Zip Code Finder');
    const [siteLogo, setSiteLogo] = useState('');
    
    useEffect(() => {
        const loadConfig = () => {
            setFooterText(localStorage.getItem('site_footer') || `© ${new Date().getFullYear()} Zip Code Finder. All rights reserved.`);
            setSiteName(localStorage.getItem('site_name') || 'Zip Code Finder');
            setSiteLogo(localStorage.getItem('site_logo') || '');
        };
        
        loadConfig();
        
        // Event listener for live updates
        const handleConfigChange = () => {
             loadConfig();
        };
        window.addEventListener('site-config-updated', handleConfigChange);
        return () => window.removeEventListener('site-config-updated', handleConfigChange);
    }, []);

    return (
    <footer className="bg-gradient-to-r from-[#7c3aed] to-[#db2777] dark:from-purple-900 dark:to-pink-900 text-white pt-16 pb-8 font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                {/* Brand Column */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                         {siteLogo ? (
                            <img src={siteLogo} alt="Logo" className="w-10 h-10 object-contain rounded-lg bg-white/20 backdrop-blur-sm p-1" />
                         ) : (
                             <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white">
                                <i className="fa-solid fa-map-location-dot text-xl"></i>
                             </div>
                         )}
                         <span className="text-2xl font-bold tracking-tight">{siteName}</span>
                    </div>
                    <p className="text-purple-100 text-sm leading-relaxed max-w-xs">
                        Your trusted source for Pakistan postal information. Making pincode searches fast, accurate, and accessible to everyone.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                    <ul className="space-y-4 text-purple-100 text-sm">
                        <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                        <li><Link to="/" className="hover:text-white transition-colors">Search</Link></li>
                        <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                        <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                    </ul>
                </div>

                {/* Policy Pages */}
                <div>
                    <h4 className="text-lg font-bold mb-6">Policy Pages</h4>
                    <ul className="space-y-4 text-purple-100 text-sm">
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Stay Updated */}
                <div>
                    <h4 className="text-lg font-bold mb-6">Stay Updated</h4>
                    <p className="text-purple-100 text-sm mb-6">
                        Get the latest updates on postal codes and features.
                    </p>
                    <div className="flex gap-2 mb-8">
                        <input 
                            type="email" 
                            placeholder="Your email" 
                            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-purple-200 outline-none focus:bg-white/20 focus:border-white/40 transition w-full"
                        />
                        <button className="bg-white text-[#8B5CF6] px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-purple-50 transition shadow-lg">
                            Subscribe
                        </button>
                    </div>
                    <div className="flex gap-4">
                        <a href="#" className="text-white/80 hover:text-white text-xl transition"><i className="fa-brands fa-twitter"></i></a>
                        <a href="#" className="text-white/80 hover:text-white text-xl transition"><i className="fa-brands fa-facebook"></i></a>
                        <a href="#" className="text-white/80 hover:text-white text-xl transition"><i className="fa-brands fa-linkedin"></i></a>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-purple-200 text-sm">
                    {footerText}
                </p>
                <div className="flex gap-6 text-sm text-purple-200">
                    <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
                    <Link to="/terms" className="hover:text-white transition">Terms</Link>
                    <a href="#" className="hover:text-white transition">Cookies</a>
                </div>
            </div>
        </div>
    </footer>
    );
};


// 4. Main App Layout
export default function App() {
  return (
    <HashRouter>
      <SiteMeta />
      <Routes>
        <Route path="/" element={<>
            <Navbar />
            <Home />
        </>} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/ads.txt" element={<AdsTxtViewer />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}