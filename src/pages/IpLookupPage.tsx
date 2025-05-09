import React from 'react';
import IpLookupForm from '../components/features/ip-lookup/IpLookupForm';
import IpDetails from '../components/features/ip-lookup/IpDetails';
import IpMap from '../components/features/ip-lookup/IpMap';
import { useIpLookup } from '../hooks/useIpLookup';

const IpLookupPage: React.FC = () => {
  const { data, loading, error, lookupIp } = useIpLookup();
  
  const handleSubmit = (ip: string) => {
    lookupIp(ip);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
          IP Address Lookup
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Get detailed information about any IP address including location, provider, and more.
        </p>
      </div>
      
      <IpLookupForm onSubmit={handleSubmit} isLoading={loading} />
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-700 dark:text-red-300 p-4 rounded-lg">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}
      
      {loading && (
        <div className="py-12 flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading IP information...</p>
        </div>
      )}
      
      {data && !loading && (
        <div className="space-y-8">
          <IpDetails data={data} />
          <IpMap data={data} />
        </div>
      )}
    </div>
  );
};

export default IpLookupPage;