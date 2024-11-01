import {
  DefaultProcessorHandlerResolver,
  EaCApplicationProcessorConfig,
  EaCRuntimeEaC,
  ProcessorHandlerResolver,
} from '@fathym/eac-runtime';
import { IoCContainer } from '@fathym/ioc';
import { DefaultAtomicIconsProcessorHandlerResolver } from '@fathym/atomic-icons/plugin';
import { DefaultSynapticProcessorHandlerResolver } from '@fathym/synaptic';

export class DefaultMyCoreProcessorHandlerResolver implements ProcessorHandlerResolver {
  public async Resolve(
    ioc: IoCContainer,
    appProcCfg: EaCApplicationProcessorConfig,
    eac: EaCRuntimeEaC,
  ) {
    const synapticResolver = new DefaultSynapticProcessorHandlerResolver();

    let resolver = await synapticResolver.Resolve(ioc, appProcCfg, eac);

    if (!resolver) {
      const atomicIconResolver = new DefaultAtomicIconsProcessorHandlerResolver();

      resolver = await atomicIconResolver.Resolve(ioc, appProcCfg, eac);
    }

    if (!resolver) {
      const defaultResolver = new DefaultProcessorHandlerResolver();

      resolver = await defaultResolver.Resolve(ioc, appProcCfg, eac);
    }

    return resolver;
  }
}
