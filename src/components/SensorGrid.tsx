
import * as React from 'react';
import { SensorData } from '@/utils/sensorUtils';
import SensorCard from './SensorCard';

type SensorGridProps = {
  sensors: SensorData[];
};

const SensorGrid: React.FC<SensorGridProps> = ({ sensors }) => {
  // Separate sensors by type
  const motionSensors = sensors.filter(sensor => sensor.type === 'motion');
  const smokeSensors = sensors.filter(sensor => sensor.type === 'smoke');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center">
          <span className="w-4 h-4 bg-farm-green mr-2 rounded-full"></span>
          Animal Intrusion Detection (PIR)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {motionSensors.map(sensor => (
            <SensorCard key={sensor.id} sensor={sensor} />
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center">
          <span className="w-4 h-4 bg-farm-danger mr-2 rounded-full"></span>
          Fire Detection (Smoke)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {smokeSensors.map(sensor => (
            <SensorCard key={sensor.id} sensor={sensor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SensorGrid;
