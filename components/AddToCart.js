import { gql, useMutation } from "@apollo/client"
import { CURRENT_USER_QUERY } from "./User"

const ADD_TO_CART_MUTATION = gql`
    mutation ADD_TO_CART_MUTATION (
        $itemId: Int!
    ) {
        addToCart (itemId: $itemId) {
            quantity,
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
`

const AddToCart = ({ id }) => {
    const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
        variables: {
            itemId: id
        },
        refetchQueries: [
            { query: CURRENT_USER_QUERY }
        ]
    })

    return (
        <button type="button" disabled={loading} onClick={addToCart}>
            Add{loading && 'ing'} To Cart 🛒
        </button>
    )
}

export default AddToCart
