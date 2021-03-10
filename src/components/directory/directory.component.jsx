import React from 'react';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.component';

import { DirectoryMenuContainer } from './directory.styles';

const Directory = () => {

  const {sections} = useSelector(createStructuredSelector({
    sections: selectDirectorySections
  }));

  return (
    <DirectoryMenuContainer>
      { 
        sections.map(({ id, ...otherSectionProps }) => (
          <MenuItem 
            key={id} 
            {...otherSectionProps}
          />
        ))
      }
    </DirectoryMenuContainer>
  );
}

export default Directory;
