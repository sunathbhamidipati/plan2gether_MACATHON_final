# **App Name**: Eventide

## Core Features:

- Event Discovery: Home tab with a search bar to find existing events. Display events related to the search query, with a popup showing event details and a 'Join' button.
- AI Event Generation: In the create tab, use the Gemini tool to generate event ideas based on user descriptions and selected tags. Display a list of suggested events for the user to choose from.
- Event Listing and Filtering: Events tab showcasing all events with filtering by tags. Clicking on an event opens a popup with details and a 'Join' button.

## Style Guidelines:

- Primary color: Soft teal (#4DB6AC) for a calm and inviting feel.
- Secondary color: Light gray (#EEEEEE) for backgrounds and subtle contrasts.
- Accent color: Coral (#FF8A65) for buttons and interactive elements.
- Clean and readable sans-serif fonts for UI elements.
- Use outline icons for a modern and minimalist look.
- Card-based layout for event listings to improve organization.

## Original User Request:
A web app that is used to create and schedule events for people.
I want it to have three tabs.
First tab (home):
A heading that says: What do you want to do?
with a text box below. Once you submit this, the app will showcase events related to this text that have already been created by other users. If any of these events are clicked, there should be a popup that shows more info about this event and allows users to join it.
There should be a button below the list of events that allows users to create their own event.
This button should lead to the second tab>
Second tab (create):
This should start with a heading that asks to describe the activities they want to do and have a text box below it. Below the text box, there should be a list of tags for the event as well. Below this, there should be a generate button that calls to gemini to use all the information given and generate a list of events that the user might like. The user can select a particular event and create it. If the user still doesn't like it, there should be a button below this list to create your own event from scratch that allows the user to create an entire event.

Third tab (events):
This tab should just be a list of all the current events created by all users of the website and it should allow you to filter by tags and get a popup of each events description when clicked and should allow you to join them if they need more people.
  