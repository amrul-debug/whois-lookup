import React, { useEffect, useRef } from 'react';
import { IpDetails } from '../../../types';

interface IpMapProps {
  data: IpDetails;
}

const IpMap: React.FC<IpMapProps> = ({ data }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    const lat = data.latitude;
    const lng = data.longitude;

    // TODO: create a static map using OpenStreetMap
    // TODO: this is a simplified implementation using an iframe
    // TODO: in a real application, you might use a proper map library like Leaflet or Google Maps
    
    mapRef.current.innerHTML = '';
    
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '0.375rem'; // rounded-md
  
    iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.1}%2C${lat-0.1}%2C${lng+0.1}%2C${lat+0.1}&layer=mapnik&marker=${lat}%2C${lng}`;
    
    mapRef.current.appendChild(iframe);
  }, [data]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Location: {data.city}, {data.country_name}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {data.latitude.toFixed(4)}, {data.longitude.toFixed(4)}
        </p>
      </div>
      <div ref={mapRef} className="h-80 bg-slate-100 dark:bg-slate-700 animate-pulse">
        {/* Map will be inserted here by the useEffect hook */}
      </div>
    </div>
  );
};

export default IpMap;