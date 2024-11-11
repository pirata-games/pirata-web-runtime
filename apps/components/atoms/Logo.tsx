import { JSX } from 'preact';

export type LogoProps = JSX.HTMLAttributes<HTMLImageElement>;

export function Logo(props: LogoProps): JSX.Element {
  return (
    <img
      src="/assets/PirataForsaken.png"
      {...props}
      data-eac-bypass-base
    />
  );
}
