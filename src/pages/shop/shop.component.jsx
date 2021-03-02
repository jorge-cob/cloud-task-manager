import React, { useEffect, useState } from 'react';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

import SHOP_DATA from './shop.data.js';

const ShopPage = () => {
  const [collections, setCollections] = useState([]);
  useEffect(()=> {
    setCollections(SHOP_DATA);
  }, []);
  return (
    <div className='shop-page'>
      {
        collections.map(({id, ...otherCollectionProps}) => (
          <CollectionPreview key={id} {...otherCollectionProps} />
        ))
      }
    </div>
  );
}

export default ShopPage;