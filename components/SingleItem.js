import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Head from 'next/head'

const SingleItemStyles = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    box-shadow: ${props => props.theme.bs};
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    min-height: 800px;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .details {
        margin: 3rem;
        font-size: 2rem;
    }
`

export const GET_ITEM_QUERY = gql`
    query item ($id: Int!) {
        item (where: { id: $id }) {
            id,
            title,
            description,
            largeImage,
            image,
            price
        }
    }
`


const SingleItem = () => {
    const router = useRouter()
    const { loading, data, error } = useQuery(GET_ITEM_QUERY, {
        variables: {
            id: Number(router.query.id)
        }
    })
    const item = data?.item

    return (
        <SingleItemStyles>
            <Head>
                <title>Sick Fits | {item?.title || 'Item'}</title>
            </Head>
            {
            item && (
                <React.Fragment>
                    <img src={item?.largeImage} alt={item.title}/>
                    <div className="details">
                        <h2>Viewing {item.titlel}</h2>
                        <p>{item.description}</p>
                    </div>
                </React.Fragment>
            )}
        </SingleItemStyles>
    )
}

export default SingleItem
