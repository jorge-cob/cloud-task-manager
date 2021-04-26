import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  MenuItemContainer,
  ContentContainer,
  ContentTitle,
  ButtonHolder
} from './menu-item-with-buttons.styles';
import {LexoRank} from "lexorank";

const MenuItemWithButtons = ({ title, id, onClick, onEditButtonClick, onDeleteButtonClick, Icon, Menu }) => {
  const lexoRank = LexoRank.middle();
  const prevLexoRank = lexoRank.genPrev();
  const prevLexoRank2 = lexoRank.genPrev();
  const prevprevLexoRank = lexoRank.genPrev().genPrev();

  console.log('lexoRank', lexoRank);
  console.log('prevLexoRank', prevLexoRank);
  console.log('prevLexoRank2', prevLexoRank2);
  console.log('prevprevLexoRank', prevprevLexoRank);

  const handleEditButtonClick = e => {
    e.stopPropagation();
    onEditButtonClick();
  };

  const handleDeleteItem = e => {
    e.stopPropagation();
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
