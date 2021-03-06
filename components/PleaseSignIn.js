import { useQuery } from '@apollo/client'
import { CURRENT_USER_QUERY } from './User'
import Signin from './Signin'
import { withApolloComponent } from '../lib/withApollo'

const PleaseSignIn = ({ children }) => {
    const { data } = useQuery(CURRENT_USER_QUERY)
    const currentUser = data?.me

    if (!currentUser) return <Signin/>

    return children
}

export default withApolloComponent(PleaseSignIn)
