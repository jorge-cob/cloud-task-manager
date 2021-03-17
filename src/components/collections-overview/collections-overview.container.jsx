import React from 'react';
import { useSelector } from 'react-redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview); 

const CollectionsOverviewContainer = props => {
  const isLoading = useSelector(selectIsCollectionFetching);
  return (          
    <CollectionsOverviewWithSpinner isLoading={isLoading} {...props} />
  );
};

export default CollectionsOverviewContainer;
