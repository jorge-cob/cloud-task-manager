import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';

import { selectDirectoryItems } from '../../redux/directory/directory.selectors';
import { addNewItem } from '../../redux/directory/directory.actions';
import { addNewCategory } from '../../redux/category/category.actions';

import MenuItem from '../menu-item/menu-item.component';
import Popup1 from '../popup/popup.component';
import ItemInput from '../item-input/item-input.component';
import ItemDetail from '../item-detail/item-detail.component';

import { DirectoryMenuContainer } from './directory.styles';


const Directory = () => {

  const {items} = useSelector(createStructuredSelector({
    items: selectDirectoryItems
  }));

  const dispatch = useDispatch();
  const [isPopupOpen, setOpenPopup] = useState(false);
  const [itemShowing, setItemShowing] = useState('');
  const [itemTitle, setItemTitle] = useState('');
  

  const handleClickOpenPopup = (id, title) => {
    setItemShowing(id);
    setItemTitle(title);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <DirectoryMenuContainer>
      { 
        items.map(({ id, title, ...otherItemsProps }) => (
          <MenuItem 
            key={id} 
            title={title}
            onClick={() => handleClickOpenPopup(id, title)}
            {...otherItemsProps}
          />
        ))
      }
      <Popup1 open={isPopupOpen} handleClose={handleClosePopup} label={itemTitle}>
        <ItemDetail handleClose={handleClosePopup} itemId={itemShowing} />
      </Popup1>
    </DirectoryMenuContainer>
  );
}

export default Directory;
