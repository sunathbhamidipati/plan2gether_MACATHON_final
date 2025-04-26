"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { getEvents, Event } from "@/services/event";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateEventTab from "@/components/create-event-tab";
import EventsTab from "@/components/events-tab";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await getEvents(searchQuery);
      setEvents(fetchedEvents);
    };

    fetchEvents();
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleJoinEvent = () => {
    alert("Joining event: " + selectedEvent?.description);
    setSelectedEvent(null);
  };

  const renderEventCard = (event: Event) => (
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
  );

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="home" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        <TabsContent value="home" className="mt-4">
          <section>
            <h2 className="text-2xl font-bold mb-4">What do you want to do?</h2>
            <Input
              type="text"
              placeholder="Search for events"
              value={searchQuery}
              onChange={handleSearch}
              className="mb-4"
            />

            {events.length > 0 ? (
              <div>
                {events.map(renderEventCard)}
              </div>
            ) : (
              <p>No events found. Be the first to create one!</p>
            )}

            <Button>
              <a href="#create" className="text-white no-underline">Create Your Own Event</a>
            </Button>

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
        </TabsContent>
        <TabsContent value="create">
          <CreateEventTab />
        </TabsContent>
        <TabsContent value="events">
          <EventsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
