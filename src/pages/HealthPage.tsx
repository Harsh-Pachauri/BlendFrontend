import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  latency?: number;
  uptime?: number;
}

const HealthPage = () => {
  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: 'API Server',
      status: 'operational',
      latency: 45,
      uptime: 99.99,
    },
    {
      name: 'Database',
      status: 'operational',
      latency: 12,
      uptime: 99.95,
    },
    {
      name: 'Video Storage',
      status: 'operational',
      latency: 89,
      uptime: 99.90,
    },
    {
      name: 'Authentication',
      status: 'operational',
      latency: 23,
      uptime: 99.99,
    },
    {
      name: 'Search Service',
      status: 'operational',
      latency: 67,
      uptime: 99.85,
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-6 h-6 text-success-500" />;
      case 'degraded':
        return <AlertCircle className="w-6 h-6 text-warning-500" />;
      case 'down':
        return <XCircle className="w-6 h-6 text-error-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-success-50 text-success-700';
      case 'degraded':
        return 'bg-warning-50 text-warning-700';
      case 'down':
        return 'bg-error-50 text-error-700';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">System Status</h1>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-success-500" />
            <div>
              <h2 className="text-xl font-semibold">All Systems Operational</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Last updated: {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {services.map((service) => (
            <div key={service.name} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getStatusIcon(service.status)}
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(
                        service.status
                      )}`}
                    >
                      {service.status.charAt(0).toUpperCase() +
                        service.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Latency: {service.latency}ms
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Uptime: {service.uptime}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incident History */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Recent Incidents</h2>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-warning-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">
                      Degraded Performance - Video Processing
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      We experienced elevated error rates with video processing.
                      This incident has been resolved.
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                      {new Date(
                        Date.now() - 1000 * 60 * 60 * 24 * (i + 1)
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthPage;