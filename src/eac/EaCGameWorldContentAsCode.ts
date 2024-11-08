import { EaCDetails } from '@fathym/eac';
import {
  EaCGameWorldContentDetails,
  EaCGameWorldContentDetailsSchema,
  isEaCGameWorldContentDetails,
} from './EaCGameWorldContentDetails.ts';
import z from 'zod';

export type EaCGameWorldContentAsCode = {
  Content: Record<string, EaCGameWorldContentAsCode>;
} & EaCDetails<EaCGameWorldContentDetails>;

export const EaCGameWorldContentAsCodeSchema: z.ZodType<EaCGameWorldContentAsCode> = z.lazy(() =>
  z
    .object({
      Content: z
        .record(z.string(), EaCGameWorldContentAsCodeSchema)
        .describe(
          'A collection of nested sub-content items, where each key represents a unique identifier and each value is an `EaCGameWorldContentAsCode` object, allowing for hierarchical organization of content.',
        ),
      Details: EaCGameWorldContentDetailsSchema,
    })
    .describe(
      'A recursive schema representing game world content, including its main details and a hierarchical collection of sub-content items. This structure enables AI and other systems to reason about, categorize, and navigate through complex content hierarchies within a game world.',
    )
);

export function isEaCGameWorldContentAsCode(
  eac: unknown,
): eac is EaCGameWorldContentAsCode {
  const x = eac as EaCGameWorldContentAsCode;

  return x && x.Content && isEaCGameWorldContentDetails(undefined, x.Details);
}
