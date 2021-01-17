import { initializeApolloClient } from '../lib/apollo'
import Items, { ALL_ITEMS_QUERY } from '../components/Items'

const Home = props => (
  <div>
    <Items />
  </div>
)

export async function getServerSideProps () {
  const client = initializeApolloClient()
  
  await client.query({
    query: ALL_ITEMS_QUERY
  })

  const state = client.cache.extract()

  return {
    props: {
      initialApolloState: state
    }
  }
}

export default Home