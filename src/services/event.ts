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

  return [
    {
      description: 'Crochet by the river',
      tags: [{ name: 'crochet' }, { name: 'river' }],
      spotsAvailable: 50,
      date: new Date(2025, 4, 2),
    },
    {
      description: 'Friends and fun: crochet day',
      tags: [{ name: 'friends' }, { name: 'crochet' }],
      spotsAvailable: 25,
      date: new Date(2025, 4, 16),
    },
    {
      description: 'Make your own yarn plush',
      tags: [{ name: 'crochet' }, { name: 'create' }, { name: 'socialise' }],
      spotsAvailable: 15,
      date: new Date(2025, 5, 30),
    },
    {
      description: 'Sip and paint',
      tags: [{ name: 'paint' }, { name: 'art' }, { name: 'beverages' }],
      spotsAvailable: 40,
      date: new Date(2025, 4, 21),
    },
    {
      description: 'Lazy beach afternoon',
      tags: [{ name: 'beach' }, { name: 'relax' }],
      spotsAvailable: 23,
      date: new Date(2025, 5, 2),
    },
    {
      description: 'A fun run in the park.',
      tags: [{ name: 'running' }, { name: 'outdoors' }],
      spotsAvailable: 10,
      date: new Date(2024, 8, 10),
    },
    {
      description: 'A workshop on pottery.',
      tags: [{ name: 'arts' }, { name: 'crafts' }],
      spotsAvailable: 5,
       date: new Date(2024, 9, 15),
    },
    {
      description: 'A relaxing yoga session.',
      tags: [{ name: 'yoga' }, { name: 'wellness' }],
      spotsAvailable: 12,
      date: new Date(2024, 10, 20),
    },
    {
      description: 'A thrilling rock climbing adventure.',
      tags: [{ name: 'climbing' }, { name: 'adventure' }],
      spotsAvailable: 8,
      date: new Date(2024, 11, 25),
    },
    {
      description: 'A creative writing workshop.',
      tags: [{ name: 'writing' }, { name: 'arts' }],
      spotsAvailable: 6,
      date: new Date(2025, 0, 30),
    },
  ];
}
