import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';

import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { CartDropdownContainer, CartDropdownButton, EmptyMessageContainer, CartItemsContainer } from './cart-dropdown.styles';

const CartDropdown = ({ history }) => {
  const dispatch = useDispatch();
  const handleGoToCheckout = () => {
    history.push('/checkout');
    dispatch(toggleCartHidden());
  }

  const {cartItems} = useSelector(createStructuredSelector({
    cartItems: selectCartItems,
  }));
  return (
    <CartDropdownContainer>
      <CartItemsContainer> 
        {
          cartItems.length ? (
            cartItems.map(cartItem => (
              <CartItem key={cartItem.id} item={cartItem} />
            ))
          ) : ( 
            <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
          )
        }
      </CartItemsContainer>
      <CartDropdownButton
        onClick={handleGoToCheckout}
      >
        GO TO CHECKOUT
      </CartDropdownButton>
    </CartDropdownContainer>
  );
}

export default withRouter(CartDropdown);

