import React from 'react';
import { useSelector } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  return (
    <div className='cart-dropdown'>
      <div className='cart-items'> 
        {
          cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
        }
      </div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  );
}

export default CartDropdown;

