import React from 'react'
import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import User from './User'

const Nav = () => {
  return (
    <User>
      {data => (
        <NavStyles>
          <Link href="/items">
            <a>Shop</a>
          </Link>
          { data && data.me && (
            <React.Fragment>
              <Link href="/sell">
                <a>Sell</a>
              </Link>
              <Link href="/orders">
                <a>Orders</a>
              </Link>
              <Link href="/me">
                <a>Account</a>
              </Link>
            </React.Fragment>
          )}
          {!data && <Link href="/signup">
            <a>Sign In</a>
          </Link>}
        </NavStyles>
      )}
    </User>
  )
}

export default Nav
