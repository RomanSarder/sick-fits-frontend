import { useQuery } from '@apollo/client'
import { withApolloComponent } from '../lib/withApollo'
import { CURRENT_USER_QUERY } from './User'
import CartItem from './CartItem'
import CartStyles from './styles/CartStyles'
import CloseButton from './styles/CloseButton'
import Supreme from './styles/Supreme'
import formatMoney from '../lib/formatMoney'
import calcTotalPrice from '../lib/calcTotalPrice'
import { useCart } from '../lib/cartState'

const Cart = () => {
    const { loading, data, error } = useQuery(CURRENT_USER_QUERY)
    const { cartOpen, closeCart } = useCart()
    const currentUser = data?.me
    if (!currentUser) {
        return null
    }

    return (
        <CartStyles open={cartOpen}>
            <header>
                <Supreme>{currentUser.name}'s Cart</Supreme>
                <CloseButton onClick={closeCart}>&times;</CloseButton>
            </header>
            <ul>
                {currentUser.cart.map(cartItem => (
                    <CartItem key={cartItem.id} cartItem={cartItem}/>
                ))}
            </ul>
            <footer>
                <p>Total: {formatMoney(calcTotalPrice(currentUser.cart))}</p>
            </footer>
        </CartStyles>
    )
}

export default withApolloComponent(Cart)
