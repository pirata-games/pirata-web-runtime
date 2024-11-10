import z from 'zod';
import {
  EaCGameWorldContentDetails,
  EaCGameWorldContentDetailsSchema,
  isEaCGameWorldContentDetails,
} from './EaCGameWorldContentDetails.ts';

/**
 * `EaCGameWorldTextContentDetails` extends the core content model specifically for managing
 * structured text content in game worlds. It includes an array of paragraphs to represent
 * sequential text, making it ideal for content with multiple sections.
 */
export type EaCGameWorldTextContentDetails = {
  /**
   * An array of text paragraphs composing the main content. Enables ordered structuring
   * for text-based content, facilitating clearer data parsing and display.
   */
  Paragraphs: string[];
} & EaCGameWorldContentDetails<'Text'>;

/**
 * `EaCGameWorldTextContentDetailsSchema` is a Zod schema validating structured text content,
 * extending the core game world content schema to include an array of paragraphs.
 *
 * - `Paragraphs`: An array of non-empty strings, each representing a paragraph, allowing for
 *    organized sequential content.
 */
export const EaCGameWorldTextContentDetailsSchema =
  EaCGameWorldContentDetailsSchema.extend({
    Paragraphs: z
      .array(z.string())
      .nonempty()
      .describe(
        'An array of paragraphs that make up the structured text content, enabling organized and sequential data storage.'
      ),
  }).describe(
    'Schema for structured text content in game worlds, extending the core content schema with an array of paragraphs. Ideal for AI-driven text parsing, organization, and retrieval in game contexts.'
  );

export type EaCGameWorldTextContentDetailsSchema = z.infer<
  typeof EaCGameWorldTextContentDetailsSchema
>;

/**
 * Type guard function to validate if an object conforms to the `EaCGameWorldTextContentDetails` type.
 * Confirms that the object has a 'Text' content type and includes at least one paragraph.
 *
 * @param details - The object to validate.
 * @returns `true` if the object matches `EaCGameWorldTextContentDetails`; otherwise, `false`.
 */
export function isEaCGameWorldTextContentDetails(
  details: unknown
): details is EaCGameWorldTextContentDetails {
  const x = details as EaCGameWorldTextContentDetails;

  return isEaCGameWorldContentDetails('Text', x) && x.Paragraphs?.length > 0;
}
