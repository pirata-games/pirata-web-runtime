import { EaCRuntimeHandlerResult, PageProps } from '@fathym/eac-runtime';
import Sidebar, {
  SidebarItem,
} from '../../../islands/game-world/molecules/Sidebar.tsx';
import { GamesWebState } from '../../../../src/state/GamesWebState.ts';

type LayoutPageData = {
  SidebarItems: SidebarItem[];
};

export const handler: EaCRuntimeHandlerResult<GamesWebState, LayoutPageData> = {
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

    return ctx.Next();
  },
};

export default function DashboardWorldsLayout({
  Data,
  Component,
}: PageProps<LayoutPageData>) {
  return (
    <div class="flex flex-row h-full">
      <Sidebar items={Data.SidebarItems} class="w-[90%] max-w-xs h-full" />

      <main class="flex-grow w-full overflow-y-auto">
        <Component />
      </main>
    </div>
  );
}
