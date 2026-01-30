import { Device, DiagnosticAlert, GridStatus } from '../types';

export const MOCK_GRID_STATUS: GridStatus = {
  load: 18450,
  temp: -4,
  status: 'Normal',
  region: 'IESO Ontario Zone 1'
};

export const MOCK_DEVICES: Device[] = [
  {
    id: 'dev_01',
    name: 'Smith Residence Main',
    type: 'Ecobee Smart',
    location: 'Etobicoke, ON',
    status: 'Online',
    currentTemp: 21.5,
    setPoint: 22,
    humidity: 35,
    healthScore: 98,
    lastSync: '2 mins ago'
  },
  {
    id: 'dev_02',
    name: 'High Park Rental Unit 4',
    type: 'Google Nest',
    location: 'Toronto (High Park)',
    status: 'Warning',
    currentTemp: 19.2,
    setPoint: 23,
    humidity: 28,
    healthScore: 64,
    lastSync: '5 mins ago'
  },
  {
    id: 'dev_03',
    name: 'Vaughan Logistics Hub',
    type: 'Honeywell Home',
    location: 'Vaughan, ON',
    status: 'Online',
    currentTemp: 20.0,
    setPoint: 20,
    humidity: 40,
    healthScore: 92,
    lastSync: '1 min ago'
  }
];

export const MOCK_ALERTS: DiagnosticAlert[] = [
  {
    id: 'alert_01',
    deviceId: 'dev_02',
    severity: 'critical',
    component: 'Blower Motor',
    confidence: 94,
    message: 'High resistance detected in blower motor circuit. Pre-failure signature matched.',
    timestamp: 'Today, 08:42 AM'
  },
  {
    id: 'alert_02',
    deviceId: 'dev_03',
    severity: 'low',
    component: 'Filter',
    confidence: 88,
    message: 'Static pressure differential suggests filter replacement needed.',
    timestamp: 'Yesterday, 4:15 PM'
  }
];