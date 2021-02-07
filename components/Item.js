import React from 'react'
import PropTypes from 'prop-types'
import Title from './styles/Title'
import ItemStyles from './styles/ItemStyles'
import PriceTag from './styles/PriceTag'
import Link from 'next/link'
import formatMoney from '../lib/formatMoney'
import DeleteItem from './DeleteItem'
import AddToCart from './AddToCart'

const Item = ({ item }) => {
    return (
        <ItemStyles>
            {item.image && <img src={item.image} alt={item.title}/>}
            <Title>
                <Link href={`/item/${item.id}`}>
                    <a>{item.title}</a>
                </Link>
            </Title>
            <PriceTag>{formatMoney(item.price)}</PriceTag>
            <p>{item.description}</p>
            <div className="buttonList">
                <Link href={`/item/${item.id}/edit`}>
                    <a>Edit</a>
                </Link>
                <AddToCart id={item.id}/>
                <DeleteItem id={item.id}>Delete Item</DeleteItem>
            </div>
        </ItemStyles>
    )
}

Item.propTypes = {
    item: PropTypes.object.isRequired
}

export default Item
