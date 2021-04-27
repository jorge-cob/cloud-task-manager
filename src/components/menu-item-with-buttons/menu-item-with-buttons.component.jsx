import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  MenuItemContainer,
  ContentContainer,
  ContentTitle,
  ButtonHolder
} from './menu-item-with-buttons.styles';

const MenuItemWithButtons = ({ title, id, onClick, onEditButtonClick, onDeleteButtonClick, Icon, Menu }) => {

  const handleEditButtonClick = e => {
    e.stopPropagation();
    onEditButtonClick();
  };

  const handleDeleteItem = e => {
    onDeleteButtonClick();
  }
  return (
    <MenuItemContainer
      onClick={onClick}
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
}

export default withRouter(MenuItemWithButtons);
