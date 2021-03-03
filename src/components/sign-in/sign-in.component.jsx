import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    setEmail('');
    setPassword('');
  }

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
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
        <div className='buttons'>
          <CustomButton type='submit'>
            Sign in
          </CustomButton>

          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default SignIn;