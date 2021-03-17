import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {
  SignInContainer,
  ButtonsBarContainer,
  SignInTitle
} from './sign-in.styles';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(emailSignInStart({email, password}));
    setEmail('');
    setPassword('');
  };

  return (
    <SignInContainer>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
      
        <FormInput 
          name='email' 
          type='email' 
          value={email} 
          handleChange={e => setEmail(e.target.value)}
          label='email'
          required 
        />

        <FormInput 
          name='password' 
          type='password' 
          value={password} 
          handleChange={e => setPassword(e.target.value)}
          label='password'
          required 
        />
        <ButtonsBarContainer>
          <CustomButton type='submit'>
            Sign in
          </CustomButton>

          <CustomButton 
            type='button'
            onClick={() => dispatch(googleSignInStart())} 
            isGoogleSignIn
          >
            Sign in with Google
          </CustomButton>
        </ButtonsBarContainer>
      </form>
    </SignInContainer>
  );
}

export default SignIn;