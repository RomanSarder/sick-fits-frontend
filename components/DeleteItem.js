import { gql, useMutation, useApolloClient } from '@apollo/client'

const DELETE_ITEM_MUTATION = gql`
    mutation deleteItem ($id: Int!) {
        deleteItem(id: $id) {
            id
        }
    }
`

const DeleteItem = ({ children, id }) => {
    const [deleteItem, { error, loading }] = useMutation(DELETE_ITEM_MUTATION, {
        update (cache) {
            cache.modify({
                fields: {
                    items (existingItems, { readField }) {
                        return existingItems.filter(cacheItemRef => {
                            const cacheItemId = readField('id', cacheItemRef)
                            return cacheItemId !== id
                        })
                    }
                }
            })
        }
    })

    const handleItemDelete = () => {
        if (confirm('Are you sure you want to delete this item?')) {
            deleteItem({
                variables: {
                    id
                },
            })
        }
    }

    return (
        <button onClick={handleItemDelete}>{children}</button>
    )
}

export default DeleteItem