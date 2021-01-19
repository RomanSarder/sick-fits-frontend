import React from 'react'
import { gql, useQuery } from '@apollo/client'
import styled from 'styled-components'
import Item from './Item'
import Pagination from './Pagination'
import { perPage } from '../config'
import { useRouter } from 'next/router'

export const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY ($skip: Int = 0, $take: Int = ${perPage}) {
        items (skip: $skip, take: $take) {
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
    const router = useRouter()
    const page = parseInt(router.query?.page || 1)
    const { loading, error, data } = useQuery(ALL_ITEMS_QUERY, {
        variables: {
            skip: page * perPage - perPage,
        }
    })
    const displayContent = () => {
        if (loading) return (<p>Loading...</p>)
        if (error) return (<p>Error: {error.message}</p>)
        return (
        <ItemsList>
             {data.items.map((item) => (
                <Item item={item} key={item.id}/>
            ))}
        </ItemsList>)
    }

    return (
        <Center>
            <Pagination />
                {displayContent()}
            <Pagination/>
        </Center>
    )
}

export default Items
