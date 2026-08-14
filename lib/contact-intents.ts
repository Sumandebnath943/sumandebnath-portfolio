/**
 * The four buckets the contact form offers, shared by the client form and the
 * server route that validates against them.
 *
 * Deliberately its own module: lib/contact.ts imports the Neon driver at module
 * scope, so a client component importing the list from there would drag a
 * database client into the browser bundle.
 */
export const CONTACT_INTENTS = [
  "Hiring / a role",
  "Collaboration",
  "Question about a product",
  "Something else",
] as const;

export type ContactIntent = (typeof CONTACT_INTENTS)[number];
