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
                id
                item {
                    id
                    title
                    price,
                    description,
                    image
                },
                quantity
            }
        }
    }
`

const User = ({ children }) => {
    const { data, loading, error } = useQuery(CURRENT_USER_QUERY)
    console.log(data, 'FROM USER')
    return children(data)
}

User.propTypes = {
    children: PropTypes.func.isRequired
}

export default withApolloComponent(User)
