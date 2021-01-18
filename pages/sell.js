import withApollo from '../lib/withApollo'
import CreateItem from '../components/CreateItem'

const Sell = props => (
  <div>
    <CreateItem></CreateItem>
  </div>
)

export default withApollo(Sell)