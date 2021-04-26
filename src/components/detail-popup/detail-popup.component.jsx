import React from 'react';
import ItemDetail from '../item-detail/item-detail.component';
import Popup1 from '../popup/popup.component';

const DetailPopup = props => {
  const {
    open,
    onCloseDetail,
    onOpenEdit,
    item,
    icon
  } = props;
  return (
    <Popup1 open={open} handleClose={onCloseDetail} label={item} icon={icon}>
      <ItemDetail handleClose={onCloseDetail} onEditMode={onOpenEdit} />
    </Popup1>
  );
};

export default DetailPopup;
