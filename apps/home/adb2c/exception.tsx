import { EaCRuntimeHandlerResult, PageProps } from '@fathym/eac-runtime';
import { PirataGamesWebState } from '../../../src/state/PirataGamesWebState.ts';

export const IsIsland = true;

// deno-lint-ignore ban-types
type ADB2CExceptionPageData = {};

export const handler: EaCRuntimeHandlerResult<
  PirataGamesWebState,
  ADB2CExceptionPageData
> = {
  GET(_req, ctx) {
    return ctx.Render({});
  },
};

export default function ADB2CException({}: PageProps<ADB2CExceptionPageData>) {
  return <div id='api' role='main'></div>;
}
