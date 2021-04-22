import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ItemMenuDeleteInstance from '../item-menu/item-menu-item-delete.component';
import ItemMenuEditInstance from '../item-menu/item-menu-item-edit.component';
import ItemMenu from '../item-menu/item-menu.component';

const useStyles = makeStyles({
  cardIcon: {
    width: '1.5rem',
    height: '1.5rem',
    padding: 0,
    '& >span': {
      width: 'auto',
      '&> svg': {
        height: '1.5rem',
        width: 'auto',
      },
    },
  },
});

function ItemManagerItemMoreOptions(props) {
  const { onEdit, onDelete } = props;
  const [optionsOpen, setOptionsOpen] = useState(false);

  const classes = useStyles();

  const handleClick = e => {
    e.stopPropagation();
    setOptionsOpen(true);
  };
  const handleClose = () => {
    setOptionsOpen(false);
  };

  return (
    <ItemMenu
      open={optionsOpen}
      onClick={handleClick}
      onClose={handleClose}
      className={classes.cardIcon}
    >
      <ItemMenuEditInstance onClick={onEdit} handleClose={handleClose} />
      <ItemMenuDeleteInstance onDelete={onDelete} />
    </ItemMenu>
  );
}

export default ItemManagerItemMoreOptions;
