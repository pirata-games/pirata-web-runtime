import { EaCEnterpriseDetails } from '@fathym/eac';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/runtime/preact';
import Sidebar, { SidebarItem } from '../../../islands/game-world/molecules/Sidebar.tsx';
import { GamesWebState } from '../../../../src/state/GamesWebState.ts';
import { EaCGameWorldDetails } from '../../../../src/eac/EaCGameWorldDetails.ts';

type LayoutPageData = {
  Game: EaCEnterpriseDetails;

  GameWorld: EaCGameWorldDetails;

  SidebarItems: SidebarItem[];
};

export const handler: EaCRuntimeHandlerSet<GamesWebState, LayoutPageData> = {
  GET: (_req, ctx) => {
    const worldLookup = ctx.Params.worldLookup!;

    ctx.Data.Game = ctx.State.Game!.Details!;

    ctx.Data.GameWorld = ctx.State.Game!.Worlds[worldLookup].Details!;

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
    <div class='flex flex-row h-full'>
      <Sidebar
        title={`${Data.Game.Name}: ${Data.GameWorld.Name}`}
        items={Data.SidebarItems}
        class='w-[90%] max-w-xs h-full'
      />

      <main class='flex-grow w-full overflow-y-auto'>
        <Component />
      </main>
    </div>
  );
}
