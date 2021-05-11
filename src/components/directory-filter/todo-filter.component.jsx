import React from 'react';
import { useDispatch } from 'react-redux';

import { addStatusFilter, removeStatusFilter, setFilterType } from '../../redux/directory/directory.actions';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { TodoMenuContainer, TodoStatusContainer } from './filter.styles';

const TodoFilter = (props) => {
  const { filteredStatus, filterType } = props;
  const dispatch = useDispatch();

  const handleToggleStatus = statusId => {
    if (!filteredStatus.includes(statusId)) {
      dispatch(addStatusFilter(statusId));
    } else {
      dispatch(removeStatusFilter(statusId));
    }
  };

  const handleChangeFilterType =  (event, newFilterType) => {
    const newType = newFilterType ? newFilterType : 'all';
    dispatch(setFilterType(newType));
  }

  return (
      <TodoMenuContainer>
        <ToggleButtonGroup
          value={filterType}
          exclusive
          onChange={handleChangeFilterType}
        >
          <ToggleButton value="all">
            All
          </ToggleButton>
          <ToggleButton value="regular">
            Regular
          </ToggleButton>
          <ToggleButton value="todo">
            To do
          </ToggleButton>
        </ToggleButtonGroup>
        { filterType === 'todo' && (
          <TodoStatusContainer>
            <FormControlLabel
              control={<Switch size="small" checked={filteredStatus.includes('pending')} onChange={() => handleToggleStatus('pending')} name="pending" />}
              label="Pending"
            />
            <FormControlLabel
              control={<Switch size="small" checked={filteredStatus.includes('done')} onChange={() => handleToggleStatus('done')} name="done" />}
              label="Done"
            />
            <FormControlLabel
              control={<Switch size="small" checked={filteredStatus.includes('discarded')} onChange={() => handleToggleStatus('discarded')} name="discarded" />}
              label="Discarded"
            />
          </TodoStatusContainer>     
        )}
      </TodoMenuContainer>
  );
};

export default TodoFilter;
