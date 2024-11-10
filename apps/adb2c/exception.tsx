import { EaCRuntimeHandlerResult, PageProps } from '@fathym/eac-runtime';
import { GamesWebState } from '../../src/state/GamesWebState.ts';

// deno-lint-ignore ban-types
type ADB2CExceptionPageData = {};

export const handler: EaCRuntimeHandlerResult<
  GamesWebState,
  ADB2CExceptionPageData
> = {
  GET(_req, ctx) {
    return ctx.Render({});
  },
};

export default function ADB2CException({}: PageProps<ADB2CExceptionPageData>) {
  return <div id='api' role='main'></div>;
}
