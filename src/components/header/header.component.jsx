import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';
import { signOutStart } from '../../redux/user/user.actions';

const Header = () => {

  const dispatch = useDispatch();

  const {user} = useSelector(createStructuredSelector({
    user: selectCurrentUser,
  }));

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className='logo' />
      </LogoContainer>
      <OptionsContainer>
        {
          user ?
          <OptionLink as='div' onClick={() => dispatch(signOutStart())}>SIGN OUT</OptionLink>
          :
          <OptionLink to='/signin'> SIGN IN </OptionLink>
        }
      </OptionsContainer>
    </HeaderContainer>
  );
}

export default Header;
