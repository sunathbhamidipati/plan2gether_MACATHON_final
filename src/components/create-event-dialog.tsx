"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface CreateEventDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    addEvent: (newEvent: any) => void;
}

export const CreateEventDialog: React.FC<CreateEventDialogProps> = ({ open, onOpenChange, addEvent }) => {
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventTags, setEventTags] = useState("");
    const [spotsAvailable, setSpotsAvailable] = useState(0);
    const [eventDate, setEventDate] = useState(""); // Consider using a Date picker for better UX

    const handleSubmit = () => {
        const newEvent = {
            description: eventTitle, // Using title as description for simplicity
            tags: eventTags.split(",").map(tag => ({ name: tag.trim() })),
            spotsAvailable: parseInt(spotsAvailable.toString()),
            date: eventDate,
        };
        addEvent(newEvent);
        onOpenChange(false); // Close the dialog after submission
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button>Create Event From Scratch</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Your Own Event</DialogTitle>
                    <DialogDescription>Fill in the details below to create your event.</DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[500px]">
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="event-title">Event Title</Label>
                            <Input id="event-title" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="event-description">Event Description</Label>
                            <Textarea id="event-description" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="event-tags">Event Tags (comma separated)</Label>
                            <Input id="event-tags" value={eventTags} onChange={(e) => setEventTags(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="spots-available">Spots Available</Label>
                            <Input type="number" id="spots-available" value={spotsAvailable.toString()} onChange={(e) => setSpotsAvailable(parseInt(e.target.value))} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="event-date">Event Date</Label>
                            <Input type="date" id="event-date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                        </div>
                    </div>
                </ScrollArea>
                <Button onClick={handleSubmit}>Create Event</Button>
            </DialogContent>
        </Dialog>
    );
};
