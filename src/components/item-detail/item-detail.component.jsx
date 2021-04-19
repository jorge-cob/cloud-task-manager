import React from 'react';

import {
  Button,
  DialogActions,
  DialogContent,
  Typography
} from '@material-ui/core';
import { useSelector } from 'react-redux';

const ItemDetail = ({ handleClose }) => {
  
  const { item, categories } = useSelector(state => state.item);
  return (
    <div>
      <form  noValidate>
        <DialogContent>
          <Typography gutterBottom>
            {item.description}
          </Typography>
          {
            categories && categories.length ? categories.map(category => {
              return (
                <span key={category.id}> {category.title} </span>
              )
            })
            : <span> No selected categories </span>
          }
  
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
