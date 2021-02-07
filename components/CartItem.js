import styled from 'styled-components'
import formatMoney from '../lib/formatMoney'

const CartItemStyles = styled.li`
    padding: 1rem 0;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
    display: grid;
    grid-template-columns: auto 1fr auto;
    img {
        margin-right: 1rem;
    }
    h3, p {
        margin: 0;
    }
`

const CartItem = ({ cartItem }) => {
    const { item } = cartItem
    return (
        <CartItemStyles>
            <img width="100" src={item.image} alt={item.title}/>
            <div>
                <h3>{item.title}</h3>
                <p>
                    {formatMoney(item.price * cartItem.quantity)}
                    -
                    <em>
                        {cartItem.quantity} &times; {formatMoney(item.price)} each
                    </em>
                </p>
            </div>
        </CartItemStyles>
    )
}

export default CartItem
