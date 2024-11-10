import { EaCRuntimeHandlerResult, PageProps } from '@fathym/eac-runtime';
import { GamesWebState } from '../../src/state/GamesWebState.ts';

// deno-lint-ignore ban-types
type ADB2CSelfAssertedPageData = {};

export const handler: EaCRuntimeHandlerResult<
  GamesWebState,
  ADB2CSelfAssertedPageData
> = {
  GET(_req, ctx) {
    return ctx.Render({});
  },
};

export default function ADB2CSelfAsserted({}: PageProps<ADB2CSelfAssertedPageData>) {
  return <div id='api' role='main'></div>;
}
