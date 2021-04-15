import React, { useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';  
import Checkbox from '@material-ui/core/Checkbox';

import { selectCategoryItems } from '../../redux/category/category.selectors';


const ItemInput = ({ handleSubmit, handleClose }) => {
  const {categories} = useSelector(createStructuredSelector({
    categories: selectCategoryItems
  }));
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ isTodo, setIsTodo ] = useState(false);
  const [ status, setStatus ] = useState('pending');
  const [ category, setCategory] = useState();
  const [titleErrorText, setTitleErrorText] = React.useState("");


  const onSubmit = () => {
    if (!title) {
      setTitleErrorText("Please enter title");
    } else {
      setTitleErrorText("");
      handleSubmit(category, title, description, isTodo, status);
    }

  };
  return (
    <div>
    <form  noValidate>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          fullWidth
          value={title}
          onChange={e => setTitle(e.target.value)}
          required={true}
          error={!!titleErrorText}
          helperText={titleErrorText}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          multiline
          rows={3}
          fullWidth
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <InputLabel style={{margin: '20px 0px 5px 0px'}}>Is it a To Do?</InputLabel>

        <Checkbox
          checked={isTodo}
          onChange={e => setIsTodo(e.target.checked)}
        />

        { isTodo && (
          <div>
            <InputLabel style={{margin: '20px 0px 5px 0px'}}>Status</InputLabel>
            <Select
              native
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value='pending'>Pending</option>
              <option value='done'>Done</option>
              <option value='discarded'>Discarded</option>
            </Select>
          </div>
        )}

        <InputLabel style={{margin: '20px 0px 5px 0px'}}>Category</InputLabel>
        <Select
          native
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
        {
          categories && Object.entries(categories).map(k => {
            return (
              <option key={k} value={k.id} >{k}</option>
            )
          }
          )
        }
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
      </form>
    </div>
  );
};

export default ItemInput;