import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React from 'react'
import { withApolloPage } from '../../lib/withApollo'
import ErrorMessage from '../../components/ErrorMessage'
import OrderStyles from '../../components/styles/OrderStyles'
import formatMoney from '../../lib/formatMoney'

const SINGLE_ORDER_QUERY = gql`
    query SINGLE_ORDER_QUERY ($id: Int!) {
        order (where: { id: $id }) {
            id,
            charge,
            total,
            label,
            user {
                id
            },
            items {
                id,
                title,
                description,
                price,
                image,
                quantity
            }
        }
    }
`

const SingleOrderPage = () => {
    const router = useRouter()
    const { id } = router.query
    const { data, loading, error } = useQuery(SINGLE_ORDER_QUERY, {
        variables: {
            id: Number(id)
        }
    })

    if (data && data.order === null) {
        return <p>No order found</p>
    }

    if (loading) {
        return <p>Loading</p>
    }

    if (error) {
        return <ErrorMessage error={error} />
    }

    const { order } = data

    return (
        <OrderStyles>
            <Head>
                <title>Sick Fits - {order.id}</title>
            </Head>
            <p>
                <span>Order Id:</span>
                <span>{order.id}</span>
            </p>
            <p>
                <span>Charge:</span>
                <span>{order.charge}</span>
            </p>
            <p>
                <span>Order Total:</span>
                <span>{formatMoney(order.total)}</span>
            </p>
            <p>
                <span>Item Count:</span>
                <span>{order.items.length}</span>
            </p>
            <div className="items">
                {order.items.map(item => (
                    <div className="order-item" key={item.id}>
                        <img src={item.image} alt={item.title}/>
                        <div className="item-details">
                            <h2>{item.title}</h2>
                            <p>Qty: {item.quantity}</p>
                            <p>Each: {formatMoney(item.price)}</p>
                            <p>Sub Total: {formatMoney(item.price * item.quantity)}</p>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </OrderStyles>
    )
}

export default withApolloPage(SingleOrderPage)
