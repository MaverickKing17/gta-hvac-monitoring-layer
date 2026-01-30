import { Device, DiagnosticAlert, GridStatus, TelemetryPoint } from '../types';

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

// Generate 24 points of data simulating a motor struggling
export const MOCK_TELEMETRY: TelemetryPoint[] = Array.from({ length: 24 }, (_, i) => {
  const baseAmp = 4.2;
  // Simulate a spike in amps at index 18 (approx 08:42 AM)
  const spike = i > 16 ? (Math.random() * 2.5) : 0; 
  return {
    time: `${String(i).padStart(2, '0')}:00`,
    motorAmps: Number((baseAmp + (Math.random() * 0.4) + spike).toFixed(2)),
    staticPressure: Number((0.4 + (Math.random() * 0.1) + (i > 16 ? -0.2 : 0)).toFixed(2)),
    limit: 6.0
  };
});