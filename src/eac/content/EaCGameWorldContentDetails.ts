import { EaCVertexDetails } from '@fathym/eac';
import z from 'zod';

/**
 * `EaCGameWorldContentDetails` represents the core properties of game world content items,
 * including their type, title, and description. It extends `EaCVertexDetails` for
 * consistent metadata handling and enhances readability for both AI agents and users.
 *
 * @template TType - An optional string type for defining specific content types.
 */
export type EaCGameWorldContentDetails<
  TType extends string | undefined = string,
> = {
  /**
   * The type of the content (e.g., "Text"). This property allows for content-specific categorization and future extensibility.
   */
  Type: TType;
} & EaCVertexDetails;

/**
 * `EaCGameWorldContentDetailsSchema` is a Zod schema for validating the structure of game world content details,
 * encompassing fields like title, description, and type.
 *
 * - `Name`: A concise, descriptive title for the content, intended for easy identification in UI elements and data lists.
 * - `Description`: A brief abstract of up to 750 characters, outlining the primary focus or theme of the content.
 * - `Type`: The content type identifier, allowing AI-driven reasoning and categorization, and currently supports "Text."
 */
export const EaCGameWorldContentDetailsSchema = z
  .object({
    Description: z
      .string()
      .max(750)
      .describe(
        'A concise abstract summarizing the content, intended to help AI agents understand the context. Should be 3-7 sentences, focusing on key points.',
      ),
    Name: z
      .string()
      .max(100)
      .describe(
        'A short, descriptive title for the content, ideally under 100 characters, summarizing its main focus.',
      ),
    Type: z
      .string()
      .describe(
        'Specifies the content type (e.g., "Text") to allow for categorization and possible future expansion to additional types.',
      ),
  })
  .describe(
    'Schema for the essential details of game world content, including title, description, and content type. Supports AI-driven categorization, interpretation, and navigation of game world information.',
  );

export type EaCGameWorldContentDetailsSchema = z.infer<
  typeof EaCGameWorldContentDetailsSchema
>;

/**
 * Type guard function for determining if an object matches the `EaCGameWorldContentDetails` type.
 * Verifies the presence of required fields (`Name`, `Description`, and optionally `Type`).
 *
 * @param type - An optional specific type for filtering content.
 * @param details - The object to verify.
 * @returns `true` if the object conforms to `EaCGameWorldContentDetails` with the specified type; otherwise, `false`.
 */
export function isEaCGameWorldContentDetails<TType extends string>(
  type: TType | undefined,
  details: unknown,
): details is EaCGameWorldContentDetails<TType> {
  const x = details as EaCGameWorldContentDetails<TType>;

  return (
    !!x &&
    (!type || x.Type == type) &&
    typeof x.Name === 'string' &&
    typeof x.Description === 'string'
  );
}
