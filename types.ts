export type UserRole = 'HOMEOWNER' | 'PARTNER' | 'REALTOR';

export interface GridStatus {
  load: number; // MW
  temp: number; // Celsius
  status: 'Normal' | 'Peak' | 'Critical';
  region: string;
}

export interface Device {
  id: string;
  name: string;
  type: 'Ecobee Smart' | 'Google Nest' | 'Honeywell Home';
  location: string; // e.g., "Etobicoke", "Vaughan"
  zone: string;
  status: 'Online' | 'Offline' | 'Warning';
  currentTemp: number;
  setPoint: number;
  humidity: number;
  healthScore: number; // 0-100
  lastSync: string;
  firmware: string;
  mode: 'Heat' | 'Cool' | 'Idle' | 'Aux';
  fanState: 'On' | 'Auto' | 'Circulate';
}

export interface DiagnosticAlert {
  id: string;
  deviceId: string;
  severity: 'low' | 'medium' | 'critical';
  component: string;
  confidence: number;
  message: string;
  timestamp: string;
  code: string; // Error code e.g. E-403
}