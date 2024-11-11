import { loadJwtConfig } from '@fathym/common/jwt';
import { EaCRuntimeHandler } from '@fathym/eac-runtime';
import { GamesWebState } from './GamesWebState.ts';
import { GameServiceClient } from '../api/clients/GameServiceClient.ts';

export const gameWebSetupLoaderMiddleware = (async (_req, ctx) => {
  ctx.State.GamesKV = await ctx.Runtime.IoC.Resolve<Deno.Kv>(Deno.Kv, 'game');

  if (ctx.State.Username) {
    ctx.State.CurrentRootKey = [
      'PirataGames',
      'User',
      ctx.State.Username,
      'Current',
    ];
  }

  ctx.State.GameLookup = await getActiveGame(ctx.State);

  ctx.State.LoadGameClient = async (gameLookup, username) => {
    const jwt = await loadJwtConfig().Create({
      GameLookup: gameLookup,
      Username: username ?? ctx.State.Username,
    });

    const origin = new URL(ctx.Runtime.URLMatch.Base).origin;

    return await new GameServiceClient(new URL('api/', origin), jwt);
  };

  ctx.State.GameJWT = await loadJwtConfig().Create({
    GameLookup: ctx.State.GameLookup,
    Username: ctx.State.Username,
  });

  const origin = new URL(ctx.Runtime.URLMatch.Base).origin;

  ctx.State.GameClient = await new GameServiceClient(
    new URL('api/', origin),
    ctx.State.GameJWT
  );

  if (ctx.State.GameLookup) {
    ctx.State.Game = await ctx.State.GameClient.Games.Get();
  }

  return await ctx.Next();
}) as EaCRuntimeHandler<GamesWebState>;

export async function getActiveGame(
  state: GamesWebState
): Promise<string | undefined> {
  if (state.CurrentRootKey) {
    const curGameLookup = await state.GamesKV.get<string>([
      ...state.CurrentRootKey,
      'Game',
    ]);

    return curGameLookup.value ?? undefined;
  }

  return undefined;
}

export async function setActiveGame(
  state: GamesWebState,
  gameLookup: string
): Promise<void> {
  if (state.CurrentRootKey) {
    await state.GamesKV.set([...state.CurrentRootKey, 'Game'], gameLookup);

    state.GameLookup = gameLookup;
  }
}
