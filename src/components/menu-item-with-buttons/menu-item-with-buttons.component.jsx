import React from 'react';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';

import {
  MenuItemContainer,
  ContentContainer,
  ContentTitle,
} from './menu-item-with-buttons.styles';

const MenuItemWithButtons = ({ title, onClick, onButtonClick }) => {

  const handleButtonClick = e => {
    e.stopPropagation();
    onButtonClick();
  }
  return (
    <MenuItemContainer
      onClick={onClick}
    >
      <ContentContainer>
        <ContentTitle>{ title }</ContentTitle>
      </ContentContainer>
      <CustomButton onClick={handleButtonClick}> Edit </CustomButton>F
    </MenuItemContainer>
  )
}

export default withRouter(MenuItemWithButtons);
