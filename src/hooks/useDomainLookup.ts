import { useState, useCallback } from 'react';
import { DomainDetails } from '../types';

export const useDomainLookup = () => {
  const [data, setData] = useState<DomainDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const lookupDomain = useCallback(async (domain: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      setData(null);
      
      // TODO: mock data since real WHOIS lookup would require a backend API
      // TODO: in production, this would call a backend service that makes the actual WHOIS query
      await mockApiCall(domain);
      
      saveToHistory(domain);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);
  
  const mockApiCall = async (domain: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockData: DomainDetails = {
          domain: domain,
          domain_id: `DOMAIN-${Math.floor(Math.random() * 10000)}`,
          status: ['clientTransferProhibited', 'serverDeleteProhibited'],
          created: new Date(Date.now() - Math.random() * 5 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          updated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          expires: new Date(Date.now() + Math.random() * 2 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          registrar: {
            name: domain.includes('google') ? 'MarkMonitor Inc.' : 'GoDaddy.com, LLC',
            url: domain.includes('google') ? 'https://markmonitor.com' : 'https://www.godaddy.com',
            email: domain.includes('google') ? 'abusecomplaints@markmonitor.com' : 'abuse@godaddy.com',
            phone: domain.includes('google') ? '+1.2083895740' : '+1.4806242505'
          },
          registrant: {
            name: 'REDACTED FOR PRIVACY',
            organization: domain.includes('google') ? 'Google LLC' : 'REDACTED FOR PRIVACY',
            street: 'REDACTED FOR PRIVACY',
            city: 'REDACTED FOR PRIVACY',
            state: 'CA',
            postal_code: 'REDACTED FOR PRIVACY',
            country: 'US',
            phone: 'REDACTED FOR PRIVACY',
            email: 'REDACTED FOR PRIVACY'
          },
          nameservers: domain.includes('google') 
            ? ['ns1.googledomains.com', 'ns2.googledomains.com', 'ns3.googledomains.com', 'ns4.googledomains.com'] 
            : [`ns1.${domain}`, `ns2.${domain}`],
          dnssec: Math.random() > 0.5
        };
        
        setData(mockData);
        resolve();
      }, 800); 
    });
  };
  
  const saveToHistory = (domain: string) => {
    try {
      const historyKey = 'domain-lookup-history';
      const existingHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
      const newHistoryItem = {
        id: crypto.randomUUID(),
        type: 'domain',
        query: domain,
        timestamp: Date.now()
      };
      
      const updatedHistory = [newHistoryItem, ...existingHistory].slice(0, 10);
      localStorage.setItem(historyKey, JSON.stringify(updatedHistory));
    } catch (err) {
      console.error('Failed to save to history:', err);
    }
  };

  return { data, loading, error, lookupDomain };
};

export default useDomainLookup;