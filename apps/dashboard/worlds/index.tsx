import { EaCRuntimeHandlerResult, PageProps } from '@fathym/eac-runtime';
import { useState } from 'preact/hooks';
import { ManageIcon } from '../../../build/iconset/icons/ManageIcon.tsx';
import { DeleteIcon } from '../../../build/iconset/icons/DeleteIcon.tsx';
import { EverythingAsCodeGame } from '../../../src/eac/EverythingAsCodeGame.ts';
import { GamesWebState } from '../../../src/state/GamesWebState.ts';
import { Action, ActionStyleTypes, Input } from '@fathym/atomic';
import { classSet } from '../../../../../../../Fathym/source/github/fathym-deno/code-editor/src/src.deps.ts';
import { EditIcon } from '../../../build/iconset/icons/EditIcon.tsx';
import { EaCGameWorldAsCode } from '../../../src/eac/EaCGameWorldAsCode.ts';

/**
 * Set if this component should be isolated.
 */
export const IsIsland = true;

/**
 * WorldIndexPageData holds the games array and the active game identifier.
 */
type WorldIndexPageData = EverythingAsCodeGame;

/**
 * API handler for managing game worlds (create, read, update, delete) within the application state.
 */
export const handler: EaCRuntimeHandlerResult<
  GamesWebState,
  WorldIndexPageData
> = {
  /**
   * ...
   */
  GET(_req, ctx) {
    return ctx.Render(ctx.State.Game);
  },

  /**
   * ...
   */
  async POST(req, ctx) {
    const formData = await req.formData();

    const worldLookup =
      (formData.get('worldLookup') as string) ?? crypto.randomUUID();

    const isNew = !(worldLookup in ctx.State.Game!.Worlds);

    const name = formData.get('name') as string;

    const description = formData.get('description') as string;

    const gameUpdate = {
      Worlds: {
        [worldLookup]: {
          Details: { Name: name, Description: description },
          Content: {},
        },
      },
    } as EverythingAsCodeGame;

    await ctx.State.GameClient!.Games.Update(gameUpdate);

    const redirectTo = ctx.Runtime.URLMatch.FromBase(
      !isNew ? 'worlds' : `worlds/${worldLookup}`
    );

    return Response.redirect(redirectTo);
  },
};

/**
 * ...
 */
export default function WorldsIndex({
  Data: { Worlds, Details },
}: PageProps<WorldIndexPageData>) {
  const [loading, setLoading] = useState(false);

  const [worlds] = useState(Object.entries(Worlds) || {});

  const [editWorld, setEditWorld] = useState<
    [string, EaCGameWorldAsCode] | undefined
  >(
    worlds.length > 0 ? undefined : ['', { Details: {} } as EaCGameWorldAsCode]
  );

  /**
   * ...
   */
  const toggleEditWorld = (
    lookup: string,
    world: EaCGameWorldAsCode | undefined
  ) => setEditWorld(world ? ([lookup, world] as typeof editWorld) : undefined);

  /**
   * ...
   *
   * @param worldLookup - Unique identifier for the world.
   * @param worldName - Name of the world.
   */
  const handleDelete = async (worldLookup: string, worldName: string) => {
    if (confirm(`Are you sure you want to delete the '${worldName}' world?`)) {
      setLoading(true);

      const response = await fetch(`/dashboard/worlds/${worldLookup}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        window.location.reload();
      }
    }
  };

  /**
   * Form submission handler for creating or updating a world.
   * Sets loading state before form submission.
   *
   * @param event - Form submission event.
   */
  const handleFormSubmit = (event: Event) => {
    event.preventDefault();

    setLoading(true);

    (event.target as HTMLFormElement).submit();
  };

  return (
    <div class="p-6">
      {!editWorld && worlds.length > 0 ? (
        <>
          <h1 class="text-3xl font-semibold text-center my-8">
            {Details!.Name}: Worlds Index
          </h1>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {worlds.map(([lookup, world]) => (
              <div
                key={lookup}
                class={classSet([
                  'p-4 rounded-lg shadow-lg min-h-150px bg-gray-200 dark:bg-slate-700',
                ])}
              >
                <h2 class="text-xl font-semibold">{world.Details!.Name}</h2>

                <p class="mb-4">{world.Details!.Description}</p>

                <div class="flex flex-row justify-end">
                  <Action
                    actionStyle={ActionStyleTypes.Icon}
                    class="px-4 py-2"
                    title="Edit"
                    disabled={loading}
                    onClick={() => toggleEditWorld(lookup, world)}
                  >
                    <EditIcon class="w-6 h-6 text-sky-500" />
                  </Action>

                  <Action
                    actionStyle={ActionStyleTypes.Icon}
                    class="px-4 py-2"
                    title="Manage"
                    disabled={loading}
                    href={`/dashboard/worlds/${lookup}`}
                  >
                    <ManageIcon class="w-6 h-6 text-sky-500" />
                  </Action>

                  <Action
                    actionStyle={ActionStyleTypes.Icon}
                    class="px-4 py-2"
                    title="Delete"
                    disabled={loading}
                    onClick={() => handleDelete(lookup, world.Details!.Name!)}
                  >
                    <DeleteIcon class="w-6 h-6 text-red-500" />
                  </Action>
                </div>
              </div>
            ))}

            <Action
              type="button"
              actionStyle={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
              disabled={loading}
              onClick={() =>
                toggleEditWorld('', { Details: {} } as EaCGameWorldAsCode)
              }
            >
              Create World
            </Action>
          </div>
        </>
      ) : editWorld ? null : (
        <p class="text-center text-gray-500">
          No worlds available, create one.
        </p>
      )}

      {editWorld && (
        <>
          <h1 class="text-3xl font-semibold text-center my-8">
            {editWorld[1].Details?.Name
              ? `Manage ${editWorld[1].Details?.Name}`
              : 'Create World'}
          </h1>

          <form
            method="POST"
            class="mb-8 max-w-xs sm:max-w-sm mx-auto"
            onSubmit={handleFormSubmit}
          >
            {editWorld[0] && (
              <input type="hidden" name="worldLookup" value={editWorld[0]} />
            )}

            <div class="mb-4">
              <label for="name" class="block font-semibold">
                Name
              </label>

              <Input
                type="text"
                name="name"
                placeholder="Game Name"
                value={editWorld[1].Details?.Name ?? ''}
                required
              />
            </div>

            <div class="mb-4">
              <label for="description" class="block font-semibold">
                Description
              </label>

              <Input
                multiline
                name="description"
                placeholder="Game Description"
                value={editWorld[1]?.Details?.Description ?? ''}
                required
              />
            </div>

            <div class="flex items-stretch flex-row gap-4">
              <Action
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={loading}
              >
                {editWorld[0] ? 'Update Game' : 'Create Game'}
              </Action>

              {worlds.length > 0 && (
                <Action
                  type="button"
                  actionStyle={
                    ActionStyleTypes.Outline | ActionStyleTypes.Rounded
                  }
                  disabled={loading}
                  onClick={() => toggleEditWorld('', undefined)}
                >
                  Cancel
                </Action>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
}
