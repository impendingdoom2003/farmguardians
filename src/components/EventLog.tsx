
import * as React from 'react';
import { SensorReading } from '@/utils/sensorUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PawPrint, Flame } from 'lucide-react';

type EventLogProps = {
  events: SensorReading[];
};

const EventLog: React.FC<EventLogProps> = ({ events }) => {
  // Sort events by timestamp, newest first
  const sortedEvents = [...events].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl">Event Log</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px] w-full rounded-md border p-4">
          {sortedEvents.length > 0 ? (
            <div className="space-y-4">
              {sortedEvents.map((event) => (
                <div 
                  key={event.id} 
                  className={`p-3 rounded-md border ${
                    event.status === 'danger'
                      ? 'bg-red-50 border-farm-danger'
                      : event.status === 'warning'
                      ? 'bg-amber-50 border-farm-warning'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      {event.type === 'motion' ? (
                        <PawPrint className={`w-5 h-5 ${
                          event.status === 'danger' ? 'text-farm-danger' : 
                          event.status === 'warning' ? 'text-farm-warning' : 
                          'text-farm-green'
                        }`} />
                      ) : (
                        <Flame className={`w-5 h-5 ${
                          event.status === 'danger' ? 'text-farm-danger' : 
                          event.status === 'warning' ? 'text-farm-warning' : 
                          'text-farm-green'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">
                          {event.type === 'motion' ? 'Animal Detection' : 'Smoke Detection'}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {event.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm mt-1">
                        {event.type === 'motion'
                          ? `Motion detected at ${event.location} (${event.value}%)`
                          : `Smoke level at ${event.location}: ${event.value}ppm`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No events recorded yet. Events will appear here when detected.
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EventLog;
