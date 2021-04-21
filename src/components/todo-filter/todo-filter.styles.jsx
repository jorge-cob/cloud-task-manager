import { Chip } from '@material-ui/core';
import styled from 'styled-components';

export const TodoMenuContainer = styled.div`
  margin-bottom: 30px;
`;

export const TodoChip = styled(Chip)`
  min-width: 100px;
  text-transform: capitalize;
`;

export const TodoChipContainer = styled.div`
  margin-bottom: 3px;
  margin-left: 20px;
`;

export const TodoStatusContainer = styled.div`
  flex-direction: column;
  width: 160px;
`;
