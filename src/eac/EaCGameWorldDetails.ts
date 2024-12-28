import { EaCVertexDetails } from '@fathym/eac';
import z from 'zod';

/**
 * `EaCGameWorldDetails` represents the foundational properties of a game world,
 * including its name and description. These details enable clear and accessible
 * identification and categorization of game worlds within the system.
 */
export type EaCGameWorldDetails = EaCVertexDetails;

/**
 * `EaCGameWorldDetailsSchema` is a Zod schema for validating and enforcing the structure of a game world’s essential details.
 * This schema is designed to support AI-driven systems by providing context-rich metadata that facilitates reasoning, categorization,
 * and organization of game world data.
 *
 * - `Name`: A concise and descriptive label for the game world (max 100 characters), suitable for display in UI elements and data lists.
 * - `Description`: A summary (up to 750 characters) providing the background or theme of the game world, typically in 3-7 sentences.
 */
export const EaCGameWorldDetailsSchema = z
  .object({
    Description: z
      .string()
      .max(750)
      .describe(
        'A brief overview that conveys the primary background, theme, or setting of the game world. It assists both AI and users in understanding the game world’s context.',
      ),
    Name: z
      .string()
      .max(100)
      .describe(
        'A short title for the game world that allows for quick identification and sorting. This name serves as a clear and accessible label within the application.',
      ),
  })
  .describe(
    'Schema for core game world details, including a concise name and descriptive summary. The structure supports efficient data management, comprehension, and interaction by AI agents and end users.',
  );

export type EaCGameWorldDetailsSchema = z.infer<
  typeof EaCGameWorldDetailsSchema
>;

/**
 * Type guard function for determining if a provided object matches the `EaCGameWorldDetails` type.
 * This function ensures that the object has the required `Name` and `Description` properties,
 * both of which must be strings.
 *
 * @param details - The object to check.
 * @returns `true` if the object conforms to `EaCGameWorldDetails`; otherwise, `false`.
 */
export function isEaCGameWorldDetails(
  details: unknown,
): details is EaCGameWorldDetails {
  const x = details as EaCGameWorldDetails;

  return (
    !!x &&
    x.Name !== undefined &&
    typeof x.Name === 'string' &&
    x.Description !== undefined &&
    typeof x.Description === 'string'
  );
}
