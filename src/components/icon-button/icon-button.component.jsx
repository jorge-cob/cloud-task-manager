import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const makedClassIconButton = makeStyles({
  root: {
    width: '3rem',
    height: '3rem',
    padding: '0.75rem',
    marginTop: props => props.marginTop,
    marginRight: props => props.marginRight,
    marginBottom: props => props.marginBottom,
    marginLeft: props => props.marginLeft,
  },
});

const IconButton48x48 = React.forwardRef((props, ref) => {
  const {
    children,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    fullWidth,
    color,
    ...restProps
  } = props;
  return (
    <IconButton
      ref={ref}
      color={!color ? 'primary' : 'inherit'}
      classes={makedClassIconButton({
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        fullWidth,
      })}
      {...restProps}
    >
      {children}
    </IconButton>
  );
});

IconButton48x48.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  marginTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fullWidth: PropTypes.bool,
  color: PropTypes.string,
};
IconButton48x48.defaultProps = {
  children: null,
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  fullWidth: false,
  color: null,
};

export default IconButton48x48;
