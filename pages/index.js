import withApollo from '../lib/withApollo'
import Items from '../components/Items'

const Home = props => (
  <div>
    <Items />
  </div>
)

export default withApollo(Home)