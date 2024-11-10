import { EaCRuntimeHandler } from '@fathym/eac-runtime';
import { GamesWebState } from '../../src/state/GamesWebState.ts';
import { gameWebSetupLoaderMiddleware } from '../../src/state/gameWebSetupLoaderMiddleware.ts';

export default [
  gameWebSetupLoaderMiddleware,
] as EaCRuntimeHandler<GamesWebState>[];
