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
      cache: new InMemoryCache()
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
