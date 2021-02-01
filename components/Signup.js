import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import Form from './styles/Form'
import ErrorMessage from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'

const SIGNUP_MUTATION = gql`
    mutation signup (
        $name: String!,
        $email: String!,
        $password: String!
    ) {
        signup (name: $name, email: $email, password: $password) {
            id
            email,
            name,
            permissions,
        }
    }
`

const Signup = () => {
    const [signup, { error, loading }] = useMutation(SIGNUP_MUTATION, {
        refetchQueries: [
            { query: CURRENT_USER_QUERY }
        ]
    })
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        try {
            const newUser = {
                email,
                name,
                password
            }
    
            await signup({
                variables: newUser
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Form method="POST" onSubmit={e => handleFormSubmit(e)}>
            <fieldset disabled={loading} aria-busy={loading}>
                <ErrorMessage error={error}/>
                <h2>Sign Up For An Account</h2>
                <label htmlFor="email">
                    Email
                    <input 
                        type="text" 
                        name="email" 
                        placeholder="email" 
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        />
                </label>
                <label htmlFor="name">
                    Name
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="name" 
                        value={name}
                        onChange={event => setName(event.target.value)}
                        />
                </label>
                <label htmlFor="password">
                    Password
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="password" 
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        />
                </label>
            </fieldset>
            <button type="submit">Register</button>
        </Form>
    )
}

export default Signup
