export type UserRole = 'HOMEOWNER' | 'PARTNER' | 'REALTOR';

export interface PartnerBranding {
  logoUrl?: string;
  companyName: string;
  primaryColor: string;
  accentColor: string;
}

export interface SecurityStatus {
  soc2Status: 'Compliant' | 'Auditing';
  dataResidency: string;
  encryptionStatus: string;
  lastSecurityAudit: string;
}

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
  location: string;
  zone: string;
  status: 'Online' | 'Offline' | 'Warning';
  currentTemp: number;
  setPoint: number;
  humidity: number;
  healthScore: number;
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
  code: string;
}

export interface TelemetryPoint {
  time: string;
  motorAmps: number;
  staticPressure: number;
  limit: number;
}