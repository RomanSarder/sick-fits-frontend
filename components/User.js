import { useQuery, gql } from '@apollo/client'
import { withApolloComponent } from '../lib/withApollo'

export const CURRENT_USER_QUERY = gql`
    query {
        me {
            id,
            email,
            name,
            permissions
        }
    }
`

const User = () => {
    const { data, loading, error } = useQuery(CURRENT_USER_QUERY)
    if (data && data.me !== null) {
        return <p>{data.me.name}</p>
    } else {
        return null
    }
}

export default withApolloComponent(User)
