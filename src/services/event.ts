import eventsData from './events.json';

/**
 * Represents a tag.
 */
export interface Tag {
  /**
   * The name of the tag.
   */
  name: string;
}

/**
 * Represents event information, including description, tags and number of spots available.
 */
export interface Event {
  /**
   * The event description.
   */
  description: string;
  /**
   * The event tags.
   */
  tags: Tag[];
   /**
   * The number of spots available for the event.
   */
  spotsAvailable: number;
   /**
    * The date of the event.
    */
  date: Date;
}

/**
 * Asynchronously retrieves events based on a query.
 *
 * @param query The query to search for events.
 * @returns A promise that resolves to a list of Event objects.
 */
export async function getEvents(query: string): Promise<Event[]> {
  // TODO: Implement this by calling an API.
  return eventsData as Event[];
}
