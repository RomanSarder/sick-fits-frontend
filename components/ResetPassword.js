import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import Form from './styles/Form'
import ErrorMessage from './ErrorMessage'
import propTypes from 'prop-types'

const RESET_PASSWORD_MUTATION = gql`
    mutation RESET_PASSWORD_MUTATION (
        $resetToken: String!,
        $password: String!,
        $confirmPassword: String!
    ) {
        resetPassword (resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
            name,
        }
    }
`

const RequestReset = props => {
    const [resetPassword, { error, loading }] = useMutation(RESET_PASSWORD_MUTATION)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirm] = useState('')

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        try {
            await resetPassword({
                variables: { password, confirmPassword, resetToken: props.resetToken}
            })
            router.push({
                pathname: '/'
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Form method="POST" onSubmit={e => handleFormSubmit(e)}>
            <fieldset disabled={loading} aria-busy={loading}>
                <ErrorMessage error={error}/>
                <h2>Enter Your New Password</h2>
                <label htmlFor="email">
                    Password
                    <input 
                        type="password" 
                        name="Password" 
                        placeholder="Enter your password" 
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        />
                </label>
                <label htmlFor="email">
                    Confirm Password
                    <input 
                        type="password" 
                        name="confirm-password" 
                        placeholder="Confirm your password" 
                        value={confirmPassword}
                        onChange={event => setConfirm(event.target.value)}
                        />
                </label>
            </fieldset>
            <button type="submit">Change Password</button>
        </Form>
    )
}

RequestReset.propTypes = {
    resetToken: propTypes.string.isRequired
}

export default RequestReset
