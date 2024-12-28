import { classSet } from '@fathym/atomic';
import { JSX } from 'preact';
import { useState } from 'preact/hooks';

export const IsIsland = true;

export type SidebarItem = {
  id: string;
  title: string;
  href?: string;
  children?: SidebarItem[];
};

type SidebarProps = {
  items: SidebarItem[];

  title: string;
} & Omit<JSX.HTMLAttributes<HTMLElement>, 'title'>;

export default function Sidebar({ items, title, ...props }: SidebarProps) {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (sectionId: string) => {
    setExpanded((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const renderSidebarItems = (items: SidebarItem[], indentLevel = 0) => {
    return items.map((item) => (
      <div
        key={item.id}
        class={`space-y-2 ${indentLevel > 0 ? `ml-${indentLevel * 2}` : ''}`}
      >
        <div class='flex items-center'>
          <a
            href={item.href}
            class='flex-1 p-2 rounded hover:bg-slate-700 hover:text-white transition'
          >
            {item.title}
          </a>

          {item.children && (
            <button
              onClick={() => toggleExpand(item.id)}
              class='ml-2 p-2 rounded hover:bg-slate-700 transition'
            >
              {expanded[item.id] ? '-' : '+'}
            </button>
          )}
        </div>

        {expanded[item.id] && item.children && (
          <div class='space-y-2 mt-2'>
            {renderSidebarItems(item.children, indentLevel + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <nav
      {...props}
      class={classSet(
        ['w-64 h-full bg-[rgba(30,41,59,0.8)] text-white flex flex-col p-4'],
        props,
      )}
    >
      <h2 class='text-xl font-semibold mb-6'>{title}</h2>

      <div class='space-y-2'>{renderSidebarItems(items)}</div>
    </nav>
  );
}
