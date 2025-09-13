import { WiFiInfo, RiskAssessment, WireGuardConfig } from '@/types/wifi';

// Mock WiFi detection for demo purposes
// In a real implementation, this would call system commands via API routes
export const detectWiFi = async (): Promise<WiFiInfo | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock different network scenarios for demo
  const scenarios: WiFiInfo[] = [
    {
      ssid: "HomeNetwork_5G",
      bssid: "aa:bb:cc:dd:ee:ff",
      auth: "wpa2-psk",
      signal: 85,
      connected: true
    },
    {
      ssid: "PublicWiFi",
      bssid: "11:22:33:44:55:66",
      auth: "open",
      signal: 72,
      connected: true
    },
    {
      ssid: "SecureOffice",
      bssid: "ff:ee:dd:cc:bb:aa",
      auth: "wpa3-sae",
      signal: 91,
      connected: true
    },
    {
      ssid: "OldRouter",
      bssid: "00:11:22:33:44:55",
      auth: "wep",
      signal: 45,
      connected: true
    }
  ];

  // Return a random scenario for demo
  return scenarios[Math.floor(Math.random() * scenarios.length)];
};

export const assessRisk = (info: WiFiInfo | null): RiskAssessment => {
  if (!info || !info.ssid) {
    return {
      level: 'NO_WIFI',
      message: 'No network detected. Connect to Wi-Fi first.',
      color: 'gray'
    };
  }

  const auth = info.auth.toLowerCase();

  if (auth.includes('open') || auth === '' || auth.includes('none')) {
    return {
      level: 'HIGH',
      message: 'The network is open (no encryption). Use VPN immediately or avoid sensitive activity.',
      color: 'red'
    };
  }

  if (auth.includes('wep')) {
    return {
      level: 'HIGH',
      message: 'WEP is insecure — avoid using this network for sensitive tasks.',
      color: 'red'
    };
  }

  if (auth.includes('wpa3')) {
    return {
      level: 'LOW',
      message: 'This network uses WPA3 — good. Still consider using a VPN on public networks.',
      color: 'green'
    };
  }

  if (auth.includes('wpa2')) {
    return {
      level: 'MEDIUM',
      message: 'WPA2 is acceptable. Use strong router passwords and consider VPN on public networks.',
      color: 'orange'
    };
  }

  if (auth.includes('wpa')) {
    return {
      level: 'MEDIUM',
      message: 'WPA detected. Consider upgrading to WPA2/WPA3 if you can.',
      color: 'orange'
    };
  }

  return {
    level: 'UNKNOWN',
    message: 'Unable to determine encryption. Use caution; enable VPN if unsure.',
    color: 'gray'
  };
};

export const generateWireGuardConfig = (config: WireGuardConfig): string => {
  const privateKey = config.privateKey || '<GENERATED_PRIVATE_KEY>';
  const address = config.address || '10.0.0.2/32';
  const dns = config.dns || '1.1.1.1';

  return `[Interface]
# ${config.clientName}
PrivateKey = ${privateKey}
Address = ${address}
DNS = ${dns}

[Peer]
PublicKey = ${config.serverPublicKey}
Endpoint = ${config.serverEndpoint}
AllowedIPs = ${config.allowedIPs}
PersistentKeepalive = 25`;
};

export const downloadConfig = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};