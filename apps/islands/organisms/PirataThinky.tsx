import { marked } from 'npm:marked@15.0.1';
import { Thinky, type ThinkyProps } from '@fathym/atomic';

export const IsIsland = true;

export type PirataThinkyProps = ThinkyProps;

export default function PirataThinky(props: PirataThinkyProps) {
  return (
    <Thinky
      renderMessage={(msg) => {
        const markdown = msg.content?.toString() || '';
        return marked.parse(markdown) as string; // Parse Markdown into HTML
      }}
      {...props}
    />
  );
}
