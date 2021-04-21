import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addStatusFilter, removeStatusFilter, toggleTodoFilter } from '../../redux/directory/directory.actions';
import { selectDirectoryFilteredStatus, selectDirectoryIsTodoFiltered } from '../../redux/directory/directory.selectors';

import { TodoChip, TodoMenuContainer, TodoChipContainer, TodoStatusContainer } from './todo-filter.styles';


const TodoFilter = () => {

  const dispatch = useDispatch();

  const isTodo = useSelector(selectDirectoryIsTodoFiltered);
  const filteredStatus = useSelector(selectDirectoryFilteredStatus);

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
              label='To Do'
              color={ `${isTodo ? 'primary' : 'secondary'}`}
              onClick={handleToggleIsTodo}
            />
            { isTodo && (
              <TodoStatusContainer>
                <TodoChipContainer>
                  <TodoChip 
                    key='Pending'
                    label='Pending'
                    color={`${filteredStatus.includes('pending') ? 'primary' : 'secondary'}`}
                    onClick={() => handleToggleStatus('pending')}
                    size='small'
                  />
                </TodoChipContainer>
                <TodoChipContainer>
                  <TodoChip 
                    key='Done'
                    label='Done'
                    color={`${filteredStatus.includes('done') ? 'primary' : 'secondary'}`}
                    onClick={() => handleToggleStatus('done')}
                    size='small'
                  />
                </TodoChipContainer>
                <TodoChipContainer>
                  <TodoChip 
                    key='Discarded'
                    label='Discarded'
                    color={`${filteredStatus.includes('discarded') ? 'primary' : 'secondary'}`}
                    onClick={() => handleToggleStatus('discarded')}
                    size='small'
                  />
                </TodoChipContainer>
              </TodoStatusContainer>     
            )}
      </TodoMenuContainer>

  );
}

export default TodoFilter;
