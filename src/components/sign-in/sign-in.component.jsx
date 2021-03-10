import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import {
  SignInContainer,
  ButtonsBarContainer,
  SignInTitle
} from './sign-in.styles';

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
    } catch (err) {
      console.log(err);
    }
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

          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </ButtonsBarContainer>
      </form>
    </SignInContainer>
  );
}

export default SignIn;