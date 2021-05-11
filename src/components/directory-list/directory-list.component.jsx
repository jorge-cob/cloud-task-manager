import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';

import {
  closestCenter,
  DndContext, 
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'; 


import MenuItemWithButtons from '../menu-item-with-buttons/menu-item-with-buttons.component';
import SortableMenuItemWithButtons from '../menu-item-with-buttons/sortable-menu-item-with-buttons.component';
import ItemManagerItemMoreOptions from '../item-manager/item-manager-menu.component';

import { getStatusIcon } from '../directory/directory.helpers';

import { 
  selectDirectoryFilteredCategories, 
  selectDirectoryFilteredStatus, 
  selectDirectoryItems, 
  selectDirectoryFilterType
} from '../../redux/directory/directory.selectors';

import { setItems } from '../../redux/directory/directory.actions';

import { itemIsBeingShown } from '../../redux/directory/directory.utils';

const useStyles = makeStyles({
  iconMenuItem: {
    marginRight: '20px',
    width: '1.5rem',
  },
});

const DirectoryList = ({ handleClickOpenDetailPopup, handleClickOpenEditPopup, handleClickDeleteItem}) => {
  const { iconMenuItem } = useStyles();
  const dispatch = useDispatch();

  const {items, filteredCategories, filterType, filteredStatus} = useSelector(createStructuredSelector({
    items: selectDirectoryItems,
    filteredCategories: selectDirectoryFilteredCategories,
    filterType: selectDirectoryFilterType,
    filteredStatus: selectDirectoryFilteredStatus
  }));
  
  const [draggableItems, setDraggableItems] = useState([]);
  const [draggingItem, setDraggingItem] = useState({});

  useEffect(() => {
    setDraggableItems(items);
  }, [items])
 

  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={draggableItems}
        strategy={verticalListSortingStrategy}
      >
        { 
          draggableItems.map(item => {
            const { id, title, isTodo, status, ...otherItemsProps } = item;
            const showItem = itemIsBeingShown(item, filteredCategories, filteredStatus, filterType);
            const icon = isTodo && getStatusIcon(status, iconMenuItem);
            const isDraggingItem = activeId === id; 

            return (
              showItem && 
                <SortableMenuItemWithButtons 
                  title={title.toUpperCase()}
                  onClick={() => handleClickOpenDetailPopup(item)}
                  onEditButtonClick={() => handleClickOpenEditPopup(item)}
                  onDeleteButtonClick={() => handleClickDeleteItem(id)}
                  Icon={icon}
                  Menu={ItemManagerItemMoreOptions}
                  key={id}
                  id={id}
                  {...otherItemsProps}
                  hidden={isDraggingItem}
                />
            )
          })
        }

      </SortableContext>
      <DragOverlay>
        {activeId ? 
          <MenuItemWithButtons 
            id={activeId} 
            title={draggingItem.title.toUpperCase()}
            onClick={() => {}}
            onEditButtonClick={() => {}}
            onDeleteButtonClick={() => {}}
            Icon={draggingItem.isTodo && getStatusIcon(draggingItem.status, iconMenuItem)}
            Menu={ItemManagerItemMoreOptions} 
          /> 
        : null}
      </DragOverlay>
    </DndContext>
     
  );

  function handleDragStart(event) {
    const {active} = event;
    const selectedItem = items.filter(obj => obj.id === active.id);
    setDraggingItem(selectedItem[0]);
    setActiveId(active.id);
  }
  
  function handleDragEnd(event) {
    const {active, over} = event;
    if (active.id !== over.id) {
        const destinationIndex = over.data.current.sortable.index;
        const destinationItemIndex = draggableItems[destinationIndex].index;
        const sourceIndex = active.data.current.sortable.index;
        const goesUp = sourceIndex > destinationIndex;
        let newItemIndex = 0;
        if (goesUp) {
          if (destinationIndex === 0) {
            newItemIndex = draggableItems[destinationIndex].index + 100000000;
          } else {
            newItemIndex = (destinationItemIndex + draggableItems[destinationIndex - 1].index) / 2;
          }
        } else {
          if (destinationIndex === draggableItems.length - 1) {
            newItemIndex = draggableItems[destinationIndex].index - 100000000; 
          } else {
            newItemIndex = (destinationItemIndex + draggableItems[destinationIndex + 1].index) / 2;
          }
        }
        const newItemArray = arrayMove(draggableItems, sourceIndex, destinationIndex);
        newItemArray[destinationIndex].index = newItemIndex;
        dispatch(setItems(newItemArray, active.id, newItemIndex)); 
    }
    setActiveId(null);
  }
};

export default DirectoryList;
