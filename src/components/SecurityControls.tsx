import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Shield, ShieldCheck, RefreshCw, Wifi, Lock } from 'lucide-react';
import { WireGuardDialog } from './WireGuardDialog';

interface SecurityControlsProps {
  onRefreshStatus: () => void;
  onSecureNetwork: () => void;
  onApplyFirewall: () => void;
  onConfigGenerated: (config: string) => void;
  isLoading?: boolean;
}

export const SecurityControls = ({ 
  onRefreshStatus, 
  onSecureNetwork, 
  onApplyFirewall, 
  onConfigGenerated, 
  isLoading 
}: SecurityControlsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Button 
        onClick={onRefreshStatus} 
        disabled={isLoading}
        className="flex items-center gap-2 bg-gradient-primary shadow-primary hover:shadow-primary/50 transition-all duration-300"
      >
        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        Refresh Status
      </Button>

      <Button 
        onClick={onSecureNetwork}
        variant="outline"
        className="flex items-center gap-2 border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300"
      >
        <Wifi className="h-4 w-4" />
        Secure Network
      </Button>

      <WireGuardDialog onConfigGenerated={onConfigGenerated} />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="outline"
            className="flex items-center gap-2 border-destructive/20 hover:bg-destructive/10 hover:border-destructive/40 transition-all duration-300"
          >
            <ShieldCheck className="h-4 w-4" />
            Apply Firewall Profile
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Apply Firewall Safe Profile
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Applying firewall rules requires administrative privileges and may affect network connectivity.
              </p>
              <p className="text-sm">
                <strong>Windows:</strong> Uses netsh commands to configure Windows Firewall<br />
                <strong>Linux:</strong> Uses ufw (Uncomplicated Firewall)<br />
                <strong>macOS:</strong> Manual configuration required
              </p>
              <p className="text-destructive text-sm font-medium">
                This operation may temporarily interrupt your internet connection. Continue?
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onApplyFirewall} className="bg-destructive hover:bg-destructive/90">
              Apply Firewall Rules
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};