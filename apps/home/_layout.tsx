import { PageProps } from '@fathym/eac-runtime';

export default function Layout({
  Data: _Data,
  Component,
  Revision,
}: PageProps) {
  return (
    <html>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />

        <title>Pirata Games - Pirata: Forsaken</title>

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

      <body>
        <div class='font-merriweather bg-slate-50 dark:bg-slate-900 text-black dark:text-white'>
          <Component />
        </div>
      </body>
    </html>
  );
}
