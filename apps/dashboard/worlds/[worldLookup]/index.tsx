import {
  CodeMirrorSideBySideMergeEditor,
  CodeMirrorUnifiedMergeEditor,
} from '@fathym/code-editor';
import { EaCRuntimeHandlerResult, PageProps } from '@fathym/eac-runtime';
import { GamesWebState } from '../../../../src/state/GamesWebState.ts';
import { markdown } from '@codemirror/lang-markdown';
import { Tabs } from '@fathym/atomic';

// export const IsIsland = true;

type WorldManagerIndexPageData = {
  ModifiedContent: string;

  OriginalContent: string;
};

export const handler: EaCRuntimeHandlerResult<
  GamesWebState,
  WorldManagerIndexPageData
> = {
  GET: (_req, ctx) => {
    return ctx.Render({
      OriginalContent:
        'Original code content here...  \nModified code content here...  \nOriginal code content here...  \nModified code content here...  \nOriginal code content here...  \nModified code content here...  \nOriginal code content here...  \nModified code content here...  \nOriginal code content here...  \nModified code content here...  \nOriginal code content here...',
      ModifiedContent:
        'Modified code content here...  \nOriginal code content here...  \nModified code content here...  \nOriginal code content here...  \nModified code content here...  \nOriginal code content here...  \nModified code content here...  \nOriginal code content here...  \nModified code content here...  \nOriginal code content here...  \nModified code content here...  \nOriginal code content here...  \nModified code content here...  \n',
    });
  },

  /**
   * DELETE handler - deletes a game by its lookup.
   */
  async DELETE(_req, ctx) {
    const worldLookup = ctx.Params.worldLookup!;

    if (worldLookup) {
      await ctx.State.GameClient!.Worlds.Delete(worldLookup);
    }
    return Response.json(true);
  },
};

export default function WorldManagerIndex({
  Data,
}: PageProps<WorldManagerIndexPageData>) {
  return (
    <div
      class="relative w-full min-h-full h-full bg-cover bg-center bg-no-repeat bg-slate-50 dark:bg-slate-900 p-8"
      style={{
        backgroundImage: `url('/assets/pirata-forsaken-background.png')`,
        backgroundBlendMode: 'soft-light', // Or 'overlay', 'multiply', 'soft-light'
      }}
    >
      <div class="flex items-center justify-center min-h-full h-full">
        {/* <OverlayDiffEditor
          extensions={[markdown()]}
          originalContent={Data.OriginalContent}
          modifiedContent={Data.ModifiedContent}
          onContentChange={(newContent) => {
            console.log('Modified Content:', newContent);
            // Save or process the modified content here
          }}
        /> */}

        {/* <Tabs
          class="h-full w-full bg-slate-50 dark:bg-slate-900"
          tabsDisplay="stretch"
          tabs={[
            {
              label: 'Unified',
              content: (
                <CodeMirrorUnifiedMergeEditor
                  extensions={[markdown()]}
                  originalContent={Data.OriginalContent}
                  modifiedContent={Data.ModifiedContent}
                  onContentChange={(newContent) => {
                    // setModifiedContent(newContent);
                  }}
                />
              ),
            },
            {
              label: 'Side-by-Side',
              content: (
                <CodeMirrorSideBySideMergeEditor
                  extensions={[markdown()]}
                  originalContent={Data.OriginalContent}
                  modifiedContent={Data.ModifiedContent}
                  onContentChange={(newContent) => {
                    // setModifiedContent(newContent);
                  }}
                />
              ),
            },
          ]}
        /> */}

        {/* <CodeMirrorSideBySideMergeEditor
          extensions={[markdown()]}
          originalContent={Data.OriginalContent}
          modifiedContent={Data.ModifiedContent}
          onContentChange={(newContent) => {
            // setModifiedContent(newContent);
          }}
        /> */}
      </div>
    </div>
  );
}
