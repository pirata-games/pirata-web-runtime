import { loadJwtConfig } from '@fathym/common/jwt';
import { EaCRuntimeHandlerResult, PageProps } from '@fathym/eac-runtime';
import { useState } from 'preact/hooks';
import { ActivateIcon } from '../../../build/iconset/icons/ActivateIcon.tsx';
import { DeleteIcon } from '../../../build/iconset/icons/DeleteIcon.tsx';
import { EverythingAsCodeGame } from '../../../src/eac/EverythingAsCodeGame.ts';
import { GamesWebState } from '../../../src/state/GamesWebState.ts';
import { GameServiceClient } from '../../../src/api/clients/GameServiceClient.ts';
import { setActiveGame } from '../../../src/state/gameWebSetupLoaderMiddleware.ts';
import { Action, ActionStyleTypes, Input } from '@fathym/atomic';
import { classSet } from '../../../../../../../Fathym/source/github/fathym-deno/code-editor/src/src.deps.ts';

/**
 * Set if this component should be isolated.
 */
export const IsIsland = true;

/**
 * GameIndexPageData holds the games array and the active game identifier.
 */
type GameIndexPageData = {
  Games: EverythingAsCodeGame[];
  ActiveGameLookup?: string;
};

/**
 * API handler for managing game entities (create, read, update, delete) within the application state.
 */
export const handler: EaCRuntimeHandlerResult<
  GamesWebState,
  GameIndexPageData
> = {
  /**
   * GET handler - retrieves all games and identifies the active game.
   */
  async GET(_req, ctx) {
    const games = ctx.State.GameLookup
      ? await ctx.State.GamesClient!.Games.List()
      : [];
    return ctx.Render({ Games: games, ActiveGameLookup: ctx.State.GameLookup });
  },

  /**
   * POST handler - creates or updates a game based on the presence of GameLookup.
   */
  async POST(req, ctx) {
    const formData = await req.formData();
    let gameLookup = formData.get('GameLookup') as string;
    const name = formData.get('Name') as string;
    const description = formData.get('Description') as string;

    const gameStatus = gameLookup
      ? await ctx.State.GamesClient!.Games.Update({
          Details: { Name: name, Description: description },
          GameWorlds: {},
        })
      : await ctx.State.GamesClient!.Games.Create({
          Details: { Name: name, Description: description },
          GameWorlds: {},
        });

    gameLookup = gameStatus.EnterpriseLookup;
    await setActiveGame(ctx.State, gameLookup);

    return Response.redirect(
      ctx.Runtime.URLMatch.FromOrigin('/dashboard/games')
    );
  },

  /**
   * PUT handler - sets a game as active.
   */
  async PUT(req, ctx) {
    const { GameLookup } = await req.json();
    if (GameLookup) await setActiveGame(ctx.State, GameLookup);
    return Response.json(true);
  },

  /**
   * DELETE handler - deletes a game by its lookup.
   */
  async DELETE(_req, ctx) {
    const gameLookup = ctx.Params.gameLookup!;
    if (gameLookup) {
      const jwt = await loadJwtConfig().Create({
        GameLookup: gameLookup,
        Username: ctx.State.Username,
      });
      const gamesClient = new GameServiceClient(
        new URL(ctx.Runtime.URLMatch.FromOrigin('api/')),
        jwt
      );
      await gamesClient.Games.Delete();
    }
    return Response.json(true);
  },
};

/**
 * GamesIndex component for managing game entities.
 * Displays, creates, updates, and deletes games, along with managing the active game.
 */
export default function GamesIndex({
  Data: { Games, ActiveGameLookup },
}: PageProps<GameIndexPageData>) {
  const [loading, setLoading] = useState(false);
  const [games] = useState(Games || []);
  const [activeGame, setActiveGame] = useState(
    Games.find((game) => game.EnterpriseLookup === ActiveGameLookup)
  );

  /**
   * Toggles between edit mode for the active game and creating a new game.
   */
  const toggleActiveGame = () =>
    setActiveGame(
      activeGame
        ? undefined
        : Games.find((game) => game.EnterpriseLookup === ActiveGameLookup)
    );

  /**
   * Deletes a game with user confirmation.
   * @param gameLookup - Unique identifier for the game.
   * @param gameName - Name of the game.
   */
  const handleDelete = async (gameLookup: string, gameName: string) => {
    if (confirm(`Are you sure you want to delete the '${gameName}' game?`)) {
      setLoading(true);
      const response = await fetch(`/dashboard/games/${gameLookup}`, {
        method: 'DELETE',
      });
      if (response.ok) window.location.reload();
    }
  };

  /**
   * Sets a game as the active game with user confirmation.
   * @param gameLookup - Unique identifier for the game.
   * @param gameName - Name of the game.
   */
  const handleSetActive = async (gameLookup: string, gameName: string) => {
    if (
      confirm(`Are you sure you want to set the '${gameName}' game as active?`)
    ) {
      setLoading(true);
      const response = await fetch(`/dashboard/games`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ GameLookup: gameLookup }),
      });
      if (response.ok) window.location.reload();
    }
  };

  /**
   * Form submission handler for creating or updating a game.
   * Sets loading state before form submission.
   * @param event - Form submission event.
   */
  const handleFormSubmit = (event: Event) => {
    event.preventDefault();
    setLoading(true);
    (event.target as HTMLFormElement).submit();
  };

  return (
    <div class="p-6">
      {activeGame && games.length > 0 ? (
        <>
          <h1 class="text-3xl font-semibold text-center my-8">Your Games</h1>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <div
                key={game.EnterpriseLookup}
                class={classSet([
                  'p-4 rounded-lg shadow-lg min-h-150px',
                  ActiveGameLookup === game?.EnterpriseLookup
                    ? 'bg-gray-400 dark:bg-slate-500 border border-gray-800 dark:border-slate-100'
                    : 'bg-gray-200 dark:bg-slate-700',
                ])}
              >
                <h2 class="text-xl font-semibold">{game.Details!.Name}</h2>
                <p class="mb-4">{game.Details!.Description}</p>
                <div class="flex flex-row justify-end">
                  {ActiveGameLookup !== game?.EnterpriseLookup && (
                    <Action
                      actionStyle={ActionStyleTypes.Icon}
                      class="px-4 py-2"
                      title="Delete"
                      disabled={loading}
                      onClick={() =>
                        handleDelete(
                          game.EnterpriseLookup!,
                          game.Details!.Name!
                        )
                      }
                    >
                      <DeleteIcon class="w-6 h-6 text-red-500" />
                    </Action>
                  )}
                  {ActiveGameLookup !== game?.EnterpriseLookup && (
                    <Action
                      actionStyle={ActionStyleTypes.Icon}
                      class="px-4 py-2"
                      title="Set as Active Game"
                      disabled={loading}
                      onClick={() =>
                        handleSetActive(
                          game.EnterpriseLookup!,
                          game.Details!.Name!
                        )
                      }
                    >
                      <ActivateIcon class="w-6 h-6 text-sky-500" />
                    </Action>
                  )}
                </div>
              </div>
            ))}
            <Action
              type="button"
              actionStyle={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
              disabled={loading}
              onClick={toggleActiveGame}
            >
              Create Game
            </Action>
          </div>
          <hr class="mb-8 mt-16" />
        </>
      ) : !activeGame ? null : (
        <p class="text-center text-gray-500">No games available.</p>
      )}

      <h1 class="text-3xl font-semibold text-center my-8">
        {activeGame ? 'Manage Active Game' : 'Create Game'}
      </h1>
      <form
        method="POST"
        class="mb-8 max-w-xs sm:max-w-sm mx-auto"
        onSubmit={handleFormSubmit}
      >
        {activeGame && (
          <input type="hidden" name="GameLookup" value={ActiveGameLookup} />
        )}
        <div class="mb-4">
          <label class="block font-semibold">Name</label>
          <Input
            type="text"
            name="Name"
            placeholder="Game Name"
            value={activeGame ? activeGame!.Details!.Name : ''}
            required
          />
        </div>
        <div class="mb-4">
          <label class="block font-semibold">Description</label>
          <Input
            multiline
            name="Description"
            placeholder="Game Description"
            value={activeGame ? activeGame!.Details!.Description : ''}
            required
          />
        </div>
        <div class="flex items-stretch flex-row gap-4">
          <Action
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {activeGame ? 'Update Game' : 'Create Game'}
          </Action>
          {!activeGame && games.length > 0 && (
            <Action
              type="button"
              actionStyle={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
              disabled={loading}
              onClick={toggleActiveGame}
            >
              Cancel
            </Action>
          )}
        </div>
      </form>
    </div>
  );
}
