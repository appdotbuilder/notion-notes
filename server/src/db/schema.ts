import { serial, text, pgTable, timestamp, json, index } from 'drizzle-orm/pg-core';

export const notesTable = pgTable('notes', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(), // Rich text content stored as text (could be HTML or JSON)
  tags: json('tags').$type<string[]>().notNull().default([]), // Array of tag strings
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  // Create indexes for better search performance
  titleIdx: index('title_idx').on(table.title),
  createdAtIdx: index('created_at_idx').on(table.created_at),
  updatedAtIdx: index('updated_at_idx').on(table.updated_at),
}));

// TypeScript types for the table schema
export type Note = typeof notesTable.$inferSelect; // For SELECT operations
export type NewNote = typeof notesTable.$inferInsert; // For INSERT operations

// Important: Export all tables for proper query building
export const tables = { notes: notesTable };