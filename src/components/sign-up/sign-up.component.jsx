import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {
  SignUpTitle,
  SignUpContainer
} from './sign-up.styles';
import { signUpStart } from '../../redux/user/user.actions';

const SignUp = () => {
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    if(password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    dispatch(signUpStart({email, password, displayName}));
  };


  return (
    <SignUpContainer>
      <SignUpTitle> I do not have an account </SignUpTitle>
      <span> Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          handleChange={e => setDisplayName(e.target.value)}
          label='Display Name'
          required
        />
        <FormInput
          type='text'
          name='email'
          value={email}
          handleChange={e => setEmail(e.target.value)}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          handleChange={e => setPassword(e.target.value)}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          handleChange={e => setConfirmPassword(e.target.value)}
          label='Confirm Password'
          required
        />
        <CustomButton
          type='submit'
        >
          SIGN UP
        </CustomButton>
      </form>
    </SignUpContainer>
  );
}

export default SignUp;