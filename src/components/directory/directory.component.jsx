import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

import { ReactComponent as IconPending } from '../../assets/svg/calendar-regular.svg';
import { ReactComponent as IconDone } from '../../assets/svg/calendar-check-regular.svg';
import { ReactComponent as IconDiscarded } from '../../assets/svg/calendar-times-regular.svg';

import { DirectoryMenuContainer, DirectoryContainer } from './directory.styles';

const useStyles = makeStyles({
  iconMenuItem: {
    marginRight: '20px',
    width: '1.5rem',
  },
});

const Directory = () => {

  const {items, filteredCategories, isTodoFilter, filteredStatus} = useSelector(createStructuredSelector({
    items: selectDirectoryItems,
    filteredCategories: selectDirectoryFilteredCategories,
    isTodoFilter: selectDirectoryIsTodoFiltered,
    filteredStatus: selectDirectoryFilteredStatus
  }));

  const { iconMenuItem } = useStyles();

  const getStatusIcon = status => {
    switch (status) {
      case 'pending':
        return <IconPending className={iconMenuItem} fill={'red'} />;
      case 'discarded':
        return <IconDiscarded className={iconMenuItem} />
      case 'done':
        return <IconDone className={iconMenuItem} />
      default:
        return null;
    }
  }
  
  const dispatch = useDispatch();

  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isCategoryPopupOpen, setIsCategoryOpenPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [selectedIcon, setSelectedIcon] = useState({});

  const handleClickOpenCategoryPopup = e => {
    e.preventDefault();
    setIsCategoryOpenPopup(true);
  }

  const handleCloseCategoryPopup = () => {
    setIsCategoryOpenPopup(false);
  };
  
  const handleClickOpenDetailPopup = item => {
    dispatch(setItem(item));
    dispatch(fetchItemCategoriesStart(item.id));
    setSelectedItem(item);
    setSelectedIcon(getStatusIcon(item.status));
    setIsDetailPopupOpen(true);
  };

  const handleClickOpenEditPopup = item => {
    dispatch(setItem(item));
    dispatch(fetchItemCategoriesStart(item.id));
    handleCloseDetailPopup();
    setSelectedItem(item);
    setIsEditPopupOpen(true);
  };

  const handleCloseDetailPopup = () => {
    setIsDetailPopupOpen(false);
  };

  const handleEditItem = (categoryId, title, description, isTodo, status) => {
    setIsEditPopupOpen(false);
    dispatch(addNewItem(categoryId, selectedItem.id, title, description, isTodo, status));
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
            const icon = item.isTodo && getStatusIcon(item.status);
          return (
            isFiltered 
            && isTodoFiltered &&
            <MenuItemWithButtons 
              key={id} 
              title={title.toUpperCase()}
              onClick={() => handleClickOpenDetailPopup(item)}
              onEditButtonClick={() => handleClickOpenEditPopup(item)}
              onDeleteButtonClick={() => handleClickDeleteItem(id)}
              Icon={icon}
              {...otherItemsProps}
            />
          )
        })
        }
        <Popup1 open={isDetailPopupOpen} handleClose={handleCloseDetailPopup} label={selectedItem && selectedItem.title.toUpperCase()} icon={selectedIcon}>
          <ItemDetail handleClose={handleCloseDetailPopup} onEditMode={handleClickOpenEditPopup} />
        </Popup1>
        <Popup1 open={isEditPopupOpen} handleClose={handleCloseEditPopup} label={selectedItem && selectedItem.title.toUpperCase()} icon={selectedIcon}>
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
