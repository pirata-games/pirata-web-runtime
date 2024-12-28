import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/runtime/preact';
import { GamesWebState } from '../../src/state/GamesWebState.ts';

// deno-lint-ignore ban-types
type ADB2CExceptionPageData = {};

export const handler: EaCRuntimeHandlerSet<
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
