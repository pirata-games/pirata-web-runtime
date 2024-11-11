import { GameServiceClient } from '../api/clients/GameServiceClient.ts';
import { EverythingAsCodeGame } from '../eac/EverythingAsCodeGame.ts';

export type GamesWebState = {
  CurrentRootKey: Deno.KvKey;

  Game?: EverythingAsCodeGame;

  GameLookup?: string;

  GamesKV: Deno.Kv;

  GameJWT?: string;

  GameClient?: GameServiceClient;

  LoadGameClient: (
    gameLookup: string,
    username?: string
  ) => Promise<GameServiceClient>;

  Username?: string;
};
