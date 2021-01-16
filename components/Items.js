import React from 'react'
import { gql, useQuery } from '@apollo/client'

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

const Items = () => {
    const { loading, error, data } = useQuery(ALL_ITEMS_QUERY)
    console.log(data)

    return (
        <div>
            <p>Items</p>
        </div>
    )
}

export default Items
