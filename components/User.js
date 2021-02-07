import { useQuery, gql } from '@apollo/client'
import PropTypes from 'prop-types'
import { withApolloComponent } from '../lib/withApollo'

export const CURRENT_USER_QUERY = gql`
    query {
        me {
            id,
            email,
            name,
            permissions,
            cart {
                item {
                    id
                    title
                    price,
                    description,
                    image
                },
                quantity,
                userId,
                itemId
            }
        }
    }
`

const User = ({ children }) => {
    const { data, loading, error } = useQuery(CURRENT_USER_QUERY)
    return children(data)
}

User.propTypes = {
    children: PropTypes.func.isRequired
}

export default withApolloComponent(User)
