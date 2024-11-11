import {
  Action,
  ActionStyleTypes,
  classSet,
  Header,
  HeaderProps,
  ResponsiveSet,
} from '@fathym/atomic';
import ProfileMenu from '../molecules/ProfileMenu.tsx';
import { GameIcon } from '../../../build/iconset/icons/GameIcon.tsx';
import { Logo } from '../atoms/Logo.tsx';

export type PirataHeaderProps = HeaderProps & {
  username: string;
};

export function PirataHeader(props: PirataHeaderProps) {
  const active = (
    <span class="bg-slate-700 bg-opacity-80 text-white shadow-inner"></span>
  );

  return (
    <Header
      logo={
        <Action
          href="/"
          actionStyle={ActionStyleTypes.Link}
        >
          <Logo class="h-[50px]" />
        </Action>
      }
      nav={
        <>
          <div class="flex-1 md:flex-none"></div>

          <ResponsiveSet class="flex-1" toggleChildren="☰">
            <Action
              href="/"
              title="Dashboard"
              actionStyle={ActionStyleTypes.Link}
              class={classSet([
                'text-lg mx-1',
                // props.currentUrl.pathname === '/' ? active.props.class : '',
              ])}
            >
              Dashboard
            </Action>

            <Action
              href="/worlds"
              title="Worlds"
              actionStyle={ActionStyleTypes.Link}
              class={classSet([
                'text-lg mx-1',
                // props.currentUrl.pathname === '/' ? active.props.class : '',
              ])}
            >
              Worlds
            </Action>

            <div class="flex-1"></div>

            <Action
              href="/games"
              title="Games"
              actionStyle={ActionStyleTypes.Icon}
              class={classSet([
                'text-lg mx-1',
                // props.currentUrl.pathname === '/' ? active.props.class : '',
              ])}
            >
              <GameIcon class="w-6 h-6 inline-block" />
            </Action>

            <ProfileMenu username={props.username} />
          </ResponsiveSet>
        </>
      }
      {...props}
      class={classSet(['-:z-50 -:sticky -:top-0 -:drop-shadow-md'], props)}
    />
  );
}
