
import * as React from 'react';
import { SensorData } from '@/utils/sensorUtils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Battery, Flame, PawPrint } from 'lucide-react';

type SensorCardProps = {
  sensor: SensorData;
};

const SensorCard: React.FC<SensorCardProps> = ({ sensor }) => {
  // Determine status class
  const getStatusClass = () => {
    switch (sensor.status) {
      case 'warning':
        return 'bg-farm-warning animate-pulse-warning';
      case 'danger':
        return 'bg-farm-danger animate-pulse-danger';
      default:
        return 'bg-green-500';
    }
  };
  
  const getIcon = () => {
    if (sensor.type === 'motion') {
      return <PawPrint className="w-5 h-5" />;
    } else {
      return <Flame className="w-5 h-5" />;
    }
  };

  return (
    <Card className={`overflow-hidden ${sensor.status !== 'normal' ? 'border-2 border-' + (sensor.status === 'danger' ? 'farm-danger' : 'farm-warning') : ''}`}>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-md font-medium flex items-center">
            {getIcon()}
            <span className="ml-2">{sensor.location}</span>
          </CardTitle>
          <div className={`w-3 h-3 rounded-full ${getStatusClass()}`} />
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="mt-2">
          <div className="text-2xl font-bold">
            {sensor.lastReading}{sensor.type === 'motion' ? '%' : 'ppm'}
          </div>
          <div className="text-sm text-muted-foreground">
            {sensor.type === 'motion' ? 'Motion Intensity' : 'Smoke Level'}
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Battery</span>
            <span className="flex items-center">
              <Battery className="w-4 h-4 mr-1" />
              {sensor.batteryLevel}%
            </span>
          </div>
          <Progress value={sensor.batteryLevel} 
            className={sensor.batteryLevel < 20 ? "bg-red-100" : "bg-gray-100"}
          />
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
        Last updated: {sensor.lastUpdate.toLocaleTimeString()}
      </CardFooter>
    </Card>
  );
};

export default SensorCard;
