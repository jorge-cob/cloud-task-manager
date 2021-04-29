import React from 'react';
import { useDispatch } from 'react-redux';

import { addStatusFilter, removeStatusFilter, toggleTodoFilter } from '../../redux/directory/directory.actions';

import { TodoChip, TodoMenuContainer, TodoStatusContainer } from './filter.styles';


const TodoFilter = (props) => {
  const { filteredStatus, isTodo } = props;
  const dispatch = useDispatch();


  const handleToggleStatus = statusId => {
    if (!filteredStatus.includes(statusId)) {
      dispatch(addStatusFilter(statusId));
    } else {
      dispatch(removeStatusFilter(statusId));
    }
  };

  const handleToggleIsTodo = () => {
    dispatch(toggleTodoFilter());
  };
  return (
      <TodoMenuContainer>
            <TodoChip 
              key='isTodo'
              onClick={handleToggleIsTodo}
              isFiltering={isTodo}
            >
             Is To Do
            </TodoChip>
            { isTodo && (
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
