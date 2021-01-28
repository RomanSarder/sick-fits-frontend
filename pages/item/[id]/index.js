import { withApolloPage } from '../../../lib/withApollo'
import SingleItem from '../../../components/SingleItem'

const Item = () => {
    return (
        <div>
            <SingleItem/>
        </div>
    )
}

export default withApolloPage(Item)