import { gql, useMutation } from "@apollo/client"
import styled from "styled-components"

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
      color: ${props => props.theme.red};
      cursor: pointer;
  }  
`

const REMOVE_FROM_CART_MUTATION = gql`
    mutation REMOVE_FROM_CART_MUTATION ($id: Int!) {
        deleteCartItem (id: $id) {
            id
        }
    }
`

const update = (cache, payload) => {
    cache.evict(cache.identify(payload.data.deleteCartItem))
}

const RemoveFromCart = ({ id }) => {
    const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
        variables: {
            id
        },
        update
    })

    return (
        <BigButton
            disabled={loading}
            onClick={removeFromCart}
            type="B" 
            title="Remove This Item From Cart">
            &times;
        </BigButton>
    )
}

export default RemoveFromCart
