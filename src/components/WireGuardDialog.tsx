import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { WireGuardConfig } from '@/types/wifi';
import { generateWireGuardConfig, downloadConfig } from '@/utils/wifi-detection';
import { Download, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WireGuardDialogProps {
  onConfigGenerated: (config: string) => void;
}

export const WireGuardDialog = ({ onConfigGenerated }: WireGuardDialogProps) => {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<WireGuardConfig>({
    clientName: 'client1',
    serverPublicKey: '',
    serverEndpoint: 'vpn.example.com:51820',
    allowedIPs: '0.0.0.0/0, ::/0'
  });
  const [generatedConfig, setGeneratedConfig] = useState<string>('');
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!config.serverPublicKey.trim() || !config.serverEndpoint.trim()) {
      toast({
        title: "Missing Information",
        description: "Server public key and endpoint are required.",
        variant: "destructive"
      });
      return;
    }

    const configText = generateWireGuardConfig(config);
    setGeneratedConfig(configText);
    onConfigGenerated(configText);
    
    toast({
      title: "Config Generated",
      description: "WireGuard configuration has been created successfully.",
    });
  };

  const handleDownload = () => {
    if (generatedConfig) {
      downloadConfig(generatedConfig, `wg_${config.clientName}.conf`);
      toast({
        title: "Downloaded",
        description: `Configuration saved as wg_${config.clientName}.conf`,
      });
    }
  };

  const handleReset = () => {
    setGeneratedConfig('');
    setConfig({
      clientName: 'client1',
      serverPublicKey: '',
      serverEndpoint: 'vpn.example.com:51820',
      allowedIPs: '0.0.0.0/0, ::/0'
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Key className="h-4 w-4" />
          Generate WireGuard Config
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate WireGuard Configuration</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={config.clientName}
                onChange={(e) => setConfig({ ...config, clientName: e.target.value })}
                placeholder="client1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serverEndpoint">Server Endpoint</Label>
              <Input
                id="serverEndpoint"
                value={config.serverEndpoint}
                onChange={(e) => setConfig({ ...config, serverEndpoint: e.target.value })}
                placeholder="vpn.example.com:51820"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="serverPublicKey">Server Public Key</Label>
            <Input
              id="serverPublicKey"
              value={config.serverPublicKey}
              onChange={(e) => setConfig({ ...config, serverPublicKey: e.target.value })}
              placeholder="Enter your WireGuard server's public key"
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="allowedIPs">Allowed IPs</Label>
            <Input
              id="allowedIPs"
              value={config.allowedIPs}
              onChange={(e) => setConfig({ ...config, allowedIPs: e.target.value })}
              placeholder="0.0.0.0/0, ::/0"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleGenerate} className="flex-1">
              Generate Config
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>

          {generatedConfig && (
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <Label>Generated Configuration</Label>
                <Button onClick={handleDownload} size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download .conf
                </Button>
              </div>
              <Textarea
                value={generatedConfig}
                readOnly
                className="font-mono text-sm min-h-[200px] bg-muted/50"
              />
              <p className="text-sm text-muted-foreground">
                Replace &lt;GENERATED_PRIVATE_KEY&gt; with an actual private key before using.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};