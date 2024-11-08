import { EaCRuntimeHandlerResult, PageProps } from '@fathym/eac-runtime';
import { PirataGamesWebState } from '../../../src/state/PirataGamesWebState.ts';

export const IsIsland = true;

// deno-lint-ignore ban-types
type ADB2CUnifiedPageData = {};

export const handler: EaCRuntimeHandlerResult<
  PirataGamesWebState,
  ADB2CUnifiedPageData
> = {
  GET(_req, ctx) {
    return ctx.Render({});
  },
};

export default function ADB2CUnified({}: PageProps<ADB2CUnifiedPageData>) {
  return <div id='api' role='main'></div>;
}
