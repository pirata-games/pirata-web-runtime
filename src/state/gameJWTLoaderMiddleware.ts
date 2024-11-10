import { loadEaCSvc } from '@fathym/eac-api/client';
import { EaCRuntimeHandler } from '@fathym/eac-runtime';
import { GamesAPIState } from './GamesAPIState.ts';
import { EverythingAsCodeGame } from '../eac/EverythingAsCodeGame.ts';

export const gameJWTLoaderMiddleware = (async (_req, ctx) => {
  ctx.State.GamesKV = await ctx.Runtime.IoC.Resolve<Deno.Kv>(Deno.Kv, 'game');

  if (ctx.State.GameLookup) {
    const parentSvc = await loadEaCSvc();

    const jwt = await parentSvc.JWT(ctx.State.GameLookup, ctx.State.Username);

    if (jwt.Token) {
      ctx.State.EaCJWT = jwt.Token;

      ctx.State.EaCClient = await loadEaCSvc(ctx.State.EaCJWT);

      ctx.State.Game = await ctx.State.EaCClient.Get<EverythingAsCodeGame>(
        ctx.State.GameLookup
      );
    }

    ctx.State.GamesRootKey = ['PirataGames', 'Game', ctx.State.GameLookup];
  }

  return await ctx.Next();
}) as EaCRuntimeHandler<GamesAPIState>;
