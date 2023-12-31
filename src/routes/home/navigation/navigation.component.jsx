import { Outlet, Link } from "react-router-dom";
import crownImg from "../../../assets/crown.svg";
import "./navigation.styles.scss"
import CartIcon  from "../../../components/cart-icon/cart-icon.component";
import { UserContext } from "../../../context/user.context";
import { useContext } from 'react';
import { signOutUser } from "../../../utils/firebase/firebase.utils";
import CartDropdown from "../../../components/cart-dropdown/cart-dropdown.component";
import { CartContext} from "../../../context/cart.context";


const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen }  = useContext(CartContext);

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={crownImg} alt="Crown" />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {
            currentUser ? (
              <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
            )
            :(<Link className="nav-link" to="/auth">
            SIGN-IN
          </Link>)
          }
          <CartIcon />
           
      
        

          
        </div>

        {isCartOpen && <CartDropdown />}
      </div>
  
      
      <Outlet />
    </>
  );
};

export default Navigation;
