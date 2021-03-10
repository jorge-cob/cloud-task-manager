import React from 'react';

import { useDispatch } from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';

import { 
  CollectionItemContainer, 
  ImageContainer, 
  CollectionFooterContainer, 
  NameContainer, 
  PriceContainer, 
  AddButton 
} from './collection-item.styles';

const CollectionItem = ({ item }) => {
  const { name, price, imageUrl } = item;
  const dispatch = useDispatch();
  return (
    <CollectionItemContainer>
      <ImageContainer imageUrl={imageUrl} className='image' />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}</PriceContainer>
      </CollectionFooterContainer>
      <AddButton inverted onClick={() => dispatch(addItem(item))}> Add to cart </AddButton>
    </CollectionItemContainer>
  );
}

export default CollectionItem;