import { EaCRuntimeHandlerResult, PageProps } from '@fathym/eac-runtime';
import { useState } from 'preact/hooks';
import { Action, ActionStyleTypes, Input } from '@fathym/atomic';
import { GamesWebState } from '../../../src/state/GamesWebState.ts';
import { EaCGameWorldAsCode } from '../../../src/eac/EaCGameWorldAsCode.ts';
import { EditIcon } from '../../../build/iconset/icons/EditIcon.tsx';
import { DeleteIcon } from '../../../build/iconset/icons/DeleteIcon.tsx';
import { ManageIcon } from '../../../build/iconset/icons/ManageIcon.tsx';
import { classSet } from '../../../../../../../Fathym/source/github/fathym-deno/code-editor/src/src.deps.ts';

export const IsIsland = true;

type GameWorldIndexPageData = {
  GameWorlds: Record<string, EaCGameWorldAsCode>;
};

export const handler: EaCRuntimeHandlerResult<
  GamesWebState,
  GameWorldIndexPageData
> = {
  GET(_req, ctx) {
    if (ctx.State.Game) {
      return ctx.Render({ GameWorlds: ctx.State.Game.GameWorlds });
    } else {
      return Response.redirect(
        ctx.Runtime.URLMatch.FromOrigin('/dashboard/games'),
        302
      );
    }
  },
  
  async POST(req, ctx) {
    const formData = await req.formData();
    let gameLookup = formData.get('GameLookup') as string;
    const name = formData.get('Name') as string;
    const description = formData.get('Description') as string;

    const gameStatus = gameLookup
      ? await ctx.State.GameClient!.Games.Update({
          Details: { Name: name, Description: description },
          GameWorlds: {},
        })
      : await ctx.State.GameClient!.Games.Create({
          Details: { Name: name, Description: description },
          GameWorlds: {},
        });

    gameLookup = gameStatus.EnterpriseLookup;
    await setActiveGame(ctx.State, gameLookup);

    return Response.redirect(
      ctx.Runtime.URLMatch.FromOrigin('/dashboard/games')
    );
  },

};

export default function WorldsIndex({
  Data,
}: PageProps<GameWorldIndexPageData>) {
  const [loading, setLoading] = useState(false);
  const [gameWorlds, setGameWorlds] = useState(
    Object.entries(Data.GameWorlds || {})
  );
  const [activeWorld, setActiveWorld] = useState<EaCGameWorldAsCode | null>(
    null
  );
  const [isCreating, setIsCreating] = useState(false);

  const handleDelete = async (worldKey: string, worldName: string) => {
    if (confirm(`Are you sure you want to delete the '${worldName}' world?`)) {
      setLoading(true);
      const response = await fetch(`/dashboard/worlds/${worldKey}`, {
        method: 'DELETE',
      });
      setLoading(false);
      if (response.ok) window.location.reload();
    }
  };

  const handleEdit = (worldKey: string) => {
    const world = Data.GameWorlds[worldKey];
    setActiveWorld(world);
    setIsCreating(false);
  };

  const handleManage = (worldKey: string) => {
    window.location.href = `/dashboard/worlds/manage/${worldKey}`;
  };

  const handleFormSubmit = async (event: Event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const worldKey = formData.get('WorldKey')?.toString() || '';
    const name = formData.get('Name')?.toString() || '';
    const description = formData.get('Description')?.toString() || '';

    const url = worldKey ? `/dashboard/worlds/${worldKey}` : `/dashboard/worlds`;
    const method = worldKey ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Name: name, Description: description }),
    });
    
    setLoading(false);
    if (response.ok) {
      window.location.href = '/dashboard/worlds'; // Redirect without adding to history
    }
  };

  return (
    <div class="p-6">
      <h1 class="text-3xl font-semibold text-center my-8">
        {activeWorld ? 'Edit Game World' : isCreating ? 'Create Game World' : 'Game World Index'}
      </h1>

      {/* Game World Form - Only shows during create/edit */}
      {(activeWorld || isCreating) && (
        <form
          method="POST"
          class="mb-8 max-w-xs sm:max-w-sm mx-auto"
          onSubmit={handleFormSubmit}
        >
          <input
            type="hidden"
            name="WorldKey"
            value={activeWorld ? activeWorld.Details?.Name : ''}
          />
          <div class="mb-4">
            <label class="block font-semibold">Name</label>
            <Input
              type="text"
              name="Name"
              placeholder="World Name"
              value={activeWorld?.Details?.Name || ''}
              required
            />
          </div>
          <div class="mb-4">
            <label class="block font-semibold">Description</label>
            <Input
              multiline
              name="Description"
              placeholder="World Description"
              value={activeWorld?.Details?.Description || ''}
              required
            />
          </div>
          <div class="flex items-stretch flex-row gap-4">
            <Action
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {activeWorld ? 'Update World' : 'Create World'}
            </Action>
            <Action
              type="button"
              actionStyle={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
              disabled={loading}
              onClick={() => {
                setActiveWorld(null);
                setIsCreating(false);
              }}
            >
              Cancel
            </Action>
          </div>
        </form>
      )}

      {/* Game World List */}
      {!activeWorld && !isCreating && (
        <>
          {gameWorlds.length > 0 ? (
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gameWorlds.map(([key, world]) => (
                <div
                  key={key}
                  class={classSet([
                    'p-4 rounded-lg shadow-lg min-h-150px',
                    activeWorld!.Details?.Name === world.Details?.Name
                      ? 'bg-gray-400 dark:bg-slate-500 border border-gray-800 dark:border-slate-100'
                      : 'bg-gray-200 dark:bg-slate-700',
                  ])}
                >
                  <h2 class="text-xl font-semibold">{world.Details!.Name}</h2>
                  <p class="mb-4">{world.Details!.Description}</p>
                  <div class="flex justify-between">
                    <Action
                      actionStyle={ActionStyleTypes.Icon}
                      class="px-4 py-2"
                      title="Edit World"
                      disabled={loading}
                      onClick={() => handleEdit(key)}
                    >
                      <EditIcon class="w-6 h-6 text-sky-500" />
                    </Action>
                    <Action
                      actionStyle={ActionStyleTypes.Icon}
                      class="px-4 py-2"
                      title="Delete World"
                      disabled={loading}
                      onClick={() => handleDelete(key, world!.Details!.Name!)}
                    >
                      <DeleteIcon class="w-6 h-6 text-red-500" />
                    </Action>
                    <Action
                      actionStyle={ActionStyleTypes.Icon}
                      class="px-4 py-2"
                      title="Manage World"
                      disabled={loading}
                      onClick={() => handleManage(key)}
                    >
                      <ManageIcon class="w-6 h-6 text-black dark:text-white" />
                    </Action>
                  </div>
                </div>
              ))}
              <Action
                type="button"
                actionStyle={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
                disabled={loading}
                onClick={() => {
                  setIsCreating(true);
                  setActiveWorld(null);
                }}
              >
                Create Game World
              </Action>
            </div>
          ) : (
            <p class="text-center text-gray-500">No game worlds available.</p>
          )}
        </>
      )}
    </div>
  );
}
