import { EaCVertexDetails } from '@fathym/eac';
import z from 'zod';

export type EaCGameWorldContentDetails<
  TType extends string | undefined = string,
> = {
  Type: TType;
} & EaCVertexDetails;

export const EaCGameWorldContentDetailsSchema = z
  .object({
    Description: z
      .string()
      .max(750)
      .describe(
        "A concise abstract summarizing the content, intended to help AI agents understand the paragraphs' context more easily. Should be 3-7 sentences, focusing on key points.",
      ),
    Name: z
      .string()
      .max(100)
      .describe(
        'A descriptive title for the content, summarizing its main focus. Keep it short and to the point, ideally under 100 characters.',
      ),
    Type: z
      .string()
      .describe(
        'Specifies the type of content. Currently supports "Text" as a value, but may expand to other types in the future.',
      ),
  })
  .describe(
    'A foundational schema representing the core details of game world content, including a short description, title, and content type. This schema serves as the base for organizing, categorizing, and providing context for game world information, aiding AI agents in interpreting and reasoning about the data.',
  );

export function isEaCGameWorldContentDetails<TType extends string>(
  type: TType | undefined,
  details: unknown,
): details is EaCGameWorldContentDetails<TType> {
  const x = details as EaCGameWorldContentDetails<TType>;

  return (
    !!x &&
    (!type || x.Type == type) &&
    x.Name !== undefined &&
    typeof x.Name === 'string' &&
    x.Description !== undefined &&
    typeof x.Description === 'string'
  );
}
