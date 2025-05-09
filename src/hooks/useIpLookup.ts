import { useState, useCallback } from 'react';
import { IpDetails } from '../types';

export const useIpLookup = () => {
  const [data, setData] = useState<IpDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const lookupIp = useCallback(async (ip: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      setData(null);
      
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ip-lookup?ip=${encodeURIComponent(ip)}`;
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.reason || 'Failed to lookup IP address');
      }
      
      const ipDetails: IpDetails = {
        ip: result.ip,
        version: result.version,
        city: result.city,
        region: result.region,
        region_code: result.region_code,
        country: result.country,
        country_name: result.country_name,
        country_code: result.country_code,
        country_code_iso3: result.country_code_iso3,
        country_capital: result.country_capital,
        continent_code: result.continent_code,
        postal: result.postal,
        latitude: result.latitude,
        longitude: result.longitude,
        timezone: result.timezone,
        utc_offset: result.utc_offset,
        asn: result.asn,
        org: result.org,
        isp: result.org,
        languages: result.languages,
        currency: result.currency,
        currency_name: result.currency_name,
        currency_symbol: result.currency_symbol,
        connection: {
          type: result.connection?.type || 'unknown',
          mobile: result.connection?.mobile || false,
          proxy: result.connection?.proxy || false,
          vpn: result.connection?.vpn || false,
          tor: result.connection?.tor || false,
        }
      };
      
      setData(ipDetails);
      saveToHistory(ip);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);
  
  const saveToHistory = (ip: string) => {
    try {
      const historyKey = 'ip-lookup-history';
      const existingHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
      const newHistoryItem = {
        id: crypto.randomUUID(),
        type: 'ip',
        query: ip,
        timestamp: Date.now()
      };
      
      const updatedHistory = [newHistoryItem, ...existingHistory].slice(0, 10);
      localStorage.setItem(historyKey, JSON.stringify(updatedHistory));
    } catch (err) {
      console.error('Failed to save to history:', err);
    }
  };

  return { data, loading, error, lookupIp };
};