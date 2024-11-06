import { EaCDetails } from '@fathym/eac';
import {
  EaCGameWorldDetails,
  EaCGameWorldDetailsSchema,
  isEaCGameWorldDetails,
} from './EaCGameWorldDetails.ts';
import {
  EaCGameWorldContentAsCode,
  EaCGameWorldContentAsCodeSchema,
} from './EaCGameWorldContentAsCode.ts';
import z from 'zod';

export type EaCGameWorldAsCode = {
  Content: Record<string, EaCGameWorldContentAsCode>;
} & EaCDetails<EaCGameWorldDetails>;

export const EaCGameWorldAsCodeSchema: z.ZodType<EaCGameWorldAsCode> = z.lazy(
  () =>
    z
      .object({
        Content: z
          .record(z.string(), EaCGameWorldContentAsCodeSchema)
          .describe(
            'A collection of content items within the game world, where each key is a unique identifier and each value is an `EaCGameWorldContentAsCode` object. This field enables the organization and retrieval of specific content elements associated with the game world.'
          ),
        Details: EaCGameWorldDetailsSchema,
      })
      .describe(
        'A schema representing the structure of a game world, including its main details and a collection of related content items. This structure supports organized content management and aids AI in interpreting, categorizing, and navigating the game world’s data.'
      )
);

export function isEaCGameWorldAsCode(eac: unknown): eac is EaCGameWorldAsCode {
  const x = eac as EaCGameWorldAsCode;

  return x && x.Content && isEaCGameWorldDetails(x.Details);
}
