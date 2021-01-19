import withApollo from '../../../lib/withApollo'
import SingleItem from '../../../components/SingleItem'

const Item = () => {
    return (
        <div>
            <SingleItem/>
        </div>
    )
}

export default withApollo(Item)