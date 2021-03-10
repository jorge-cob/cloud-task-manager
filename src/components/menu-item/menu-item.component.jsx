import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  ContentTitle,
  ContentSubtitle
} from './menu-item.styles';

const MenuItem = ({ title, size, imageUrl, history, linkUrl, match }) => {
  return (
    <MenuItemContainer
      size={size}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <BackgroundImageContainer
        className='background-image'
        imageUrl={imageUrl}
      />
      <ContentContainer>
        <ContentTitle>{ title.toUpperCase() }</ContentTitle>
        <ContentSubtitle> SHOP NOW </ContentSubtitle>
      </ContentContainer>
    </MenuItemContainer>
  )
}

export default withRouter(MenuItem);