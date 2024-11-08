import {
  EaCRuntimeConfig,
  EaCRuntimeEaC,
  EaCRuntimePlugin,
  EaCRuntimePluginConfig,
  FathymAzureContainerCheckPlugin,
  FathymDFSFileHandlerPlugin,
  FathymEaCServicesPlugin,
} from '@fathym/eac-runtime';
import {
  EaCAPIProcessor,
  EaCBaseHREFModifierDetails,
  EaCDFSProcessor,
  EaCKeepAliveModifierDetails,
  EaCOAuthModifierDetails,
  EaCOAuthProcessor,
  EaCPreactAppProcessor,
  EaCTailwindProcessor,
} from '@fathym/eac/applications';
import {
  EaCJSRDistributedFileSystemDetails,
  EaCLocalDistributedFileSystemDetails,
} from '@fathym/eac/dfs';
import { EaCDenoKVDatabaseDetails } from '@fathym/eac/databases';
import { EaCAtomicIconsProcessor } from '@fathym/atomic-icons';
import { FathymAtomicIconsPlugin } from '@fathym/atomic-icons/plugin';
import {
  EaCSynapticCircuitsProcessor,
  EverythingAsCodeSynaptic,
  FathymSynapticPlugin,
} from '@fathym/synaptic';
import { DefaultMyCoreProcessorHandlerResolver } from './DefaultMyCoreProcessorHandlerResolver.ts';
import { IoCContainer } from '@fathym/ioc';
import SynapticPlugin from './SynapticPlugin.ts';
import { EaCAzureADB2CProviderDetails } from '@fathym/eac/identity';

export default class RuntimePlugin implements EaCRuntimePlugin {
  constructor() {}

  public Setup(config: EaCRuntimeConfig) {
    const pluginConfig: EaCRuntimePluginConfig = {
      Name: RuntimePlugin.name,
      Plugins: [
        new FathymAzureContainerCheckPlugin(),
        new FathymEaCServicesPlugin(),
        new FathymDFSFileHandlerPlugin(),
        new FathymAtomicIconsPlugin(),
        new SynapticPlugin(),
        new FathymSynapticPlugin(),
      ],
      IoC: new IoCContainer(),
      EaC: {
        Projects: {
          core: {
            Details: {
              Name: 'Sink Micro Applications',
              Description: 'The Kitchen Sink Micro Applications to use.',
              Priority: 100,
            },
            ResolverConfigs: {
              localhost: {
                Hostname: 'localhost',
                Port: config.Server.port || 7100,
              },
              'localhost:7100': {
                Hostname: 'localhost1',
                Port: 7100,
              },
              '127.0.0.1': {
                Hostname: '127.0.0.1',
                Port: config.Server.port || 7100,
              },
              '127.0.0.1:7100': {
                Hostname: '127.0.0.1',
                Port: 7100,
              },
              'host.docker.internal': {
                Hostname: 'host.docker.internal',
                Port: config.Server.port || 7100,
              },
              'pirata-web-runtime.azurewebsites.net': {
                Hostname: 'pirata-web-runtime.azurewebsites.net',
              },
              'pirata-web-runtime-btd6bebdfue9hkbt.westus2-01.azurewebsites.net': {
                Hostname: 'pirata-web-runtime-btd6bebdfue9hkbt.westus2-01.azurewebsites.net',
              },
              'pirata.games': {
                Hostname: 'pirata.games',
              },
              'www.pirata.games': {
                Hostname: 'www.pirata.games',
              },
            },
            ModifierResolvers: {
              keepAlive: {
                Priority: 5000,
              },
              oauth: {
                Priority: 8000,
              },
            },
            ApplicationResolvers: {
              adb2c: {
                PathPattern: '/adb2c/page/layouts*',
                Priority: 500,
              },
              api: {
                PathPattern: '/api*',
                Priority: 500,
              },
              assets: {
                PathPattern: '/assets*',
                Priority: 500,
              },
              atomicIcons: {
                PathPattern: '/icons*',
                Priority: 500,
              },
              circuits: {
                PathPattern: '/circuits*',
                Priority: 500,
              },
              'game-world': {
                PathPattern: '/dashboard/game-world*',
                Priority: 500,
                IsPrivate: true,
                IsTriggerSignIn: true,
              },
              home: {
                PathPattern: '*',
                Priority: 100,
              },
              oauth: {
                PathPattern: '/oauth/*',
                Priority: 500,
              },
              tailwind: {
                PathPattern: '/tailwind*',
                Priority: 500,
              },
            },
          },
        },
        Applications: {
          adb2c: {
            Details: {
              Name: 'adb2c Page Layout Assets',
              Description: 'The static assets for use with adb2c page layouts.',
            },
            ModifierResolvers: {},
            Processor: {
              Type: 'DFS',
              DFSLookup: 'local:apps/adb2c',
              CacheControl: {
                'text\\/html': `private, max-age=${60 * 5}`,
                'image\\/': `public, max-age=${60 * 60 * 24 * 365}, immutable`,
                'application\\/javascript': `public, max-age=${60 * 60 * 24 * 365}, immutable`,
                'application\\/typescript': `public, max-age=${60 * 60 * 24 * 365}, immutable`,
                'text\\/css': `public, max-age=${60 * 60 * 24 * 365}, immutable`,
              },
            } as EaCDFSProcessor,
          },
          api: {
            Details: {
              Name: 'Local API',
              Description: 'Default local APIs.',
            },
            Processor: {
              Type: 'API',
              DFSLookup: 'local:apps/api',
            } as EaCAPIProcessor,
          },
          assets: {
            Details: {
              Name: 'Open Biotech Assets',
              Description: 'The static assets for use with Open Biotech.',
            },
            ModifierResolvers: {},
            Processor: {
              Type: 'DFS',
              DFSLookup: 'local:apps/assets',
              CacheControl: {
                'text\\/html': `private, max-age=${60 * 5}`,
                'image\\/': `public, max-age=${60 * 60 * 24 * 365}, immutable`,
                'application\\/javascript': `public, max-age=${60 * 60 * 24 * 365}, immutable`,
                'application\\/typescript': `public, max-age=${60 * 60 * 24 * 365}, immutable`,
                'text\\/css': `public, max-age=${60 * 60 * 24 * 365}, immutable`,
              },
            } as EaCDFSProcessor,
          },
          atomicIcons: {
            Details: {
              Name: 'Atomic Icons',
              Description: 'The atomic icons for the project.',
            },
            ModifierResolvers: {},
            Processor: {
              Type: 'AtomicIcons',
              Config: {
                IconSet: {
                  IconMap: {
                    add: 'https://api.iconify.design/gg:add.svg',
                    begin: 'https://api.iconify.design/fe:beginner.svg',
                    check: 'https://api.iconify.design/lets-icons:check-fill.svg',
                    copy: 'https://api.iconify.design/solar:copy-outline.svg',
                    delete: 'https://api.iconify.design/material-symbols-light:delete.svg',
                    edit: 'https://api.iconify.design/mdi:edit.svg',
                    loading: 'https://api.iconify.design/mdi:loading.svg',
                  },
                },
                Generate: true,
                SpriteSheet: '/iconset',
              },
            } as EaCAtomicIconsProcessor,
          },
          circuits: {
            Details: {
              Name: 'Circuits',
              Description: 'The API for accessing circuits',
            },
            ModifierResolvers: {},
            Processor: {
              Type: 'SynapticCircuits',
              IsCodeDriven: true,
            } as EaCSynapticCircuitsProcessor,
          },
          'game-world': {
            Details: {
              Name: 'Game World Site',
              Description: 'Game World site.',
            },
            ModifierResolvers: {
              baseHref: {
                Priority: 10000,
              },
            },
            Processor: {
              Type: 'PreactApp',
              AppDFSLookup: 'local:apps/game-world',
              ComponentDFSLookups: [
                ['local:apps/components', ['tsx']],
                ['local:apps/game-world', ['tsx']],
                ['local:apps/islands', ['tsx']],
                ['jsr:@fathym/atomic', ['tsx']],
                ['jsr:@fathym/atomic-design-kit', ['tsx']],
              ],
            } as EaCPreactAppProcessor,
          },
          home: {
            Details: {
              Name: 'Home Site',
              Description: 'Home site.',
            },
            ModifierResolvers: {
              baseHref: {
                Priority: 10000,
              },
            },
            Processor: {
              Type: 'PreactApp',
              AppDFSLookup: 'local:apps/home',
              ComponentDFSLookups: [
                ['local:apps/components', ['tsx']],
                ['local:apps/home', ['tsx']],
                ['local:apps/islands', ['tsx']],
                ['jsr:@fathym/atomic', ['tsx']],
                ['jsr:@fathym/atomic-design-kit', ['tsx']],
                ['jsr:@fathym/code-editor', ['tsx']],
              ],
            } as EaCPreactAppProcessor,
          },
          oauth: {
            Details: {
              Name: 'OAuth Site',
              Description: 'The site for use in OAuth workflows for a user',
            },
            Processor: {
              Type: 'OAuth',
              ProviderLookup: 'adb2c',
            } as EaCOAuthProcessor,
          },
          tailwind: {
            Details: {
              Name: 'Tailwind for the Site',
              Description: 'A tailwind config for the site',
            },
            Processor: {
              Type: 'Tailwind',
              DFSLookups: [
                'local:apps/components',
                'local:apps/game-world',
                'local:apps/home',
                'local:apps/islands',
                'jsr:@fathym/atomic',
                'jsr:@fathym/atomic-design-kit',
                'jsr:@fathym/code-editor',
              ],
              ConfigPath: './tailwind.config.ts',
              StylesTemplatePath: './apps/tailwind/styles.css',
              CacheControl: {
                'text\\/css': `public, max-age=${60 * 60 * 24 * 365}, immutable`,
              },
            } as EaCTailwindProcessor,
          },
        },
        AIs: {},
        Circuits: {
          $circuitsDFSLookups: ['local:circuits'],
        },
        Databases: {
          cache: {
            Details: {
              Type: 'DenoKV',
              Name: 'Local Cache',
              Description: 'The Deno KV database to use for local caching',
              DenoKVPath: Deno.env.get('LOCAL_CACHE_DENO_KV_PATH') || undefined,
            } as EaCDenoKVDatabaseDetails,
          },
          pirata: {
            Details: {
              Type: 'DenoKV',
              Name: 'EaC DB',
              Description: 'The Deno KV database to use for local caching',
              DenoKVPath: Deno.env.get('EAC_DENO_KV_PATH') || undefined,
            } as EaCDenoKVDatabaseDetails,
          },
          oauth: {
            Details: {
              Type: 'DenoKV',
              Name: 'OAuth DB',
              Description: 'The Deno KV database to use for local caching',
              DenoKVPath: Deno.env.get('OAUTH_DENO_KV_PATH') || undefined,
            } as EaCDenoKVDatabaseDetails,
          },
          thinky: {
            Details: {
              Type: 'DenoKV',
              Name: 'Thinky',
              Description: 'The Deno KV database to use for thinky',
              DenoKVPath: Deno.env.get('THINKY_DENO_KV_PATH') || undefined,
            } as EaCDenoKVDatabaseDetails,
          },
        },
        DFSs: {
          'local:apps/adb2c': {
            Details: {
              Type: 'Local',
              FileRoot: './apps/adb2c/',
              WorkerPath: import.meta.resolve(
                '@fathym/eac-runtime/workers/local',
              ),
            } as EaCLocalDistributedFileSystemDetails,
          },
          'local:apps/api': {
            Details: {
              Type: 'Local',
              FileRoot: './apps/api/',
              DefaultFile: 'index.ts',
              Extensions: ['ts'],
              WorkerPath: import.meta.resolve(
                '@fathym/eac-runtime/workers/local',
              ),
            } as EaCLocalDistributedFileSystemDetails,
          },
          'local:apps/assets': {
            Details: {
              Type: 'Local',
              FileRoot: './apps/assets/',
              WorkerPath: import.meta.resolve(
                '@fathym/eac-runtime/workers/local',
              ),
            } as EaCLocalDistributedFileSystemDetails,
          },
          'local:apps/components': {
            Details: {
              Type: 'Local',
              FileRoot: './apps/components/',
              Extensions: ['tsx'],
              WorkerPath: import.meta.resolve(
                '@fathym/eac-runtime/workers/local',
              ),
            } as EaCLocalDistributedFileSystemDetails,
          },
          'local:apps/game-world': {
            Details: {
              Type: 'Local',
              FileRoot: './apps/game-world/',
              DefaultFile: 'index.tsx',
              Extensions: ['tsx'],
              WorkerPath: import.meta.resolve(
                '@fathym/eac-runtime/workers/local',
              ),
            } as EaCLocalDistributedFileSystemDetails,
          },
          'local:apps/home': {
            Details: {
              Type: 'Local',
              FileRoot: './apps/home/',
              DefaultFile: 'index.tsx',
              Extensions: ['tsx'],
              WorkerPath: import.meta.resolve(
                '@fathym/eac-runtime/workers/local',
              ),
            } as EaCLocalDistributedFileSystemDetails,
          },
          'local:apps/islands': {
            Details: {
              Type: 'Local',
              FileRoot: './apps/islands/',
              Extensions: ['tsx'],
              WorkerPath: import.meta.resolve(
                '@fathym/eac-runtime/workers/local',
              ),
            } as EaCLocalDistributedFileSystemDetails,
          },
          'local:circuits': {
            Details: {
              Type: 'Local',
              FileRoot: './circuits/',
              Extensions: ['.ts'],
              WorkerPath: import.meta.resolve(
                '@fathym/eac-runtime/workers/local',
              ),
            } as EaCLocalDistributedFileSystemDetails,
          },
          'jsr:@fathym/atomic': {
            Details: {
              Type: 'JSR',
              Package: '@fathym/atomic',
              Version: '',
              WorkerPath: import.meta.resolve(
                '@fathym/eac-runtime/workers/jsr',
              ),
            } as EaCJSRDistributedFileSystemDetails,
          },
          'jsr:@fathym/atomic-design-kit': {
            Details: {
              Type: 'JSR',
              Package: '@fathym/atomic-design-kit',
              Version: '',
              WorkerPath: import.meta.resolve(
                '@fathym/eac-runtime/workers/jsr',
              ),
            } as EaCJSRDistributedFileSystemDetails,
          },
          'jsr:@fathym/code-editor': {
            // Details: {
            //   Type: 'Local',
            //   FileRoot: '../../../../../../Fathym/source/github/fathym-deno/code-editor/',
            //   Extensions: ['.tsx'],
            //   WorkerPath: import.meta.resolve(
            //     '@fathym/eac-runtime/workers/local',
            //   ),
            // } as EaCLocalDistributedFileSystemDetails,
            Details: {
              Type: 'JSR',
              Package: '@fathym/code-editor',
              Version: '',
              WorkerPath: import.meta.resolve(
                '@fathym/eac-runtime/workers/jsr',
              ),
            } as EaCJSRDistributedFileSystemDetails,
          },
        },
        Modifiers: {
          baseHref: {
            Details: {
              Type: 'BaseHREF',
              Name: 'Base HREF',
              Description: 'Adjusts the base HREF of a response based on configureation.',
            } as EaCBaseHREFModifierDetails,
          },
          keepAlive: {
            Details: {
              Type: 'KeepAlive',
              Name: 'Deno KV Cache',
              Description: 'Lightweight cache to use that stores data in a DenoKV database.',
              KeepAlivePath: '/_eac/alive',
            } as EaCKeepAliveModifierDetails,
          },
          oauth: {
            Details: {
              Type: 'OAuth',
              Name: 'OAuth',
              Description: 'Used to restrict user access to various applications.',
              ProviderLookup: 'adb2c',
              SignInPath: '/oauth/signin',
            } as EaCOAuthModifierDetails,
          },
        },
        Providers: {
          adb2c: {
            DatabaseLookup: 'oauth',
            Details: {
              Name: 'Azure ADB2C OAuth Provider',
              Description: 'The provider used to connect with our azure adb2c instance',
              ClientID: Deno.env.get('AZURE_ADB2C_CLIENT_ID')!,
              ClientSecret: Deno.env.get('AZURE_ADB2C_CLIENT_SECRET')!,
              Scopes: ['openid', Deno.env.get('AZURE_ADB2C_CLIENT_ID')!],
              Domain: Deno.env.get('AZURE_ADB2C_DOMAIN')!,
              PolicyName: Deno.env.get('AZURE_ADB2C_POLICY')!,
              TenantID: Deno.env.get('AZURE_ADB2C_TENANT_ID')!,
              IsPrimary: true,
            } as EaCAzureADB2CProviderDetails,
          },
        },
      } as EaCRuntimeEaC | EverythingAsCodeSynaptic,
    };

    pluginConfig.IoC!.Register(DefaultMyCoreProcessorHandlerResolver, {
      Type: pluginConfig.IoC!.Symbol('ProcessorHandlerResolver'),
    });

    return Promise.resolve(pluginConfig);
  }
}
