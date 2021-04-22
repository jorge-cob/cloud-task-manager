import React from 'react';
import { MenuItem, Box, makeStyles } from '@material-ui/core';
import { ReactComponent as IconDelete } from '../../assets/svg/iconDelete24x24.svg';

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

const ItemMenuDeleteInstance = React.forwardRef((props, ref) => {

  const { onDelete } = props;
  const { menuItem, iconMenuItem } = useBox();


  const handleClick = (e) => {
    e.stopPropagation();
    onDelete(e);
  };
  return (
    <MenuItem button ref={ref} onClick={handleClick} style={{ width: '12rem', color: '#666' }}>
      <Box component="span" className={menuItem}>
        <IconDelete fill="#666" className={iconMenuItem} />
        Delete
      </Box>
    </MenuItem>
  );
});

export default ItemMenuDeleteInstance;
