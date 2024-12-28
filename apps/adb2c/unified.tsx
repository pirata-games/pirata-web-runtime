import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/runtime/preact';
import { GamesWebState } from '../../src/state/GamesWebState.ts';
// import { ADB2CTestSignIn } from '../components/test-signin.tsx';
// import { ADB2CTestSignUp } from '../components/test-signup.tsx';
// import { ADB2CTestPasswordReset } from '../components/test-resetpassword.tsx';

// deno-lint-ignore ban-types
type ADB2CUnifiedPageData = {};

export const handler: EaCRuntimeHandlerSet<
  GamesWebState,
  ADB2CUnifiedPageData
> = {
  GET(_req, ctx) {
    return ctx.Render({});
  },
};

export default function ADB2CUnified({}: PageProps<ADB2CUnifiedPageData>) {
  return (
    <div id='api' role='main'>
      {/* <ADB2CTestSignIn /> */}
      {/* <ADB2CTestSignUp /> */}
      {/* <ADB2CTestPasswordReset /> */}
    </div>
  );
}
