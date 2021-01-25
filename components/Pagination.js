import Head from 'next/head'

import PaginationStyles from './styles/PaginationStyles'

const Pagination = ({ page, count, pages, onNextPage, onPrevPage }) => {
    const displayString = `Page ${page} of ${pages}`


    return (
        <PaginationStyles>
            <Head>
                <title>Sick Fits! | {displayString}</title>
            </Head>
            <a onClick={onPrevPage} className="prev" aria-disabled={page === 1}>Prev</a>
            <p>{displayString}</p>
            <p>{count} Items Total</p>
            <a onClick={onNextPage} aria-disabled={page === pages}>Next</a>
        </PaginationStyles>
    )
}

export default Pagination
