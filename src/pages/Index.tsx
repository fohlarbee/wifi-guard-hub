import React from 'react';
import { NetworkStatusCard } from '@/components/NetworkStatusCard';
import { SecurityControls } from '@/components/SecurityControls';
import { LogPanel } from '@/components/LogPanel';
import { useWiFiLayer } from '@/hooks/useWiFiLayer';
import { Shield, Wifi } from 'lucide-react';

const Index = () => {
  const {
    wifiInfo,
    riskAssessment,
    logs,
    isLoading,
    refreshStatus,
    secureNetwork,
    applyFirewall,
    handleConfigGenerated
  } = useWiFiLayer();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-header border-b border-border shadow-card">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <Shield className="h-10 w-10 text-primary animate-pulse-glow" />
                <Wifi className="h-6 w-6 text-primary/70 absolute -bottom-1 -right-1" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              WiFiLayer
            </h1>
            <p className="text-xl text-muted-foreground">
              Easy Wi-Fi Security Hardening
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Network Status */}
        <NetworkStatusCard 
          wifiInfo={wifiInfo}
          riskAssessment={riskAssessment}
          isLoading={isLoading}
        />

        {/* Security Controls */}
        <SecurityControls
          onRefreshStatus={refreshStatus}
          onSecureNetwork={secureNetwork}
          onApplyFirewall={applyFirewall}
          onConfigGenerated={handleConfigGenerated}
          isLoading={isLoading}
        />

        {/* Event Log */}
        <LogPanel logs={logs} />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-header border-t border-border mt-12">
        <div className="container mx-auto px-6 py-6">
          <p className="text-center text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> This is a demonstration app for educational purposes. 
            System-level operations require appropriate permissions and may affect network connectivity.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
