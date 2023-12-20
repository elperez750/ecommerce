import { createContext, useState } from 'react';

const addCartItem = (cartItems, productToAddToCart) => {
        const existingItem = cartItems.find((cartItem) => cartItem.id === productToAddToCart.id);
        if (existingItem) {
            return cartItems.map((cartItem) => cartItem.id === productToAddToCart.id ? 
                { ...cartItem, quantity: cartItem.quantity + 1 } : 
                cartItem
                );
        }
        else{
            return [...cartItems, { ...productToAddToCart, quantity: 1 }];
        }
        
    }


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
});


export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
        setCartCount(cartCount + 1);
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}