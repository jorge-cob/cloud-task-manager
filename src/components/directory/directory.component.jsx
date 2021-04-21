import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Button } from '@material-ui/core';

import { selectDirectoryFilteredCategories, selectDirectoryFilteredStatus, selectDirectoryItems, selectDirectoryIsTodoFiltered } from '../../redux/directory/directory.selectors';
import { addNewItem, removeItem } from '../../redux/directory/directory.actions';
import { fetchItemCategoriesStart, setItem } from '../../redux/item/item.actions';

import MenuItemWithButtons from '../menu-item-with-buttons/menu-item-with-buttons.component';
import Popup1 from '../popup/popup.component';
import ItemDetail from '../item-detail/item-detail.component';
import ItemEdit from '../item-edit/item-edit.component';
import CategoryFilter from '../category-filter/category-filter.component';
import ButtonWithPopupWithSubmit from '../button-with-popup-with-submit/button-with-popup-with-submit.component';
import CategoryPopup from '../category-popup/category-popup.component';
import TodoFilter from '../todo-filter/todo-filter.component';

import { DirectoryMenuContainer, DirectoryContainer } from './directory.styles';


const Directory = () => {

  const {items, filteredCategories, isTodoFilter, filteredStatus} = useSelector(createStructuredSelector({
    items: selectDirectoryItems,
    filteredCategories: selectDirectoryFilteredCategories,
    isTodoFilter: selectDirectoryIsTodoFiltered,
    filteredStatus: selectDirectoryFilteredStatus
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
    <DirectoryContainer>
      <CategoryFilter />
      <TodoFilter />
      <DirectoryMenuContainer>
        { 
          items.map((item) => {
            const { id, title, categories, isTodo, status, ...otherItemsProps } = item;
            const isFiltered = filteredCategories.length == 0 || ( categories && categories.some(categoryId=> filteredCategories.indexOf(categoryId) !== -1) );
            const statusIsFiltered = (filteredStatus.length == 0 || filteredStatus.indexOf(item.status) !== -1);
            const isTodoFiltered = statusIsFiltered && (item.isTodo && isTodoFilter) || !isTodoFilter;
          return (
            isFiltered 
            && isTodoFiltered &&
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
    </DirectoryContainer>
  );
}

export default Directory;
