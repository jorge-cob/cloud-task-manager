import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';


const Popup1 = ({ children, open, handleClose, label}) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{label}</DialogTitle>
      {children}
    </Dialog>
  );
};

export default Popup1;