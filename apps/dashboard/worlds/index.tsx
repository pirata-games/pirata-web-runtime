import { EaCRuntimeHandlerResult, PageProps } from '@fathym/eac-runtime';
import { useState } from 'preact/hooks';
import {
  Action,
  ActionStyleTypes,
  Display,
  DisplayStyleTypes,
} from '@fathym/atomic';
import { GamesWebState } from '../../../src/state/GamesWebState.ts';
import { EverythingAsCodeGame } from '../../../src/eac/EverythingAsCodeGame.ts';
import { EditIcon } from '../../../build/iconset/icons/EditIcon.tsx';
import { DeleteIcon } from '../../../build/iconset/icons/DeleteIcon.tsx';
import { ManageIcon } from '../../../build/iconset/icons/ManageIcon.tsx';
import { GameServiceClient } from '../../../src/api/clients/GameServiceClient.ts';
import { STATUS_CODE } from 'jsr:@std/http@1.0.2/status';

export const IsIsland = true;

type GameWorldIndexPageData = { CreateNew?: boolean } & EverythingAsCodeGame;

export const handler: EaCRuntimeHandlerResult<
  GamesWebState,
  GameWorldIndexPageData
> = {
  async GET(_req, ctx) {
    if (ctx.State.GameLookup) {
      const gameWorlds = await ctx.State.GamesClient!.Worlds.List();

      return ctx.Render({
        GameWorlds: {
          'sample-game-world': {
            Details: {
              Name: 'Pirata Island',
              Description:
                'An expansive oceanic game world filled with islands, resources, and hidden treasures. Players explore, trade, and battle across diverse regions.',
            },
            Content: {},
          },
          ...gameWorlds,
        },
      });
    } else {
      return Response.redirect(
        ctx.Runtime.URLMatch.FromOrigin('/dashboard/games'),
        STATUS_CODE.TemporaryRedirect
      );
    }
  },
};

export default function WorldsIndex({
  Data,
}: PageProps<GameWorldIndexPageData>) {
  const [gameWorlds] = useState(() => Object.entries(Data.GameWorlds || {}));

  return (
    <div class="p-6">
      <h1 class="text-3xl font-semibold text-center mb-6">Game World Index</h1>
      {gameWorlds.length > 0 ? (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameWorlds.map(([key, gameWorld]) => (
            <Display
              displayStyle={DisplayStyleTypes.Center}
              key={key}
              class="flex-1 p-4 m-4 bg-gray-200 dark:bg-slate-700 rounded-lg shadow-lg"
            >
              <h2 class="text-xl font-semibold">{gameWorld.Details!.Name}</h2>

              <p class="mb-4">{gameWorld.Details!.Description}</p>

              <div class="flex justify-between">
                <Action actionStyle={ActionStyleTypes.Icon} class="px-4 py-2">
                  <EditIcon class="w-6 h-6 text-sky-500" />
                </Action>

                <Action actionStyle={ActionStyleTypes.Icon} class="px-4 py-2">
                  <DeleteIcon class="w-6 h-6 text-red-500" />
                </Action>

                <Action actionStyle={ActionStyleTypes.Icon} class="px-4 py-2">
                  <ManageIcon class="w-6 h-6 text-black dark:text-white" />
                </Action>
              </div>
            </Display>
          ))}
        </div>
      ) : (
        <p class="text-center text-gray-500">No game worlds available.</p>
      )}
    </div>
  );
}
