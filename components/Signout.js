import { useMutation, gql } from '@apollo/client'
import { CURRENT_USER_QUERY } from './User'

const SIGNOUT_MUTATION = gql`
    mutation SIGNOUT_MUTATION {
        signout {
            message
        }
    }
`

const Signout = () => {
    const [signout, { error, loading }] = useMutation(SIGNOUT_MUTATION, {
        refetchQueries: [
            {query: CURRENT_USER_QUERY}
        ]
    })

    return (
        <button onClick={signout}>Sign Out</button>
    )
}

export default Signout
