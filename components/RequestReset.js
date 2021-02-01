import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import Form from './styles/Form'
import ErrorMessage from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION (
        $email: String!,
    ) {
        requestPasswordReset (email: $email) {
            message
        }
    }
`

const RequestReset = () => {
    const [requestReset, { error, loading, called }] = useMutation(REQUEST_RESET_MUTATION, {
        refetchQueries: [
            { query: CURRENT_USER_QUERY }
        ]
    })
    const [email, setEmail] = useState('')

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        try {
            await requestReset({
                variables: { email }
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Form method="POST" onSubmit={e => handleFormSubmit(e)}>
            <fieldset disabled={loading} aria-busy={loading}>
                <ErrorMessage error={error}/>
                {!error && !loading && called && <p>Success! Check your email for a reset link</p>}
                <h2>Request A Password Reset</h2>
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
            </fieldset>
            <button type="submit">Request Reset!</button>
        </Form>
    )
}

export default RequestReset
