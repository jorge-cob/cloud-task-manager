import React from 'react';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';

import { 
  selectDirectoryFilteredCategories, 
  selectDirectoryFilteredStatus, 
  selectDirectoryItems, 
  selectDirectoryIsTodoFiltered 
} from '../../redux/directory/directory.selectors';

import MenuItemWithButtons from '../menu-item-with-buttons/menu-item-with-buttons.component';
import ItemManagerItemMoreOptions from '../item-manager/item-manager-menu.component';

import { getStatusIcon } from '../directory/directory.helpers';

const useStyles = makeStyles({
  iconMenuItem: {
    marginRight: '20px',
    width: '1.5rem',
  },
});

const DirectoryList = ({ handleClickOpenDetailPopup, handleClickOpenEditPopup, handleClickDeleteItem}) => {
  let filteredItemCount = 0;
  const { iconMenuItem } = useStyles();


  const {items, filteredCategories, isTodoFilter, filteredStatus} = useSelector(createStructuredSelector({
    items: selectDirectoryItems,
    filteredCategories: selectDirectoryFilteredCategories,
    isTodoFilter: selectDirectoryIsTodoFiltered,
    filteredStatus: selectDirectoryFilteredStatus
  }));
  return (
    <div>
      { 
        items.map((item) => {
          const { id, title, categories, isTodo, status, ...otherItemsProps } = item;
          const isCategoryFiltered = filteredCategories.length == 0 
            || (categories 
            && categories.some(categoryId=> filteredCategories.indexOf(categoryId) !== -1) );
          const statusIsFiltered = (filteredStatus.length == 0 
            || filteredStatus.indexOf(item.status) !== -1
            );
          const isTodoFiltered = statusIsFiltered 
          && (item.isTodo && isTodoFilter) 
          || !isTodoFilter;
          const isFiltered = isCategoryFiltered && isTodoFiltered;
          const icon = item.isTodo && getStatusIcon(item.status, iconMenuItem);
          if (isFiltered) filteredItemCount++;
          return (
            isFiltered &&
            <MenuItemWithButtons 
              key={id} 
              title={title.toUpperCase()}
              onClick={() => handleClickOpenDetailPopup(item)}
              onEditButtonClick={() => handleClickOpenEditPopup(item)}
              onDeleteButtonClick={() => handleClickDeleteItem(id)}
              Icon={icon}
              Menu={ItemManagerItemMoreOptions}
              {...otherItemsProps}
            />
          )
        })
      }
      {
        filteredItemCount == 0 && 
        <div style={{height: '80px'}}> No categories with current filters </div>
      }
    </div>
  );
};

export default DirectoryList;
