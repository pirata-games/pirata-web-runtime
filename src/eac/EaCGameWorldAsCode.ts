import { EaCDetails } from '@fathym/eac';
import {
  EaCGameWorldDetails,
  EaCGameWorldDetailsSchema,
  isEaCGameWorldDetails,
} from './EaCGameWorldDetails.ts';
import { EaCGameWorldContentRecords } from './content/EaCGameWorldContentAsCode.ts';
import z from 'zod';

/**
 * `EaCGameWorldAsCode` defines a structured format for a game world, containing core details and a collection of related content. Each game world includes specific details and content items that support structured management and retrieval of game data.
 */
export type EaCGameWorldAsCode = {
  Content: EaCGameWorldContentRecords;
} & EaCDetails<EaCGameWorldDetails>;

/**
 * The `EaCGameWorldAsCodeSchema` provides a schema for managing game world data, including its main details and associated content items. The `Content` property organizes content elements by unique keys, mapping each to an `EaCGameWorldContentAsCode` object for easy retrieval and updates.
 */
export const EaCGameWorldAsCodeSchema = z
  .object({
    Content: EaCGameWorldContentRecords,
    Details: EaCGameWorldDetailsSchema,
  })
  .describe(
    'The `EaCGameWorldAsCodeSchema` schema defines the structure of a game world, including essential details and a collection of content items. This schema supports organized content management, enhancing the ability to interpret and navigate the game world’s data.',
  );

export type EaCGameWorldAsCodeSchema = z.infer<typeof EaCGameWorldAsCodeSchema>;

/**
 * Utility function to check if a given object conforms to the `EaCGameWorldAsCode` structure, ensuring it includes both `Content` and valid `Details` for the game world.
 */
export function isEaCGameWorldAsCode(eac: unknown): eac is EaCGameWorldAsCode {
  const x = eac as EaCGameWorldAsCode;
  return x && x.Content && isEaCGameWorldDetails(x.Details);
}
