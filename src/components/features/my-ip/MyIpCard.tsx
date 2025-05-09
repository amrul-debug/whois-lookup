import React from 'react';
import { Globe, Info } from 'lucide-react';
import Card from '../../common/Card';
import CopyButton from '../CopyButton';
import { IpDetails } from '../../../types';

interface MyIpCardProps {
  data: IpDetails;
}

const MyIpCard: React.FC<MyIpCardProps> = ({ data }) => {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/30">
      <div className="flex flex-col items-center text-center">
        <div className="mb-2 p-3 bg-blue-100 dark:bg-blue-800/30 rounded-full">
          <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Your IP Address
        </h2>
        
        <div className="flex items-center mt-1 mb-4">
          <div className="text-3xl md:text-4xl font-mono font-bold text-blue-600 dark:text-blue-400">
            {data.ip}
          </div>
          <CopyButton text={data.ip} className="ml-2" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4">
          <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm flex items-center">
            <div className="mr-3 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-left">
              <div className="text-sm text-slate-500 dark:text-slate-400">Location</div>
              <div className="font-medium">{data.city}, {data.country_name}</div>
            </div>
          </div>
          
          <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm flex items-center">
            <div className="mr-3 p-2 bg-teal-100 dark:bg-teal-900/30 rounded-full">
              <Server className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div className="text-left">
              <div className="text-sm text-slate-500 dark:text-slate-400">Provider</div>
              <div className="font-medium truncate">{data.org}</div>
            </div>
          </div>
          
          <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm flex items-center">
            <div className="mr-3 p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Info className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-left">
              <div className="text-sm text-slate-500 dark:text-slate-400">IP Version</div>
              <div className="font-medium">IPv{data.version}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const MapPin = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const Server = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
    <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
    <line x1="6" x2="6" y1="6" y2="6"></line>
    <line x1="6" x2="6" y1="18" y2="18"></line>
  </svg>
);

export default MyIpCard;