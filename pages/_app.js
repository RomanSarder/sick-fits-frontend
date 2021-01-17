import Page from '../components/Page'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo'

export default function MyApp ({ Component, pageProps }) {
  // const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    // <ApolloProvider client={apolloClient}>
      <Page>
        <Component {...pageProps} />
      </Page>
    // </ApolloProvider>
  )
}