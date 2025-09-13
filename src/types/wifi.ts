export interface WiFiInfo {
  ssid: string;
  bssid: string;
  auth: string;
  signal?: number;
  connected: boolean;
}

export interface RiskAssessment {
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'UNKNOWN' | 'NO_WIFI';
  message: string;
  color: 'green' | 'orange' | 'red' | 'gray';
}

export interface WireGuardConfig {
  clientName: string;
  serverPublicKey: string;
  serverEndpoint: string;
  allowedIPs: string;
  privateKey?: string;
  address?: string;
  dns?: string;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
}