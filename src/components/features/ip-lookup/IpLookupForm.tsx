import React, { useState } from 'react';
import { Search, History } from 'lucide-react';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { LookupHistoryItem } from '../../../types';

interface IpLookupFormProps {
  onSubmit: (ip: string) => void;
  isLoading: boolean;
}

const IpLookupForm: React.FC<IpLookupFormProps> = ({ onSubmit, isLoading }) => {
  const [ipAddress, setIpAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<LookupHistoryItem[]>([]);

  const validateIp = (ip: string): boolean => {
    // Info: basic IPv4 validation
    const ipv4Pattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    if (ipv4Pattern.test(ip)) {
      const parts = ip.split('.').map(part => parseInt(part, 10));
      return parts.every(part => part >= 0 && part <= 255);
    }
    
    // Info: basic IPv6 validation (simplified)
    const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::$|^::1$|^([0-9a-fA-F]{1,4}:){1,7}:|^:([0-9a-fA-F]{1,4}:){1,7}$|^fe80:/i;
    return ipv6Pattern.test(ip);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!ipAddress.trim()) {
      setError('Please enter an IP address');
      return;
    }
    
    if (!validateIp(ipAddress.trim())) {
      setError('Please enter a valid IP address');
      return;
    }
    
    setError(null);
    onSubmit(ipAddress.trim());
  };

  const toggleHistory = () => {
    if (!showHistory) {
      try {
        const storedHistory = localStorage.getItem('ip-lookup-history');
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
    setIpAddress(item.query);
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
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="Enter an IP address (e.g., 8.8.8.8)"
              aria-label="IP Address"
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

export default IpLookupForm;