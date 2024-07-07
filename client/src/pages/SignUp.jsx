import axios from 'axios';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { FaEnvelope, FaKey, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData]=useState({});
  const [errorMsg, setErrorMsg]=useState(null);
  const [loading, setLoading]=useState(false);
  let navigate=useNavigate();

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()});
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(!formData.username || !formData.password || !formData.email){
      setLoading(false);
      return setErrorMsg('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await axios.post('/api/auth/signup',formData,{
        headers:{'Content-Type':'application/json'},
      });
      console.log('Response:',res.data);
      setLoading(false);
      navigate('/sign-in')
    }
    catch (error) {
      console.error('Error:', error);
      setLoading(false);
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
          <p className='text-sm mt-5'>You can Sign up with your email and password or with Google.</p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your Username' />
              <TextInput type='text' onChange={handleChange} placeholder='Username' id='username' rightIcon={FaUser} />
            </div>
            <div>
              <Label value='Your Email' />
              <TextInput type='text' onChange={handleChange} placeholder='name@example.com' id='email' rightIcon={FaEnvelope} />
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput type='text' onChange={handleChange} placeholder='Password' id='password' rightIcon={FaKey} />
            </div>
            <Button type='submit' className='text-white bg-gray-800 hover:bg-gray-900' outline disabled={loading} >
              {
                loading ? (
                  <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                  </>
                ):'Sign Up'
              }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
          </div>
          {errorMsg && (
            <Alert className='mt-5'>{errorMsg}</Alert>
          )}
        </div>
      </div>
    </div>
  );
}
