import React from 'react';
import { Smartphone, Monitor, Cpu, Wifi } from 'lucide-react';
import Card from '../../common/Card';
import { SystemInfo } from '../../../types';

interface SystemInfoCardProps {
  data: SystemInfo;
}

const SystemInfoCard: React.FC<SystemInfoCardProps> = ({ data }) => {
  const sections = [
    {
      title: 'Browser',
      icon: <Monitor className="w-5 h-5 text-blue-500" />,
      items: [
        { label: 'Name', value: data.browser.name },
        { label: 'Version', value: data.browser.version },
        { label: 'Language', value: data.browser.language },
        { label: 'Platform', value: data.browser.platform },
      ],
    },
    {
      title: 'Device',
      icon: <Smartphone className="w-5 h-5 text-purple-500" />,
      items: [
        { label: 'Type', value: data.browser.isMobile ? 'Mobile' : data.browser.isTablet ? 'Tablet' : 'Desktop' },
        { label: 'Screen Size', value: `${data.screen.width} × ${data.screen.height}` },
        { label: 'Color Depth', value: `${data.screen.colorDepth} bit` },
        { label: 'Orientation', value: data.screen.orientation },
      ],
    },
    {
      title: 'Operating System',
      icon: <Cpu className="w-5 h-5 text-green-500" />,
      items: [
        { label: 'Name', value: data.os.name },
        { label: 'Version', value: data.os.version },
      ],
    },
    {
      title: 'Connection',
      icon: <Wifi className="w-5 h-5 text-teal-500" />,
      items: [
        { label: 'Type', value: data.connection.type },
        { label: 'Downlink', value: `${data.connection.downlink} Mbps` },
        { label: 'RTT', value: `${data.connection.rtt} ms` },
        { label: 'Effective Type', value: data.connection.effectiveType },
      ],
    },
  ];

  return (
    <Card title="System Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <div className="flex items-center">
              {section.icon}
              <h3 className="text-lg font-semibold ml-2 text-slate-900 dark:text-white">{section.title}</h3>
            </div>
            <dl className="grid grid-cols-1 gap-y-2">
              {section.items.map((item) => (
                item.value && item.value !== 'unknown' ? (
                  <div key={item.label} className="flex justify-between items-center">
                    <dt className="text-sm text-slate-600 dark:text-slate-400">{item.label}</dt>
                    <dd className="text-sm font-medium text-slate-900 dark:text-white">
                      {item.value}
                    </dd>
                  </div>
                ) : null
              ))}
            </dl>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SystemInfoCard;