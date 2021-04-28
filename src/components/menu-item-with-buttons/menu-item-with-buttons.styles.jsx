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
  margin: 15px 0;
  overflow: hidden;
  visibility: ${({ hidden }) => (hidden ? 'hidden' : 'visible')};
 
`;

export const ContentContainer = styled.div`
  height: 50px;
  padding: 0 25px;
  align-items: center;
  justify-content: center;
  opacity: 1;
  display: flex;
`;

export const ContentTitle = styled.span`
  font-weight: bold;
  font-size: 22px;
  color: #4a4a4a;
`;

export const ButtonHolder = styled.div`
  display: flex;
`;
