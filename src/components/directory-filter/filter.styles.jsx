import styled from 'styled-components';
import { ReactComponent as IconClose } from '../../assets/svg/close-icon-cross.svg';
import { ReactComponent as IconEdit } from '../../assets/svg/iconEdit24x24.svg';

export const CategoryMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100px;
`;

export const CategoryChip = styled.div`
  max-width: 156px;
  min-width: 30px;
  height: 28px;
  text-transform: capitalize;
  text-align: center;
  margin-top: 5px;
  margin-right: 5px;
  display: flex;
  padding: 0px 10px 0px 10px;
  border: 1px solid transparent;
  border-radius: 14px;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  &:hover {
    color: darkgray;
    cursor: pointer;
    border: 1px solid black;	
		& .content {
			opacity: 0.9;
		}
	}
`;

export const FilteredCategoryChip = styled.div`
  max-width: 156px;
  height: 28px;
  text-transform: capitalize;
  background-color: ${props => props.backgroundColor ?  props.backgroundColor : 'f2f0eb'};
  text-align: center;
  margin-top: 5px;
  margin-left: 5px;
  display: flex;
  padding: 0px 10px 0px 10px;
  border: 1px solid transparent;
  border-radius: 14px;
  font-size: 14px;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    border: 1px solid black;	
	}
`;

export const TodoMenuContainer = styled.div`
  position: absolute;
  left: 75%;
  top: 170px;
`;

export const TodoStatusContainer = styled.div`
  flex-direction: column;
  width: 160px;
  position: absolute;
  right: -110px;
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
  color: ${props => props.fill}
`;

export const IconEditItem = styled(IconEdit)`
  width: 20px;
  padding: 2px 4px 2px 4px;
  fill:  ${props => props.fill ? props.fill : 'grey'};
  &:hover {
    width: 22px;
    padding: 0px;
    fill: ${props => props.fill ? props.fill : 'black'};
  }
`;
