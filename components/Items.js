import React from 'react'
import { gql, useQuery } from '@apollo/client'
import styled from 'styled-components'
import Item from './Item'

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY {
        items {
            createdAt
            description
            id
            image
            largeImage
            price
            title
            updatedAt
        }
    }
`

const Center = styled.div`
    text-align: center;
`

const ItemsList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
`

const Items = () => {
    const { loading, error, data } = useQuery(ALL_ITEMS_QUERY)
    console.log(data)
    const displayContent = () => {
        if (loading) return (<p>Loading...</p>)
        if (error) return (<p>Error: {error.message}</p>)
        return (
        <ItemsList>
            {data.items.map((item, i) => (
                <Item item={item} key={item.id}></Item>
            ))}
        </ItemsList>)
    }

    return (
        <Center>
            {displayContent()}
        </Center>
    )
}

export default Items
