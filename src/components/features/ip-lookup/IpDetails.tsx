import React from 'react';
import { MapPin, Server, Globe, Clock, DollarSign, PieChart } from 'lucide-react';
import Card from '../../common/Card';
import CopyButton from '../CopyButton';
import { IpDetails as IpDetailsType } from '../../../types';

interface IpDetailsProps {
  data: IpDetailsType;
}

const IpDetails: React.FC<IpDetailsProps> = ({ data }) => {
  // Info: group data into sections for display
  const sections = [
    {
      title: 'IP Information',
      icon: <Server className="w-5 h-5 text-blue-500" />,
      items: [
        { label: 'IP Address', value: data.ip },
        { label: 'Version', value: data.version },
        { label: 'ASN', value: data.asn },
        { label: 'Organization', value: data.org },
        { label: 'ISP', value: data.isp },
      ],
    },
    {
      title: 'Location',
      icon: <MapPin className="w-5 h-5 text-red-500" />,
      items: [
        { label: 'City', value: data.city },
        { label: 'Region', value: `${data.region} (${data.region_code})` },
        { label: 'Country', value: `${data.country_name} (${data.country_code})` },
        { label: 'Postal', value: data.postal },
        { label: 'Latitude', value: data.latitude.toString() },
        { label: 'Longitude', value: data.longitude.toString() },
      ],
    },
    {
      title: 'Time & Language',
      icon: <Clock className="w-5 h-5 text-purple-500" />,
      items: [
        { label: 'Timezone', value: data.timezone },
        { label: 'UTC Offset', value: data.utc_offset },
        { label: 'Languages', value: data.languages },
      ],
    },
    {
      title: 'Currency',
      icon: <DollarSign className="w-5 h-5 text-green-500" />,
      items: [
        { label: 'Currency', value: `${data.currency_name} (${data.currency})` },
        { label: 'Symbol', value: data.currency_symbol },
      ],
    },
    {
      title: 'Connection',
      icon: <Globe className="w-5 h-5 text-teal-500" />,
      items: [
        { label: 'Type', value: data.connection.type || 'Unknown' },
        { label: 'Mobile', value: data.connection.mobile ? 'Yes' : 'No' },
        { label: 'Proxy', value: data.connection.proxy ? 'Yes' : 'No' },
        { label: 'VPN', value: data.connection.vpn ? 'Yes' : 'No' },
        { label: 'Tor', value: data.connection.tor ? 'Yes' : 'No' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center">
          <PieChart className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">IP Details</h2>
            <p className="text-slate-600 dark:text-slate-300">{data.ip}</p>
          </div>
        </div>
        <CopyButton text={data.ip} />
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Card key={section.title} className="h-full">
            <div className="flex items-center mb-4">
              {section.icon}
              <h3 className="text-lg font-semibold ml-2 text-slate-900 dark:text-white">{section.title}</h3>
            </div>
            <dl className="grid grid-cols-1 gap-y-3">
              {section.items.map((item) => (
                item.value ? (
                  <div key={item.label} className="flex justify-between items-center">
                    <dt className="text-sm text-slate-600 dark:text-slate-400">{item.label}</dt>
                    <dd className="text-sm font-medium text-slate-900 dark:text-white flex items-center">
                      <span className="mr-1.5">{item.value}</span>
                      <CopyButton text={item.value} />
                    </dd>
                  </div>
                ) : null
              ))}
            </dl>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IpDetails;