"use client";

import { useState, useEffect } from "react";
import { getEvents, Event } from "@/services/event";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";

const EventsTab = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filterTag, setFilterTag] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await getEvents("");
      setEvents(allEvents);
    };

    fetchEvents();
  }, []);

  const filteredEvents = filterTag
    ? events.filter((event) => event.tags.some((tag) => tag.name.toLowerCase().includes(filterTag.toLowerCase())))
    : events;

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleJoinEvent = () => {
    alert("Joining event: " + selectedEvent?.description);
    setSelectedEvent(null);
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">All Events</h2>
        <Button variant="outline">Filters</Button>
      </div>

      <ScrollArea className="h-[400px] w-full rounded-md border">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-secondary-foreground uppercase tracking-wider">
                Event
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-secondary-foreground uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-secondary-foreground uppercase tracking-wider">
                Capacity
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-secondary-foreground uppercase tracking-wider">
                Tags
              </th>
            </tr>
          </thead>
          <tbody className="bg-background divide-y divide-border">
            {filteredEvents.map((event) => (
              <tr key={event.description} onClick={() => handleEventClick(event)} className="cursor-pointer hover:bg-accent/5">
                <td className="px-4 py-2 whitespace-nowrap">{event.description}</td>
                <td className="px-4 py-2 whitespace-nowrap">{formatDate(event.date)}</td>
                <td className="px-4 py-2 whitespace-nowrap">{event.spotsAvailable}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {event.tags.map((tag) => tag.name).join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>

      <Dialog open={!!selectedEvent} onOpenChange={(open) => { if (!open) setSelectedEvent(null); }}>
        <DialogTrigger asChild>
          <span></span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.description}</DialogTitle>
            <DialogDescription>
              <div>{selectedEvent?.description}</div>
              <div>{selectedEvent?.tags.map((tag) => (
                <Badge key={tag.name} className="mr-1">{tag.name}</Badge>
              ))}</div>
              <br />
              Spots Available: {selectedEvent?.spotsAvailable}
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleJoinEvent}>Join Event</Button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EventsTab;
