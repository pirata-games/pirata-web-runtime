import { EaCRuntimeHandlers } from '@fathym/eac-runtime';
import { PirataGamesAPIState } from '../../src/state/PirataGamesAPIState.ts';

export default {
  async GET(_req, ctx) {
    ctx.State.PirataKV = await ctx.Runtime.IoC.Resolve<Deno.Kv>(
      Deno.Kv,
      'pirata'
    );

    ctx.State.RootKey = ['PirataGames', '00000000-0000-0000-0000-000000000000'];

    return ctx.Next();
  },
} as EaCRuntimeHandlers<PirataGamesAPIState>;
