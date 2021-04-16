import React from 'react';

import {
  Button,
  DialogActions,
  DialogContent,
  Typography
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectItemDetails } from '../../redux/directory/directory.selectors';


const ItemDetail = ({ handleClose, itemId }) => {
  
  const itemDetails = useSelector(selectItemDetails(itemId));
  console.log('itemDetails', itemDetails);
  return (
    <div>
      <form  noValidate>
        <DialogContent>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default ItemDetail;
