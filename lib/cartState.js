import { createContext, useContext, useState } from "react";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider ({ children }) {
    const [cartOpen, setCartOpen] = useState(false)

    const toggleCart = () => {
        setCartOpen(!cartOpen)
    }

    const closeCart = () => {
        setCartOpen(false)
    }

    const openCart = () => {
        setCartOpen(true)
    }

    return (
    <LocalStateProvider value={{ cartOpen, openCart, closeCart, toggleCart }}>
        {children}
    </LocalStateProvider>)
}

function useCart () {
    const all = useContext(LocalStateContext)
    return all
}

export { CartStateProvider, useCart }