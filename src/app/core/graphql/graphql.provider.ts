import {
  inject,
  makeStateKey,
  TransferState,
  EnvironmentProviders,
  makeEnvironmentProviders,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, NormalizedCacheObject } from '@apollo/client/core';

const APOLLO_STATE_KEY = makeStateKey<NormalizedCacheObject>('apollo.state');

export function provideCoreGraphQL(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      const transferState = inject(TransferState);
      const platformId = inject(PLATFORM_ID);

      const isServer = isPlatformServer(platformId);
      const cache = new InMemoryCache();

      if (isServer) {
        transferState.onSerialize(APOLLO_STATE_KEY, () => {
          return cache.extract();
        });
      } else {
        if (transferState.hasKey(APOLLO_STATE_KEY)) {
          const state = transferState.get(APOLLO_STATE_KEY, {});
          cache.restore(state);
        }
      }

      return {
        link: httpLink.create({
          uri: '/api/graphql',
        }),
        cache: cache,
        ssrMode: isServer,
      };
    }),
  ]);
}
