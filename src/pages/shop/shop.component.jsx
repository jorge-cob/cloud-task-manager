import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotTopMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview); 
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let unsubscribeFromSnapshot = null;
  
  useEffect(() => {
    const collectionRef = firestore.collection('collections');

    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotTopMap(snapshot);
      dispatch(updateCollections(collectionsMap));
      setLoading(false);
    });

  }, []);

  return (
    <div className='shop-page'>
      <Route 
        exact 
        path={`${match.path}`} 
        render={props => (
          <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
        )} 
      />
      <Route 
        path={`${match.path}/:collectionId`} 
        render={props => (
          <CollectionPageWithSpinner isLoading={loading} {...props} />
        )}
      />
    </div>
  );
};

export default ShopPage;
