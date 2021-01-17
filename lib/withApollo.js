import { ApolloProvider } from '@apollo/client'
import { initializeApolloClient } from './apollo'
import Head from 'next/head'
import { getDataFromTree } from "@apollo/client/react/ssr";

export default function WithApollo (PageComponent) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    let client;
    if (apolloClient) {
        /* If apolloClient is in our props, it was passed from getDataFromTree */
        /* Check getInitialProps method */
        client = apolloClient
    } else {
        /* If there is no client, this code is being run on client-side */
        client = initializeApolloClient(apolloState)
    }

    return (
        <ApolloProvider client={client}>
            <PageComponent {...pageProps} />
        </ApolloProvider>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';
    WithApollo.displayName = `withApollo(${displayName})`;
  }

  WithApollo.getInitialProps = async (ctx) => {
    const { AppTree } = ctx
    const apolloClient = initializeApolloClient()
    ctx.apolloClient = apolloClient

    let pageProps = {}
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx)
    }

    // Run all GraphQL queries in the component tree
    // and extract the resulting data
    if (typeof window === 'undefined') {
      try {
        // Run all GraphQL queries
        await getDataFromTree(<AppTree pageProps={{...pageProps, apolloClient}} />)
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
        console.error('Error while running `getDataFromTree`', error)
      }

      // getDataFromTree does not call componentWillUnmount
      // head side effect therefore need to be cleared manually
      Head.rewind()
    }

    // Extract query data from the Apollo store
    const apolloState = apolloClient.cache.extract()

    return {
      ...pageProps,
      apolloState
    }
  }

  return WithApollo
}