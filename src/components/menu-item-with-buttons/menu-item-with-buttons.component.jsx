import React, { forwardRef } from 'react';

import {
  MenuItemContainer,
  ContentContainer,
  ContentTitle,
  ButtonHolder
} from './menu-item-with-buttons.styles';

const MenuItemWithButtons = forwardRef(({ title, id, onClick, onEditButtonClick, onDeleteButtonClick, Icon, Menu, hidden, ...props }, ref) => {

  const handleEditButtonClick = e => {
    e.stopPropagation();
    onEditButtonClick();
  };

  const handleDeleteItem = e => {
    onDeleteButtonClick();
  }


  return (
    <MenuItemContainer
      onClick={e => onClick(e)}
      ref={ref}
      {...props}
      hidden={hidden}
    >
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

