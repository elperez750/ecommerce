import "./checkout-item.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { clearItems, addItemToCart, removeItemFromCart } = useContext(CartContext);

  const clearCartItems = () => clearItems(cartItem);
  const addToCart = () => addItemToCart(cartItem);
  const removeFromCart = () => removeItemFromCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name"> {name} </span>
      <span className="quantity">
        <div className="arrow" onClick={removeFromCart}>
          &#10094;
        </div>
        <span className="value"> {quantity} </span>

        <div className="arrow" onClick={addToCart}>
          &#10095;
        </div>
      </span>

      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearCartItems}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
