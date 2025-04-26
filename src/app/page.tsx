"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import CreateEventTab from "@/components/create-event-tab";
import EventsTab from "@/components/events-tab";
import { getEvents, Event } from "@/services/event";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState("home");

  const fetchEvents = async () => {
    const fetchedEvents = await getEvents("");
    const filteredEvents = fetchedEvents.filter(event =>
      event.tags.some(tag =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setEvents(filteredEvents);
  };

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
      <div className="flex justify-around mb-4">
        <Button variant={activeTab === "home" ? "default" : "secondary"} onClick={() => setActiveTab("home")}>
          Home
        </Button>
        <Button variant={activeTab === "create" ? "default" : "secondary"} onClick={() => setActiveTab("create")}>
          Create
        </Button>
        <Button variant={activeTab === "events" ? "default" : "secondary"} onClick={() => setActiveTab("events")}>
          Events
        </Button>
      </div>

      {activeTab === "home" && (
        <section>
          <h2 className="text-2xl font-bold mb-4">What do you want to do?</h2>
          <Input
            type="text"
            placeholder="Search for events"
            value={searchQuery}
            onChange={handleSearch}
            className="mb-4"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                fetchEvents();
              }
            }}
          />

          {searchQuery && events.length > 0 ? (
            <div>
              {events.map(renderEventCard)}
            </div>
          ) : (
            searchQuery ? (
              <p>No events found. Be the first to create one!</p>
            ) : null
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
      )}

      {activeTab === "create" && (
        <CreateEventTab />
      )}

      {activeTab === "events" && (
        <EventsTab />
      )}
    </div>
  );
}
