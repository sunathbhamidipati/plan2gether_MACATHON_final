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
}

/**
 * Asynchronously retrieves events based on a query.
 *
 * @param query The query to search for events.
 * @returns A promise that resolves to a list of Event objects.
 */
export async function getEvents(query: string): Promise<Event[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      description: 'A fun run in the park.',
      tags: [{ name: 'running' }, { name: 'outdoors' }],
      spotsAvailable: 10,
    },
    {
      description: 'A workshop on pottery.',
      tags: [{ name: 'arts' }, { name: 'crafts' }],
      spotsAvailable: 5,
    },
    {
      description: 'A relaxing yoga session.',
      tags: [{ name: 'yoga' }, { name: 'wellness' }],
      spotsAvailable: 12,
    },
    {
      description: 'A thrilling rock climbing adventure.',
      tags: [{ name: 'climbing' }, { name: 'adventure' }],
      spotsAvailable: 8,
    },
    {
      description: 'A creative writing workshop.',
      tags: [{ name: 'writing' }, { name: 'arts' }],
      spotsAvailable: 6,
    },
    {
      description: 'A social networking event.',
      tags: [{ name: 'networking' }, { name: 'social' }],
      spotsAvailable: 20,
    },
    {
      description: 'A delicious cooking class.',
      tags: [{ name: 'cooking' }, { name: 'food' }],
      spotsAvailable: 7,
    },
    {
      description: 'A challenging hiking trip.',
      tags: [{ name: 'hiking' }, { name: 'outdoors' }],
      spotsAvailable: 15,
    },
    {
      description: 'A mindful meditation session.',
      tags: [{ name: 'meditation' }, { name: 'wellness' }],
      spotsAvailable: 10,
    },
    {
      description: 'A fun and friendly board game night.',
      tags: [{ name: 'board games' }, { name: 'social' }],
      spotsAvailable: 12,
    },
  ];
}
