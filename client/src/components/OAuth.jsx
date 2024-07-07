import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { app } from '../firebase'

export default function OAuth() {

    const dispatch=useDispatch();
    const navigate=useNavigate();

const handleGoogleClick=async()=>{
    const auth=getAuth(app)
    const provider=new GoogleAuthProvider();
    provider.setCustomParameters({prompt:'select_Account'})
    try{
        const resultsFromGoogle=await signInWithPopup(auth, provider)
        const res = await axios.post('http://127.0.0.1:3000/api/auth/google',formData,{
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                name: resultsFromGoogle.user.displayName,
                email:resultsFromGoogle.user.email,
                googlePhotoUrl: resultsFromGoogle.user.photoURL
            })
          });
          console.log('Response:',res.data);
          dispatch(signInSuccess(res.data));
          navigate('/')
        console.log(resultsFromGoogle)
    }catch(error){
        console.log(error);
    }
}

  return (
    <Button type='button' className='bg-black text-white hover:bg-gray-900 dark:bg-gray-950' onClick={handleGoogleClick}>
      <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
      Continue with Google
    </Button>
  )
}
