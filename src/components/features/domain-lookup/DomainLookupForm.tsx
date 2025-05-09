import React, { useState } from 'react';
import { Search, History } from 'lucide-react';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { LookupHistoryItem } from '../../../types';

interface DomainLookupFormProps {
  onSubmit: (domain: string) => void;
  isLoading: boolean;
}

const DomainLookupForm: React.FC<DomainLookupFormProps> = ({ onSubmit, isLoading }) => {
  const [domain, setDomain] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<LookupHistoryItem[]>([]);

  const validateDomain = (domain: string): boolean => {
    // Info: basic domain validation
    const domainPattern = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return domainPattern.test(domain);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!domain.trim()) {
      setError('Please enter a domain name');
      return;
    }
    
    if (!validateDomain(domain.trim())) {
      setError('Please enter a valid domain name');
      return;
    }
    
    setError(null);
    onSubmit(domain.trim());
  };

  const toggleHistory = () => {
    if (!showHistory) {
      try {
        const storedHistory = localStorage.getItem('domain-lookup-history');
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (err) {
        console.error('Failed to load history:', err);
      }
    }
    setShowHistory(!showHistory);
  };

  const handleHistoryItemClick = (item: LookupHistoryItem) => {
    setDomain(item.query);
    onSubmit(item.query);
    setShowHistory(false);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-grow">
            <Input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter a domain name (e.g., google.com)"
              aria-label="Domain Name"
              error={error || undefined}
              fullWidth
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              type="submit" 
              variant="primary"
              isLoading={isLoading}
              leftIcon={<Search className="w-5 h-5" />}
            >
              Lookup
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={toggleHistory}
              leftIcon={<History className="w-5 h-5" />}
              aria-label="View History"
              aria-expanded={showHistory}
            >
              History
            </Button>
          </div>
        </div>
      </form>
      
      {/* History Dropdown */}
      {showHistory && (
        <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 max-h-64 overflow-y-auto">
          {history.length > 0 ? (
            <ul className="divide-y divide-slate-200 dark:divide-slate-600">
              {history.map((item) => (
                <li key={item.id} className="py-2">
                  <button
                    onClick={() => handleHistoryItemClick(item)}
                    className="w-full text-left px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors duration-200"
                  >
                    <span className="font-medium text-slate-900 dark:text-white">{item.query}</span>
                    <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-slate-500 dark:text-slate-400 py-2">No history found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DomainLookupForm;