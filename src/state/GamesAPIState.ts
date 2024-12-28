import { EaCStewardClient } from '@fathym/eac/steward/clients';
import { EverythingAsCodeGame } from '../eac/EverythingAsCodeGame.ts';

export type GamesAPIState = {
  EaCJWT?: string;

  EaCClient?: EaCStewardClient;

  Game?: EverythingAsCodeGame;

  GamesKV: Deno.Kv;

  GameLookup?: string;

  GamesRootKey: Deno.KvKey;

  Username: string;
};
