
import * as React from 'react';
import { toast } from "@/components/ui/use-toast";

export type SensorReading = {
  id: string;
  timestamp: Date;
  value: number;
  type: "motion" | "smoke";
  location: string;
  status: "normal" | "warning" | "danger";
};

export type SensorData = {
  id: string;
  name: string;
  type: "motion" | "smoke";
  location: string;
  status: "normal" | "warning" | "danger";
  lastReading: number;
  lastUpdate: Date;
  batteryLevel: number;
  isActive: boolean;
};

// Initial sensor data
export const initialSensors: SensorData[] = [
  {
    id: "motion-north",
    name: "North Field PIR",
    type: "motion",
    location: "North Field",
    status: "normal",
    lastReading: 0,
    lastUpdate: new Date(),
    batteryLevel: 95,
    isActive: true
  },
  {
    id: "motion-east",
    name: "East Gate PIR",
    type: "motion",
    location: "East Gate",
    status: "normal",
    lastReading: 0,
    lastUpdate: new Date(),
    batteryLevel: 87,
    isActive: true
  },
  {
    id: "motion-west",
    name: "West Fence PIR",
    type: "motion",
    location: "West Fence",
    status: "normal",
    lastReading: 0,
    lastUpdate: new Date(),
    batteryLevel: 76,
    isActive: true
  },
  {
    id: "smoke-barn",
    name: "Barn Smoke Sensor",
    type: "smoke",
    location: "Main Barn",
    status: "normal",
    lastReading: 0,
    lastUpdate: new Date(),
    batteryLevel: 92,
    isActive: true
  },
  {
    id: "smoke-storage",
    name: "Storage Smoke Sensor",
    type: "smoke",
    location: "Storage Shed",
    status: "normal",
    lastReading: 0,
    lastUpdate: new Date(),
    batteryLevel: 88,
    isActive: true
  }
];

// Generate a random sensor reading
export const generateRandomReading = (sensor: SensorData): SensorReading => {
  const now = new Date();
  
  // Generate random value based on sensor type
  let value = 0;
  let status: "normal" | "warning" | "danger" = "normal";
  
  // Motion sensor (0-100 where >70 is animal detection)
  if (sensor.type === "motion") {
    // 5% chance of detection for more realistic simulation (reduced from 15%)
    if (Math.random() < 0.05) {
      value = Math.floor(Math.random() * 30) + 70; // 70-100 range (detection)
      status = value > 90 ? "danger" : "warning";
    } else {
      value = Math.floor(Math.random() * 30); // 0-30 range (normal)
    }
  } 
  // Smoke sensor (0-100 where >60 is smoke detection)
  else if (sensor.type === "smoke") {
    // 3% chance of smoke detection for more realistic simulation (reduced from 10%)
    if (Math.random() < 0.03) {
      value = Math.floor(Math.random() * 40) + 60; // 60-100 range (detection)
      status = value > 80 ? "danger" : "warning";
    } else {
      value = Math.floor(Math.random() * 20); // 0-20 range (normal)
    }
  }
  
  return {
    id: `${sensor.id}-${now.getTime()}`,
    timestamp: now,
    value,
    type: sensor.type,
    location: sensor.location,
    status
  };
};

// Update sensor with new reading
export const updateSensorWithReading = (
  sensor: SensorData, 
  reading: SensorReading
): SensorData => {
  return {
    ...sensor,
    lastReading: reading.value,
    lastUpdate: reading.timestamp,
    status: reading.status
  };
};

// Handle alerts based on sensor readings
export const handleSensorAlert = (reading: SensorReading) => {
  if (reading.status === "warning" || reading.status === "danger") {
    const title = reading.status === "danger" ? "ALERT!" : "Warning";
    const description = reading.type === "motion"
      ? `Animal intrusion detected at ${reading.location}!`
      : `Smoke detected at ${reading.location}!`;
      
    toast({
      title,
      description,
      variant: reading.status === "danger" ? "destructive" : "default",
    });
  }
};
