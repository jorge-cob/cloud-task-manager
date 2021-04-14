import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  MenuItemContainer,
  ContentContainer,
  ContentTitle,
} from './menu-item.styles';

const MenuItem = ({ title, size, imageUrl, history, linkUrl, match }) => {
  return (
    <MenuItemContainer
      size={size}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <ContentContainer>
        <ContentTitle>{ title.toUpperCase() }</ContentTitle>
      </ContentContainer>
    </MenuItemContainer>
  )
}

export default withRouter(MenuItem);