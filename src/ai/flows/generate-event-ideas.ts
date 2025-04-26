'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating event ideas based on a description of activities and tags.
 *
 * - generateEventIdeas - A function that takes a description and tags, and returns a list of event ideas.
 * - GenerateEventIdeasInput - The input type for the generateEventIdeas function.
 * - GenerateEventIdeasOutput - The return type for the generateEventIdeas function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateEventIdeasInputSchema = z.object({
  description: z.string().describe('A description of the activities the user is interested in.'),
  tags: z.array(z.string()).describe('A list of tags related to the event.'),
});
export type GenerateEventIdeasInput = z.infer<typeof GenerateEventIdeasInputSchema>;

const GenerateEventIdeasOutputSchema = z.object({
  eventIdeas: z.array(
    z.object({
      title: z.string().describe('The title of the event.'),
      description: z.string().describe('A detailed description of the event.'),
    })
  ).describe('A list of generated event ideas.'),
});
export type GenerateEventIdeasOutput = z.infer<typeof GenerateEventIdeasOutputSchema>;

export async function generateEventIdeas(input: GenerateEventIdeasInput): Promise<GenerateEventIdeasOutput> {
  return generateEventIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEventIdeasPrompt',
  input: {
    schema: z.object({
      description: z.string().describe('A description of the activities the user is interested in.'),
      tags: z.array(z.string()).describe('A list of tags related to the event.'),
    }),
  },
  output: {
    schema: z.object({
      eventIdeas: z.array(
        z.object({
          title: z.string().describe('The title of the event.'),
          description: z.string().describe('A detailed description of the event.'),
        })
      ).describe('A list of generated event ideas.'),
    }),
  },
  prompt: `You are an event idea generator. Given a description of activities and a list of tags, generate a list of event ideas.

Description: {{{description}}}
Tags: {{#each tags}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Format the output as a JSON array of event ideas, where each event idea has a title and a description. The title should be short and catchy, and the description should be detailed and engaging.`,
});

const generateEventIdeasFlow = ai.defineFlow<
  typeof GenerateEventIdeasInputSchema,
  typeof GenerateEventIdeasOutputSchema
>(
  {
    name: 'generateEventIdeasFlow',
    inputSchema: GenerateEventIdeasInputSchema,
    outputSchema: GenerateEventIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
