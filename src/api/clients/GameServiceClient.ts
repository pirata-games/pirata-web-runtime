import { EaCStatus, UserEaCRecord } from '@fathym/eac-api';
import { EaCBaseClient } from '@fathym/eac-api/client';
import { establishHeaders, Status } from '@fathym/common';
import { EaCGameWorldAsCode } from '../../eac/EaCGameWorldAsCode.ts';
import { EverythingAsCodeGame } from '../../eac/EverythingAsCodeGame.ts';

/**
 * `GameServiceClient` is a client for managing games and game worlds within the Everything-as-Code (EaC) ecosystem.
 * This client offers CRUD operations for `Games` and `Worlds`, with methods to set and retrieve the active game.
 * It extends `EaCBaseClient` for shared functionality and authorization handling.
 */
export class GameServiceClient extends EaCBaseClient {
  /**
   * Initializes the GameServiceClient with a base URL and API token.
   * @param baseUrl - The base URL of the game service API.
   * @param apiToken - The API token for authentication.
   */
  constructor(baseUrl: URL, apiToken: string) {
    super(baseUrl, apiToken);
  }

  //#region API Methods
  /**
   * `Games` provides CRUD methods for creating, retrieving, updating, and deleting games,
   * as well as managing the currently active game.
   */
  Games = {
    /**
     * Creates a new game with the provided `EverythingAsCodeGame` object.
     * @param createReq - The game data to create.
     * @returns {Promise<Status>} The status of the creation request.
     */
    Create: async (createReq: EverythingAsCodeGame): Promise<EaCStatus> => {
      const response = await fetch(this.loadClientUrl(`games`), {
        method: 'POST',
        headers: this.loadHeaders(),
        body: JSON.stringify(createReq),
      });

      return await this.json(response);
    },

    /**
     * Deletes a specified game.
     * @returns {Promise<Status>} The status of the deletion request.
     */
    Delete: async (): Promise<Status> => {
      const response = await fetch(this.loadClientUrl(`games`), {
        method: 'DELETE',
        headers: this.loadHeaders(),
      });

      return await this.json(response);
    },

    /**
     * Retrieves a specific game.
     * @returns {Promise<EverythingAsCodeGame>} The game data.
     */
    Get: async (): Promise<EverythingAsCodeGame> => {
      const response = await fetch(this.loadClientUrl(`games`), {
        method: 'GET',
        headers: this.loadHeaders(),
      });

      return await this.json(response);
    },

    /**
     * Lists all games.
     * @returns {Promise<EverythingAsCodeGame[]>} An array of game data.
     */
    List: async (): Promise<EverythingAsCodeGame[]> => {
      const response = await fetch(this.loadClientUrl(`games/list`), {
        method: 'GET',
        headers: this.loadHeaders(),
      });

      return await this.json(response);
    },

    /**
     * Updates a specific game with new data.
     * @param updateReq - The updated game data.
     * @returns {Promise<Status>} The status of the update request.
     */
    Update: async (
      updateReq: EverythingAsCodeGame
    ): Promise<EaCStatus> => {
      const response = await fetch(this.loadClientUrl(`games`), {
        method: 'PUT',
        headers: this.loadHeaders(),
        body: JSON.stringify(updateReq),
      });

      return await this.json(response);
    },
  };

  /**
   * `Worlds` provides CRUD methods for managing game worlds associated with games.
   */
  Worlds = {
    /**
     * Creates a new game world with the provided `EaCGameWorldAsCode` data.
     * @param createReq - The game world data to create.
     * @returns {Promise<Status>} The status of the creation request.
     */
    Create: async (createReq: EaCGameWorldAsCode): Promise<Status> => {
      const response = await fetch(this.loadClientUrl(`worlds`), {
        method: 'POST',
        headers: this.loadHeaders(),
        body: JSON.stringify(createReq),
      });

      return await this.json(response);
    },

    /**
     * Deletes a specified game world.
     * @param gameWorldLookup - The unique identifier for the game world to delete.
     * @returns {Promise<Status>} The status of the deletion request.
     */
    Delete: async (gameWorldLookup: string): Promise<Status> => {
      const response = await fetch(
        this.loadClientUrl(`worlds/${gameWorldLookup}`),
        {
          method: 'DELETE',
          headers: this.loadHeaders(),
        }
      );

      return await this.json(response);
    },

    /**
     * Retrieves a specific game world.
     * @param gameWorldLookup - The unique identifier for the game world to retrieve.
     * @returns {Promise<EaCGameWorldAsCode>} The game world data.
     */
    Get: async (gameWorldLookup: string): Promise<EaCGameWorldAsCode> => {
      const response = await fetch(
        this.loadClientUrl(`worlds/${gameWorldLookup}`),
        {
          method: 'GET',
          headers: this.loadHeaders(),
        }
      );

      return await this.json(response);
    },

    /**
     * Lists all game worlds.
     * @returns {Promise<Record<string, EaCGameWorldAsCode>>} A record of game world data.
     */
    List: async (): Promise<Record<string, EaCGameWorldAsCode>> => {
      const response = await fetch(this.loadClientUrl(`worlds`), {
        method: 'GET',
        headers: this.loadHeaders(),
      });

      return await this.json(response);
    },

    /**
     * Updates a specific game world with new data.
     * @param gameWorldLookup - The unique identifier for the game world to update.
     * @param updateReq - The updated game world data.
     * @returns {Promise<Status>} The status of the update request.
     */
    Update: async (
      gameWorldLookup: string,
      updateReq: EaCGameWorldAsCode
    ): Promise<Status> => {
      const response = await fetch(
        this.loadClientUrl(`worlds/${gameWorldLookup}`),
        {
          method: 'PUT',
          headers: this.loadHeaders(),
          body: JSON.stringify(updateReq),
        }
      );

      return await this.json(response);
    },
  };
  //#endregion

  //#region Helpers
  /**
   * Overrides the base client’s `loadHeaders` method to establish headers with
   * optional authorization and content type.
   * @param headers - Additional headers to include.
   * @returns {HeadersInit} The final headers used for requests.
   */
  protected override loadHeaders(
    headers: HeadersInit | undefined = undefined
  ): HeadersInit {
    return establishHeaders(
      new Headers({
        ...(this.apiToken ? { Authorization: `Bearer ${this.apiToken}` } : {}),
        'Content-Type': 'application/json',
      }),
      (headers as Record<string, string>) || {}
    );
  }
  //#endregion
}
