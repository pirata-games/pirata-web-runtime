import { EaCRuntimeHandler } from '@fathym/eac-runtime';
import { PirataGamesWebState } from '../../src/state/PirataGamesWebState.ts';

export default ((_req, ctx) => {
  ctx.State.CurrentDate = new Date(Date.now());

  return ctx.Next();
}) as EaCRuntimeHandler<PirataGamesWebState>;
