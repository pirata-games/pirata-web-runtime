import { EverythingAsCode, EverythingAsCodeSchema } from '@fathym/eac';
import {
  EaCGameWorldAsCode,
  EaCGameWorldAsCodeSchema,
} from './EaCGameWorldAsCode.ts';
import { z } from 'zod';

/**
 * The `EverythingAsCodeGame` type is a foundational structure for storing and managing multiple game worlds, each identified by a unique key. This structure allows for organized handling of game-specific information and configurations.
 */
export type EverythingAsCodeGame = {
  GameWorlds: Record<string, EaCGameWorldAsCode>;
} & EverythingAsCode;

/**
 * The `EverythingAsCodeGameSchema` provides a structured format for managing content and settings across multiple game worlds. The `GameWorlds` property contains entries for each game world, organized by unique keys, and associates each with an `EaCGameWorldAsCode` object to maintain specific game configurations and data. This schema supports efficient organization and retrieval of game data, suitable for AI-driven systems and content management.
 */
export const EverythingAsCodeGameSchema = EverythingAsCodeSchema.extend({
  GameWorlds: z
    .record(z.string(), EaCGameWorldAsCodeSchema)
    .describe(
      'A collection of game worlds, each identified by a unique key, mapped to an `EaCGameWorldAsCode` object. This property enables organized management of game world configurations and data, supporting structured content retrieval and updates.'
    ),
}).describe(
  'The `EverythingAsCodeGameSchema` is a comprehensive structure for organizing and managing multiple game worlds and their configurations. It supports dynamic content management across diverse game environments, making it ideal for AI applications and content systems requiring efficient handling of game-specific data.'
);

export type EverythingAsCodeGameSchema = z.infer<
  typeof EverythingAsCodeGameSchema
>;
