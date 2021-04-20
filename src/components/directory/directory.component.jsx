import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectoryFilteredCategories, selectDirectoryItems } from '../../redux/directory/directory.selectors';
import { addNewItem } from '../../redux/directory/directory.actions';
import { fetchItemCategoriesStart, setItem } from '../../redux/item/item.actions';


import MenuItemWithButtons from '../menu-item-with-buttons/menu-item-with-buttons.component';
import Popup1 from '../popup/popup.component';
import ItemDetail from '../item-detail/item-detail.component';
import ItemEdit from '../item-edit/item-edit.component';

import { DirectoryMenuContainer } from './directory.styles';
import ItemDetail2 from '../item-detail/item-detail.component';


const Directory = () => {

  const {items, filteredCategories} = useSelector(createStructuredSelector({
    items: selectDirectoryItems,
    filteredCategories: selectDirectoryFilteredCategories
  }));
  const dispatch = useDispatch();

  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [itemShowing, setItemShowing] = useState('');
  const [itemTitle, setItemTitle] = useState('');
  
  const handleClickOpenDetailPopup = (item, id, title) => {
    dispatch(setItem(item));
    dispatch(fetchItemCategoriesStart(id));
    setItemShowing(id);
    setItemTitle(title);
    setIsDetailPopupOpen(true);
  };

  const handleClickOpenEditPopup = (item, id, title) => {
    dispatch(setItem(item));
    dispatch(fetchItemCategoriesStart(id));
    handleCloseDetailPopup();
    setItemShowing(id);
    setItemTitle(title);
    setIsEditPopupOpen(true);
  };

  const handleCloseDetailPopup = () => {
    setIsDetailPopupOpen(false);
  };

  const handleEditItem = (categoryId, title, description, isTodo, status) => {
    setIsEditPopupOpen(false);
    dispatch(addNewItem(categoryId, itemShowing, title, description, isTodo, status));
  };

  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
  };


  return (
    <DirectoryMenuContainer>
      { 
        items.map((item) => {
          const { id, title, categories, ...otherItemsProps } = item;
          const isFiltered = filteredCategories.length == 0 || categories && categories.some(v=> filteredCategories.indexOf(v) !== -1);
        return (
          isFiltered && 
          <MenuItemWithButtons 
            key={id} 
            title={title.toUpperCase()}
            onClick={() => handleClickOpenDetailPopup(item, id, title)}
            onButtonClick={() => handleClickOpenEditPopup(item, id, title)}
            {...otherItemsProps}
          />
        )
      })
      }
      <Popup1 open={isDetailPopupOpen} handleClose={handleCloseDetailPopup} label={itemTitle.toUpperCase()} >
        <ItemDetail handleClose={handleCloseDetailPopup} onEditMode={handleClickOpenEditPopup} />
      </Popup1>
      <Popup1 open={isEditPopupOpen} handleClose={handleCloseEditPopup} label={itemTitle.toUpperCase()} >
        <ItemEdit handleClose={handleCloseEditPopup} handleSubmit={handleEditItem} />
      </Popup1>
    </DirectoryMenuContainer>
  );
}

export default Directory;
