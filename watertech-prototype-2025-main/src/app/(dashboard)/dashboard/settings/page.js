'use client';

import { useState } from 'react';
import { 
  RiNotificationLine, 
  RiUserSettingsLine, 
  RiLockLine, 
  RiDeviceLine, 
  RiDatabase2Line, 
  RiTeamLine, 
  RiGlobalLine 
} from 'react-icons/ri';

/**
 * @typedef {Object} SettingsTabProps
 * @property {string} title - The title of the tab
 * @property {React.ComponentType<any>} icon - The icon component to display
 * @property {boolean} active - Whether the tab is currently active
 * @property {() => void} onClick - Function to call when the tab is clicked
 * @property {React.ReactNode} [children] - Optional content to render inside the tab
 */

/**
 * A tab component for the settings page
 * @param {SettingsTabProps} props
 */
const SettingsTab = ({ title, icon: Icon, active, onClick, children }) => {
  return (
    <div
      className={`flex cursor-pointer items-center space-x-3 rounded-lg px-4 py-3 ${
        active ? 'bg-brand-light text-brand-primary' : 'text-gray-700 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{title}</span>
      {children}
    </div>
  );
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    waterQualityAlerts: true,
    systemMaintenanceAlerts: true,
    waterLevelAlerts: true,
    weeklyReports: true,
    monthlyReports: true,
    weatherAlerts: false
  });
  const [profileData, setProfileData] = useState({
    name: 'Eldar Mammadov',
    email: 'eldar.mammadov@agrofarm.az',
    phone: '+994 55 123 4567',
    organization: 'Araz Valley Farm',
    role: 'Farm Owner',
    language: 'Azerbaijani'
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle notification settings change
  const handleNotificationChange = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Handle profile data change
  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Save settings
  const handleSaveSettings = () => {
    setIsLoading(true);
    // Simulate saving to API
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="mt-1 text-gray-600">
          Manage your account preferences and system settings
        </p>
      </div>

      {/* Settings content */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar */}
        <div className="w-full rounded-lg border bg-white p-4 shadow-sm lg:w-64">
          <nav className="space-y-1">
            <SettingsTab 
              title="Profile" 
              icon={RiUserSettingsLine}
              active={activeTab === 'profile'} 
              onClick={() => setActiveTab('profile')}
            />
            <SettingsTab 
              title="Notifications" 
              icon={RiNotificationLine}
              active={activeTab === 'notifications'} 
              onClick={() => setActiveTab('notifications')}
            />
            <SettingsTab 
              title="Security" 
              icon={RiLockLine}
              active={activeTab === 'security'} 
              onClick={() => setActiveTab('security')}
            />
            <SettingsTab 
              title="Devices" 
              icon={RiDeviceLine}
              active={activeTab === 'devices'} 
              onClick={() => setActiveTab('devices')}
              >
              <span className="ml-auto rounded-full bg-brand-primary px-2 py-0.5 text-xs text-white">
                4
              </span>
            </SettingsTab>
            <SettingsTab 
              title="Data Management" 
              icon={RiDatabase2Line}
              active={activeTab === 'data'} 
              onClick={() => setActiveTab('data')}
            />
            <SettingsTab 
              title="Team Access" 
              icon={RiTeamLine}
              active={activeTab === 'team'} 
              onClick={() => setActiveTab('team')}
            />
            <SettingsTab 
              title="Language & Region" 
              icon={RiGlobalLine}
              active={activeTab === 'language'} 
              onClick={() => setActiveTab('language')}
            />
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 rounded-lg border bg-white p-6 shadow-sm">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                <p className="mt-1 text-sm text-gray-600">Update your account details and preferences</p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-brand-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-brand-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-brand-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                    Organization
                  </label>
                  <input
                    type="text"
                    id="organization"
                    value={profileData.organization}
                    onChange={(e) => handleProfileChange('organization', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-brand-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select
                    id="role"
                    value={profileData.role}
                    onChange={(e) => handleProfileChange('role', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-brand-primary sm:text-sm"
                  >
                    <option>Farm Owner</option>
                    <option>Farm Manager</option>
                    <option>Irrigation Specialist</option>
                    <option>Technician</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                    Preferred Language
                  </label>
                  <select
                    id="language"
                    value={profileData.language}
                    onChange={(e) => handleProfileChange('language', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-brand-primary sm:text-sm"
                  >
                    <option>English</option>
                    <option>Azerbaijani</option>
                    <option>Russian</option>
                  </select>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="flex items-center rounded-md border border-transparent bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                  onClick={handleSaveSettings}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="mr-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
                <p className="mt-1 text-sm text-gray-600">Manage how and when you receive alerts and updates</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Notification Channels</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="email-notifications"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                      checked={notificationSettings.email}
                      onChange={() => handleNotificationChange('email')}
                    />
                    <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700">
                      Email Notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="push-notifications"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                      checked={notificationSettings.push}
                      onChange={() => handleNotificationChange('push')}
                    />
                    <label htmlFor="push-notifications" className="ml-2 block text-sm text-gray-700">
                      Push Notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="sms-notifications"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                      checked={notificationSettings.sms}
                      onChange={() => handleNotificationChange('sms')}
                    />
                    <label htmlFor="sms-notifications" className="ml-2 block text-sm text-gray-700">
                      SMS Notifications (additional charges may apply)
                    </label>
                  </div>
                </div>

                <h4 className="font-medium text-gray-700">Alert Types</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="water-quality-alerts"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                      checked={notificationSettings.waterQualityAlerts}
                      onChange={() => handleNotificationChange('waterQualityAlerts')}
                    />
                    <label htmlFor="water-quality-alerts" className="ml-2 block text-sm text-gray-700">
                      Water Quality Alerts
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="system-maintenance-alerts"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                      checked={notificationSettings.systemMaintenanceAlerts}
                      onChange={() => handleNotificationChange('systemMaintenanceAlerts')}
                    />
                    <label htmlFor="system-maintenance-alerts" className="ml-2 block text-sm text-gray-700">
                      System Maintenance Alerts
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="water-level-alerts"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                      checked={notificationSettings.waterLevelAlerts}
                      onChange={() => handleNotificationChange('waterLevelAlerts')}
                    />
                    <label htmlFor="water-level-alerts" className="ml-2 block text-sm text-gray-700">
                      Water Level & Flow Alerts
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="weather-alerts"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                      checked={notificationSettings.weatherAlerts}
                      onChange={() => handleNotificationChange('weatherAlerts')}
                    />
                    <label htmlFor="weather-alerts" className="ml-2 block text-sm text-gray-700">
                      Weather Alerts (precipitation, temperature extremes)
                    </label>
                  </div>
                </div>

                <h4 className="font-medium text-gray-700">Reporting Schedule</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="weekly-reports"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                      checked={notificationSettings.weeklyReports}
                      onChange={() => handleNotificationChange('weeklyReports')}
                    />
                    <label htmlFor="weekly-reports" className="ml-2 block text-sm text-gray-700">
                      Weekly Water Quality Summary Reports
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="monthly-reports"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                      checked={notificationSettings.monthlyReports}
                      onChange={() => handleNotificationChange('monthlyReports')}
                    />
                    <label htmlFor="monthly-reports" className="ml-2 block text-sm text-gray-700">
                      Monthly Analytics & Trend Reports
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="flex items-center rounded-md border border-transparent bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                  onClick={handleSaveSettings}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="mr-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : 'Save Preferences'}
                </button>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                <p className="mt-1 text-sm text-gray-600">Update your password and security preferences</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700">Change Password</h4>
                  <div className="mt-2 space-y-4">
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="current-password"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-brand-primary sm:text-sm"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-brand-primary sm:text-sm"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-brand-primary sm:text-sm"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <h4 className="font-medium text-gray-700">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  <div className="flex items-center justify-between rounded-lg border bg-gray-50 p-4">
                    <div>
                      <h5 className="font-medium text-gray-900">Two-factor authentication is disabled</h5>
                      <p className="text-sm text-gray-600">Enable two-factor authentication for enhanced security</p>
                    </div>
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                    >
                      Enable
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  className="flex items-center rounded-md border border-transparent bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                  onClick={handleSaveSettings}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="mr-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : 'Update Security Settings'}
                </button>
              </div>
            </div>
          )}

          {/* Devices */}
          {activeTab === 'devices' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Connected Devices & Sensors</h3>
                <p className="mt-1 text-sm text-gray-600">Manage your farm's sensors and monitoring devices</p>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-green-100 p-2">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-900">Water Quality Sensor - Main Canal</h4>
                        <p className="text-sm text-gray-600">Status: Online • Battery: 87% • Last sync: 15 mins ago</p>
                      </div>
                    </div>
                    <button className="rounded-md bg-white px-3 py-1 text-sm text-gray-700 shadow-sm hover:bg-gray-50">
                      Configure
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-green-100 p-2">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-900">Flow Meter - Irrigation Pump Station</h4>
                        <p className="text-sm text-gray-600">Status: Online • Power: Connected • Last sync: 5 mins ago</p>
                      </div>
                    </div>
                    <button className="rounded-md bg-white px-3 py-1 text-sm text-gray-700 shadow-sm hover:bg-gray-50">
                      Configure
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-amber-100 p-2">
                        <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-900">Soil Moisture Sensor - Field #3</h4>
                        <p className="text-sm text-gray-600">Status: Warning • Battery: 23% • Last sync: 2 hrs ago</p>
                      </div>
                    </div>
                    <button className="rounded-md bg-white px-3 py-1 text-sm text-gray-700 shadow-sm hover:bg-gray-50">
                      Configure
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-red-100 p-2">
                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-900">Weather Station - Farm Center</h4>
                        <p className="text-sm text-gray-600">Status: Offline • Battery: Unknown • Last sync: 2 days ago</p>
                      </div>
                    </div>
                    <button className="rounded-md bg-white px-3 py-1 text-sm text-gray-700 shadow-sm hover:bg-gray-50">
                      Configure
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  className="flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Device
                </button>
              </div>
            </div>
          )}

          {/* Data Management */}
          {activeTab === 'data' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Data Management</h3>
                <p className="mt-1 text-sm text-gray-600">Control how your farm data is stored and processed</p>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h4 className="font-medium text-gray-900">Data Storage & Retention</h4>
                  <p className="mb-4 text-sm text-gray-600">Configure how long different types of data are stored in the system</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Water Quality Readings</span>
                        <p className="text-xs text-gray-500">Historical data for EC, pH, nutrients, etc.</p>
                      </div>
                      <select className="rounded-md border border-gray-300 py-1 pl-3 pr-8 text-sm">
                        <option>5 years</option>
                        <option>3 years</option>
                        <option>1 year</option>
                        <option>6 months</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Flow & Volume Measurements</span>
                        <p className="text-xs text-gray-500">Water usage and distribution data</p>
                      </div>
                      <select className="rounded-md border border-gray-300 py-1 pl-3 pr-8 text-sm">
                        <option>3 years</option>
                        <option>5 years</option>
                        <option>1 year</option>
                        <option>6 months</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Weather Data</span>
                        <p className="text-xs text-gray-500">Temperature, precipitation, and other meteorological data</p>
                      </div>
                      <select className="rounded-md border border-gray-300 py-1 pl-3 pr-8 text-sm">
                        <option>2 years</option>
                        <option>5 years</option>
                        <option>1 year</option>
                        <option>6 months</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-900">System Events & Alerts</span>
                        <p className="text-xs text-gray-500">Notifications, warnings, and system status changes</p>
                      </div>
                      <select className="rounded-md border border-gray-300 py-1 pl-3 pr-8 text-sm">
                        <option>1 year</option>
                        <option>5 years</option>
                        <option>2 years</option>
                        <option>6 months</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="font-medium text-gray-900">Data Export</h4>
                  <p className="mb-4 text-sm text-gray-600">Export your farm data for backup or analysis</p>
                  
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                      <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Export All Data (CSV)
                    </button>
                    <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                      <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Export Reports (PDF)
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <h4 className="font-medium text-red-800">Danger Zone</h4>
                  <p className="mb-4 text-sm text-red-700">Permanent actions that cannot be undone</p>
                  
                  <div className="space-y-3">
                    <button className="flex items-center justify-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50">
                      Clear All Historical Data
                    </button>
                    <button className="flex items-center justify-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50">
                      Reset System Configuration
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  className="flex items-center rounded-md border border-transparent bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                  onClick={handleSaveSettings}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="mr-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : 'Save Data Settings'}
                </button>
              </div>
            </div>
          )}

          {/* Other tabs can be implemented similarly */}
          {(activeTab === 'team' || activeTab === 'language') && (
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  {activeTab === 'team' ? 'Team Access Settings' : 'Language & Region Settings'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  This section is under development and will be available soon.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Get Early Access
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
