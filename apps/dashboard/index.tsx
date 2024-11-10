import { EaCRuntimeHandlerResult, PageProps } from '@fathym/eac-runtime';
import { STATUS_CODE } from '@std/http';
import { GamesWebState } from '../../src/state/GamesWebState.ts';
import { EverythingAsCodeGame } from '../../src/eac/EverythingAsCodeGame.ts';

export const IsIsland = true;

type GameWorldIndexPageData = EverythingAsCodeGame;

export const handler: EaCRuntimeHandlerResult<
  GamesWebState,
  GameWorldIndexPageData
> = {
  GET(_req, ctx) {
    if (ctx.State.GameLookup) {
      return ctx.Render(ctx.State.Game);
    } else {
      return Response.redirect(
        ctx.Runtime.URLMatch.FromOrigin('/dashboard/games'),
        STATUS_CODE.TemporaryRedirect
      );
    }
  },
};

export default function DashboardIndex({
  Data: { Details },
}: PageProps<GameWorldIndexPageData>) {
  return (
    <div class="p-6">
      <h1 class="text-3xl font-semibold mb-6">
        {Details!.Name} Dashboard
      </h1>
    </div>
  );
}
