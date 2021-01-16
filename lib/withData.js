import withApollo from 'next-with-apollo';
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { endpoint } from '../config';

function createClient({ headers }) {
  return new ApolloClient({
      uri: endpoint,
      ssr: typeof window === 'undefined',
      headers,
      credentials: 'include',
      cache: new InMemoryCache()
  });
}

export default withApollo(createClient);
