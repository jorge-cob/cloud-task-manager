import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Menu,
} from '@material-ui/core';
import { ReactComponent as IconMenuMoreOptions } from '../../assets/svg/iconMenuMoreOptions.svg';
import IconButton48x48 from '../icon-button/icon-button.component';


const StyledMenuItem = withStyles(() => ({
  paper: {
    backgroundColor: '#EEE',
  },
}))(Menu);

function ItemMenu (props) {
  const {
    children,
    IconChildren,
    colorIcon,
    className,
    Icon,
    open,
    onClick,
    onClose,
    iconProps,
    ...passedProps
  } = props;
  const iconRef = useRef();

  return (
    <div>
      <Icon
        className={className}
        aria-controls="simple-menu"
        aria-haspopup="true"
        color={colorIcon}
        ref={iconRef}
        onClick={onClick}
        {...iconProps}
      >
        <IconChildren />
      </Icon>
      <StyledMenuItem
        {...passedProps}
        open={open}
        onClose={onClose}
        anchorEl={() => iconRef.current}
      >
        {children}
      </StyledMenuItem>
    </div>
  );
}

ItemMenu.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  IconChildren: PropTypes.elementType,
  colorIcon: PropTypes.string,
  className: PropTypes.string,
  Icon: PropTypes.elementType,
  open: PropTypes.bool,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  iconProps: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
};
ItemMenu.defaultProps = {
  children: null,
  IconChildren: IconMenuMoreOptions,
  colorIcon: '#000',
  className: null,
  Icon: IconButton48x48,
  open: false,
  onClick: () => null,
  onClose: () => null,
  iconProps: {},
};

export default ItemMenu;
