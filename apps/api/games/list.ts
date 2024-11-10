import { loadEaCSvc } from '@fathym/eac-api/client';
import { waitForStatusWithFreshJwt } from '@fathym/eac-api/status';
import { EaCRuntimeHandlers } from '@fathym/eac-runtime';
import { GamesAPIState } from '../../../src/state/GamesAPIState.ts';
import {
  EverythingAsCodeGame,
  EverythingAsCodeGameSchema,
} from '../../../src/eac/EverythingAsCodeGame.ts';

/**
 * Handlers for managing the lifecycle of games within the Everything as Code (EaC) ecosystem.
 *
 * This module provides runtime handlers for listing, creating, updating, and deleting games.
 * Each handler interacts with the EaC service to manage game data within Deno KV storage,
 * supporting structured operations and providing status responses for each action.
 *
 * @exports
 * - GET: List all games associated with the user's enterprise.
 */
export default {
  /**
   * GET handler for retrieving all games stored in the Deno KV for the current user's enterprise.
   * Returns game data in JSON format.
   *
   * @param _req - The incoming request object (not used in this handler).
   * @param ctx - The runtime context, containing state and runtime information.
   * @returns {Promise<Response>} JSON response with game data or error message.
   */
  async GET(_req, ctx) {
    try {
      const parentEaCSvc = await loadEaCSvc();
      const parentEntLookup = ctx.Runtime.EaC.EnterpriseLookup;

      const userEaCRecords = await parentEaCSvc.ListForUser(
        ctx.State.Username,
        parentEntLookup
      );

      const games = await Promise.all(
        userEaCRecords.map(async (record) =>{
          const jwt = await parentEaCSvc.JWT(record.EnterpriseLookup, ctx.State.Username);

          const eacSvc = await loadEaCSvc(jwt.Token);

          const game = await eacSvc.Get()
        }
        )
      );

      return Response.json(games);
    } catch (error) {
      console.error('Error retrieving games:', error);
      return new Response('Failed to retrieve games.', { status: 500 });
    }
  },
} as EaCRuntimeHandlers<GamesAPIState>;
