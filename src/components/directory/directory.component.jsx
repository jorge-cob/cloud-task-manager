import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  Button
} from '@material-ui/core';

import { selectDirectoryFilteredCategories, selectDirectoryItems } from '../../redux/directory/directory.selectors';
import { addNewItem, removeItem } from '../../redux/directory/directory.actions';
import { fetchItemCategoriesStart, setItem } from '../../redux/item/item.actions';


import MenuItemWithButtons from '../menu-item-with-buttons/menu-item-with-buttons.component';
import Popup1 from '../popup/popup.component';
import ItemDetail from '../item-detail/item-detail.component';
import ItemEdit from '../item-edit/item-edit.component';
import CategoryFilter from '../category-filter/category-filter.component';

import { DirectoryMenuContainer } from './directory.styles';
import ButtonWithPopupWithSubmit from '../button-with-popup-with-submit/button-with-popup-with-submit.component';
import CategoryPopup from '../category-popup/category-popup.component';
import TodoFilter from '../todo-filter/todo-filter.component';


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
  const [isCategoryPopupOpen, setIsCategoryOpenPopup] = useState(false);

  const handleClickOpenCategoryPopup = e => {
    e.preventDefault();
    setIsCategoryOpenPopup(true);
  }

  const handleCloseCategoryPopup = () => {
    setIsCategoryOpenPopup(false);
  };
  
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

  const handleClickDeleteItem = id => {
    setIsDetailPopupOpen(false);
    dispatch(removeItem(id));
  };


  return (
    <div style={{width: '100%'}}>
      <CategoryFilter />
      <TodoFilter />
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
              onEditButtonClick={() => handleClickOpenEditPopup(item, id, title)}
              onDeleteButtonClick={() => handleClickDeleteItem(id)}
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
        <CategoryPopup 
          open={isCategoryPopupOpen}
          handleClose={handleCloseCategoryPopup}
        />
      </DirectoryMenuContainer>
        <div style={{display: 'flex'}}>
          <ButtonWithPopupWithSubmit label='+ entry' popupLabel='New entry' onOpenCategoryPopup={() => setIsCategoryOpenPopup(true)} />
          <Button onClick={handleClickOpenCategoryPopup} color="primary">
            + Category
          </Button>
        </div>
    </div>
  );
}

export default Directory;
