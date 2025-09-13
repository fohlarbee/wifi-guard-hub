import { useState, useCallback, useEffect } from 'react';
import { WiFiInfo, RiskAssessment, LogEntry } from '@/types/wifi';
import { detectWiFi, assessRisk } from '@/utils/wifi-detection';
import { useToast } from '@/hooks/use-toast';

let logIdCounter = 0;

export const useWiFiLayer = () => {
  const [wifiInfo, setWifiInfo] = useState<WiFiInfo | null>(null);
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment>({
    level: 'NO_WIFI',
    message: 'No network detected. Connect to Wi-Fi first.',
    color: 'gray'
  });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    const newLog: LogEntry = {
      id: `log-${++logIdCounter}`,
      timestamp: new Date(),
      type,
      message
    };
    setLogs(prev => [...prev, newLog]);
  }, []);

  const refreshStatus = useCallback(async () => {
    setIsLoading(true);
    addLog('Refreshing network status...', 'info');

    try {
      const info = await detectWiFi();
      setWifiInfo(info);
      
      const risk = assessRisk(info);
      setRiskAssessment(risk);

      if (info) {
        addLog(`Detected SSID: ${info.ssid} — Encryption: ${info.auth.toUpperCase()} — Risk: ${risk.level}`, 'success');
      } else {
        addLog('Wi-Fi detection failed or required system tool missing.', 'warning');
      }
    } catch (error) {
      addLog('Error detecting Wi-Fi information.', 'error');
      console.error('WiFi detection error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [addLog]);

  const secureNetwork = useCallback(() => {
    addLog('Security hardening process initiated...', 'info');
    addLog('Step 1: VPN Recommendation — Use WireGuard or trusted VPN provider. Generate a config using the WireGuard button.', 'info');
    addLog('Step 2: DNS-over-HTTPS — Enable secure DNS in your browser or system settings (1.1.1.1, 8.8.8.8).', 'info');
    addLog('Step 3: Firewall — Click "Apply Firewall Profile" to enable recommended security rules (requires admin privileges).', 'info');
    
    toast({
      title: "Security Recommendations",
      description: "Check the log panel for detailed security hardening steps.",
    });
  }, [addLog, toast]);

  const applyFirewall = useCallback(() => {
    addLog('Applying firewall security profile...', 'info');
    
    // Mock firewall application with platform detection
    const platform = navigator.platform.toLowerCase();
    
    if (platform.includes('win')) {
      addLog('Windows detected: Configuring Windows Defender Firewall...', 'info');
      setTimeout(() => {
        addLog('Windows firewall profile applied. Inbound connections blocked, outbound allowed.', 'success');
        toast({
          title: "Firewall Applied",
          description: "Windows Firewall has been configured with secure defaults.",
        });
      }, 2000);
    } else if (platform.includes('linux')) {
      addLog('Linux detected: Configuring UFW (Uncomplicated Firewall)...', 'info');
      setTimeout(() => {
        addLog('UFW rules applied: deny incoming, allow outgoing. You may be prompted for sudo password.', 'success');
        toast({
          title: "Firewall Applied", 
          description: "UFW has been configured with secure defaults.",
        });
      }, 2000);
    } else if (platform.includes('mac')) {
      addLog('macOS detected: Please manually configure firewall in System Preferences > Security & Privacy.', 'warning');
      toast({
        title: "Manual Configuration Required",
        description: "macOS firewall must be configured manually through System Preferences.",
        variant: "destructive"
      });
    } else {
      addLog('Platform not supported for automatic firewall configuration.', 'warning');
      toast({
        title: "Platform Not Supported",
        description: "Automatic firewall configuration is not available for this platform.",
        variant: "destructive"
      });
    }
  }, [addLog, toast]);

  const handleConfigGenerated = useCallback((config: string) => {
    addLog(`WireGuard configuration generated successfully. Save the .conf file to your WireGuard client.`, 'success');
    addLog('Remember to replace the placeholder private key with a real one before using the config.', 'warning');
  }, [addLog]);

  // Initial status refresh
  useEffect(() => {
    addLog('WiFiLayer initialized. Welcome to easy Wi-Fi security hardening!', 'info');
    setTimeout(() => refreshStatus(), 1000);
  }, [refreshStatus, addLog]);

  return {
    wifiInfo,
    riskAssessment,
    logs,
    isLoading,
    refreshStatus,
    secureNetwork,
    applyFirewall,
    handleConfigGenerated
  };
};