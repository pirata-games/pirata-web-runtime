import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { GamesWebState } from '../../src/state/GamesWebState.ts';
import { Action } from '@fathym/atomic';
import { PageProps } from '@fathym/eac-applications/runtime/preact';

export const IsIsland = true;

// deno-lint-ignore ban-types
type HomeIndexPageData = {};

export const handler: EaCRuntimeHandlerSet<GamesWebState, HomeIndexPageData> = {
  GET: (_req, ctx) => {
    return ctx.Render({});
  },
};

export default function HomeIndex({}: PageProps<HomeIndexPageData>) {
  return (
    <div
      class='relative w-screen h-screen bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: `url('/assets/pirata-forsaken-background.png')`,
      }}
    >
      {/* Sign In Button */}
      <Action
        href='/dashboard'
        class='font-pirata absolute top-5 right-5 bg-blue-900/90 text-cyan-400 py-2 px-4 rounded-lg border-2 border-cyan-600 shadow-lg shadow-cyan-800/50 hover:bg-cyan-600 hover:text-slate-900 hover:border-cyan-700 transition duration-200 text-sm sm:text-base tracking-wider'
      >
        Sign In
      </Action>

      <div class='flex items-center justify-center h-full'>{/* Content */}</div>
    </div>
  );
}
