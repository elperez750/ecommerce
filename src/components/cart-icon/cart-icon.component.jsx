import ShoppingBagSVG from "../../assets/shopping-bag.svg"
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {

    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleCart = () => setIsCartOpen(!isCartOpen);
   

    return(
        <CartIconContainer className='cart-icon-container' onClick={toggleCart}>
            <ShoppingIcon className="shopping-icon"><img src={ShoppingBagSVG} /></ShoppingIcon>
            <ItemCount className="item-count">{cartCount}</ItemCount>
        </CartIconContainer>
    )
}


export default CartIcon;
