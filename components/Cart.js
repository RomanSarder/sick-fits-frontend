import { useQuery } from '@apollo/client'
import { withApolloComponent } from '../lib/withApollo'
import { CURRENT_USER_QUERY } from './User'
import CartItem from './CartItem'
import CartStyles from './styles/CartStyles'
import Supreme from './styles/Supreme'
import formatMoney from '../lib/formatMoney'
import calcTotalPrice from '../lib/calcTotalPrice'

const Cart = () => {
    const { loading, data, error } = useQuery(CURRENT_USER_QUERY)
    console.log(data, 'FROM CART')
    const currentUser = data?.me
    if (!currentUser) {
        return null
    }

    return (
        <CartStyles open={false}>
            <header>
                <Supreme>{currentUser.name}'s Cart</Supreme>
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
