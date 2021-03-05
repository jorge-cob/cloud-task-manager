import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';

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
    <div className='cart-dropdown'>
      <div className='cart-items'> 
        {
          cartItems.length ? (
            cartItems.map(cartItem => (
              <CartItem key={cartItem.id} item={cartItem} />
            ))
          ) : ( 
            <span className='empty-message'>Your cart is empty</span>
          )
        }
      </div>
      <CustomButton
        onClick={handleGoToCheckout}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
}

export default withRouter(CartDropdown);

