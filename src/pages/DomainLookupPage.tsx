import React from 'react';
import DomainLookupForm from '../components/features/domain-lookup/DomainLookupForm';
import DomainDetails from '../components/features/domain-lookup/DomainDetails';
import useDomainLookup from '../hooks/useDomainLookup';

const DomainLookupPage: React.FC = () => {
  const { data, loading, error, lookupDomain } = useDomainLookup();
  
  const handleSubmit = (domain: string) => {
    lookupDomain(domain);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
          Domain WHOIS Lookup
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Get registration details, nameservers, and ownership information for any domain.
        </p>
      </div>
      
      <DomainLookupForm onSubmit={handleSubmit} isLoading={loading} />
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-700 dark:text-red-300 p-4 rounded-lg">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}
      
      {loading && (
        <div className="py-12 flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading domain information...</p>
        </div>
      )}
      
      {data && !loading && (
        <DomainDetails data={data} />
      )}
    </div>
  );
};

export default DomainLookupPage;