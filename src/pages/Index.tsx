import * as React from 'react';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SensorGrid from '@/components/SensorGrid';
import EventLog from '@/components/EventLog';
import SystemStatus from '@/components/SystemStatus';
import { 
  initialSensors, 
  SensorData, 
  SensorReading, 
  generateRandomReading, 
  updateSensorWithReading,
  handleSensorAlert
} from '@/utils/sensorUtils';

const Index = () => {
  const [sensors, setSensors] = useState<SensorData[]>(initialSensors);
  const [events, setEvents] = useState<SensorReading[]>([]);
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());
  const [systemUptime, setSystemUptime] = useState<string>("00:00:00");
  const [systemStatus, setSystemStatus] = useState<'online' | 'offline' | 'warning'>('online');
  
  // Format uptime string from seconds
  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Simulate uptime
  useEffect(() => {
    let uptimeSeconds = 0;
    const uptimeInterval = setInterval(() => {
      uptimeSeconds += 1;
      setSystemUptime(formatUptime(uptimeSeconds));
    }, 1000);
    
    return () => clearInterval(uptimeInterval);
  }, []);
  
  // Simulate sensor data updates with more realistic timing
  useEffect(() => {
    // Update all sensors with normal readings every 3 seconds
    const normalUpdateInterval = setInterval(() => {
      setLastSyncTime(new Date());
      
      // Update all sensors with normal readings
      setSensors(prevSensors => {
        return prevSensors.map(sensor => {
          // Create a normal reading (low values)
          const normalReading: SensorReading = {
            id: `${sensor.id}-${new Date().getTime()}`,
            timestamp: new Date(),
            value: sensor.type === 'motion' 
              ? Math.floor(Math.random() * 20) // 0-20 for motion
              : Math.floor(Math.random() * 15), // 0-15 for smoke
            type: sensor.type,
            location: sensor.location,
            status: 'normal'
          };
          
          return updateSensorWithReading(sensor, normalReading);
        });
      });
    }, 3000);
    
    // Generate alerts occasionally (every 15-60 seconds randomly)
    const generateRandomAlert = () => {
      // Pick a random sensor to generate an alert for
      const randomSensorIndex = Math.floor(Math.random() * sensors.length);
      const targetSensor = sensors[randomSensorIndex];
      
      // Generate a reading that will trigger an alert
      const alertReading = generateRandomReading(targetSensor);
      
      // Force it to be a warning or danger state for testing
      if (Math.random() < 0.5) {
        alertReading.status = 'warning';
        alertReading.value = targetSensor.type === 'motion' ? 75 : 65;
      } else {
        alertReading.status = 'danger';
        alertReading.value = targetSensor.type === 'motion' ? 95 : 85;
      }
      
      // Update the sensor and add to events log
      setSensors(prevSensors => {
        const updatedSensors = [...prevSensors];
        updatedSensors[randomSensorIndex] = updateSensorWithReading(targetSensor, alertReading);
        return updatedSensors;
      });
      
      setEvents(prev => [alertReading, ...prev]);
      handleSensorAlert(alertReading);
      
      // Schedule next alert
      scheduleNextAlert();
    };
    
    // Schedule next random alert
    const scheduleNextAlert = () => {
      // Random time between 15-60 seconds
      const nextAlertTime = 15000 + Math.random() * 45000;
      setTimeout(generateRandomAlert, nextAlertTime);
    };
    
    // Start the random alert cycle
    scheduleNextAlert();
    
    return () => {
      clearInterval(normalUpdateInterval);
    };
  }, []); // Empty dependency array to run only once on mount
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6 px-4">
        <Header />
        
        <main className="space-y-6">
          <SensorGrid sensors={sensors} />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <EventLog events={events} />
            </div>
            <div>
              <SystemStatus 
                uptime={systemUptime}
                systemStatus={systemStatus}
                lastSyncTime={lastSyncTime}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
