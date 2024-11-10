import { Status } from '@fathym/common';
import { UserEaCRecord } from '@fathym/eac-api';
import { EaCRuntimeHandlerResult, PageProps } from '@fathym/eac-runtime';
import { useState } from 'preact/hooks';
import { EverythingAsCodeGame } from '../../../src/eac/EverythingAsCodeGame.ts';
import { GamesWebState } from '../../../src/state/GamesWebState.ts';
import { setActiveGame } from '../../../src/state/gameWebSetupLoaderMiddleware.ts';

export const IsIsland = true;

type GameIndexPageData = {
  Games: UserEaCRecord[];
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
      const gameStatus = await ctx.State.GamesClient!.Games.Update(gameLookup, {
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

  async PUT(req, ctx) {
    const { GameLookup } = await req.json();

    if (GameLookup) {
      await setActiveGame(ctx.State, GameLookup);
    }

    return Response.json(true);
  },

  async DELETE(_req, ctx) {
    const gameLookup = ctx.Params.gameLookup!;

    if (gameLookup) {
      await ctx.State.GamesClient!.Games.Delete(gameLookup);
    }

    return Response.json(true);
  },
};

// Main GameIndex component
export default function GamesIndex({ Data }: PageProps<GameIndexPageData>) {
  const [games] = useState(() => Object.entries(Data.Games || {}));

  const [editGame, setEditGame] = useState('');

  const handleEdit = (gameLookup: string) => {
    setEditGame(gameLookup);
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
      <h1 class="text-3xl font-semibold text-center mb-6">Manage Games</h1>

      <form method="POST" class="mb-8">
        <input type="hidden" name="GameLookup" value={editGame.GameLookup} />
        <div class="mb-4">
          <label class="block font-semibold">Name</label>
          <input
            type="text"
            name="Name"
            value={editGame.Name}
            onChange={(e) => setEditGame({ ...editGame, Name: e.target.value })}
            class="w-full p-2 border rounded text-black"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block font-semibold">Description</label>
          <textarea
            name="Description"
            value={editGame.Description}
            onChange={(e) =>
              setEditGame({ ...editGame, Description: e.target.value })
            }
            class="w-full p-2 border rounded text-black"
            required
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editGame.GameLookup ? 'Update Game' : 'Create Game'}
        </button>
        {editGame.GameLookup && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setEditGame({ Name: '', Description: '', GameLookup: '' });
            }}
            class="ml-4 text-gray-500 hover:text-black"
          >
            Cancel
          </button>
        )}
      </form>

      {games.length > 0 ? (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map(([key, game]) => (
            <div
              key={key}
              class="p-4 bg-gray-200 dark:bg-slate-700 rounded-lg shadow-lg"
            >
              <h2 class="text-xl font-semibold">{game.Details.Name}</h2>
              <p class="mb-4">{game.Details.Description}</p>
              <div class="flex justify-between">
                <button
                  onClick={() => handleEdit(key, game)}
                  class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(key)}
                  class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleSetActive(key)}
                  class={`${
                    Data.ActiveGameLookup === key
                      ? 'bg-green-500'
                      : 'bg-gray-500'
                  } text-white px-4 py-2 rounded hover:bg-green-600`}
                >
                  {Data.ActiveGameLookup === key ? 'Active' : 'Set Active'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p class="text-center text-gray-500">No games available.</p>
      )}
    </div>
  );
}
