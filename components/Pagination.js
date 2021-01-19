import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import PaginationStyles from './styles/PaginationStyles'
import { perPage } from '../config'
import { parse } from 'graphql'


const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        itemsCount
    }
`

const Pagination = () => {
    const router = useRouter()
    const { data } = useQuery(PAGINATION_QUERY)
    
    const page = parseInt(router.query?.page || 1)
    const count = data?.itemsCount || 0
    const pages = count > 0 ? Math.ceil(count / perPage) : 0
    const displayString = `Page ${page} of ${pages}`
    return (
        <PaginationStyles>
            <Head>
                <title>Sick Fits! | {displayString}</title>
            </Head>
            <Link href={{
                pathname: 'items',
                query: { page: page > 1 ? page - 1 : page }
            }}>
                <a className="prev" aria-disabled={page === 1}>Prev</a>
            </Link>
            <p>{displayString}</p>
            <p>{count} Items Total</p>
            <Link href={{
                pathname: 'items',
                query: { page: page < pages ? page + 1 : page }
            }}>
                <a aria-disabled={page === pages}>Next</a>
            </Link>
        </PaginationStyles>
    )
}

export default Pagination
