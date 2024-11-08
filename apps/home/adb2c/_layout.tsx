import { EaCRuntimeHandlerResult, PageProps } from '@fathym/eac-runtime';
import { PirataGamesWebState } from '../../../src/state/PirataGamesWebState.ts';

export const handler: EaCRuntimeHandlerResult<PirataGamesWebState> = {
  async GET(_req, ctx) {
    const resp = await ctx.Next();

    resp.headers.append('Access-Control-Allow-Origin', '*');
    resp.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    resp.headers.append('Access-Control-Allow-Headers', 'Content-Type');

    return resp;
  },
};

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

      <body class='font-merriweather bg-slate-50 dark:bg-slate-900 text-black dark:text-white'>
        <div
          class='relative w-screen h-screen bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url('/assets/pirata-forsaken-background-crop.jpg')`,
          }}
        >
          <div class='flex items-center justify-center h-full'>
            {/* Container for Component with modern elevated styling */}
            <div class='bg-white dark:bg-slate-800 shadow-lg rounded-lg p-8 md:p-12 max-w-lg w-full transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl'>
              <Component />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
