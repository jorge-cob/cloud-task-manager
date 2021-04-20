import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import { HeaderContainer, OptionsContainer, OptionLink } from './header.styles';


const Header = () => {

  const dispatch = useDispatch();

  const {user} = useSelector(createStructuredSelector({
    user: selectCurrentUser,
  }));

  return (
    <HeaderContainer>
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
