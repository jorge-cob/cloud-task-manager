import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import MenuItemWithButtons from './menu-item-with-buttons.component'

const SortableMenuItemWithButtons = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <MenuItemWithButtons ref={setNodeRef} style={style} {...attributes} {...listeners} {...props} />
  )
};

export default SortableMenuItemWithButtons;
