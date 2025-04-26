"use client";

import { useState, useEffect } from "react";
import { getEvents, Event } from "@/services/event";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

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

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">All Events</h2>

      <Input
        type="text"
        placeholder="Filter by tag"
        value={filterTag}
        onChange={(e) => setFilterTag(e.target.value)}
        className="mb-4"
      />

      <div>
        {filteredEvents.map((event) => (
          <Card key={event.description} className="mb-4 cursor-pointer" onClick={() => handleEventClick(event)}>
            <CardHeader>
              <CardTitle>{event.description}</CardTitle>
              <CardDescription>
                {event.tags.map((tag) => (
                  <Badge key={tag.name} className="mr-1">{tag.name}</Badge>
                ))}
              </CardDescription>
            </CardHeader>
            <CardContent>
              Spots Available: {event.spotsAvailable}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedEvent} onOpenChange={(open) => { if (!open) setSelectedEvent(null); }}>
        <DialogTrigger asChild>
          <span></span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.description}</DialogTitle>
            <DialogDescription>
              {selectedEvent?.tags.map((tag) => (
                <Badge key={tag.name} className="mr-1">{tag.name}</Badge>
              ))}
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
