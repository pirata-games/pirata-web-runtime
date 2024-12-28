import { GamesAPIState } from './GamesAPIState.ts';
import { EverythingAsCodeGame } from '../eac/EverythingAsCodeGame.ts';
import { EaCRuntimeHandler } from '@fathym/eac/runtime/pipelines';
import { loadEaCStewardSvc } from '@fathym/eac/steward/clients';

export const gameJWTLoaderMiddleware = (async (_req, ctx) => {
  ctx.State.GamesKV = await ctx.Runtime.IoC.Resolve<Deno.Kv>(Deno.Kv, 'game');

  if (ctx.State.GameLookup) {
    const parentSvc = await loadEaCStewardSvc();

    const jwt = await parentSvc.EaC.JWT(ctx.State.GameLookup, ctx.State.Username);

    if (jwt.Token) {
      ctx.State.EaCJWT = jwt.Token;

      ctx.State.EaCClient = await loadEaCStewardSvc(ctx.State.EaCJWT);

      ctx.State.Game = await ctx.State.EaCClient.Get<EverythingAsCodeGame>(
        ctx.State.GameLookup,
      );
    }

    ctx.State.GamesRootKey = ['PirataGames', 'Game', ctx.State.GameLookup];
  }

  return await ctx.Next();
}) as EaCRuntimeHandler<GamesAPIState>;
