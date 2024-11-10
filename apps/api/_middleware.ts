import { EaCRuntimeHandlers } from '@fathym/eac-runtime';
import { GamesAPIState } from '../../src/state/GamesAPIState.ts';
import { gameJWTLoaderMiddleware } from '../../src/state/gameJWTLoaderMiddleware.ts';

export default [
  gameJWTLoaderMiddleware,
] as EaCRuntimeHandlers<GamesAPIState>[];
