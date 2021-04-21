import React from 'react';

import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { removeItem } from '../../redux/directory/directory.actions';

const useStyles = makeStyles(theme => {
  const light = theme.palette.type === "light";
  const bottomLineColor = light
    ? "rgba(0, 0, 0, 0.42)"
    : "rgba(255, 255, 255, 0.7)";
  return {
    underline: {
      '&:hover': {
        borderBottom: `1px solid ${bottomLineColor}`,
        transform: "scaleX(0)",
      }
    }
  };
});

const ItemDetail = ({ handleClose, onEditMode }) => {
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const { item, categories } = useSelector(state => state.item);
  const { id, title, description } = item;

  const handleDeleteItem = () => {
    dispatch(removeItem(id));
  };

  return (
    <div>
      <form  noValidate>
      <DialogContent>
      <TextField
        inputProps={{ readOnly: true }}
        InputProps={{ classes }}
        fullWidth
        value={title}
      />
      <TextField
        inputProps={{ readOnly: true }}
        InputProps={{ classes }}
        margin="dense"
        multiline
        fullWidth
        value={description || 'No content'}
      />
  
    </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={() => onEditMode(item, item.id, item.title)} color="primary">
            Edit
          </Button>
          <Button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDeleteItem() }}>
            Delete
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default ItemDetail;
