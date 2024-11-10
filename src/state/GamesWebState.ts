import { GameServiceClient } from '../api/clients/GameServiceClient.ts';
import { EverythingAsCodeGame } from '../eac/EverythingAsCodeGame.ts';

export type GamesWebState = {
  CurrentRootKey: Deno.KvKey;

  Game?: EverythingAsCodeGame;

  GameLookup?: string;

  GamesKV: Deno.Kv;

  GamesJWT?: string;

  GamesClient?: GameServiceClient;

  Username?: string;
};
