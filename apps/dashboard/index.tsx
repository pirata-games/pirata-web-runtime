import { STATUS_CODE } from '@std/http';
import { GamesWebState } from '../../src/state/GamesWebState.ts';
import { EverythingAsCodeGame } from '../../src/eac/EverythingAsCodeGame.ts';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/runtime/preact';

export const IsIsland = true;

type GameWorldIndexPageData = EverythingAsCodeGame;

export const handler: EaCRuntimeHandlerSet<
  GamesWebState,
  GameWorldIndexPageData
> = {
  GET(_req, ctx) {
    if (ctx.State.GameLookup) {
      return ctx.Render(ctx.State.Game);
    } else {
      return Response.redirect(
        ctx.Runtime.URLMatch.FromOrigin('/dashboard/games'),
        STATUS_CODE.TemporaryRedirect,
      );
    }
  },
};

export default function DashboardIndex({
  Data: { Details },
}: PageProps<GameWorldIndexPageData>) {
  return (
    <div class='p-6'>
      <h1 class='text-3xl font-semibold mb-6'>{Details!.Name} Dashboard</h1>
    </div>
  );
}
