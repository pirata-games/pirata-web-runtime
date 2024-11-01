import { EaCRuntimeHandlerResult, PageProps } from '@fathym/eac-runtime';
import { CompanyWebState } from '../../src/state/CompanyWebState.ts';

export const IsIsland = true;

// deno-lint-ignore ban-types
type IndexPageData = {};

export const handler: EaCRuntimeHandlerResult<CompanyWebState, IndexPageData> = {
  GET: (_req, ctx) => {
    return ctx.Render({});
  },
};

export default function Index({}: PageProps<IndexPageData>) {
  return (
    <div
      className='relative w-screen h-screen bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: `url('/assets/hero-background.png')`,
      }}
    >
      <button className='absolute top-5 right-5 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200'>
        Sign In
      </button>

      <div className='flex items-start justify-center h-full'>
        <img
          src='/assets/PirataForsaken.png'
          data-eac-bypass-base
          alt='Pirata: Forsaken Logo'
          className='w-1/3 max-w-md mt-6'
        />
      </div>
    </div>
  );
}
