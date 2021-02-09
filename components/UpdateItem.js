import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation, gql, useQuery } from '@apollo/client'
import Form from './styles/Form'
import ErrorMessage from './ErrorMessage'
import { GET_ITEM_QUERY } from './SingleItem'

export const UPDATE_ITEM_MUTATION = gql`
    mutation updateItem (
        $id: Int!
        $title: String,
        $description: String,
        $image: String,
        $largeImage: String,
        $price: Int
    ) {
        updateItem (
            id: $id
            title: $title,
            description: $description,
            image: $image,
            largeImage: $largeImage,
            price: $price
        ) {
            id,
            title,
            description,
            image,
            largeImage,
            price
        }
    }
`

const UpdateItem = () => {
    const router = useRouter()
    const id = parseInt(router.query.id)

    const [updateItem, { error: updateItemError, loading: updateItemLoading }] = useMutation(UPDATE_ITEM_MUTATION)
    const { error: getItemError, data, loading: getItemLoading } = useQuery(GET_ITEM_QUERY, { variables: { id } })
    const [title, setTitle] = useState(data?.item.title || '')
    const [description, setDescription] = useState(data?.item.description || '')
    const [price, setPrice] = useState(data?.item.price || 0)
    
    if (!data?.item) {
        return (<p>No item found</p>)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await updateItem({ variables: {
                id,
                title,
                description,
                price,
            }})
            router.push({
                pathname: '/item/[id]',
                query: { id:  data.updateItem.id}
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Form onSubmit={async (event) => handleFormSubmit(event)}>
            <fieldset disabled={updateItemLoading} aria-busy={updateItemLoading}>
                <ErrorMessage error={updateItemError}/>
                <label htmlFor="title">
                  Title  
                  <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    placeholder="Title"
                    value={title}
                    onChange={event => setTitle(event.target.value)} 
                    required/>
                </label>
                <label htmlFor="title">
                  Description  
                  <textarea 
                    id="description" 
                    name="description" 
                    placeholder="Enter a description"
                    value={description}
                    onChange={event => setDescription(event.target.value)} 
                    required/>
                </label>
                <label htmlFor="title">
                  Price  
                  <input 
                    type="number" 
                    id="price" 
                    name="price" 
                    placeholder="price"
                    value={price}
                    onChange={event => setPrice(Number(event.target.value))} 
                    required/>
                </label>
                <button type="submit">Submit</button>
            </fieldset>
        </Form>
    )
}

export default UpdateItem