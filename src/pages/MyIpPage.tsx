import React from 'react';
import { RefreshCw } from 'lucide-react';
import Button from '../components/common/Button';
import MyIpCard from '../components/features/my-ip/MyIpCard';
import SystemInfoCard from '../components/features/my-ip/SystemInfoCard';
import IpDetails from '../components/features/ip-lookup/IpDetails';
import IpMap from '../components/features/ip-lookup/IpMap';
import useMyIp from '../hooks/useMyIp';

const MyIpPage: React.FC = () => {
  const { ipData, systemInfo, loading, error, refresh } = useMyIp();
  
  const handleRefresh = () => {
    refresh();
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
          My IP Information
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          View detailed information about your current IP address and system.
        </p>
      </div>
      
      <div className="flex justify-end">
        <Button
          onClick={handleRefresh}
          variant="outline"
          isLoading={loading}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Refresh Data
        </Button>
      </div>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-700 dark:text-red-300 p-4 rounded-lg">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}
      
      {loading && !ipData && (
        <div className="py-12 flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading your IP information...</p>
        </div>
      )}
      
      {ipData && (
        <div className="space-y-8">
          <MyIpCard data={ipData} />
          
          {systemInfo && (
            <SystemInfoCard data={systemInfo} />
          )}
          
          <IpDetails data={ipData} />
          <IpMap data={ipData} />
        </div>
      )}
    </div>
  );
};

export default MyIpPage;