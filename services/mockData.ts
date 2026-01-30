import { Device, DiagnosticAlert, GridStatus } from '../types';

export const MOCK_GRID_STATUS: GridStatus = {
  load: 19240,
  temp: -8,
  status: 'Peak',
  region: 'IESO Ontario Zone 1 (Toronto)'
};

export const MOCK_DEVICES: Device[] = [
  {
    id: 'dev_01',
    name: 'Smith Residence Main',
    type: 'Ecobee Smart',
    location: 'Etobicoke, ON',
    zone: 'Ground Floor',
    status: 'Online',
    currentTemp: 21.5,
    setPoint: 22,
    humidity: 35,
    healthScore: 98,
    lastSync: '12s ago',
    firmware: 'v4.2.0-prod',
    mode: 'Heat',
    fanState: 'On'
  },
  {
    id: 'dev_02',
    name: 'High Park Rental Unit 4',
    type: 'Google Nest',
    location: 'Toronto (High Park)',
    zone: 'Unit 404',
    status: 'Warning',
    currentTemp: 18.2,
    setPoint: 23,
    humidity: 28,
    healthScore: 64,
    lastSync: '4m ago',
    firmware: 'v3.1.2-legacy',
    mode: 'Aux',
    fanState: 'Auto'
  },
  {
    id: 'dev_03',
    name: 'Vaughan Logistics Hub',
    type: 'Honeywell Home',
    location: 'Vaughan, ON',
    zone: 'Warehouse B',
    status: 'Online',
    currentTemp: 16.0,
    setPoint: 16,
    humidity: 40,
    healthScore: 92,
    lastSync: '45s ago',
    firmware: 'v2.0.1-ent',
    mode: 'Idle',
    fanState: 'Auto'
  }
];

export const MOCK_ALERTS: DiagnosticAlert[] = [
  {
    id: 'alert_01',
    deviceId: 'dev_02',
    severity: 'critical',
    component: 'Blower Motor',
    confidence: 94,
    message: 'Inductive load signature suggests motor winding failure imminent. Current draw +15% above baseline.',
    timestamp: 'Today, 08:42 AM',
    code: 'ERR-309'
  },
  {
    id: 'alert_02',
    deviceId: 'dev_03',
    severity: 'low',
    component: 'Filter',
    confidence: 88,
    message: 'Static pressure delta > 0.5 iwc. Airflow restricted.',
    timestamp: 'Yesterday, 4:15 PM',
    code: 'MAINT-004'
  }
];