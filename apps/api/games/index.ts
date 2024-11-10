import { loadEaCSvc } from '@fathym/eac-api/client';
import {
  waitForStatus,
  waitForStatusWithFreshJwt,
} from '@fathym/eac-api/status';
import { EaCRuntimeHandlers } from '@fathym/eac-runtime';
import { GamesAPIState } from '../../../src/state/GamesAPIState.ts';
import {
  EverythingAsCodeGame,
  EverythingAsCodeGameSchema,
} from '../../../src/eac/EverythingAsCodeGame.ts';

/**
 * Game API Endpoints
 *
 * Provides handlers for managing games within the Everything as Code (EaC) system.
 * Supports standard CRUD operations:
 *
 * - `GET`: Retrieve a specific game by its lookup ID.
 * - `POST`: Create a new game entry.
 * - `PUT`: Update a specific game entry.
 * - `DELETE`: Delete a game by its lookup ID.
 *
 * @exports
 * - GET: Fetches details of a specific game.
 * - POST: Creates a new game entry.
 * - PUT: Updates a game entry with provided data.
 * - DELETE: Deletes a specified game entry.
 */
export default {
  /**
   * Retrieves a specific game by its lookup ID.
   *
   * Fetches the details of a game specified by the `gameLookup` parameter from the URL.
   * If successful, returns the game details as JSON.
   *
   * @param _req - The incoming GET request.
   * @param ctx - The runtime context, which includes the game lookup ID in `ctx.State.GameLookup`.
   * @returns {Promise<Response>} A JSON response containing the game data or an error message.
   *
   * @throws {Response} - Returns a 500 status code if the retrieval process encounters an error.
   */
  GET(_req, ctx) {
    return Response.json(ctx.State.Game);
  },

  /**
   * Creates a new game entry in the Everything as Code (EaC) system.
   *
   * This method accepts JSON data for the new game, validates it against the
   * `EverythingAsCodeGameSchema`, and saves it in the storage.
   *
   * @param req - The incoming POST request containing the game data.
   * @param ctx - The runtime context, including user state and runtime information.
   * @returns {Promise<Response>} JSON response with the creation status or an error message.
   *
   * @throws {Response} - Returns a 400 status code if validation fails, or a 500 status code if an error occurs during creation.
   */
  async POST(req, ctx) {
    try {
      const body = await req.json();

      const result = EverythingAsCodeGameSchema.safeParse(body);

      if (!result.success) {
        const errorMsg = result.error.errors.map((e) => e.message).join(', ');
        return new Response(`Invalid data: ${errorMsg}`, { status: 400 });
      }

      const eacGame: EverythingAsCodeGame = result.data!;
      const parentEaCSvc = await loadEaCSvc();

      eacGame.ParentEnterpriseLookup = ctx.Runtime.EaC.EnterpriseLookup;

      const createResp = await parentEaCSvc.Create(
        eacGame,
        ctx.State.Username,
        60
      );

      const status = await waitForStatusWithFreshJwt(
        parentEaCSvc,
        createResp.EnterpriseLookup,
        createResp.CommitID,
        ctx.State.Username
      );

      return Response.json(status);
    } catch (error) {
      console.error('Error creating game:', error);
      return new Response('Failed to create game.', { status: 500 });
    }
  },

  /**
   * Updates a specific game entry using the provided data.
   *
   * Validates incoming data against `EverythingAsCodeGameSchema` and commits
   * the update for the game specified by `gameLookup`.
   *
   * @param req - The incoming PUT request containing the game update data.
   * @param ctx - The runtime context, including the game lookup ID in `ctx.State.GameLookup`.
   * @returns {Promise<Response>} A JSON response with the status of the update or an error message.
   *
   * @throws {Response} - Returns a 400 status code if validation fails, or a 500 status code if the update process encounters an error.
   */
  async PUT(req, ctx) {
    try {
      const body = await req.json();

      const result = EverythingAsCodeGameSchema.safeParse(body);

      if (!result.success) {
        const errorMsg = result.error.errors.map((e) => e.message).join(', ');

        return new Response(`Invalid data: ${errorMsg}`, { status: 400 });
      }

      const eacGame: EverythingAsCodeGame = result.data!;

      eacGame.EnterpriseLookup = ctx.State.GameLookup!;

      eacGame.ParentEnterpriseLookup = ctx.Runtime.EaC.EnterpriseLookup;

      const updateResp = await ctx.State.EaCClient!.Commit(eacGame, 10);

      const status = await waitForStatus(
        ctx.State.EaCClient!,
        updateResp.EnterpriseLookup,
        updateResp.CommitID
      );

      return Response.json(status);
    } catch (error) {
      console.error('Error updating game:', error);

      return new Response('Failed to update game.', { status: 500 });
    }
  },

  /**
   * Deletes a specific game by its lookup ID.
   *
   * Performs a soft delete operation on the specified game, identified by `gameLookup`.
   * Confirms the deletion by interacting with the Everything as Code (EaC) service.
   *
   * @param _req - The incoming DELETE request.
   * @param ctx - The runtime context, which includes the game lookup ID in `ctx.State.GameLookup`.
   * @returns {Promise<Response>} A JSON response with the deletion status or an error message.
   *
   * @throws {Response} - Returns a 500 status code if the deletion process encounters an error.
   */
  async DELETE(_req, ctx) {
    try {
      const deleteResp = await ctx.State.EaCClient!.Delete(
        {
          EnterpriseLookup: ctx.State.GameLookup!,
          ParentEnterpriseLookup: ctx.Runtime.EaC.EnterpriseLookup,
        },
        true,
        30
      );

      const status = await waitForStatus(
        ctx.State.EaCClient!,
        deleteResp.EnterpriseLookup,
        deleteResp.CommitID
      );

      return Response.json(status);
    } catch (error) {
      console.error('Error deleting game:', error);
      return new Response('Failed to delete game.', { status: 500 });
    }
  },
} as EaCRuntimeHandlers<GamesAPIState>;
