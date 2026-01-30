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
  status: 'Online' | 'Offline' | 'Warning';
  currentTemp: number;
  setPoint: number;
  humidity: number;
  healthScore: number; // 0-100
  lastSync: string;
}

export interface DiagnosticAlert {
  id: string;
  deviceId: string;
  severity: 'low' | 'medium' | 'critical';
  component: string;
  confidence: number;
  message: string;
  timestamp: string;
}
