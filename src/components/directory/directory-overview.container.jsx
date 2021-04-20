import React from 'react';
import { useSelector } from 'react-redux';

import { selectIsDirectoryFetching } from '../../redux/directory/directory.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import Directory from './directory.component';


const DirectoryOverviewWithSpinner = WithSpinner(Directory); 

const DirectoryOverviewContainer = props => {
  const isLoading = useSelector(selectIsDirectoryFetching);

  return (          
    <DirectoryOverviewWithSpinner isLoading={isLoading} {...props} />
  );
};

export default DirectoryOverviewContainer;
