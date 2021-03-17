import React from 'react';
import { useSelector } from 'react-redux';

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionsPage from './collection.component';


const CollectionWithSpinner = WithSpinner(CollectionsPage); 

const CollectionPageContainer = props => {
  const isCollectionsLoaded = useSelector(selectIsCollectionsLoaded);
  return (          
    <CollectionWithSpinner isLoading={!isCollectionsLoaded} {...props}/>
  );
};

export default CollectionPageContainer;
