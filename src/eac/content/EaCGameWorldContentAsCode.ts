import { EaCDetails } from '@fathym/eac';
import {
  EaCGameWorldContentDetails,
  EaCGameWorldContentDetailsSchema,
  isEaCGameWorldContentDetails,
} from './EaCGameWorldContentDetails.ts';
import z from 'zod';

/**
 * `EaCGameWorldContentAsCode` represents the structural organization of a game world’s nested content items,
 * combining primary content details with hierarchical sub-content to allow for extensive categorization and easy retrieval.
 */
export type EaCGameWorldContentAsCode = {
  /**
   * Nested `Content` items within this game world, each identified by a unique key.
   */
  Content: EaCGameWorldContentRecords;
} & EaCDetails<EaCGameWorldContentDetails>;

/**
 * `EaCGameWorldContentRecordsSchema` defines a recursive schema to validate hierarchical collections
 * of game world content items. This schema enforces consistent structure and enables in-depth organization.
 */
export const EaCGameWorldContentRecords: z.ZodType<
  Record<string, EaCGameWorldContentAsCode>
> = z.lazy(() =>
  z
    .record(z.string(), EaCGameWorldContentAsCodeSchema)
    .describe(
      'A hierarchical collection of content items for the game world, where each key uniquely identifies an `EaCGameWorldContentAsCode` object. This supports effective nested content organization.'
    )
);

export type EaCGameWorldContentRecords = z.infer<
  typeof EaCGameWorldContentRecords
>;

/**
 * `EaCGameWorldContentAsCodeSchema` validates the core structure of game world content, including primary details and recursive nested sub-content.
 * This schema is optimized for both human understanding and AI categorization, facilitating exploration and interaction with complex content hierarchies.
 */
export const EaCGameWorldContentAsCodeSchema = z
  .object({
    Content: EaCGameWorldContentRecords,
    Details: EaCGameWorldContentDetailsSchema,
  })
  .describe(
    'Schema for game world content, incorporating main details and nested sub-content items. Supports AI and other systems in reasoning, categorizing, and navigating content within the game world.'
  );

export type EaCGameWorldContentAsCodeSchema = z.infer<
  typeof EaCGameWorldContentAsCodeSchema
>;

/**
 * Type guard to verify if an object conforms to the `EaCGameWorldContentAsCode` type.
 * Ensures the object includes both `Content` and valid `Details` properties.
 *
 * @param eac - The object to verify.
 * @returns `true` if the object matches the `EaCGameWorldContentAsCode` type; otherwise, `false`.
 */
export function isEaCGameWorldContentAsCode(
  eac: unknown
): eac is EaCGameWorldContentAsCode {
  const x = eac as EaCGameWorldContentAsCode;

  return x && x.Content && isEaCGameWorldContentDetails(undefined, x.Details);
}
