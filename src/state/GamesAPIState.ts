import { EaCServiceClient } from '@fathym/eac-api/client';
import { EverythingAsCodeGame } from '../eac/EverythingAsCodeGame.ts';

export type GamesAPIState = {
  EaCJWT?: string;

  EaCClient?: EaCServiceClient;

  Game?: EverythingAsCodeGame;

  GamesKV: Deno.Kv;

  GameLookup?: string;

  GamesRootKey: Deno.KvKey;

  Username: string;
};
