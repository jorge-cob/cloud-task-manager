import styled from 'styled-components';
import { ReactComponent as IconClose } from '../../assets/svg/close-icon-cross.svg';

export const CategoryMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100px;
`;

export const CategoryChip = styled.div`
  max-width: 140px;
  min-width: 30px;
  height: 24px;
  text-transform: capitalize;
  text-align: center;
  color: gray;
  margin-top: 5px;
  margin-right: 15px;
  &:hover {
    color: darkgray;
    cursor: pointer;
		& .content {
			opacity: 0.9;
		}
	}
`;

export const FilteredCategoryChip = styled.div`
  max-width: 140px;
  height: 24px;
  text-transform: capitalize;
  background-color: #d3d3d3;
  text-align: center;
  margin-top: 5px;
  margin-left: 5px;
  display: flex;
  padding: 0px 10px 0px 10px;
  border: 1px solid transparent;
  border-radius: 14px;
  font-size: 14px;

  &:hover {
    cursor: pointer;
    border: 1px solid black;	
	}
`;

export const TodoMenuContainer = styled.div`
  position: absolute;
  left: 80%;
  top: 170px;
`;

export const TodoStatusContainer = styled.div`
  flex-direction: column;
  width: 160px;
  position: absolute;

`;

export const FilterContainer = styled.div`
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: row wrap;
  flex-direction: row;
  align-items: center;
  width: 80%;
`;


export const CategoryFilterContainer = styled.div`
  height: 160px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const TodoFilterContainer = styled.div`
  height: 160px;
`;

export const IconCloseItem = styled(IconClose)`
  width: 20px;
  padding: 0px 4px 0px 4px;
`;
