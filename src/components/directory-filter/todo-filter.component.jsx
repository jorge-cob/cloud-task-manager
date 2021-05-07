import React from 'react';
import { useDispatch } from 'react-redux';

import { addStatusFilter, removeStatusFilter, setFilterType } from '../../redux/directory/directory.actions';

import { TodoChip, TodoMenuContainer, TodoStatusContainer } from './filter.styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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

  const handleChangeFilterType = e => {
    dispatch(setFilterType(e.target.value));
  }

  return (
      <TodoMenuContainer>
      <RadioGroup aria-label="gender" name="gender1" value={filterType} onChange={handleChangeFilterType}>
        <FormControlLabel value="all" control={<Radio />} label="All" />
        <FormControlLabel value="regular" control={<Radio />} label="Regular" />
        <FormControlLabel value="todo" control={<Radio />} label="To do" />
      </RadioGroup>
            { filterType === 'todo' && (
              <TodoStatusContainer>
                  <TodoChip 
                    key='Pending'
                    onClick={() => handleToggleStatus('pending')}
                    isFiltering={filteredStatus.includes('pending')}
                  >
                    Pending
                  </TodoChip>
                  <TodoChip 
                    key='Done'
                    onClick={() => handleToggleStatus('done')}
                    isFiltering={filteredStatus.includes('done')}
                  >
                    Done
                  </TodoChip>
                  <TodoChip 
                    key='Discarded'
                    onClick={() => handleToggleStatus('discarded')}
                    isFiltering={filteredStatus.includes('discarded')}
                  >
                    Discarded
                  </TodoChip>
              
              </TodoStatusContainer>     
            )}
      </TodoMenuContainer>
  );
};

export default TodoFilter;
