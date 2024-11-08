import { OverlayDiffEditor } from '@fathym/code-editor';
import { EaCRuntimeHandlerResult, PageProps } from '@fathym/eac-runtime';
import { PirataGameWorldWebState } from '../../src/state/PirataGameWorldWebState.ts';

export const IsIsland = true;

// deno-lint-ignore ban-types
type GameWorldIndexPageData = {};

export const handler: EaCRuntimeHandlerResult<
  PirataGameWorldWebState,
  GameWorldIndexPageData
> = {
  GET: (_req, ctx) => {
    return ctx.Render({});
  },
};

export default function GameWorldIndex({}: PageProps<GameWorldIndexPageData>) {
  return (
    <div
      class='relative w-full min-h-full h-full bg-cover bg-center bg-no-repeat bg-slate-50 dark:bg-slate-900'
      style={{
        backgroundImage: `url('/assets/pirata-forsaken-background-crop.png')`,
        backgroundBlendMode: 'overlay', // Or 'multiply', 'soft-light'
      }}
    >
      <div class='flex items-center justify-center h-full p-8'>
        <OverlayDiffEditor
          originalContent='Original code content here...  Modified code content here...  Original code content here...  Modified code content here...  Original code content here...  Modified code content here...  Original code content here...  Modified code content here...  Original code content here...  Modified code content here...  Original code content here...'
          modifiedContent='Modified code content here...  Original code content here...  Modified code content here...  Original code content here...  Modified code content here...  Original code content here...  Modified code content here...  Original code content here...  Modified code content here...  Original code content here...  Modified code content here...  Original code content here...  Modified code content here...  '
          onContentChange={(newContent) => {
            console.log('Modified Content:', newContent);
            // Save or process the modified content here
          }}
        />
        {
          /*
        <div class="m-4 flex flex-col gap-4">
          <h1 class="text-3xl font-pirata">The Overview title</h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta,
            massa et tempor hendrerit, lacus mauris sollicitudin mauris, non
            aliquam augue lorem nec lorem. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos. Maecenas
            in posuere lorem, id auctor justo. Phasellus ex magna, finibus
            fermentum massa ac, tempus placerat elit. Cras a accumsan massa, id
            faucibus quam. Pellentesque a congue velit. Proin urna tellus,
            pretium et sapien id, tristique tempor lectus. Morbi semper pretium
            justo, ac hendrerit lectus venenatis molestie. Pellentesque
            consectetur sodales lacus, tristique scelerisque tellus malesuada
            in. Nunc nec erat justo. Nullam gravida et massa condimentum porta.
          </p>

          <p>
            Vestibulum quis efficitur magna. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque
            nec tempor sem, id pharetra justo. Curabitur faucibus luctus turpis,
            aliquet commodo neque pretium quis. Cras eget elit facilisis,
            volutpat dolor sit amet, molestie orci. Cras iaculis venenatis diam,
            non tincidunt ligula. Etiam sit amet tortor consequat enim
            sollicitudin venenatis sit amet laoreet turpis. Nam ipsum enim,
            vestibulum nec egestas eget, fermentum vel odio. Aliquam ornare,
            justo mattis luctus eleifend, est elit faucibus libero, in fermentum
            enim odio sit amet odio. Nullam ac neque vel nisl ullamcorper tempus
            et sed augue. Vestibulum eu mollis enim, eu tincidunt magna. Vivamus
            luctus, diam iaculis consequat lacinia, sem sapien facilisis felis,
            vitae laoreet turpis lorem ac justo. Praesent gravida rhoncus mi,
            vitae convallis nunc consectetur nec. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus
            massa dui, laoreet ac lacinia id, lacinia sodales odio. Sed mollis
            dapibus risus, non consequat justo maximus eu. Donec dictum ipsum in
            purus consequat semper. Aliquam egestas lorem quis vulputate porta.
          </p>

          <p>
            Nullam sagittis bibendum sem, eu consectetur risus eleifend non.
            Suspendisse fringilla sit amet lacus et egestas. Sed at rutrum erat.
            Nam vitae mi ac ligula varius porta nec vitae arcu. Nullam molestie,
            dui vitae efficitur porta, turpis lacus ultrices justo, a laoreet ex
            velit ac massa. Ut eu velit tincidunt, venenatis magna quis,
            tincidunt neque. Pellentesque iaculis nisl et iaculis volutpat.
          </p>

          <p>
            Quisque volutpat cursus egestas. Curabitur commodo justo ac augue
            sodales, quis luctus magna lobortis. Nulla arcu leo, molestie nec
            eleifend a, dictum eu sem. Aenean suscipit augue arcu, consectetur
            euismod erat malesuada a. In eu pretium neque. Nullam vel blandit
            orci, non vestibulum massa. Donec id mauris eu urna sollicitudin
            pretium. Suspendisse ultrices id sem ut commodo. Duis a libero
            maximus, hendrerit felis vitae, aliquam arcu. Donec cursus risus vel
            metus fringilla sollicitudin. Sed ultrices mi lorem, eu volutpat mi
            mollis in. Morbi a ligula ac metus molestie sodales. Aenean vitae
            rutrum lectus. Mauris arcu neque, maximus quis pretium et, suscipit
            a dolor. Cras leo ligula, ultrices eget massa non, semper aliquam
            arcu. Mauris ullamcorper magna ut elit fermentum dictum. Donec
            vulputate lacinia nibh eu pretium. Phasellus eget lorem sit amet
            enim vestibulum commodo sed nec ante. Aenean erat nisi, porttitor
            nec volutpat non, tristique sed lectus.
          </p>
        </div> */
        }
      </div>
    </div>
  );
}
