import { WiFiInfo, RiskAssessment } from '@/types/wifi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Shield, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NetworkStatusCardProps {
  wifiInfo: WiFiInfo | null;
  riskAssessment: RiskAssessment;
  isLoading?: boolean;
}

export const NetworkStatusCard = ({ wifiInfo, riskAssessment, isLoading }: NetworkStatusCardProps) => {
  const getRiskIcon = () => {
    switch (riskAssessment.level) {
      case 'LOW': return <CheckCircle className="h-5 w-5" />;
      case 'MEDIUM': return <AlertTriangle className="h-5 w-5" />;
      case 'HIGH': return <Shield className="h-5 w-5" />;
      default: return <HelpCircle className="h-5 w-5" />;
    }
  };

  const getRiskColorClass = () => {
    switch (riskAssessment.color) {
      case 'green': return 'text-risk-low border-risk-low';
      case 'orange': return 'text-risk-medium border-risk-medium';
      case 'red': return 'text-risk-high border-risk-high';
      default: return 'text-risk-unknown border-risk-unknown';
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-gradient-card border-border shadow-card animate-pulse">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wifi className="h-5 w-5 animate-pulse" />
            Network Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-border shadow-card animate-fade-in">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          {wifiInfo ? <Wifi className="h-5 w-5" /> : <WifiOff className="h-5 w-5" />}
          Network Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {wifiInfo ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">SSID</p>
                <p className="font-medium">{wifiInfo.ssid}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">BSSID</p>
                <p className="font-mono text-sm">{wifiInfo.bssid}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Encryption</p>
                <p className="font-medium uppercase">{wifiInfo.auth}</p>
              </div>
              {wifiInfo.signal && (
                <div>
                  <p className="text-sm text-muted-foreground">Signal</p>
                  <p className="font-medium">{wifiInfo.signal}%</p>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-border">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <Badge 
                  variant="outline" 
                  className={cn("font-semibold", getRiskColorClass())}
                >
                  <span className="flex items-center gap-1">
                    {getRiskIcon()}
                    {riskAssessment.level}
                  </span>
                </Badge>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">
                {riskAssessment.message}
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <WifiOff className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">{riskAssessment.message}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};