import { createContext, useState, useEffect } from 'react';

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

const removeCartItem = (cartItems, productToRemoveFromCart) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === productToRemoveFromCart.id);
    
    if(existingItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== productToRemoveFromCart.id);
    }

    return cartItems.map((cartItem) => cartItem.id === productToRemoveFromCart.id? 
            {...cartItem, quantity: cartItem.quantity - 1 } : 
            cartItem
            );
    
}


const clearCartItems = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}





export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    setCartCount: () => {},
    clearItems: () => {},
    cartTotal: 0,
    setCartTotal: () => {}
});




export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);


    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);


    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);





    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearItems = (cartItemToClear) => {
        setCartItems(clearCartItems(cartItems, cartItemToClear));
    
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItems, cartTotal };


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}