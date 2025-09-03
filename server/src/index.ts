import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

// Import schemas
import { 
  createNoteInputSchema, 
  updateNoteInputSchema,
  deleteNoteInputSchema,
  getNoteInputSchema,
  searchNotesInputSchema
} from './schema';

// Import handlers
import { createNote } from './handlers/create_note';
import { getNotes } from './handlers/get_notes';
import { getNoteById } from './handlers/get_note_by_id';
import { updateNote } from './handlers/update_note';
import { deleteNote } from './handlers/delete_note';
import { searchNotes } from './handlers/search_notes';
import { getAllTags } from './handlers/get_all_tags';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check endpoint
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Note CRUD operations
  createNote: publicProcedure
    .input(createNoteInputSchema)
    .mutation(({ input }) => createNote(input)),

  getNotes: publicProcedure
    .query(() => getNotes()),

  getNoteById: publicProcedure
    .input(getNoteInputSchema)
    .query(({ input }) => getNoteById(input)),

  updateNote: publicProcedure
    .input(updateNoteInputSchema)
    .mutation(({ input }) => updateNote(input)),

  deleteNote: publicProcedure
    .input(deleteNoteInputSchema)
    .mutation(({ input }) => deleteNote(input)),

  // Search and organization
  searchNotes: publicProcedure
    .input(searchNotesInputSchema)
    .query(({ input }) => searchNotes(input)),

  getAllTags: publicProcedure
    .query(() => getAllTags()),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();