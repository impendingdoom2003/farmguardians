
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, WifiOff, AlertTriangle, Wifi } from 'lucide-react';

type SystemStatusProps = {
  uptime: string;
  systemStatus: 'online' | 'offline' | 'warning';
  lastSyncTime: Date;
};

const SystemStatus: React.FC<SystemStatusProps> = ({ 
  uptime, 
  systemStatus, 
  lastSyncTime 
}) => {
  // Status icon based on system status
  const statusIcon = () => {
    switch (systemStatus) {
      case 'online':
        return <Check className="text-green-500" />;
      case 'offline':
        return <WifiOff className="text-red-500" />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" />;
    }
  };

  // Status text based on system status
  const statusText = () => {
    switch (systemStatus) {
      case 'online':
        return 'All systems operational';
      case 'offline':
        return 'System offline';
      case 'warning':
        return 'System issues detected';
    }
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center">
            <div className="mr-3 bg-farm-green-light bg-opacity-20 p-2 rounded-full">
              <Wifi className="w-5 h-5 text-farm-green" />
            </div>
            <div>
              <h3 className="font-medium">System Status</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                {statusIcon()}
                <span className="ml-1">{statusText()}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0 grid grid-cols-2 gap-x-8 text-sm">
            <div>
              <div className="text-muted-foreground">Uptime</div>
              <div className="font-medium">{uptime}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Last Sync</div>
              <div className="font-medium">{lastSyncTime.toLocaleTimeString()}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatus;
