import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { LogEntry } from '@/types/wifi';
import { Terminal, Info, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogPanelProps {
  logs: LogEntry[];
}

export const LogPanel = ({ logs }: LogPanelProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'info': return <Info className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <XCircle className="h-4 w-4" />;
      case 'success': return <CheckCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getLogBadgeVariant = (type: LogEntry['type']) => {
    switch (type) {
      case 'info': return 'secondary';
      case 'warning': return 'outline';
      case 'error': return 'destructive';
      case 'success': return 'default';
      default: return 'secondary';
    }
  };

  const getLogColorClass = (type: LogEntry['type']) => {
    switch (type) {
      case 'info': return 'text-foreground';
      case 'warning': return 'text-risk-medium';
      case 'error': return 'text-risk-high';
      case 'success': return 'text-risk-low';
      default: return 'text-foreground';
    }
  };

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Terminal className="h-5 w-5" />
          Event Log & Instructions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 w-full">
          <div ref={scrollRef} className="space-y-3 pr-4">
            {logs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Terminal className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Event log and friendly instructions will appear here...</p>
              </div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="animate-fade-in">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 border border-border/50">
                    <div className={cn("mt-0.5", getLogColorClass(log.type))}>
                      {getLogIcon(log.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={getLogBadgeVariant(log.type)} className="text-xs">
                          {log.type.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {log.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">{log.message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};