import { EverythingAsCode } from '@fathym/eac';
import {
  EaCGameWorldAsCode,
  EaCGameWorldAsCodeSchema,
} from './EaCGameWorldAsCode.ts';
import { z } from 'zod';

export type EverythingAsCodePirata = {
  GameWorlds?: Record<string, EaCGameWorldAsCode>;
} & EverythingAsCode;

export const EverythingAsCodePirataSchema = z
  .object({
    GameWorlds: z
      .record(z.string(), EaCGameWorldAsCodeSchema)
      .optional()
      .describe(
        "The 'GameWorlds' property organizes and stores diverse content for multiple game worlds, each identified by a unique key. Each entry maps to an `EaCGameWorldAsCode` object, allowing for structured collection and management of game-specific information, configurations, and resources."
      ),
  })
  .describe(
    "The 'EverythingAsCodePirataSchema' is a comprehensive structure for managing all data and content related to Pirata, including game worlds, configurations, and associated resources. It serves as the primary schema for organizing and structuring game-specific information to support dynamic content and settings across Pirata’s universe."
  );
