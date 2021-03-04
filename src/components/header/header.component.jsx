import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = () => {

  const user = useSelector(state => state.user.currentUser);
  const isCartHidden = useSelector(state => state.cart.hidden);

  return (
    <div className='header'>
      <Link className='logo-container' to="/">
        <Logo className='logo' />
      </Link>
      <div className='options'>
        <Link className='option' to='/shop'>
          SHOP
        </Link>
        <Link className='option' to='/shop'>
          CONTACT
        </Link>
        {
          user ?
          <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
          :
          <Link className='option' to='/signin'> SIGN IN </Link>
        }
        <CartIcon />
      </div>
      {
        !isCartHidden ? <CartDropdown /> : null
      }
    </div>
  );
}

export default Header;
