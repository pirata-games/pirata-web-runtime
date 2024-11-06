import { render as gfmRender } from 'https://deno.land/x/gfm@0.6.0/mod.ts';
import { Thinky, type ThinkyProps } from '@fathym/atomic';

export const IsIsland = true;

export type PirataThinkyProps = ThinkyProps;

export default function PirataThinky(props: PirataThinkyProps) {
  return (
    <Thinky
      renderMessage={(msg) => gfmRender(msg.content?.toString() || '')}
      {...props}
    />
  );
}
