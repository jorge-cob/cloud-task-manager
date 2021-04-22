import React from 'react';
import { MenuItem, Box, makeStyles } from '@material-ui/core';
import { ReactComponent as IconEdit } from '../../assets/svg/iconEdit24x24.svg';

const useBox = makeStyles({
  menuItem: {
    height: '1.5rem',
    display: 'flex',
    alignItems: 'center',
  },
  iconMenuItem: {
    marginRight: '20px',
    width: '1.5rem',
  },
});

const ItemMenuEditInstance = React.forwardRef((props, ref) => {
  const { menuItem, iconMenuItem } = useBox();
  const { onClick, handleClose } = props;

  const handleEdit = e => {
    e.stopPropagation();
    onClick(e);
    handleClose();
  };

  return (
    <MenuItem button onClick={handleEdit} style={{ width: '12rem', color: '#666' }}>
      <Box component="span" className={menuItem}>
        <IconEdit fill="#666" className={iconMenuItem} />
        Edit
      </Box>
    </MenuItem>
  );
});


export default ItemMenuEditInstance;
