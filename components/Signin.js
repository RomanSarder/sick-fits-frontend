import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import Form from './styles/Form'
import ErrorMessage from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'

const SIGNIN_MUTATION = gql`
    mutation signin (
        $email: String!,
        $password: String!
    ) {
        signin (email: $email, password: $password) {
            id
            email,
            name,
            role {
                canManageProducts
                canSeeOtherUsers
                canManageUsers
                canManageRoles
                canManageCart
                canManageOrders
            }
        }
    }
`

const Signup = () => {
    const [signin, { error, loading }] = useMutation(SIGNIN_MUTATION, {
        refetchQueries: [
            { query: CURRENT_USER_QUERY }
        ]
    })
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        try {
            const user = {
                email,
                password
            }
    
            await signin({
                variables: user
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Form method="POST" onSubmit={e => handleFormSubmit(e)}>
            <fieldset disabled={loading} aria-busy={loading}>
                <ErrorMessage error={error}/>
                <h2>Sign In To Your Account</h2>
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
            <button type="submit">Login</button>
        </Form>
    )
}

export default Signup
