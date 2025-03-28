
import React, { useState, useEffect } from 'react';
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
  
  // Simulate sensor data updates
  useEffect(() => {
    const updateSensors = () => {
      setLastSyncTime(new Date());
      const updatedSensors = [...sensors];
      
      // Randomly choose one sensor to update for more realistic simulation
      const randomIndex = Math.floor(Math.random() * updatedSensors.length);
      const targetSensor = updatedSensors[randomIndex];
      
      const newReading = generateRandomReading(targetSensor);
      updatedSensors[randomIndex] = updateSensorWithReading(targetSensor, newReading);
      
      setSensors(updatedSensors);
      
      // Only add to events log and show alert if there's a warning or danger
      if (newReading.status !== 'normal') {
        setEvents(prev => [...prev, newReading]);
        handleSensorAlert(newReading);
      }
    };
    
    // Update every 5 seconds
    const interval = setInterval(updateSensors, 5000);
    
    // Initial update
    updateSensors();
    
    return () => clearInterval(interval);
  }, [sensors]);
  
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
