import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import Form from './styles/Form'
import ErrorMessage from './ErrorMessage'

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

const CreateItem = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [largeImage, setLargeImage] = useState('')
    const [price, setPrice] = useState(0)
    const [createItem, { error, loading }] = useMutation(CREATE_ITEM_QUERY)
    const router = useRouter()

    const resetForm = () => {
        setTitle('')
        setDescription('')
        setImage('')
        setLargeImage('')
        setPrice(0)
    }

    const uploadFile = async (e) => {
        console.log('uploading file...')
        const files = e.target.files;
        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('upload_preset', 'sickfits')

        const res = await fetch('https://api.cloudinary.com/v1_1//sarder-inc/image/upload', {
            method: 'POST',
            body: formData
        })

        const file = await res.json();
        console.log(file);
        setImage(file.secure_url)
        setLargeImage(file.eager[0].secure_url)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const { data } = await createItem({ variables: {
            title,
            description,
            price,
            image,
            largeImage
        }})
        resetForm()
        console.log(data)
        router.push({
            pathname: '/item',
            query: { id:  data.createItem.id}
        })
    }

    return (
        <Form onSubmit={async (event) => handleFormSubmit(event)}>
            <fieldset disabled={loading} aria-busy={loading}>
                <ErrorMessage error={error}/>
                <label htmlFor="file">
                  Image  
                  <input 
                    type="file" 
                    id="image" 
                    name="image" 
                    placeholder="Upload an image"
                    onChange={uploadFile} 
                    required/>
                   {image && <img src={image} />} 
                </label>
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

export default CreateItem