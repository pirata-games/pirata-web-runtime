import { EaCRuntimeHandler } from '@fathym/eac-runtime';
import { PirataGameWorldWebState } from '../../src/state/PirataGameWorldWebState.ts';

export default ((_req, ctx) => {
  return ctx.Next();
}) as EaCRuntimeHandler<PirataGameWorldWebState>;
