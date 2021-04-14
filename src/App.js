import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import Header from './components/header/header.component'


import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';


const App = () => {
  const dispatch = useDispatch();
  
  const {user} = useSelector(createStructuredSelector({
    user: selectCurrentUser,
  }));

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route 
          exact 
          path='/' 
          render={() => 
            user ? (
              <HomePage />
            ) : (
              <SignInAndSignUpPage />
            )
          } 
        />
        <Route 
          exact 
          path='/signin' 
          render={() => 
            user ? (
              <Redirect to='/' />
            ) : (
              <SignInAndSignUpPage />
            )
          } 
        />
      </Switch>
    </div>
  );
}

export default App;
