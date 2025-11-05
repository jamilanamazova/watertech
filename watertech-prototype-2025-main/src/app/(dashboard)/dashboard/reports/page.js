'use client';

import { useState, useEffect } from 'react';
import { 
  RiFileDownloadLine, RiCalendarLine, RiFilterLine, 
  RiArrowDownSLine, RiArrowUpSLine, RiSearchLine,
  RiFileList2Line, RiFileChartLine, RiFileWarningLine,
  RiCloseLine
} from 'react-icons/ri';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// Mock reports data
const reportsData = [
  {
    id: 1,
    title: 'Weekly Water Quality Summary',
    type: 'summary',
    date: '2023-06-10',
    status: 'Normal',
    parameters: { ec: 1.1, ph: 7.0, no3: 5.5 },
    notes: 'All parameters within normal range for cotton crops.',
  },
  {
    id: 2,
    title: 'Monthly Water Analysis Report',
    type: 'analysis',
    date: '2023-06-01',
    status: 'Warning',
    parameters: { ec: 1.4, ph: 6.8, no3: 6.2 },
    notes: 'EC levels slightly elevated. Consider adjusting irrigation schedule.',
  },
  {
    id: 3,
    title: 'Quarterly Soil-Water Interaction',
    type: 'analysis',
    date: '2023-05-15',
    status: 'Normal',
    parameters: { ec: 1.0, ph: 7.1, no3: 5.1 },
    notes: 'Good soil permeability maintained. Continue current practices.',
  },
  {
    id: 4,
    title: 'Water Quality Alert',
    type: 'alert',
    date: '2023-05-02',
    status: 'Critical',
    parameters: { ec: 1.7, ph: 7.3, no3: 8.0 },
    notes: 'Nitrate levels exceeded threshold. Immediate action recommended.',
  },
  {
    id: 5,
    title: 'Irrigation Efficiency Report',
    type: 'summary',
    date: '2023-04-15',
    status: 'Normal',
    parameters: { ec: 0.9, ph: 7.0, no3: 4.8 },
    notes: '12% improvement in water use efficiency compared to previous month.',
  },
  {
    id: 6,
    title: 'Seasonal Water Quality Trends',
    type: 'analysis',
    date: '2023-04-01',
    status: 'Warning',
    parameters: { ec: 1.3, ph: 6.9, no3: 5.9 },
    notes: 'Seasonal variation detected. Prepare for summer adjustments.',
  },
  {
    id: 7,
    title: 'Fertilizer Impact Assessment',
    type: 'analysis',
    date: '2023-03-15',
    status: 'Normal',
    parameters: { ec: 1.0, ph: 7.0, no3: 5.2 },
    notes: 'Current fertilization strategy showing positive results on water quality.',
  },
  {
    id: 8,
    title: 'Water Quality Alert',
    type: 'alert',
    date: '2023-03-01',
    status: 'Warning',
    parameters: { ec: 1.5, ph: 7.2, no3: 7.1 },
    notes: 'EC approaching threshold. Increase leaching fraction.',
  },
];

// Historical trends data
const trendsData = [
  { date: '2023-01', ec: 1.0, ph: 6.9, no3: 4.8 },
  { date: '2023-02', ec: 1.1, ph: 7.0, no3: 5.0 },
  { date: '2023-03', ec: 1.2, ph: 7.1, no3: 5.5 },
  { date: '2023-04', ec: 1.1, ph: 7.0, no3: 5.2 },
  { date: '2023-05', ec: 1.3, ph: 6.8, no3: 6.0 },
  { date: '2023-06', ec: 1.1, ph: 7.0, no3: 5.5 },
];

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState(reportsData);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  // Effect to control body scroll when modal is open
  useEffect(() => {
    if (selectedReport) {
      document.body.classList.add('modal-open');
      
      // Add escape key handler
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          setSelectedReport(null);
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.classList.remove('modal-open');
      };
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [selectedReport]);

  // Sort reports
  const sortedReports = [...reports].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filter reports
  const filteredReports = sortedReports.filter(report => {
    // Filter by type
    if (filterType !== 'all' && report.type !== filterType) {
      return false;
    }
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        report.title.toLowerCase().includes(query) ||
        report.notes.toLowerCase().includes(query) ||
        report.status.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (name) => {
    if (sortConfig.key === name) {
      return sortConfig.direction === 'asc' ? (
        <RiArrowUpSLine className="ml-1 h-4 w-4" />
      ) : (
        <RiArrowDownSLine className="ml-1 h-4 w-4" />
      );
    }
    return null;
  };

  const getReportTypeIcon = (type) => {
    switch(type) {
      case 'summary':
        return <RiFileList2Line className="h-5 w-5 text-blue-500" />;
      case 'analysis':
        return <RiFileChartLine className="h-5 w-5 text-green-500" />;
      case 'alert':
        return <RiFileWarningLine className="h-5 w-5 text-amber-500" />;
      default:
        return <RiFileList2Line className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Normal':
        return <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Normal</span>;
      case 'Warning':
        return <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">Warning</span>;
      case 'Critical':
        return <span className="inline-flex rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">Critical</span>;
      default:
        return <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">{status}</span>;
    }
  };

  // Function to render the report detail modal
  const renderReportDetail = () => {
    if (!selectedReport) return null;
    
    // Close the modal when clicking outside
    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        setSelectedReport(null);
      }
    };
    
    return (
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              {getReportTypeIcon(selectedReport.type)}
              <h2 className="ml-3 text-xl font-bold text-gray-900">{selectedReport.title}</h2>
            </div>
            <button 
              onClick={() => setSelectedReport(null)}
              className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
            >
              <RiCloseLine className="h-6 w-6" />
            </button>
          </div>
          
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase text-gray-500">Details</h3>
              <div className="space-y-3 rounded-lg border bg-gray-50 p-4">
                <div>
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="font-medium capitalize text-gray-900">{selectedReport.type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-medium text-gray-900">{new Date(selectedReport.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  {getStatusBadge(selectedReport.status)}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase text-gray-500">Key Parameters</h3>
              <div className="space-y-3 rounded-lg border bg-gray-50 p-4">
                <div>
                  <p className="text-xs text-gray-500">EC (Electrical Conductivity)</p>
                  <p className="font-medium text-gray-900">{selectedReport.parameters.ec} dS/m</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">pH Level</p>
                  <p className="font-medium text-gray-900">{selectedReport.parameters.ph}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">NO₃ (Nitrate)</p>
                  <p className="font-medium text-gray-900">{selectedReport.parameters.no3} mg/l</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-semibold uppercase text-gray-500">Notes</h3>
            <div className="rounded-lg border bg-gray-50 p-4">
              <p className="text-gray-700">{selectedReport.notes}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-semibold uppercase text-gray-500">Trends Chart</h3>
            <div className="h-64 rounded-lg border bg-white p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey={Object.keys(selectedReport.parameters)[0]} 
                    name={Object.keys(selectedReport.parameters)[0].toUpperCase()} 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button className="rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50">
              Download PDF
            </button>
            <button className="rounded-md bg-brand-primary px-4 py-2 font-medium text-white hover:bg-brand-secondary">
              Share Report
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Report Detail Modal */}
      {renderReportDetail()}
      
      {/* Header section */}
      <div className="flex flex-col justify-between gap-4 rounded-lg border bg-white p-6 shadow-sm md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedReport ? `Report: ${selectedReport.title}` : 'Reports & History'}
          </h2>
          <p className="mt-1 text-gray-600">
            {selectedReport 
              ? `Viewing detailed report from ${new Date(selectedReport.date).toLocaleDateString()}`
              : 'View and analyze your water quality history'}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
            <RiCalendarLine className="mr-2 text-gray-500" />
            <select className="appearance-none bg-transparent outline-none">
              <option value="last30">Last 30 days</option>
              <option value="last90">Last quarter</option>
              <option value="last180">Last 6 months</option>
              <option value="last365">Last year</option>
              <option value="custom">Custom range</option>
            </select>
          </div>
          
          <button className="flex items-center rounded-md bg-brand-primary px-3 py-2 text-sm text-white hover:bg-brand-secondary">
            <RiFileDownloadLine className="mr-2" />
            Export Data
          </button>
        </div>
      </div>
      
      {/* Historical trends chart */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium text-gray-900">Historical Trends</h3>
        
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="ec" 
                  name="EC (dS/m)" 
                  stroke="#f59e0b" 
                  fill="#fef3c7" 
                  strokeWidth={2} 
                />
                <Area 
                  type="monotone" 
                  dataKey="ph" 
                  name="pH" 
                  stroke="#10b981" 
                  fill="#d1fae5" 
                  strokeWidth={2} 
                />
                <Area 
                  type="monotone" 
                  dataKey="no3" 
                  name="NO₃ (mg/l)" 
                  stroke="#3b82f6" 
                  fill="#dbeafe" 
                  strokeWidth={2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      
      {/* Reports list */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h3 className="text-lg font-medium text-gray-900">Reports List</h3>
          
          <div className="flex flex-wrap gap-3">
            {/* Search box */}
            <div className="flex flex-1 items-center rounded-md border border-gray-300 px-3 py-2 md:flex-none">
              <RiSearchLine className="mr-2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search reports..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            
            {/* Type filter */}
            <div className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
              <RiFilterLine className="mr-2 text-gray-500" />
              <select 
                className="appearance-none bg-transparent outline-none"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="summary">Summary</option>
                <option value="analysis">Analysis</option>
                <option value="alert">Alert</option>
              </select>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    <div className="flex cursor-pointer items-center" onClick={() => requestSort('title')}>
                      Report
                      {getSortIcon('title')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    <div className="flex cursor-pointer items-center" onClick={() => requestSort('type')}>
                      Type
                      {getSortIcon('type')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    <div className="flex cursor-pointer items-center" onClick={() => requestSort('date')}>
                      Date
                      {getSortIcon('date')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    <div className="flex cursor-pointer items-center" onClick={() => requestSort('status')}>
                      Status
                      {getSortIcon('status')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Key Parameters
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          {getReportTypeIcon(report.type)}
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{report.title}</div>
                            <div className="text-xs text-gray-500">{report.notes}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm capitalize text-gray-500">
                        {report.type}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {new Date(report.date).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {getStatusBadge(report.status)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-md bg-blue-100 px-2 py-1 text-xs text-blue-800">
                            pH: {report.parameters.ph}
                          </span>
                          <span className="rounded-md bg-amber-100 px-2 py-1 text-xs text-amber-800">
                            EC: {report.parameters.ec}
                          </span>
                          <span className="rounded-md bg-green-100 px-2 py-1 text-xs text-green-800">
                            NO₃: {report.parameters.no3}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <button 
                          onClick={() => setSelectedReport(report)} 
                          className="mr-2 text-brand-primary hover:text-brand-secondary"
                        >
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">Download</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No reports found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            
            {filteredReports.length > 0 && (
              <div className="mt-4 flex items-center justify-between border-t pt-4">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredReports.length}</span> of <span className="font-medium">{reports.length}</span> reports
                </div>
                <div className="flex items-center space-x-2">
                  <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="rounded-md bg-brand-primary px-3 py-1 text-sm text-white hover:bg-brand-secondary">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
