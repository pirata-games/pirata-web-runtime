import { EaCRuntimeHandlerResult, PageProps } from '@fathym/eac-runtime';
import { PirataGameWorldWebState } from '../../src/state/PirataGameWorldWebState.ts';

export const IsIsland = true;

// deno-lint-ignore ban-types
type GameWorldIndexPageData = {};

export const handler: EaCRuntimeHandlerResult<
  PirataGameWorldWebState,
  GameWorldIndexPageData
> = {
  GET: (_req, ctx) => {
    return ctx.Render({});
  },
};

export default function GameWorldIndex({}: PageProps<GameWorldIndexPageData>) {
  return (
    <div
      class="relative w-full h-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/assets/pirata-forsaken-background-crop.jpg')`,
      }}
    >
      <div class="flex items-center justify-center h-full">
      </div>
    </div>
  );
}
