import { EaCRuntimeHandlers } from '@fathym/eac-runtime';
import { GamesAPIState } from '../../../../src/state/GamesAPIState.ts';
import { EaCGameWorldAsCode } from '../../../../src/eac/EaCGameWorldAsCode.ts';
import { EaCGameWorldContentAsCode } from '../../../../src/eac/content/EaCGameWorldContentAsCode.ts';
import { EaCGameWorldContentDetails } from '../../../../src/eac/content/EaCGameWorldContentDetails.ts';
import { EaCGameWorldDetails } from '../../../../src/eac/EaCGameWorldDetails.ts';

export default {
  /** Retrieves a specific game world based on the lookup key */
  async GET(_req, ctx) {
    const kvStore = ctx.State.PirataKV;
    const rootKey = ctx.State.GamesRootKey;
    const gameWorldLookup = ctx.Params.gameWorld!;
    const gameWorld: EaCGameWorldAsCode = { Contents: {} };
    const prefix: Deno.KvKey = [...rootKey, 'GameWorlds', gameWorldLookup];

    for await (
      const entry of kvStore.list<
        EaCGameWorldDetails | EaCGameWorldContentDetails
      >({ prefix })
    ) {
      const gameWorldKey = entry.key;

      if (gameWorldKey.slice(-1)[0] === 'World') {
        gameWorld.Details = entry.value as EaCGameWorldDetails;
      } else if (gameWorldKey.slice(-1)[0] === 'Content') {
        const contentLookups = gameWorldKey
          .slice(prefix.length, -1)
          .filter((x) => x !== 'Contents');
        let working: { Contents: Record<string, EaCGameWorldContentAsCode> } = gameWorld;

        for (const contentLookup of contentLookups) {
          if (!working.Contents) {
            working.Contents = {};
          }

          if (!working.Contents[contentLookup]) {
            working.Contents[contentLookup] = {};
          }

          working = working.Contents[contentLookup];
        }

        working.Contents[contentLookups[contentLookups.length - 1]].Details = entry
          .value as EaCGameWorldContentDetails;
      }
    }

    return Response.json(gameWorld);
  },

  /** Updates a specific game world with new details or content */
  async PUT(req, ctx) {
    try {
      const kvStore = ctx.State.PirataKV;
      const rootKey = ctx.State.GamesRootKey;
      const gameWorldLookup = ctx.Params.gameWorld!;
      const body = await req.json();

      const result = UpdateGameWorldSchema.safeParse(body);
      if (!result.success) {
        const errorMsg = result.error.errors.map((e) => e.message).join(', ');
        return new Response(`Invalid data: ${errorMsg}`, { status: 400 });
      }

      const { Details } = result.data;

      const gameWorldKey: Deno.KvKey = [
        ...rootKey,
        'GameWorlds',
        gameWorldLookup,
        'World',
      ];
      await kvStore.set(gameWorldKey, Details);

      return new Response('Game world updated successfully.', { status: 200 });
    } catch (error) {
      console.error('Error updating game world:', error);
      return new Response('Failed to update game world.', { status: 500 });
    }
  },

  /** Deletes a specific game world and its contents */
  async DELETE(_req, ctx) {
    try {
      const kvStore = ctx.State.PirataKV;
      const rootKey = ctx.State.GamesRootKey;
      const gameWorldLookup = ctx.Params.gameWorld!;
      const prefix: Deno.KvKey = [...rootKey, 'GameWorlds', gameWorldLookup];

      for await (const entry of kvStore.list({ prefix })) {
        await kvStore.delete(entry.key);
      }

      return new Response('Game world deleted successfully.', { status: 200 });
    } catch (error) {
      console.error('Error deleting game world:', error);
      return new Response('Failed to delete game world.', { status: 500 });
    }
  },
} as EaCRuntimeHandlers<GamesAPIState>;
