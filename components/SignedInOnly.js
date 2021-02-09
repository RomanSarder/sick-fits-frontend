import { useQuery } from '@apollo/client'
import { CURRENT_USER_QUERY } from './User'
import { withApolloComponent } from '../lib/withApollo'

const SignedInOnly = ({ children }) => {
    const { data } = useQuery(CURRENT_USER_QUERY)
    const currentUser = data?.me

    if (!currentUser) return null

    return children
}

export default withApolloComponent(SignedInOnly)
