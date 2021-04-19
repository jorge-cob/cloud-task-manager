import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  MenuItemContainer,
  ContentContainer,
  ContentTitle,
} from './menu-item.styles';

const MenuItem = ({ title, onClick }) => {
  return (
    <MenuItemContainer
      onClick={onClick}
    >
      <ContentContainer>
        <ContentTitle>{ title }</ContentTitle>
      </ContentContainer>
    </MenuItemContainer>
  )
}

export default withRouter(MenuItem);
