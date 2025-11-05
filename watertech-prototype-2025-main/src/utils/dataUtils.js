/**
 * Utility functions to fetch and work with mock data
 */

/**
 * Fetch data from JSON files in public/data directory
 * @param {string} dataFile - Name of the JSON file without extension
 * @returns {Promise<any>} - Parsed JSON data
 */
export async function fetchData(dataFile) {
  try {
    const response = await fetch(`/data/${dataFile}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${dataFile}.json`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${dataFile} data:`, error);
    return null;
  }
}

/**
 * Determine water quality status based on readings and thresholds
 * @param {Object} reading - Water quality reading
 * @returns {string} - 'green', 'amber', or 'red'
 */
export function determineWaterStatus(reading) {
  if (!reading || !reading.current_readings) {
    return 'unknown';
  }
  
  // Check critical parameters
  const ec = parseFloat(reading.current_readings.ec?.value || '0');
  const sar = parseFloat(reading.current_readings.sar?.value || '0');
  const ph = parseFloat(reading.current_readings.ph?.value || '7');
  
  // Severe restrictions
  if (ec > 3.0 || sar > 9 || ph > 9 || ph < 5) {
    return 'red';
  }
  
  // Moderate restrictions
  if (ec > 0.7 || sar > 3 || ph > 8.5 || ph < 6) {
    return 'amber';
  }
  
  // No restrictions
  return 'green';
}

/**
 * Get appropriate crop recommendations based on water quality
 * @param {Object} waterQuality - Water quality readings
 * @param {Array} crops - List of crops
 * @returns {Object} - Recommendations for each crop
 */
export function getCropRecommendations(waterQuality, crops) {
  if (!waterQuality || !crops) {
    return {};
  }
  
  const recommendations = {};
  const ec = parseFloat(waterQuality.current_readings?.ec?.value || '0');
  
  crops.forEach(crop => {
    let status = 'green';
    let message = 'Safe to irrigate';
    let actions = [];
    
    // Example logic for sweet corn
    if (crop.name.toLowerCase() === 'sweet corn') {
      if (ec > 1.7) {
        status = 'red';
        message = 'Not recommended for irrigation';
        actions = ['Consider alternative water source', 'Apply gypsum at 2 t/ha'];
      } else if (ec > 0.7) {
        status = 'amber';
        message = 'Safe with caution';
        actions = ['Increase leaching fraction to 15%', 'Monitor crop closely'];
      }
    }
    // Example logic for cotton
    else if (crop.name.toLowerCase() === 'cotton') {
      if (ec > 7.7) {
        status = 'red';
        message = 'Not recommended for irrigation';
        actions = ['Consider alternative water source', 'Apply gypsum at 2 t/ha'];
      } else if (ec > 4.0) {
        status = 'amber';
        message = 'Safe with caution';
        actions = ['Increase leaching fraction to 15%', 'Monitor crop closely'];
      }
    }
    // Default for other crops
    else {
      if (ec > 3.0) {
        status = 'red';
        message = 'Not recommended for irrigation';
        actions = ['Consider alternative water source', 'Apply gypsum'];
      } else if (ec > 0.7) {
        status = 'amber';
        message = 'Safe with caution';
        actions = ['Increase leaching fraction', 'Monitor crop closely'];
      }
    }
    
    recommendations[crop.name] = { status, message, actions };
  });
  
  return recommendations;
}

/**
 * Format a numeric value with appropriate units
 * @param {string|number} value - The numeric value
 * @param {string} unit - The unit of measurement
 * @returns {string} - Formatted value with unit
 */
export function formatWithUnit(value, unit) {
  if (!value) return 'N/A';
  return `${value} ${unit || ''}`;
}
