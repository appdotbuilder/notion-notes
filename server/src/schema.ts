import { z } from 'zod';

// Note schema with proper type handling
export const noteSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(), // Rich text content stored as JSON string or HTML
  tags: z.array(z.string()), // Array of tag names
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Note = z.infer<typeof noteSchema>;

// Input schema for creating notes
export const createNoteInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().default(""), // Default empty content
  tags: z.array(z.string()).default([]), // Default empty tags array
});

export type CreateNoteInput = z.infer<typeof createNoteInputSchema>;

// Input schema for updating notes
export const updateNoteInputSchema = z.object({
  id: z.number(),
  title: z.string().min(1).optional(),
  content: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type UpdateNoteInput = z.infer<typeof updateNoteInputSchema>;

// Search input schema
export const searchNotesInputSchema = z.object({
  query: z.string().optional(), // Text search query
  tags: z.array(z.string()).optional(), // Filter by specific tags
  limit: z.number().int().positive().default(50), // Pagination limit
  offset: z.number().int().nonnegative().default(0), // Pagination offset
});

export type SearchNotesInput = z.infer<typeof searchNotesInputSchema>;

// Delete note input schema
export const deleteNoteInputSchema = z.object({
  id: z.number(),
});

export type DeleteNoteInput = z.infer<typeof deleteNoteInputSchema>;

// Get note by ID input schema
export const getNoteInputSchema = z.object({
  id: z.number(),
});

export type GetNoteInput = z.infer<typeof getNoteInputSchema>;

// Tag schema for tag management
export const tagSchema = z.object({
  name: z.string(),
  usage_count: z.number().int().nonnegative(),
});

export type Tag = z.infer<typeof tagSchema>;