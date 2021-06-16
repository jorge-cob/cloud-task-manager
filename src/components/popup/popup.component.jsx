import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';


const Popup1 = ({ children, open, handleClose, label, icon, textColor, backgroundColor = '#FFF'}) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" style={{width: 'max-content',}}>
        {icon}<span style={{backgroundColor: backgroundColor, color: textColor, padding: '3px 8px 3px 8px', borderRadius: 15}}>{label} </span>
      </DialogTitle>
      {children}
    </Dialog>
  );
};

export default Popup1;