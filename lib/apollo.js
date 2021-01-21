import { useMemo } from 'react'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { endpoint } from '../config';

let apolloClient;

function createClient({ headers } = {}) {
  return new ApolloClient({
      link: new HttpLink({
        uri: endpoint
      }),
      ssrMode: typeof window === 'undefined',
      headers,
      credentials: 'include',
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              items: {
                read (existing, { args: { skip, take } }) {
                  // If we read the field before any data has been written to the
                  // cache, this function will return undefined, which correctly
                  // indicates that the field is missing.
                  const page = existing && existing.slice(
                    skip,
                    skip + take,
                  );
                  // If we ask for a page outside the bounds of the existing array,
                  // page.length will be 0, and we should return undefined instead of
                  // the empty array.
                  if (page && page.length > 0) {
                    return page;
                  }
                },
                
                merge (existing = [], incoming, { args: { skip = 0, take } }) {
                  const merged = existing ? existing.slice(0) : []
                  const end = skip + Math.min(take, incoming.length)
                  for (let i = skip; i < end; ++i) {
                    merged[i] = incoming[i - skip];
                  }
                  return merged;
                }
              }
            }
          }
        }
      })
  });
}

export function initializeApolloClient (initialState) {
  const _apolloClient = apolloClient ?? createClient()

  if (initialState) {
    const extractedCache = _apolloClient.cache.extract()
    _apolloClient.cache.restore({ ...extractedCache, ...initialState })
  }

  if (typeof window === 'undefined') return _apolloClient
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient

}

export function useApollo (initialState) {
  const store = useMemo(() => initializeApolloClient(initialState), [initialState])
  return store
}
