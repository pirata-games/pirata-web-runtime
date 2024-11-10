import { EaCRuntimeHandlers } from '@fathym/eac-runtime';
import { GamesAPIState } from '../../../src/state/GamesAPIState.ts';
import { EaCGameWorldDetails } from '../../../src/eac/EaCGameWorldDetails.ts';
import { EaCGameWorldAsCode } from '../../../src/eac/EaCGameWorldAsCode.ts';
import { CreateGameWorldSchema } from '../../../src/api/eac/CreateGameWorldSchema.ts';

export default {
  /** Lists all game worlds stored in the Deno KV, returning them in JSON format */
  async GET(_req, ctx) {
    try {
      const kvStore = ctx.State.GamesKV;
      const rootKey = ctx.State.GamesRootKey;
      const gameWorlds: Record<string, EaCGameWorldAsCode> = {};
      const prefix: Deno.KvKey = [...rootKey, 'GameWorlds'];

      for await (const entry of kvStore.list<EaCGameWorldDetails>({ prefix })) {
        const gameWorldKey = entry.key;
        const gameWorld = entry.value;

        if (
          gameWorldKey.length === prefix.length + 2 &&
          gameWorldKey[prefix.length + 1] === 'World'
        ) {
          const gameWorldLookup = gameWorldKey[prefix.length] as string;
          gameWorlds[gameWorldLookup] = { Details: gameWorld, Content: {} };
        }
      }

      return new Response(JSON.stringify(gameWorlds), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error retrieving game worlds:', error);
      return new Response('Failed to retrieve game worlds.', { status: 500 });
    }
  },

  /** Creates a new game world entry in the Deno KV store */
  async POST(req, ctx) {
    try {
      const kvStore = ctx.State.GamesKV;
      const rootKey = ctx.State.GamesRootKey;

      // Parse and validate the request body
      const body = await req.json();
      const result = CreateGameWorldSchema.safeParse(body);
      if (!result.success) {
        const errorMsg = result.error.errors.map((e) => e.message).join(', ');
        return new Response(`Invalid data: ${errorMsg}`, { status: 400 });
      }
      const { Lookup, ...details } = result.data;

      // Define the key for storing the game world
      const gameWorldKey: Deno.KvKey = [
        ...rootKey,
        'GameWorlds',
        Lookup,
        'World',
      ];

      // Create the game world entry
      await kvStore.set(gameWorldKey, details);

      console.log(`Game world created with Lookup: ${Lookup}`);
      return new Response(JSON.stringify({ Lookup, Details: details }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error creating game world:', error);
      return new Response('Failed to create game world.', { status: 500 });
    }
  },
} as EaCRuntimeHandlers<GamesAPIState>;
