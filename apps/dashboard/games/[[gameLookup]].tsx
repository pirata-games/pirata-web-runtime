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

export const IsIsland = true;

type GameIndexPageData = {
  Games: EverythingAsCodeGame[];
  ActiveGameLookup?: string;
};

export const handler: EaCRuntimeHandlerResult<
  GamesWebState,
  GameIndexPageData
> = {
  async GET(_req, ctx) {
    const games = ctx.State.GameLookup
      ? await ctx.State.GamesClient!.Games.List()
      : [];

    return ctx.Render({
      Games: games,
      ActiveGameLookup: ctx.State.GameLookup,
    });
  },

  async POST(req, ctx) {
    const formData = await req.formData();
    let gameLookup = formData.get('GameLookup') as string;
    const name = formData.get('Name') as string;
    const description = formData.get('Description') as string;

    if (gameLookup) {
      const gameStatus = await ctx.State.GamesClient!.Games.Update({
        Details: {
          Name: name,
          Description: description,
        },
        GameWorlds: {},
      });

      gameLookup = gameStatus.EnterpriseLookup;
    } else {
      const gameStatus = await ctx.State.GamesClient!.Games.Create({
        Details: {
          Name: name,
          Description: description,
        },
        GameWorlds: {},
      });

      gameLookup = gameStatus.EnterpriseLookup;
    }

    await setActiveGame(ctx.State, gameLookup);

    return Response.redirect(
      ctx.Runtime.URLMatch.FromOrigin('/dashboard/games')
    );
  },

  async PUT(_req, ctx) {
    if (ctx.State.GameLookup) {
      await setActiveGame(ctx.State, ctx.State.GameLookup);
    }

    return Response.json(true);
  },

  async DELETE(_req, ctx) {
    const gameLookup = ctx.Params.gameLookup!;

    if (gameLookup) {
      const jwt = await loadJwtConfig().Create({
        GameLookup: ctx.State.GameLookup,
        Username: ctx.State.Username,
      });

      const gamesClient = await new GameServiceClient(
        new URL(ctx.Runtime.URLMatch.FromOrigin('api/')),
        jwt
      );

      await gamesClient.Games.Delete();
    }

    return Response.json(true);
  },
};

export default function GamesIndex({
  Data: { Games, ActiveGameLookup },
}: PageProps<GameIndexPageData>) {
  const [games] = useState(Games || []);

  const [activeGame, setActiveGame] = useState(
    Games?.find((game) => game.EnterpriseLookup === ActiveGameLookup)
  );

  const toggleActiveGame = () => {
    if (activeGame) {
      setActiveGame(undefined);
    } else {
      setActiveGame(
        Games?.find((game) => game.EnterpriseLookup === ActiveGameLookup)
      );
    }
  };

  const handleDelete = async (gameLookup: string, gameName: string) => {
    if (confirm(`Are you sure you want to delete the '${gameName}' game?`)) {
      const response = await fetch(`/dashboard/games/${gameLookup}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        window.location.reload();
      }
    }
  };

  const handleSetActive = async (gameLookup: string, gameName: string) => {
    if (
      confirm(`Are you sure you want to set the '${gameName}' game as active?`)
    ) {
      const response = await fetch(`/dashboard/games`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ GameLookup: gameLookup }),
      });

      if (response.ok) {
        window.location.reload();
      }
    }
  };

  return (
    <div class="p-6">
      <h1 class="text-3xl font-semibold text-center mb-6">
        {activeGame ? 'Manage Active Game' : 'Create Game'}
      </h1>

      <form method="POST" class="mb-8">
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
          >
            {activeGame ? 'Update Game' : 'Create Game'}
          </Action>

          {!activeGame && (
            <Action
              type="button"
              actionStyle={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
              onClick={() => {
                toggleActiveGame();
              }}
            >
              Cancel
            </Action>
          )}
        </div>
      </form>

      {activeGame && games.length > 0 ? (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div
              key={game.EnterpriseLookup}
              class="p-4 bg-gray-200 dark:bg-slate-700 rounded-lg shadow-lg"
            >
              <h2 class="text-xl font-semibold">{game.Details!.Name}</h2>

              <p class="mb-4">{game.Details!.Description}</p>

              <div class="flex justify-between">
                <Action
                  actionStyle={ActionStyleTypes.Icon}
                  class="px-4 py-2"
                  title="Delete"
                  onClick={() =>
                    handleDelete(game.EnterpriseLookup!, game.Details!.Name!)
                  }
                >
                  <DeleteIcon class="w-6 h-6 text-red-500" />
                </Action>

                {ActiveGameLookup !== activeGame?.EnterpriseLookup && (
                  <Action
                    actionStyle={ActionStyleTypes.Icon}
                    class="px-4 py-2"
                    title="Set as Active Game"
                    onClick={() =>
                      handleSetActive(
                        game.EnterpriseLookup!,
                        game.Details!.Name!
                      )
                    }
                  >
                    <ActivateIcon class="w-6 h-6 text-red-500" />
                  </Action>
                )}
              </div>
            </div>
          ))}

          <Action
            type="button"
            onClick={() => {
              toggleActiveGame();
            }}
          >
            Create Game
          </Action>
        </div>
      ) : !activeGame ? (
        <></>
      ) : (
        <p class="text-center text-gray-500">No games available.</p>
      )}
    </div>
  );
}
