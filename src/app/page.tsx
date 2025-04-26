"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import CreateEventTab from "@/components/create-event-tab";
import EventsTab from "@/components/events-tab";
import { getEvents, Event } from "@/services/event";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState("home");
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [joinedEvents, setJoinedEvents] = useState<Event[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    const fetchAllEvents = async () => {
      const fetchedEvents = await getEvents("");
      setAllEvents(fetchedEvents);
    };

    fetchAllEvents();
  }, []);


  useEffect(() => {
    if (searchQuery) {
      fetchEvents();
    } else {
      setEvents([]);
    }
  }, [searchQuery, allEvents]);

  const fetchEvents = async () => {
    const filteredEvents = allEvents.filter(event =>
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
    if (selectedEvent) {
      setJoinedEvents(prevJoinedEvents => [...prevJoinedEvents, selectedEvent]);
      toast({
        title: "Joined Event",
        description: `You have joined the event: ${selectedEvent?.description}`,
      });
      setSelectedEvent(null);
    }
  };

  const addEvent = (newEvent: Event) => {
      setAllEvents(prevEvents => [...prevEvents, newEvent]);
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

    const navigateToTab = (tab: string) => {
        setActiveTab(tab);
    };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-around">
          <Button variant={activeTab === "home" ? "default" : "secondary"} onClick={() => navigateToTab("home")}>
            Home
          </Button>
          <Button variant={activeTab === "create" ? "default" : "secondary"} onClick={() => navigateToTab("create")}>
            Create
          </Button>
          <Button variant={activeTab === "events" ? "default" : "secondary"} onClick={() => navigateToTab("events")}>
            Events
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem onClick={() => navigateToTab("account")}>
              Account
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigateToTab("chats")}>
              Chats
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigateToTab("my-events")}>
              My Events
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
          />

          {events.length > 0 ? (
            <div>
              {events.map(renderEventCard)}
            </div>
          ) : (
            searchQuery ? (
              <p>No events found. Be the first to create one!</p>
            ) : null
          )}

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
      )}

      {activeTab === "create" && (
        <CreateEventTab addEvent={addEvent} />
      )}

      {activeTab === "events" && (
        <EventsTab events={allEvents} />
      )}

        {activeTab === "account" && (
            <section>
                <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
                <p>Here you can manage your account settings.</p>
                {/* Add your generic account page content here */}
                <Card>
                    <CardHeader>
                        <CardTitle>User Information</CardTitle>
                        <CardDescription>Manage your personal information and preferences.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <strong>Name:</strong> John Doe
                        </div>
                        <div>
                            <strong>Email:</strong> john.doe@example.com
                        </div>
                        {/* Add more account details and settings here */}
                    </CardContent>
                </Card>
            </section>
        )}

      {activeTab === "chats" && (
        <section>
          <h2>Chats</h2>
          <p>Here you can view your chats.</p>
        </section>
      )}

      {activeTab === "my-events" && (
        <section>
          <h2 className="text-2xl font-bold mb-4">My Events</h2>
            <div className="w-full">
              <Calendar
                mode="month"
                captionLayout="dropdown"
                className="rounded-md border"
                onSelect={console.log}
                // Set the events to highlight
                // @ts-expect-error
                selected={joinedEvents.map(event => new Date(event.date))}
              />
            </div>
        </section>
      )}
    </div>
  );
}


