import { NullableArrayOrObject } from '@fathym/common';
import { waitForStatus } from '@fathym/eac-api/status';
import { EaCRuntimeHandlers } from '@fathym/eac-runtime';
import { EaCGameWorldAsCode } from '../../../../src/eac/EaCGameWorldAsCode.ts';
import { EverythingAsCodeGame } from '../../../../src/eac/EverythingAsCodeGame.ts';
import { GamesAPIState } from '../../../../src/state/GamesAPIState.ts';

export default {
  /** Deletes a specific game world and its contents */
  async DELETE(_req, ctx) {
    try {
      const worldLookup = ctx.Params.worldLookup!;

      const deleteResp =
        await ctx.State.EaCClient!.Delete<EverythingAsCodeGame>(
          {
            EnterpriseLookup: ctx.State.GameLookup!,
            ParentEnterpriseLookup: ctx.Runtime.EaC.EnterpriseLookup,
            Worlds: {
              [worldLookup]:
                null as unknown as NullableArrayOrObject<EaCGameWorldAsCode>,
            },
          },
          false,
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
