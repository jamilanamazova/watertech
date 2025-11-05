'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { RiFileDownloadLine, RiFilterLine, RiCalendarLine, RiMapPinLine } from 'react-icons/ri';

// Mock data
const waterQualityData = [
  { date: '2023-01-01', ph: 6.8, ec: 0.9, no3: 5.2, cl: 40, ca: 55, mg: 12, na: 35 },
  { date: '2023-01-02', ph: 6.9, ec: 1.0, no3: 5.4, cl: 42, ca: 54, mg: 13, na: 37 },
  { date: '2023-01-03', ph: 7.0, ec: 1.1, no3: 5.6, cl: 41, ca: 56, mg: 12, na: 34 },
  { date: '2023-01-04', ph: 7.1, ec: 1.2, no3: 5.8, cl: 43, ca: 58, mg: 14, na: 36 },
  { date: '2023-01-05', ph: 7.0, ec: 1.1, no3: 5.7, cl: 42, ca: 57, mg: 13, na: 35 },
  { date: '2023-01-06', ph: 6.9, ec: 1.0, no3: 5.5, cl: 40, ca: 54, mg: 12, na: 33 },
  { date: '2023-01-07', ph: 6.8, ec: 0.9, no3: 5.3, cl: 39, ca: 53, mg: 11, na: 32 },
];

const waterCompositionData = [
  { name: 'Calcium (Ca)', value: 55, color: '#3b82f6' },
  { name: 'Magnesium (Mg)', value: 12, color: '#10b981' },
  { name: 'Sodium (Na)', value: 35, color: '#f59e0b' },
  { name: 'Chloride (Cl)', value: 40, color: '#ef4444' },
  { name: 'Other', value: 8, color: '#6366f1' },
];

const cropCompatibilityData = [
  { crop: 'Cotton', compatibility: 85, recommendation: 'Highly suitable' },
  { crop: 'Wheat', compatibility: 70, recommendation: 'Suitable with monitoring' },
  { crop: 'Tomato', compatibility: 60, recommendation: 'Marginal, consider additional leaching' },
  { crop: 'Alfalfa', compatibility: 55, recommendation: 'Marginal, consider water treatment' },
  { crop: 'Citrus', compatibility: 40, recommendation: 'Not recommended without treatment' },
];

const waterParameters = [
  { 
    name: 'pH', 
    value: 7.0, 
    unit: '', 
    description: 'A measure of acidity/alkalinity',
    status: 'good',
    range: '6.5-7.5',
    icon: '🧪'
  },
  { 
    name: 'EC', 
    value: 1.1, 
    unit: 'dS/m', 
    description: 'Electrical conductivity indicates salt content',
    status: 'warning',
    range: '0.7-1.2',
    icon: '⚡'
  },
  { 
    name: 'NO₃', 
    value: 5.5, 
    unit: 'mg/l', 
    description: 'Nitrate level affects fertilization needs',
    status: 'good',
    range: '2-10',
    icon: '🌱'
  },
  { 
    name: 'Cl', 
    value: 42, 
    unit: 'mg/l', 
    description: 'Chloride can cause leaf burn at high levels',
    status: 'good',
    range: '0-70',
    icon: '🧂'
  },
  { 
    name: 'Ca', 
    value: 56, 
    unit: 'mg/l', 
    description: 'Calcium is essential for soil structure',
    status: 'good',
    range: '40-120',
    icon: '🪨'
  },
  { 
    name: 'Mg', 
    value: 13, 
    unit: 'mg/l', 
    description: 'Magnesium is vital for photosynthesis',
    status: 'good',
    range: '6-24',
    icon: '🌿'
  },
  { 
    name: 'Na', 
    value: 35, 
    unit: 'mg/l', 
    description: 'Sodium can damage soil structure',
    status: 'warning',
    range: '0-40',
    icon: '🔬'
  },
  { 
    name: 'SAR', 
    value: 2.1, 
    unit: '', 
    description: 'Sodium Adsorption Ratio affects soil permeability',
    status: 'good',
    range: '0-9',
    icon: '📊'
  },
];

export default function WaterAnalysisPage() {
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState('parameters');
  const [selectedLocation, setSelectedLocation] = useState('Farm Main Intake');
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header with filter controls */}
      <div className="flex flex-col justify-between gap-4 rounded-lg border bg-white p-6 shadow-sm md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Water Analysis</h2>
          <p className="mt-1 text-gray-600">Detailed analysis of your water quality and composition</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
            <RiMapPinLine className="mr-2 text-gray-500" />
            <select 
              className="appearance-none bg-transparent outline-none"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="Farm Main Intake">Farm Main Intake</option>
              <option value="Eastern Sector">Eastern Sector</option>
              <option value="Western Sector">Western Sector</option>
              <option value="Reservoir">Reservoir</option>
            </select>
          </div>
          
          <div className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
            <RiCalendarLine className="mr-2 text-gray-500" />
            <select 
              className="appearance-none bg-transparent outline-none"
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last quarter</option>
            </select>
          </div>
          
          <button className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50">
            <RiFilterLine className="mr-2 text-gray-500" />
            More Filters
          </button>
          
          <button className="flex items-center rounded-md bg-brand-primary px-3 py-2 text-sm text-white hover:bg-brand-secondary">
            <RiFileDownloadLine className="mr-2" />
            Export Data
          </button>
        </div>
      </div>
      
      {/* Chart section */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Water Quality Trends</h3>
          
          <div className="flex flex-wrap space-x-2">
            <button 
              onClick={() => setActiveChart('parameters')}
              className={`rounded-md px-3 py-1 text-sm font-medium ${
                activeChart === 'parameters' 
                  ? 'bg-brand-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Parameters
            </button>
            <button 
              onClick={() => setActiveChart('composition')}
              className={`rounded-md px-3 py-1 text-sm font-medium ${
                activeChart === 'composition' 
                  ? 'bg-brand-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Composition
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex h-80 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
          </div>
        ) : (
          <div>
            {activeChart === 'parameters' ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={waterQualityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => {
                        const d = new Date(date);
                        return `${d.getMonth() + 1}/${d.getDate()}`;
                      }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="ph" 
                      name="pH" 
                      stroke="#10b981" 
                      strokeWidth={2} 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ec" 
                      name="EC (dS/m)" 
                      stroke="#f59e0b" 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="no3" 
                      name="NO₃ (mg/l)" 
                      stroke="#3b82f6" 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-80 justify-center">
                <ResponsiveContainer width="50%" height="100%">
                  <PieChart>
                    <Pie
                      data={waterCompositionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {waterCompositionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} mg/l`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Parameters grid */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium text-gray-900">Water Quality Parameters</h3>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {waterParameters.map((param) => (
            <div key={param.name} className="rounded-lg border bg-gray-50 p-4">
              <div className="flex items-center">
                <div className="mr-3 text-2xl">{param.icon}</div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">
                    {param.name}
                    <span className="ml-1 text-xs text-gray-500">
                      {param.unit && `(${param.unit})`}
                    </span>
                  </h4>
                  <div className="flex items-center">
                    <span 
                      className={`text-xl font-bold ${
                        param.status === 'good' ? 'text-status-green' :
                        param.status === 'warning' ? 'text-status-amber' : 'text-status-red'
                      }`}
                    >
                      {param.value}
                    </span>
                    <span className="ml-2 text-xs text-gray-500">
                      Range: {param.range}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-600">{param.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Crop compatibility */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium text-gray-900">Crop Water Compatibility</h3>
        
        {loading ? (
          <div className="flex h-60 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
          </div>
        ) : (
          <div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cropCompatibilityData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="crop" type="category" width={80} />
                  <Tooltip 
                    formatter={(value) => [`${value}% Compatible`, 'Compatibility']}
                    labelFormatter={() => ''}
                  />
                  <Legend />
                  <Bar 
                    dataKey="compatibility" 
                    name="Compatibility" 
                    fill="#0891b2"
                    radius={[0, 4, 4, 0]}
                    label={{ position: 'right', formatter: (value) => `${value}%` }}
                  >
                    {cropCompatibilityData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.compatibility > 80 ? '#10b981' : entry.compatibility > 60 ? '#f59e0b' : '#ef4444'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Crop
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Compatibility
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Recommendation
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {cropCompatibilityData.map((crop) => (
                    <tr key={crop.crop}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {crop.crop}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="h-2 w-24 rounded bg-gray-200">
                            <div
                              className={`h-2 rounded ${
                                crop.compatibility > 80 ? 'bg-status-green' : 
                                crop.compatibility > 60 ? 'bg-status-amber' : 'bg-status-red'
                              }`}
                              style={{ width: `${crop.compatibility}%` }}
                            ></div>
                          </div>
                          <span className="ml-3">{crop.compatibility}%</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {crop.recommendation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      
      {/* Actions footer */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">
          Back to Dashboard
        </Link>
        <div className="flex space-x-3">
          <Link
            href="/dashboard/advisory"
            className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Get Expert Advice
          </Link>
          <Link
            href="/dashboard/reports"
            className="flex items-center justify-center rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-secondary"
          >
            Download Full Report
          </Link>
        </div>
      </div>
    </div>
  );
}
