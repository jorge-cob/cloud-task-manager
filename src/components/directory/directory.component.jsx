import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { addItemStart, removeItem } from '../../redux/directory/directory.actions';
import { fetchItemCategoriesStart, setItem } from '../../redux/item/item.actions';

import Popup1 from '../popup/popup.component';
import ItemEdit from '../item-edit/item-edit.component';
import ButtonWithPopupWithSubmit from '../button-with-popup-with-submit/button-with-popup-with-submit.component';
import CategoryPopup from '../category-popup/category-popup.component';

import { DirectoryMenuContainer, DirectoryContainer, FooterButtonContainer, FilterContainer } from './directory.styles';
import DirectoryList from '../directory-list/directory-list.component';
import DetailPopup from '../detail-popup/detail-popup.component';

import { getStatusIcon } from './directory.helpers';
import DirectoryFilter from '../directory-filter/directory-filter.component';
import CategoryEditPopup from '../category-popup/category-edit-popup.component';
import CustomButton from '../custom-button/custom-button.component';

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

  const handleEditItem = (categoryId, title, description, isTodo, status, color, index, dateTime) => {
    setIsEditPopupOpen(false);
    dispatch(addItemStart({categories: categoryId, id:selectedItem.id, title, description, isTodo, status, color, index, dateTime}));
  };
  
  return (
    <DirectoryContainer>
      <FilterContainer>
        <DirectoryFilter handleEditCategory={handleClickOpenCategoryEditPopup} />
      </FilterContainer>
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
      <FooterButtonContainer>
        <ButtonWithPopupWithSubmit label='+ entry' popupLabel='New entry' />
        <CustomButton onClick={handleClickOpenCategoryPopup}>
          + Category
        </CustomButton>
      </FooterButtonContainer>
    </DirectoryContainer>
  );
}

export default Directory;
