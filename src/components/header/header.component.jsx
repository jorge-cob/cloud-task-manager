import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';
import { signOutStart } from '../../redux/user/user.actions';

const Header = () => {

  const dispatch = useDispatch();

  const {user, isCartHidden} = useSelector(createStructuredSelector({
    user: selectCurrentUser,
    isCartHidden: selectCartHidden,
  }));

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className='logo' />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to='/shop'>
          SHOP
        </OptionLink>
        <OptionLink to='/shop'>
          CONTACT
        </OptionLink>
        {
          user ?
          <OptionLink as='div' onClick={() => dispatch(signOutStart())}>SIGN OUT</OptionLink>
          :
          <OptionLink to='/signin'> SIGN IN </OptionLink>
        }
        <CartIcon />
      </OptionsContainer>
      {
        !isCartHidden ? <CartDropdown /> : null
      }
    </HeaderContainer>
  );
}

export default Header;
