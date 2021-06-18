import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCategoryItems } from '../../redux/category/category.selectors';

import {
  MenuItemContainer,
  ContentContainer,
  ContentTitle,
  ButtonHolder
} from './menu-item-with-buttons.styles';

const MenuItemWithButtons = forwardRef(({ title, id, onClick, categories, onEditButtonClick, onDeleteButtonClick, Icon, Menu, hidden, ...props }, ref) => {
  const handleEditButtonClick = e => {
    e.stopPropagation();
    onEditButtonClick();
  };

  const handleDeleteItem = e => {
    onDeleteButtonClick();
  }
  const {allCategories} = useSelector(createStructuredSelector({
    allCategories: selectCategoryItems,
  }));

  return (
    <MenuItemContainer
      onClick={e => onClick(e)}
      ref={ref}
      {...props}
      hidden={hidden}
    >
      {
        categories && categories.map(cat => {
          const fullCat = allCategories.find(
            item => item.id === cat
          ) 
          return (
            <div key={fullCat.id} style={{height: '100%', width: '18px', backgroundColor: `${fullCat?.color || 'white'}`}}></div>      
          )
        }
        )
      }
      <ContentContainer>
      {Icon}
        <ContentTitle>{ title }</ContentTitle>
      </ContentContainer>
      <ButtonHolder>
        <Menu id={id} onEdit={handleEditButtonClick} onDelete={e => { if (window.confirm('Are you sure you wish to delete this item?')) handleDeleteItem(e) }} />
      </ButtonHolder>
    </MenuItemContainer>
  )
});
export default MenuItemWithButtons;

