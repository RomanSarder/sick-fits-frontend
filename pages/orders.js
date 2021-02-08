import { gql, useQuery } from '@apollo/client'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { withApolloPage } from '../lib/withApollo'
import ErrorMessage from '../components/ErrorMessage'
import OrderItemStyles from '../components/styles/OrderItemStyles'
import formatMoney from '../lib/formatMoney'
import styled from 'styled-components'

const ALL_ORDERS_QUERY = gql`
    query ALL_ORDERS_QUERY {
        allOrders {
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

const OrderUl = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-gap: 4rem;
`

const countItemsInAnOrder = (order) => {
    return order.items.reduce((tally, item) => {
        return tally + item.quantity
    }, 0)
}

const OrdersPage = () => {
    const { data, loading, error } = useQuery(ALL_ORDERS_QUERY)

    if (data && data.allOrders === null) {
        return <p>No order found</p>
    }

    if (loading) {
        return <p>Loading</p>
    }

    if (error) {
        return <ErrorMessage error={error} />
    }

    const { allOrders } = data
    console.log(allOrders)

    return (
        <div>
            <Head>
                <title>Your orders ({allOrders.length})</title>
            </Head>
            <h2>You have {allOrders.length} orders!</h2>
            <OrderUl>
            {allOrders.map(order => (
                <OrderItemStyles key={order.id}>
                    <Link href={`/order/${order.id}`}>
                        <a>
                            <div className="order-meta">
                                <p>{countItemsInAnOrder(order)} Item{countItemsInAnOrder(order) > 1 ? 's' : ''}</p>
                                <p>{order.items.length} Product{order.items.length > 1 ? 's' : ''}</p>
                                <p>{formatMoney(order.total)}</p>
                            </div>
                            <div className="images">
                            {order.items.map(item => (
                                <img src={item.image} alt={item.title} key={item.id}/>
                            ))}
                            </div>
                        </a>
                    </Link>
                </OrderItemStyles>
            ))} 
            </OrderUl>
        </div>
    )
}

export default withApolloPage(OrdersPage)
