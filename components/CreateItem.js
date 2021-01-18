import Router from 'next/router'
import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import Form from './styles/Form'
import ErrorMessage from './ErrorMessage'
import formatMoney from '../lib/formatMoney'

export const CREATE_ITEM_QUERY = gql`
    mutation createItem (
        $title: String!,
        $description: String!,
        $image: String,
        $largeImage: String,
        $price: Int!
    ) {
        createItem (
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

export default function CreateItem() {
    const [title, setTitle] = useState('Title here')
    const [description, setDescription] = useState('Desc')
    const [image, setImage] = useState('dog.jpg')
    const [largeImage, setLargeImage] = useState('dog2.jpg')
    const [price, setPrice] = useState(10)
    const [createItem, { error, loading }] = useMutation(CREATE_ITEM_QUERY)

    const resetForm = () => {
        setTitle('')
        setDescription('')
        setImage('')
        setLargeImage('')
        setPrice(0)
    }

    return (
        <Form onSubmit={async (event) => {
            event.preventDefault();
            const { data } = await createItem({ variables: {
                title,
                description,
                price
            }})
            resetForm()
            console.log(data)
            Router.push({
                pathname: '/item',
                query: { id:  data.createItem.id}
            })
        }}>
            <fieldset disabled={loading} aria-busy={loading}>
                <ErrorMessage error={error}/>
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
