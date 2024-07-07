import axios from 'axios';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { FaEnvelope, FaKey } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData]=useState({});
  const {loading, error:errorMessage}=useSelector((state) => state.user);
  let navigate=useNavigate();
  const dispatch=useDispatch()

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()});
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(!formData.password || !formData.email){
      return dispatch(signInFailure('Please fill out all fields.'));
    }
    try {
      dispatch(signInStart());
      const res = await axios.post('/api/auth/signin',formData,{
        headers:{'Content-Type':'application/json'},
      });
      dispatch(signInSuccess(res.data));
      
      navigate('/')
    }
    catch (error) {
      dispatch(signInFailure(error.message));
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-6'>
        <div className='flex-1'>
          <Link to='/' className='text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 rounded-lg md:text-6xl text-4xl'>
              Neeharika's
            </span>
            Blog
          </Link>
          <p className='text-sm mt-5'>You can sign in with your email and password or with Google.</p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your Email' />
              <TextInput type='text' onChange={handleChange} placeholder='name@example.com' id='email' rightIcon={FaEnvelope}  />
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput type='text' onChange={handleChange} placeholder='*******' id='password' rightIcon={FaKey}  />
            </div>
            <Button type='submit' className='text-white bg-gray-800 hover:bg-gray-900' outline disabled={loading} >
              {
                loading ? (
                  <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                  </>
                ):'Sign In'
              }
            </Button>
            <OAuth/>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5'>{errorMessage}</Alert>
          )}
        </div>
      </div>
    </div>
  );
}
