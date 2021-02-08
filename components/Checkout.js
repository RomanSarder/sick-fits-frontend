import styled from "styled-components"
import { useState } from "react"
import nProgress from "nprogress"
import { useMutation, gql } from "@apollo/client"
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from "next/dist/client/router"
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import SickButton from './styles/SickButton'
import { useCart } from '../lib/cartState'
import { CURRENT_USER_QUERY } from "./User"

const CheckoutFormStyles = styled.form`
    box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 5px;
    padding: 1rem;
    display: grid;
    grid-gap: 1rem;
`

const StripeErrorMessage = styled.p`
    font-size: 1.4rem;
`

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

const CHECKOUT_MUTATION = gql`
    mutation CHECKOUT_MUTATION ($token: String!) {
        checkout (token: $token) {
            id,
            total,
            items {
                id
                title
                description
                image
                quantity
                price
            },
            charge,
            label
        }
    }
`

const CheckoutForm = () => {
    const router = useRouter()
    const { closeCart } = useCart()
    const [checkout, { error: checkoutError, data }] = useMutation(CHECKOUT_MUTATION, {
        refetchQueries: [
            { query: CURRENT_USER_QUERY }
        ]
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        nProgress.start()

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        if (error) {
            setError(error)
        } else {
            const { id } = paymentMethod
            try {
                const order = await checkout({
                    variables: {
                        token: id
                    }
                })
                router.push({
                    pathname: '/order/[id]',
                    query: { id: order.data.checkout.id}
                })

                closeCart()
            } catch (e) {
                console.log('checkout error', e, data)
            }
        }

        setLoading(false)
        nProgress.done()
    }

    return (
        <CheckoutFormStyles onSubmit={handleSubmit}>
            {error && <StripeErrorMessage>{error.message}</StripeErrorMessage>}
            <CardElement />
            <SickButton>
                Check Out Now
            </SickButton>
        </CheckoutFormStyles>
    )
}

const Checkout = () => {
    return (
        <Elements stripe={stripeLib}>
            <CheckoutForm/>
        </Elements>
    )
}

export default Checkout
