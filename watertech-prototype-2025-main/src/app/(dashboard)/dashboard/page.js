'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiArrowRightLine, RiAlertLine, RiCheckLine } from 'react-icons/ri';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

// Mock data for the dashboard
const mockWaterQualityData = [
  { time: '08:00', pH: 6.8, ec: 0.8, no3: 5.2, temperature: 18 },
  { time: '10:00', pH: 6.9, ec: 0.9, no3: 5.5, temperature: 19 },
  { time: '12:00', pH: 7.1, ec: 1.1, no3: 5.8, temperature: 21 },
  { time: '14:00', pH: 7.2, ec: 1.2, no3: 6.0, temperature: 22 },
  { time: '16:00', pH: 7.0, ec: 1.0, no3: 5.7, temperature: 21 },
  { time: '18:00', pH: 6.9, ec: 0.9, no3: 5.5, temperature: 20 },
];

const mockAlerts = [
  {
    id: 1,
    title: 'High EC Levels',
    description: 'EC levels have exceeded threshold for cotton crops',
    type: 'warning',
    date: '1h ago',
  },
  {
    id: 2,
    title: 'New Recommendations',
    description: 'New water management tips for your wheat fields',
    type: 'info',
    date: '3h ago',
  },
  {
    id: 3,
    title: 'Sensor Maintenance',
    description: 'Eastern sector sensor needs calibration',
    type: 'alert',
    date: '1d ago',
  },
];

const waterStatusInfo = {
  overall: { status: 'good', description: 'Suitable for most crops' },
  parameters: [
    { name: 'pH', value: 7.0, status: 'good', unit: '' },
    { name: 'EC', value: 0.9, status: 'warning', unit: 'dS/m' },
    { name: 'NO₃', value: 5.5, status: 'good', unit: 'mg/l' },
    { name: 'Temperature', value: 20, status: 'good', unit: '°C' },
  ],
};

const mockRecommendations = [
  {
    id: 1,
    title: 'Consider drip irrigation for cotton fields',
    description: 'Based on current EC levels, this would optimize water usage by 15%.',
    impact: 'Medium',
    savings: '⚡ 15% water savings',
  },
  {
    id: 2,
    title: 'Adjust fertilization schedule for wheat',
    description: 'Current nitrate levels suggest reduced fertilizer application for the next 2 weeks.',
    impact: 'High',
    savings: '💰 12% fertilizer savings',
  },
  {
    id: 3,
    title: 'Schedule early morning irrigation',
    description: 'To minimize evaporation losses and optimize water absorption.',
    impact: 'Low',
    savings: '⚡ 8% water savings',
  },
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="flex flex-col justify-between gap-4 rounded-lg border bg-white p-6 shadow-sm md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, Eldar Mammadov
          </h2>
          <p className="mt-1 text-gray-600">
            Here's what's happening with your farm's water quality today
          </p>
        </div>
        <div className="flex flex-shrink-0 gap-3">
          <Link
            href="/dashboard/water-analysis"
            className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            View Details
          </Link>
          <Link
            href="/dashboard/advisory"
            className="flex items-center justify-center rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-secondary"
          >
            Get Advice
          </Link>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3">
              <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Water Quality</h3>
              <div className="flex items-center">
                <span className={`text-2xl font-bold ${
                  waterStatusInfo.overall.status === 'good' ? 'text-status-green' :
                  waterStatusInfo.overall.status === 'warning' ? 'text-status-amber' : 'text-status-red'
                }`}>
                  {waterStatusInfo.overall.status === 'good' ? 'Good' :
                   waterStatusInfo.overall.status === 'warning' ? 'Moderate' : 'Poor'}
                </span>
                {waterStatusInfo.overall.status === 'good' ? (
                  <RiCheckLine className="ml-1.5 h-5 w-5 text-status-green" />
                ) : (
                  <RiAlertLine className={`ml-1.5 h-5 w-5 ${
                    waterStatusInfo.overall.status === 'warning' ? 'text-status-amber' : 'text-status-red'
                  }`} />
                )}
              </div>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">{waterStatusInfo.overall.description}</p>
        </div>

        {waterStatusInfo.parameters.slice(0, 3).map((param) => (
          <div key={param.name} className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className={`rounded-full p-3 ${
                param.status === 'good' ? 'bg-green-100' :
                param.status === 'warning' ? 'bg-amber-100' : 'bg-red-100'
              }`}>
                <svg 
                  className={`h-5 w-5 ${
                    param.status === 'good' ? 'text-status-green' :
                    param.status === 'warning' ? 'text-status-amber' : 'text-status-red'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={param.status === 'good' 
                      ? "M5 13l4 4L19 7" 
                      : "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"} 
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">{param.name}</h3>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900">{param.value}</span>
                  {param.unit && <span className="ml-1 text-gray-600">{param.unit}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and alerts grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Trends chart */}
        <div className="col-span-2 rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Water Quality Trends</h3>
            <div className="flex space-x-2">
              <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 shadow-sm hover:bg-gray-50">
                Today
              </button>
              <button className="rounded-md border border-transparent bg-gray-100 px-3 py-1 text-sm text-gray-700">
                Week
              </button>
              <button className="rounded-md border border-transparent bg-gray-100 px-3 py-1 text-sm text-gray-700">
                Month
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockWaterQualityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pH"
                    stroke="#10b981"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ec"
                    stroke="#f59e0b"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="no3"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Alerts section */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Recent Alerts</h3>
            <Link href="/dashboard/reports" className="text-sm font-medium text-brand-primary hover:text-brand-secondary">
              View all
            </Link>
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {mockAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 rounded-md border border-gray-100 bg-gray-50 p-3">
                  <div className={`mt-0.5 rounded-full p-1.5 ${
                    alert.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                    alert.type === 'alert' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      {alert.type === 'warning' || alert.type === 'alert' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      )}
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                      <span className="text-xs text-gray-500">{alert.date}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{alert.description}</p>
                  </div>
                </div>
              ))}

              <Link
                href="/dashboard/reports"
                className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                View All Alerts
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations section */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Recommendations</h3>
          <Link href="/dashboard/advisory" className="flex items-center text-sm font-medium text-brand-primary hover:text-brand-secondary">
            Get personalized advice
            <RiArrowRightLine className="ml-1" />
          </Link>
        </div>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {mockRecommendations.map((rec) => (
              <div key={rec.id} className="rounded-md border border-gray-200 bg-gray-50 p-4">
                <div className={`mb-2 inline-block rounded-md px-2 py-1 text-xs font-semibold ${
                  rec.impact === 'High' ? 'bg-green-100 text-green-800' : 
                  rec.impact === 'Medium' ? 'bg-blue-100 text-blue-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {rec.impact} Impact
                </div>
                <h4 className="text-md mb-2 font-semibold text-gray-900">{rec.title}</h4>
                <p className="mb-3 text-sm text-gray-600">{rec.description}</p>
                <div className="text-sm font-medium text-brand-primary">{rec.savings}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
