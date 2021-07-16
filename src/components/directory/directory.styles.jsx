import styled from 'styled-components';

export const DirectoryMenuContainer = styled.div`

position:relative;
    height: 100%;
    width:100%; /* Sizing - any length */
    padding:60px 0 30px 0; /* Header height and footer height */
    margin:0 auto 0 auto; /* Center content */
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    -o-box-sizing:border-box;
    -ms-box-sizing:border-box;
    box-sizing:border-box;


`;

export const DirectoryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FooterButtonContainer = styled.div`
  width: 100%;
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #f2f0eb;
`;

export const FilterContainer = styled.div`
  width: 100%;
  position: sticky; 
  top: 60px;
  height: 120px !important;
  z-index: 5;
  background-color: #f2f0eb;
`;
