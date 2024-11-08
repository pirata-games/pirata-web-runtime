import { EaCRuntimeHandlerResult, PageProps } from '@fathym/eac-runtime';
import { PirataGamesWebState } from '../../src/state/PirataGamesWebState.ts';

export const handler: EaCRuntimeHandlerResult<PirataGamesWebState> = {
  async GET(_req, ctx) {
    ctx.Data.BaseURL = new URL(ctx.Runtime.URLMatch.Base).origin;

    const resp = await ctx.Next();

    resp.headers.append('Access-Control-Allow-Origin', '*');
    resp.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    resp.headers.append('Access-Control-Allow-Headers', 'Content-Type');

    return resp;
  },
};

export default function ADB2CLayout({ Data, Component, Revision }: PageProps) {
  return (
    <html>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />

        <title>Pirata Games - Sign In and Sign Up</title>

        <link
          rel='shortcut icon'
          type='image/png'
          href={`${Data.BaseURL}/assets/PirataForsaken.png`}
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
          href={`${Data.BaseURL}/tailwind/styles.css?Revision=${Revision}`}
        />

        <link
          rel='stylesheet'
          href={`${Data.BaseURL}/assets/adb2c/page/layouts/styles.css?Revision=${Revision}`}
        />
      </head>

      <body class='font-merriweather bg-slate-50 dark:bg-slate-900 text-black dark:text-white'>
        <div
          class='relative w-screen h-screen bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url('${Data.BaseURL}/assets/pirata-forsaken-background-no-logo.png')`,
          }}
        >
          <div class='flex items-center justify-center h-full'>
            <div class='bg-white dark:bg-slate-800 shadow-lg rounded-lg p-8 md:p-12 max-w-lg w-full transform transition-transform duration-300 hover:scale-115 hover:shadow-2xl mt-10'>
              <div class='w-[60%] m-auto'>
                <img
                  class='companyLogo'
                  data-tenant-branding-logo='true'
                  src={`${Data.BaseURL}/assets/PirataForsaken.png`}
                  alt='Pirata Games'
                />
              </div>

              <div class='
                  [&_.error]:text-red-500

                  [&_.error.pageLevel]:text-xl 
                  
                  [&_.error.itemLevel]:text-lg 
                    
                  [&>#api>.heading>h1]:hidden 
                        
                  [&>#api>.localAccount]:mt-4 
                    [&>#api>.localAccount>.intro>h2]:hidden

                    [&>#api>.localAccount>.entry]:mt-4
                      [&>#api>.localAccount>.entry>.entry-item]:mt-6
                        [&>#api>.localAccount>.entry>.entry-item_label]:font-bold  
                        [&>#api>.localAccount>.entry>.entry-item_label]:font-pirata  
                        [&>#api>.localAccount>.entry>.entry-item_label]:text-4xl  
                        [&>#api>.localAccount>.entry>.entry-item_label]:tracking-wider

                        [&>#api>.localAccount>.entry>.entry-item_input]:w-full 
                        [&>#api>.localAccount>.entry>.entry-item_input]:border 
                        [&>#api>.localAccount>.entry>.entry-item_input]:border-gray-300 
                        [&>#api>.localAccount>.entry>.entry-item_input]:rounded-md 
                        [&>#api>.localAccount>.entry>.entry-item_input]:px-4 
                        [&>#api>.localAccount>.entry>.entry-item_input]:py-2 
                        [&>#api>.localAccount>.entry>.entry-item_input]:focus:border-blue-500 
                        [&>#api>.localAccount>.entry>.entry-item_input]:focus:ring-blue-500 
                        dark:[&>#api>.localAccount>.entry>.entry-item_input]:border-gray-600 
                        
                        [&>#api>.localAccount>.entry>.entry-item_#forgotPassword]:ml-2  
                        [&>#api>.localAccount>.entry>.entry-item_#forgotPassword]:text-blue-600 
                        [&>#api>.localAccount>.entry>.entry-item_#forgotPassword]:text-lg 
                        dark:[&>#api>.localAccount>.entry>.entry-item_#forgotPassword]:text-blue-400 
                      
                      [&>#api>.localAccount>.entry>.buttons]:mt-6 
                        [&>#api>.localAccount>.entry>.buttons>button]:bg-blue-600 
                        [&>#api>.localAccount>.entry>.buttons>button]:font-pirata 
                        [&>#api>.localAccount>.entry>.buttons>button]:font-semibold 
                        [&>#api>.localAccount>.entry>.buttons>button]:hover:bg-blue-700 
                        [&>#api>.localAccount>.entry>.buttons>button]:py-2 
                        [&>#api>.localAccount>.entry>.buttons>button]:rounded-md 
                        [&>#api>.localAccount>.entry>.buttons>button]:text-white 
                        [&>#api>.localAccount>.entry>.buttons>button]:text-2xl 
                        [&>#api>.localAccount>.entry>.buttons>button]:w-full 
                        
                    [&>#api>.localAccount>.divider]:hidden 
                    
                    [&>#api>.localAccount>.create]:mt-4 
                      [&>#api>.localAccount>.create_#createAccount]:ml-2  
                      [&>#api>.localAccount>.create_#createAccount]:text-blue-600 
                      [&>#api>.localAccount>.create_#createAccount]:text-lg 
                      dark:[&>#api>.localAccount>.create_#createAccount]:text-blue-400 
                '>
                <Component />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

/**

[&>#api>>.localAccount>.entry.divider>h2]:text-gray-500
[&>#api>>.localAccount>.entry.divider>h2]:text-sm
[&>#api>>.localAccount>.entry.divider>h2]:font-medium

[&>#api>>.localAccount>.entry.create>p]:text-gray-700
dark:[&>#api>>.localAccount>.entry.create>p]:text-gray-300

[&>#api>>.localAccount>.entry.create>a#createAccount]:text-blue-600
dark:[&>#api>>.localAccount>.entry.create>a#createAccount]:text-blue-400
 */
