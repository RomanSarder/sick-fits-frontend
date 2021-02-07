import { CartStateProvider } from '../lib/cartState'
import Page from '../components/Page'

export default function MyApp ({ Component, pageProps }) {
  return (
      <CartStateProvider>
        <Page>
          <Component {...pageProps}>
          </Component>
        </Page>
      </CartStateProvider>
  )
}