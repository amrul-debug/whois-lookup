import React from 'react';
import { Globe, Calendar, Shield, Server, User } from 'lucide-react';
import Card from '../../common/Card';
import CopyButton from '../CopyButton';
import { DomainDetails as DomainDetailsType } from '../../../types';

interface DomainDetailsProps {
  data: DomainDetailsType;
}

const DomainDetails: React.FC<DomainDetailsProps> = ({ data }) => {
  const sections = [
    {
      title: 'Basic Information',
      icon: <Globe className="w-5 h-5 text-blue-500" />,
      items: [
        { label: 'Domain', value: data.domain },
        { label: 'Domain ID', value: data.domain_id },
        { label: 'Status', value: data.status.join(', ') },
      ],
    },
    {
      title: 'Dates',
      icon: <Calendar className="w-5 h-5 text-green-500" />,
      items: [
        { label: 'Created', value: data.created },
        { label: 'Updated', value: data.updated },
        { label: 'Expires', value: data.expires },
      ],
    },
    {
      title: 'Registrar',
      icon: <Shield className="w-5 h-5 text-purple-500" />,
      items: [
        { label: 'Name', value: data.registrar.name },
        { label: 'URL', value: data.registrar.url },
        { label: 'Email', value: data.registrar.email },
        { label: 'Phone', value: data.registrar.phone },
      ],
    },
    {
      title: 'Nameservers',
      icon: <Server className="w-5 h-5 text-orange-500" />,
      items: data.nameservers.map((ns, index) => ({
        label: `NS ${index + 1}`,
        value: ns,
      })),
    },
    {
      title: 'Registrant',
      icon: <User className="w-5 h-5 text-teal-500" />,
      items: [
        { label: 'Name', value: data.registrant.name },
        { label: 'Organization', value: data.registrant.organization },
        { label: 'Country', value: data.registrant.country },
        { label: 'State', value: data.registrant.state },
        { label: 'DNSSEC', value: data.dnssec ? 'Enabled' : 'Disabled' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <section className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Globe className="w-6 h-6 text-teal-600 dark:text-teal-400 mr-3" />
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Domain Details</h2>
            <p className="text-slate-600 dark:text-slate-300">{data.domain}</p>
          </div>
        </div>
        <CopyButton text={data.domain} />
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

export default DomainDetails;