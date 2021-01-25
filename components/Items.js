import React, { useState, useEffect } from 'react'
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

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        itemsCount
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
    const initialPage = 1
    const [page, setPage] = useState(initialPage)
    const [skip, setSkip] = useState(0)
    const { data: paginationData } = useQuery(PAGINATION_QUERY)
    const { loading, error, data: itemsData } = useQuery(ALL_ITEMS_QUERY, {
        variables: {
            skip
        }
    })
    const count = paginationData?.itemsCount || 0
    const pages = count > 0 ? Math.ceil(count / perPage) : 0;
    const displayContent = () => {
        if (loading) return (<p>Loading...</p>)
        if (error) return (<p>Error: {error.message}</p>)
        return (
        <ItemsList>
             {itemsData.items.map((item) => (
                <Item item={item} key={item.id}/>
            ))}
        </ItemsList>)
    }

    useEffect(() => {
        setSkip(page * perPage - perPage)
    }, [page])

    const onNextPage = () => {
        setPage(page < pages ? page + 1 : page)
    }

    const onPrevPage = () => {
        setPage(page > 1 ? page - 1 : page)
    }

    return (
        <Center>
            <Pagination onNextPage={onNextPage} onPrevPage={onPrevPage} pages={pages} count={count} page={page} />
                {displayContent()}
            <Pagination onNextPage={onNextPage} onPrevPage={onPrevPage} pages={pages} count={count} page={page}/>
        </Center>
    )
}

export default Items
