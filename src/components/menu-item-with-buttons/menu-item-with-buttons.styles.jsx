import styled from 'styled-components';

export const MenuItemContainer = styled.div`
  height: ${({ size }) => (size ? '380px' : '240px')};
  min-width: 100%;
  height:   50px;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  margin: 0 7.5px 15px;
  overflow: hidden;

  &:hover {
		cursor: pointer;
		& .background-image {
			transform: scale(1.1);
			transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
		}
		& .content {
			opacity: 0.9;
		}
	}
	&:first-child {
    margin-right: 7.5px;
  }
  &:last-child {
    margin-left: 7.5px;
  }
`;


export const ContentContainer = styled.div`
  height: 50px;
  padding: 0 25px;
  align-items: center;
  justify-content: center;
  opacity: 1;
`;

export const ContentTitle = styled.span`
  font-weight: bold;
  font-size: 22px;
  color: #4a4a4a;
`;

export const ButtonHolder = styled.div`
  display: flex;
`;
