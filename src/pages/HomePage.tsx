import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Server, Info, ArrowRight } from 'lucide-react';
import Card from '../components/common/Card';

const HomePage: React.FC = () => {
  const features = [
    {
      title: 'IP Address Lookup',
      description: 'Get detailed information about any IP address including location, ISP, and organization.',
      icon: <Search className="w-10 h-10 text-blue-500" />,
      path: '/ip-lookup',
      color: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'Domain WHOIS Lookup',
      description: 'Look up domain registration details, ownership information, and DNS records.',
      icon: <Server className="w-10 h-10 text-teal-500" />,
      path: '/domain-lookup',
      color: 'bg-teal-100 dark:bg-teal-900/30',
    },
    {
      title: 'My IP Information',
      description: 'View detailed information about your current IP address, connection, and system.',
      icon: <Info className="w-10 h-10 text-purple-500" />,
      path: '/my-ip',
      color: 'bg-purple-100 dark:bg-purple-900/30',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
          Your Complete <span className="text-blue-600 dark:text-blue-400">Network Information</span> Toolkit
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10">
          Access detailed information about IP addresses, domains, and your own connection with our powerful suite of network tools.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/ip-lookup" 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link 
            to="/my-ip" 
            className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 font-medium rounded-lg transition-colors duration-200"
          >
            View My IP
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
          Powerful Network Tools
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {features.map((feature) => (
            <Link to={feature.path} key={feature.title} className="group">
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col h-full">
                  <div className={`rounded-lg p-4 mb-4 inline-flex ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-5 flex-grow">
                    {feature.description}
                  </p>
                  <div className="text-blue-600 dark:text-blue-400 font-medium flex items-center mt-auto group-hover:underline">
                    <span>Try it now</span>
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose a Tool',
                description: 'Select from our IP lookup, domain WHOIS, or My IP tools based on your needs.',
              },
              {
                step: '02',
                title: 'Enter Information',
                description: 'Type in an IP address or domain name, or just view your own IP details.',
              },
              {
                step: '03',
                title: 'Get Detailed Results',
                description: 'View comprehensive information including location, ISP, registration details, and more.',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-3xl font-bold text-blue-600/20 dark:text-blue-400/20 mb-2">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;