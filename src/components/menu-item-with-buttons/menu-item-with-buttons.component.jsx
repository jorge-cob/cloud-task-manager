import { FormControlLabel, Checkbox } from '@material-ui/core';
import React, { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCategoryItems } from '../../redux/category/category.selectors';
import { addNewItem } from '../../redux/directory/directory.actions';

import {
  MenuItemContainer,
  ContentContainer,
  ContentTitle,
  ButtonHolder
} from './menu-item-with-buttons.styles';

const MenuItemWithButtons = forwardRef(({ onClick, categories, onEditButtonClick, onDeleteButtonClick, Icon, Menu, hidden, item, ...props }, ref) => {
  const { title, id, status, isTodo } = item;
  const dispatch = useDispatch();
  const handleEditButtonClick = e => {
    e.stopPropagation();
    onEditButtonClick();
  };
  function handleItemIsDone() {
    dispatch(addNewItem({...item, status: 'done'}));
  }
  const handleDeleteItem = e => {
    onDeleteButtonClick();
  }
  const {allCategories} = useSelector(createStructuredSelector({
    allCategories: selectCategoryItems,
  }));

  return (
    <MenuItemContainer
      onClick={e => onClick(e)}
      ref={ref}
      {...props}
      hidden={hidden}
    >
      {
        categories && categories.map(cat => {
          const fullCat = allCategories.find(
            item => item.id === cat
          ) 
          return (
            <div key={fullCat?.id || ref } style={{height: '100%', width: '18px', backgroundColor: `${fullCat?.color || 'white'}`}}></div>      
          )
        }
        )
      }
      <ContentContainer>
        {Icon}
        <ContentTitle>{ title }</ContentTitle>
      </ContentContainer>
      <ButtonHolder>
        {
          isTodo && status === 'pending' &&
          <FormControlLabel
            control={<Checkbox checked={false} onChange={handleItemIsDone} name="checkedA" onClick={e => e.stopPropagation()} /> }
            label=''
          />
        }
        <Menu id={id} onEdit={handleEditButtonClick} onDelete={e => { if (window.confirm('Are you sure you wish to delete this item?')) handleDeleteItem(e) }} />
      </ButtonHolder>
    </MenuItemContainer>
  )
});
export default MenuItemWithButtons;

