import { EaCVertexDetails } from '@fathym/eac';
import z from 'zod';

export type EaCGameWorldDetails = EaCVertexDetails;

export const EaCGameWorldDetailsSchema = z
  .object({
    Description: z
      .string()
      .max(750)
      .describe(
        'A short description providing an abstract summary of the game world, intended to help AI agents understand the context more easily. Should be 3-7 sentences.',
      ),
    Name: z
      .string()
      .max(100)
      .describe(
        'The title of the game world, providing a clear and concise label. Ideally, this title should be under 100 characters.',
      ),
  })
  .describe(
    'A foundational schema that captures the essential details of a game world, including its title and description. This structure is intended to help with AI-driven reasoning, categorization, and organization of game world information, enabling efficient parsing and contextual understanding.',
  );

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
