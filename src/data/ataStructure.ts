
import type { ATAStructure, ContentMapping } from '@/types/ata';

export const ataStructure: ATAStructure = {
  '21': {
    title: 'AIR CONDITIONING',
    sections: {
      '00': { title: 'GENERAL', items: ['01'] },
      '10': { title: 'COMPRESSION', items: ['01'] },
      '20': { title: 'TEMPERATURE CONTROL', items: ['01'] }
    }
  },
  '22': {
    title: 'AUTO FLIGHT',
    sections: {
      '00': { title: 'GENERAL', items: ['01'] },
      '10': { title: 'AUTOPILOT', items: ['01'] },
      '20': { title: 'SPEED/ATTITUDE CORRECTION', items: ['01'] }
    }
  },
  '23': {
    title: 'COMMUNICATIONS',
    sections: {
      '00': { title: 'GENERAL', items: ['01'] },
      '10': { title: 'SPEECH COMMUNICATIONS', items: ['01'] },
      '20': { title: 'DATA TRANSMISSION', items: ['01'] }
    }
  },
  '24': {
    title: 'ELECTRICAL POWER',
    sections: {
      '00': { title: 'GENERAL', items: ['01'] },
      '10': { title: 'GENERATION', items: ['01'] },
      '20': { title: 'DISTRIBUTION', items: ['01'] }
    }
  },
  '25': {
    title: 'EQUIPMENT/FURNISHINGS',
    sections: {
      '00': { title: 'GENERAL', items: ['01'] },
      '10': { title: 'FLIGHT COMPARTMENT', items: ['01'] },
      '20': { title: 'PASSENGER COMPARTMENT', items: ['01'] }
    }
  },
  '26': {
    title: 'FIRE PROTECTION',
    sections: {
      '00': { title: 'GENERAL', items: ['01'] },
      '10': { title: 'DETECTION', items: ['01'] },
      '20': { title: 'EXTINGUISHING', items: ['01'] }
    }
  },
  '27': {
    title: 'FLIGHT CONTROLS',
    sections: {
      '00': { title: 'GENERAL', items: ['01'] },
      '10': { title: 'AILERON & TAB', items: ['01'] },
      '20': { title: 'RUDDER', items: ['01'] }
    }
  },
  '28': {
    title: 'FUEL',
    sections: {
      '00': { title: 'GENERAL', items: ['01'] },
      '10': { title: 'STORAGE', items: ['01'] },
      '20': { title: 'DISTRIBUTION', items: ['01'] }
    }
  },
  '29': {
    title: 'HYDRAULIC POWER',
    sections: {
      '00': { title: 'GENERAL', items: ['01'] },
      '10': { title: 'MAIN SYSTEM', items: ['01'] },
      '20': { title: 'AUXILIARY SYSTEM', items: ['01'] }
    }
  },
  '30': {
    title: 'ICE & RAIN PROTECTION',
    sections: {
      '00': { title: 'GENERAL', items: ['01'] },
      '10': { title: 'WING ANTI-ICE', items: ['01'] },
      '20': { title: 'WINDSHIELD ANTI-ICE', items: ['01'] }
    }
  },
  '32': {
    title: 'LANDING GEAR',
    sections: {
      '00': { title: 'GENERAL', items: ['01'] },
      '10': { title: 'MAIN GEAR', items: ['01'] },
      '20': { title: 'NOSE GEAR', items: ['01'] }
    }
  },
  '33': {
    title: 'LIGHTS',
    sections: {
      '00': { title: 'GENERAL', items: ['01'] },
      '10': { title: 'FLIGHT COMPARTMENT', items: ['01'] },
      '20': { title: 'CABIN LIGHTS', items: ['01'] }
    }
  },
  '34': {
    title: 'NAVIGATION',
    sections: {
      '00': { title: 'GENERAL', items: ['01'] },
      '10': { title: 'FLIGHT ENVIRONMENT DATA', items: ['01'] },
      '20': { title: 'ATTITUDE & DIRECTION', items: ['01'] }
    }
  },
  '35': {
    title: 'OXYGEN',
    sections: {
      '00': { title: 'GENERAL', items: ['01'] },
      '10': { title: 'CREW OXYGEN', items: ['01'] },
      '20': { title: 'PASSENGER OXYGEN', items: ['01'] }
    }
  },
  '36': {
    title: 'PNEUMATIC',
    sections: {
      '00': { title: 'GENERAL', items: ['01'] },
      '10': { title: 'PRESSURE CONTROL', items: ['01'] }
    }
  },
  '38': {
    title: 'WATER/WASTE',
    sections: {
      '00': { title: 'GENERAL', items: ['01'] },
      '10': { title: 'POTABLE WATER', items: ['01'] },
      '20': { title: 'WASTE DISPOSAL', items: ['01'] }
    }
  },
  '49': {
    title: 'AUXILIARY POWER UNIT (APU)',
    sections: {
      '00': { title: 'GENERAL', items: ['01'] },
      '10': { title: 'POWER PLANT', items: ['01'] },
      '20': { title: 'FUEL & AIR', items: ['01'] }
    }
  },
  '52': {
    title: 'DOORS',
    sections: {
      '00': { title: 'GENERAL', items: ['01'] },
      '10': { title: 'PASSENGER/CREW DOORS', items: ['01'] },
      '20': { title: 'CARGO DOORS', items: ['01'] }
    }
  },
  '70': {
    title: 'ENGINE (GENERAL)',
    sections: {
      '00': { title: 'GENERAL', items: ['01'] },
      '10': { title: 'INSPECTION', items: ['01'] },
      '20': { title: 'CLEANING/STRIPPING', items: ['01'] }
    }
  }
};

export const contentMapping: ContentMapping = {
  '21-00-01': 'System Description',
  '21-10-01': 'Air Cycle Machine',
  '21-20-01': 'Cabin Temperature Regulation',
  '22-00-01': 'Autopilot System',
  '22-10-01': 'Flight Director',
  '22-20-01': 'Yaw Damper',
  '23-00-01': 'VHF System',
  '23-10-01': 'Cockpit Audio',
  '23-20-01': 'ACARS',
  '24-00-01': 'Electrical System Overview',
  '24-10-01': 'IDG (Integrated Drive Generator)',
  '24-20-01': 'Bus Transfer',
  '25-00-01': 'Cabin Layout',
  '25-10-01': 'Pilot Seats',
  '25-20-01': 'Overhead Bins',
  '26-00-01': 'Fire Detection System',
  '26-10-01': 'Smoke Detectors',
  '26-20-01': 'Fire Bottles',
  '27-00-01': 'Primary Flight Controls',
  '27-10-01': 'Aileron Actuation',
  '27-20-01': 'Rudder Pedal Mechanism',
  '28-00-01': 'Fuel System Overview',
  '28-10-01': 'Center Tank',
  '28-20-01': 'Fuel Pumps',
  '29-00-01': 'Hydraulic Reservoirs',
  '29-10-01': 'Engine-Driven Pumps',
  '29-20-01': 'Power Transfer Unit',
  '30-00-01': 'Anti-Ice System',
  '30-10-01': 'Leading Edge Slats',
  '30-20-01': 'Heated Windows',
  '32-00-01': 'Landing Gear Doors',
  '32-10-01': 'Shock Strut',
  '32-20-01': 'Steering System',
  '33-00-01': 'Exterior Lighting',
  '33-10-01': 'Instrument Panel Lights',
  '33-20-01': 'Emergency Path Lighting',
  '34-00-01': 'GPS System',
  '34-10-01': 'Air Data Computers',
  '34-20-01': 'Inertial Reference Units',
  '35-00-01': 'Oxygen Masks',
  '35-10-01': 'Quick-Donning Masks',
  '35-20-01': 'Chemical Generators',
  '36-00-01': 'Bleed Air System',
  '36-10-01': 'Bleed Valves',
  '38-00-01': 'Lavatory System',
  '38-10-01': 'Water Tanks',
  '38-20-01': 'Vacuum Toilets',
  '49-00-01': 'APU Controls',
  '49-10-01': 'APU Starter',
  '49-20-01': 'APU Fuel Feed',
  '52-00-01': 'Emergency Exits',
  '52-10-01': 'Slide Deployment',
  '52-20-01': 'Cargo Door Actuation',
  '70-00-01': 'Engine Removal/Installation',
  '70-10-01': 'Fan Blade Inspection',
  '70-20-01': 'Compressor Washing'
};
