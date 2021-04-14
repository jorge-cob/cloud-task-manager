import React from 'react';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectoryItems } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.component';

import { DirectoryMenuContainer } from './directory.styles';

const Directory = () => {

  const {items} = useSelector(createStructuredSelector({
    items: selectDirectoryItems
  }));

  return (
    <DirectoryMenuContainer>
      { 
        items.map(({ id, ...otherItemsProps }) => (
          <MenuItem 
            key={id} 
            {...otherItemsProps}
          />
        ))
      }
    </DirectoryMenuContainer>
  );
}

export default Directory;
