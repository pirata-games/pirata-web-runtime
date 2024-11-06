import z from 'zod';
import {
  EaCGameWorldContentDetails,
  EaCGameWorldContentDetailsSchema,
  isEaCGameWorldContentDetails,
} from './EaCGameWorldContentDetails.ts';

export type EaCGameWorldTextContentDetails = {
  Paragraphs: string[];
} & EaCGameWorldContentDetails<'Text'>;

export const EaCGameWorldTextContentDetailsSchema =
  EaCGameWorldContentDetailsSchema.extend({
    Paragraphs: z
      .array(z.string())
      .nonempty()
      .describe(
        'An array of paragraphs that make up the content, allowing for structured organization and sequential flow of information.'
      ),
  }).describe(
    'An extension of the foundational game world content schema, designed specifically for tracking and managing structured text content. This schema includes core details such as description, title, and content type, along with a paragraph array to organize sequential text information. Useful for AI-driven content parsing, organization, and content retrieval within game worlds.'
  );

export function isEaCGameWorldTextContentDetails(
  details: unknown
): details is EaCGameWorldTextContentDetails {
  const x = details as EaCGameWorldTextContentDetails;

  return isEaCGameWorldContentDetails('Text', x) && x.Paragraphs?.length > 0;
}
