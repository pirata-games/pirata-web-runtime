// Import necessary Preact modules
import { EaCRuntimeHandlerResult, PageProps } from '@fathym/eac-runtime';
import Sidebar, { SidebarItem } from '../islands/game-world/molecules/Sidebar.tsx';
import { GamesWebState } from '../../src/state/GamesWebState.ts';
import PirataThinky from '../islands/organisms/PirataThinky.tsx';
import { ChatSet } from '@fathym/atomic';

type LayoutPageData = {
  SidebarItems: SidebarItem[];

  ActiveChat?: string;

  Chats: Record<string, ChatSet>;

  GameJWT: string;

  Root: string;

  Username: string;
};

export const handler: EaCRuntimeHandlerResult<
  GamesWebState,
  LayoutPageData
> = {
  GET: (_req, ctx) => {
    ctx.Data.SidebarItems = [
      {
        id: 'lore',
        title: 'Lore',
        children: [
          {
            id: 'world-history',
            title: 'World History',
            href: '/lore/world-history',
          },
          {
            id: 'factions',
            title: 'Factions',
            children: [
              { id: 'faction-1', title: 'Faction 1', href: '/lore/factions/1' },
              { id: 'faction-2', title: 'Faction 2', href: '/lore/factions/2' },
            ],
          },
          { id: 'legends', title: 'Legends', href: '/lore/legends' },
        ],
      },
      {
        id: 'gameplay',
        title: 'Gameplay Systems',
        children: [
          { id: 'mechanics', title: 'Mechanics', href: '/gameplay/mechanics' },
          {
            id: 'progression',
            title: 'Progression',
            children: [
              {
                id: 'leveling',
                title: 'Leveling',
                href: '/gameplay/progression/leveling',
              },
              {
                id: 'skills',
                title: 'Skills',
                href: '/gameplay/progression/skills',
              },
            ],
          },
        ],
      },
    ];

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

    ctx.Data.GameJWT = ctx.State.GamesJWT!;

    ctx.Data.Root = '/circuits/';

    ctx.Data.Username = ctx.State.Username!;

    return ctx.Next();
  },
};

// Layout Component
export default function Layout({
  Data,
  Component,
  Revision,
}: PageProps<LayoutPageData>) {
  return (
    <html>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Fathym EaC Runtime</title>
        <link
          rel='shortcut icon'
          type='image/png'
          href='/assets/PirataForsaken.png'
          data-eac-bypass-base
        />

        <link
          href='https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Pirata+One&display=swap'
          rel='stylesheet'
        />

        <link
          rel='stylesheet'
          href={`/tailwind/styles.css?Revision=${Revision}`}
          data-eac-bypass-base
        />
      </head>

      <body class='font-merriweather bg-slate-50 dark:bg-slate-900 text-black dark:text-white h-screen overflow-hidden'>
        <PirataThinky
          class='h-[100vh]'
          activeChat={Data.ActiveChat}
          chats={Data.Chats}
          root={Data.Root}
          jwt={Data.GameJWT}
          // username={Data.Username}
        >
          <div class='flex flex-row h-full'>
            {/* Sidebar with fixed width */}
            <Sidebar
              items={Data.SidebarItems}
              class='w-[90%] max-w-xs h-full'
            />

            {/* Main Content Area */}
            <main class='flex-grow w-full overflow-y-auto'>
              <Component />
            </main>
          </div>
        </PirataThinky>
      </body>
    </html>
  );
}
