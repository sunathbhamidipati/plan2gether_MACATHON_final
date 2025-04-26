"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateEventIdeas } from "@/ai/flows/generate-event-ideas";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CreateEventDialog } from "@/components/create-event-dialog";

interface EventIdea {
  title: string;
  description: string;
}

interface CreateEventTabProps {
  addEvent: (newEvent: any) => void;
}

const CreateEventTab: React.FC<CreateEventTabProps> = ({ addEvent }) => {
  const [activitiesDescription, setActivitiesDescription] = useState("");
  const [tags, setTags] = useState("");
  const [eventIdeas, setEventIdeas] = useState<EventIdea[]>([]);
  const [isCreateEventDialogOpen, setIsCreateEventDialogOpen] = useState(false);


  const handleGenerateIdeas = async () => {
    const tagList = tags.split(",").map((tag) => tag.trim());
    const result = await generateEventIdeas({
      description: activitiesDescription,
      tags: tagList,
    });

    setEventIdeas(result.eventIdeas);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Describe the activities you want to do</h2>
      <Textarea
        placeholder="e.g., outdoor adventures, creative workshops, social gatherings"
        value={activitiesDescription}
        onChange={(e) => setActivitiesDescription(e.target.value)}
        className="mb-4"
      />

      <Label htmlFor="tags" className="block text-sm font-medium leading-6 text-gray-900">
        Tags
      </Label>
      <Input
        type="text"
        id="tags"
        placeholder="e.g., hiking, painting, networking"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="mb-4"
      />

      <div className="flex space-x-4">
          <Button onClick={handleGenerateIdeas} className="">
              Generate Event Ideas
          </Button>

          <CreateEventDialog
              open={isCreateEventDialogOpen}
              onOpenChange={setIsCreateEventDialogOpen}
              addEvent={addEvent}
              className="pl-2"
          />
      </div>


      {eventIdeas.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Generated Event Ideas:</h3>
          {eventIdeas.map((idea, index) => (
            <Card key={index} className="mb-4">
              <CardHeader>
                <CardTitle>{idea.title}</CardTitle>
                <CardDescription>{idea.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button>Create Event</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default CreateEventTab;

