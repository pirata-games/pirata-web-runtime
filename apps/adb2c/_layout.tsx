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

      <body>
        <div class='font-merriweather bg-slate-50 dark:bg-slate-900 text-black dark:text-white h-full overflow-hidden'>
          <div
            class='relative w-screen h-screen bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: `url('${Data.BaseURL}/assets/pirata-forsaken-background.png')`,
            }}
          >
            <div class='flex items-center justify-center h-full'>
              <div class='bg-white dark:bg-slate-800 shadow-lg rounded-lg px-4 pt-2 pb-2 md:px-8 md:pt-2 md:pb-4 max-w-lg w-full transform transition-transform duration-300 hover:scale-115 hover:shadow-2xl max-h-[95%] max-w-[95%]'>
                <div class='w-[80%] m-auto'>
                  <img
                    class='companyLogo w-full'
                    data-tenant-branding-logo='true'
                    src={`${Data.BaseURL}/assets/PirataForsaken.png`}
                    alt='Pirata Games'
                  />
                </div>

                <div class='
                    overflow-y-auto
                    [&>#api_.error]:text-red-500

                    [&>#api_.error.pageLevel]:text-lg 
                    
                    [&>#api_.error.itemLevel]:text-base 
                      
                    [&>#api_.helpLink]:text-blue-600 
                    [&>#api_.helpLink]:text-base 
                    dark:[&>#api_.helpLink]:text-blue-400 
                      
                    [&>#api_.heading]:font-semibold  
                    [&>#api_.heading]:font-pirata  
                    [&>#api_.heading]:text-xl  
                    [&>#api_.heading]:tracking-wide
                          
                    [&>#api_.intro]:font-semibold  
                    [&>#api_.intro]:font-pirata  
                    [&>#api_.intro]:text-lg  
                    [&>#api_.intro]:tracking-wide

                    [&>#api_form]:mt-2 
                      [&>#api_form_label]:font-bold  
                      [&>#api_form_label]:font-pirata  
                      [&>#api_form_label]:text-2xl  
                      [&>#api_form_label]:tracking-wider

                      [&>#api_form_input]:border 
                      [&>#api_form_input]:border-gray-300 
                      [&>#api_form_input]:focus:border-blue-500 
                      [&>#api_form_input]:focus:ring-blue-500 
                      [&>#api_form_input]:px-4 
                      [&>#api_form_input]:py-2 
                      [&>#api_form_input]:rounded-md 
                      [&>#api_form_input]:text-black
                      [&>#api_form_input]:w-full 
                      dark:[&>#api_form_input]:border-gray-600 
                      
                      [&>#api_form>.entry]:mt-2
                        [&>#api_form>.entry>.entry-item]:mt-4
                        
                      [&>#api_form_.Password]:mt-2
                        [&>#api_form_.Password>.attrEntry]:mt-4

                      [&>#api_form>.divider]:hidden 
                      
                    [&>#api_.buttons]:mt-4 
                    [&>#api_.buttons>button]:bg-blue-600 
                    [&>#api_.buttons>button]:font-pirata 
                    [&>#api_.buttons>button]:font-semibold 
                    [&>#api_.buttons>button]:hover:bg-blue-700 
                    [&>#api_.buttons>button]:py-2 
                    [&>#api_.buttons>button]:rounded-md 
                    [&>#api_.buttons>button]:text-white 
                    [&>#api_.buttons>button]:text-xl 
                    [&>#api_.buttons>button]:w-full 
                      [&>#api_.buttons>button:not(:first-child)]:mt-1  
                      [&>#api_.buttons>button:not(:first-child)]:bg-transparent 
                      [&>#api_.buttons>button:not(:first-child)]:border 
                      [&>#api_.buttons>button:not(:first-child)]:border-gray-500 
                      [&>#api_.buttons>button:not(:first-child)]:hover:bg-gray-100 
                      dark:[&>#api_.buttons>button:not(:first-child)]:border-gray-400 
                      dark:[&>#api_.buttons>button:not(:first-child)]:hover:bg-gray-700

                      [&>#api_.buttons>button:#emailVerificationControl_but_verify_code]:mt-1  
                      [&>#api_.buttons>button:#emailVerificationControl_but_verify_code]:bg-blue-600 
                      [&>#api_.buttons>button:#emailVerificationControl_but_verify_code]:hover:bg-blue-700 
                      [&>#api_.buttons>button:#emailVerificationControl_but_verify_code]:border-none

                    [&>#api_#forgotPassword]:ml-2  
                    [&>#api_#forgotPassword]:text-blue-600 
                    [&>#api_#forgotPassword]:text-base 
                    dark:[&>#api_#forgotPassword]:text-blue-400 
                    
                    [&>#api_.create]:mt-2 
                      [&>#api_.create_#createAccount]:ml-2  
                      [&>#api_.create_#createAccount]:text-blue-600 
                      [&>#api_.create_#createAccount]:text-base 
                      dark:[&>#api_.create_#createAccount]:text-blue-400 
                  '>
                  {/* [&>#api_.Password_#newPassword[disabled="true"]]:hidden  */}
                  <Component />
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
