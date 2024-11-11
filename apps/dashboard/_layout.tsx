import { EaCRuntimeHandlerResult, PageProps } from '@fathym/eac-runtime';
import { GamesWebState } from '../../src/state/GamesWebState.ts';
import PirataThinky from '../islands/organisms/PirataThinky.tsx';
import { ChatSet } from '@fathym/atomic';
import { PirataHeader } from '../components/organisms/PirataHeader.tsx';

type LayoutPageData = {
  ActiveChat?: string;

  Chats: Record<string, ChatSet>;

  GameJWT: string;

  Root: string;

  Username: string;
};

export const handler: EaCRuntimeHandlerResult<GamesWebState, LayoutPageData> = {
  GET: (_req, ctx) => {
    ctx.Data.ActiveChat = `${ctx.State.Username}-iot-event-logs`;

    ctx.Data.Chats = {
      [`${ctx.State.Username}-iot-event-logs`]: {
        Name: 'Event Logs',
        CircuitLookup: 'event-logs:query-circuit',
      },
      [`${ctx.State.Username}-explore`]: {
        Name: 'Explore Proconex',
        CircuitLookup: 'company-chat:rag',
      },
    };

    ctx.Data.GameJWT = ctx.State.GameJWT!;

    ctx.Data.Root = '/circuits/';

    ctx.Data.Username = ctx.State.Username!;

    return ctx.Next();
  },
};

export default function DashboardLayout({
  Data,
  Component,
  Revision,
}: PageProps<LayoutPageData>) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pirata Games - Pirata: Forsaken</title>
        <link
          rel="shortcut icon"
          type="image/png"
          href="/assets/PirataForsaken.png"
          data-eac-bypass-base
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Pirata+One&display=swap"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href={`/tailwind/styles.css?Revision=${Revision}`}
          data-eac-bypass-base
        />
      </head>

      <body class="font-merriweather bg-slate-50 dark:bg-slate-900 text-black dark:text-white h-screen overflow-hidden">
        <div class="flex flex-col h-full">
          <PirataHeader username={Data.Username} />

          <PirataThinky
            class="flex-grow"
            activeChat={Data.ActiveChat}
            chats={Data.Chats}
            root={Data.Root}
            jwt={Data.GameJWT}
            // username={Data.Username}
          >
            <Component />
          </PirataThinky>
        </div>
      </body>
    </html>
  );
}
