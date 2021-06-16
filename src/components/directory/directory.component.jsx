import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';

import { addNewItem, removeItem } from '../../redux/directory/directory.actions';
import { fetchItemCategoriesStart, setItem } from '../../redux/item/item.actions';

import Popup1 from '../popup/popup.component';
import ItemEdit from '../item-edit/item-edit.component';
import ButtonWithPopupWithSubmit from '../button-with-popup-with-submit/button-with-popup-with-submit.component';
import CategoryPopup from '../category-popup/category-popup.component';

import { DirectoryMenuContainer, DirectoryContainer } from './directory.styles';
import DirectoryList from '../directory-list/directory-list.component';
import DetailPopup from '../detail-popup/detail-popup.component';

import { getStatusIcon } from './directory.helpers';
import DirectoryFilter from '../directory-filter/directory-filter.component';
import CategoryEditPopup from '../category-popup/category-edit-popup.component';

const useStyles = makeStyles({
  iconMenuItem: {
    marginRight: '20px',
    width: '1.5rem',
  },
});


const Directory = () => {

  const { iconMenuItem } = useStyles();
  const dispatch = useDispatch();
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isCategoryPopupOpen, setIsCategoryOpenPopup] = useState(false);
  const [isCategoryEditPopupOpen, setIsCategoryEditOpenPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedItem, setSelectedItem] = useState();
  const [selectedIcon, setSelectedIcon] = useState();

  const handleClickOpenCategoryPopup = e => {
    e.preventDefault();
    setIsCategoryOpenPopup(true);
  }

  const handleClickOpenCategoryEditPopup = category => {
    setSelectedCategory(category);
    setIsCategoryEditOpenPopup(true);
  }

  const handleCloseCategoryPopup = () => {
    setIsCategoryOpenPopup(false);
  };

  const handleCloseCategoryEditPopup = () => {
    setIsCategoryEditOpenPopup(false);
    setSelectedCategory({});
  };
  
  const handleClickOpenDetailPopup = item => {
    dispatch(setItem(item));
    dispatch(fetchItemCategoriesStart(item.id));
    setSelectedItem(item);
    setSelectedIcon(getStatusIcon(item.status, iconMenuItem));
    setIsDetailPopupOpen(true);
  };

  const handleCloseDetailPopup = () => {
    setIsDetailPopupOpen(false);
  };

  const handleClickOpenEditPopup = item => {
    dispatch(setItem(item));
    dispatch(fetchItemCategoriesStart(item.id));
    handleCloseDetailPopup();
    setSelectedItem(item);
    setSelectedIcon(getStatusIcon(item.status, iconMenuItem));
    setIsEditPopupOpen(true);
  };

  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
  };

  const handleClickDeleteItem = id => {
    handleCloseDetailPopup();
    dispatch(removeItem(id));
  };

  const handleEditItem = (categoryId, title, description, isTodo, status, color, index) => {
    setIsEditPopupOpen(false);
    dispatch(addNewItem(categoryId, selectedItem.id, title, description, isTodo, status, color, index));
  };
  
  return (
    <DirectoryContainer>
      <DirectoryFilter handleEditCategory={handleClickOpenCategoryEditPopup} />
      <DirectoryMenuContainer>
        <DirectoryList 
          handleClickOpenDetailPopup={handleClickOpenDetailPopup} 
          handleClickOpenEditPopup={handleClickOpenEditPopup}
          handleClickDeleteItem={handleClickDeleteItem}
        />
        <DetailPopup 
          open={isDetailPopupOpen}
          onCloseDetail={handleCloseDetailPopup}
          onOpenEdit={handleClickOpenEditPopup}
          onDeleteItem={handleClickDeleteItem}
          item={selectedItem && selectedItem.title.toUpperCase()}
          icon={selectedIcon}
        />
        <Popup1 open={isEditPopupOpen} handleClose={handleCloseEditPopup} label={selectedItem && selectedItem.title.toUpperCase()} icon={selectedIcon}>
          <ItemEdit handleClose={handleCloseEditPopup} handleSubmit={handleEditItem} />
        </Popup1>
        <CategoryPopup 
          open={isCategoryPopupOpen}
          handleClose={handleCloseCategoryPopup}
        />
        <CategoryEditPopup
          open={isCategoryEditPopupOpen}
          handleClose={handleCloseCategoryEditPopup}
          selectedCategory={selectedCategory.id}
        />
      </DirectoryMenuContainer>
        <div style={{display: 'flex'}}>
          <ButtonWithPopupWithSubmit label='+ entry' popupLabel='New entry' onOpenCategoryPopup={handleClickOpenCategoryPopup} />
          <Button onClick={handleClickOpenCategoryPopup} color="primary">
            + Category
          </Button>
        </div>
    </DirectoryContainer>
  );
}

export default Directory;
