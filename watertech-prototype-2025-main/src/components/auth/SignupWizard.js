'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BRAND from '@/utils/brandConfig';

export default function SignupWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Farm basic details
  const [farmName, setFarmName] = useState('');
  const [location, setLocation] = useState({ lat: 40.105, lng: 47.628 });
  const [farmSize, setFarmSize] = useState('');
  const [crops, setCrops] = useState([]);
  
  // Water sources
  const [waterSources, setWaterSources] = useState([]);
  
  // Sensor linking
  const [sensors, setSensors] = useState([]);

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call for signup
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 2000);
  };

  const addCrop = (crop) => {
    if (!crops.includes(crop)) {
      setCrops([...crops, crop]);
    }
  };

  const removeCrop = (crop) => {
    setCrops(crops.filter((c) => c !== crop));
  };

  const addWaterSource = (type) => {
    setWaterSources([...waterSources, { type, id: Date.now() }]);
  };

  const removeWaterSource = (id) => {
    setWaterSources(waterSources.filter((source) => source.id !== id));
  };

  const addSensor = () => {
    setSensors([...sensors, { id: Date.now(), type: 'water_quality' }]);
  };

  return (
    <div className="w-full max-w-2xl space-y-8 p-6">
      <div className="flex flex-col items-center justify-center space-y-2">
        <Image
          src={BRAND.logo}
          alt={BRAND.name}
          width={180}
          height={60}
          className="h-14 w-auto"
        />
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Welcome to {BRAND.name}
        </h2>
        <p className="text-center text-sm text-gray-600">
          Let's set up your farm profile
        </p>
      </div>

      <div className="mt-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    currentStep === step
                      ? 'border-brand-primary bg-brand-primary text-white'
                      : currentStep > step
                      ? 'border-brand-primary bg-brand-primary text-white'
                      : 'border-gray-300 bg-white text-gray-500'
                  }`}
                >
                  {currentStep > step ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                <div className="mt-2 text-xs">
                  {step === 1
                    ? 'Farm Details'
                    : step === 2
                    ? 'Water Sources'
                    : 'Sensor Linking'}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 h-1 w-full rounded-full bg-gray-200">
            <div
              className="h-1 rounded-full bg-brand-primary transition-all"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={currentStep === 3 ? handleSubmit : (e) => e.preventDefault()}>
          {/* Step 1: Farm Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="farmName" className="block text-sm font-medium text-gray-700">
                  Farm Name
                </label>
                <input
                  type="text"
                  id="farmName"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-brand-primary sm:text-sm"
                  placeholder="Araz Valley Farm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Farm Location
                </label>
                <div className="mt-1 h-64 w-full rounded-md border border-gray-300 bg-gray-50">
                  <div className="flex h-full items-center justify-center text-sm text-gray-500">
                    Map widget would go here
                    <br />
                    (Click to place pin)
                  </div>
                </div>
                <div className="mt-2 flex space-x-4">
                  <div>
                    <label htmlFor="lat" className="block text-xs font-medium text-gray-500">
                      Latitude
                    </label>
                    <input
                      type="text"
                      id="lat"
                      value={location.lat}
                      readOnly
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-1 text-sm shadow-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="lng" className="block text-xs font-medium text-gray-500">
                      Longitude
                    </label>
                    <input
                      type="text"
                      id="lng"
                      value={location.lng}
                      readOnly
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-1 text-sm shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="farmSize" className="block text-sm font-medium text-gray-700">
                  Field Size (hectares)
                </label>
                <input
                  type="number"
                  id="farmSize"
                  value={farmSize}
                  onChange={(e) => setFarmSize(e.target.value)}
                  min="0"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-brand-primary sm:text-sm"
                  placeholder="85"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Main Crops
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['Wheat', 'Cotton', 'Corn', 'Alfalfa', 'Barley', 'Vegetables'].map((crop) => (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => crops.includes(crop) ? removeCrop(crop) : addCrop(crop)}
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        crops.includes(crop)
                          ? 'bg-brand-primary text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {crop}
                      {crops.includes(crop) && (
                        <span className="ml-1">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Water Sources */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Water Sources
                </label>
                <p className="text-xs text-gray-500">
                  Add all the water sources you use for irrigation
                </p>
                <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { type: 'canal', label: 'Canal' },
                    { type: 'pond', label: 'Pond' },
                    { type: 'reservoir', label: 'Reservoir' },
                    { type: 'well', label: 'Well' }
                  ].map((source) => (
                    <button
                      key={source.type}
                      type="button"
                      onClick={() => addWaterSource(source.type)}
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-brand-primary hover:bg-brand-light"
                    >
                      <span className="block text-sm font-medium">{source.label}</span>
                      <span className="mt-1 block text-2xl">+</span>
                    </button>
                  ))}
                </div>
              </div>

              {waterSources.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Added Sources:</h3>
                  <div className="mt-2 space-y-3">
                    {waterSources.map((source) => (
                      <div
                        key={source.id}
                        className="flex items-center justify-between rounded-md border border-gray-300 bg-white p-3"
                      >
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-brand-light p-2 text-brand-primary">
                            {source.type === 'canal' && (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2 15c6.667-6 13.333 0 20-6v-2c-6.667 6-13.333 0-20 6v2zm0 4c6.667-6 13.333 0 20-6v-2c-6.667 6-13.333 0-20 6v2zm0-8c6.667-6 13.333 0 20-6V3c-6.667 6-13.333 0-20 6v2z" />
                              </svg>
                            )}
                            {source.type === 'pond' && (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 110 12 6 6 0 010-12z" />
                              </svg>
                            )}
                            {source.type === 'reservoir' && (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22 16v1h-2v-1h2zm0-5v1h-2v-1h2zm0-5v1h-2V6h2zm-5 10v1h-2v-1h2zm0-5v1h-2v-1h2zm0-5v1h-2V6h2zM7 21H5V3h15v2H7v16z" />
                              </svg>
                            )}
                            {source.type === 'well' && (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2a10 10 0 00-6.88 17.214l5.555-12.214h2.652l5.572 12.214A9.969 9.969 0 0022 12c0-5.523-4.477-10-10-10zm0 18c-2.243 0-4.85-3.872-4.85-8s2.607-8 4.85-8 4.85 3.872 4.85 8-2.607 8-4.85 8z" />
                              </svg>
                            )}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {source.type.charAt(0).toUpperCase() + source.type.slice(1)}
                            </div>
                            <input
                              type="text"
                              placeholder={`${source.type.charAt(0).toUpperCase() + source.type.slice(1)} name`}
                              className="mt-1 block w-full border-0 p-0 text-sm text-gray-500 placeholder-gray-400 focus:ring-0"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeWaterSource(source.id)}
                          className="text-sm font-medium text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Sensor Linking */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Link Sensors to Your Account
                </label>
                <p className="text-xs text-gray-500">
                  Add sensors by QR code scan or auto-detection
                </p>

                <div className="mt-4 flex space-x-4">
                  <button
                    type="button"
                    onClick={addSensor}
                    className="flex items-center rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-secondary"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    Scan QR Code
                  </button>
                  <button
                    type="button"
                    onClick={addSensor}
                    className="flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ring-1 ring-gray-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                    </svg>
                    Auto-Detect
                  </button>
                </div>
              </div>

              {sensors.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Linked Sensors:</h3>
                  <div className="mt-2 space-y-3">
                    {sensors.map((sensor, index) => (
                      <div
                        key={sensor.id}
                        className="flex items-center justify-between rounded-md border border-gray-300 bg-white p-3"
                      >
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-green-100 p-2 text-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-3.5-8.5l2 2 5-5-1.414-1.414L10.5 10.672 9.914 10.086 7.5 12.5z" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              Water Quality Sensor {index + 1}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: AQ-{Math.floor(10000 + Math.random() * 90000)}
                            </div>
                          </div>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Connected
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-blue-700">
                      You can add more sensors later from the dashboard settings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between space-x-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Back
              </button>
            )}
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className={`flex items-center justify-center rounded-md border border-transparent bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 ${
                  currentStep === 1 ? 'ml-auto' : ''
                }`}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center rounded-md border border-transparent bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
              >
                {isLoading ? (
                  <>
                    <svg className="mr-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Setting up your account...
                  </>
                ) : (
                  'Complete Setup'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
