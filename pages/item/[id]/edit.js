import {withApolloPage} from '../../../lib/withApollo'
import UpdateItem from '../../../components/UpdateItem'

const Edit = props => {
  return (
    <div>
      <UpdateItem/>
    </div>
  )
}

export default withApolloPage(Edit)