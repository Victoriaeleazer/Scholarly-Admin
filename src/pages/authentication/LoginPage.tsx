import React, { useState } from 'react';
import Input from '../../components/Input';
import { FaAt } from "react-icons/fa6";
import { Unlock } from 'iconsax-react';
import Button from '../../components/Button';
import { Link } from 'react-router';
// import plant from './assets/plant.jpg'

export default function LoginPage () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

     // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMessage('Both email and password are required!');
    } else {
      setErrorMessage('');
      // Handle your form submission here (e.g., send data to the server)
      console.log('Form submitted:', { email, password });
    }
  };


  return(
    <div className="w-full h-full overflow-hidden flex bg-black">
      <div className='h-full flex flex-col text-white items-center justify-center flex-grow-[2]'> 
        <div className='flex flex-col items-center justify-center w-[40%] h-full gap-3 text-center'>
          <h1 className='text-[40px] font-semibold select-none text-center'>Welcome Back !</h1>
          <p className='text-gray-400 text-[15px] select-none font-no text-center mb-4'>Log into your <span className='font-semibold bg-gradient-to-r from-blue via-blue to-purple bg-clip-text text-transparent'>scholarly</span> admin account</p>
          <form className='flex w-full flex-col gap-6' onSubmit={handleSubmit}>
              <Input placeholder='Enter Email' prefix={<FaAt />} type='email' required={true}  />

              <Input placeholder='Enter Password' prefix={<Unlock />} type='password' required={true}  />

              <Button title='Login' type='submit' gradient />

              <p className='text-secondary'> Don't have an admin account? <Link to={'/register'} className='underline text-white cursor-pointer'>Create One</Link></p>
          </form>
        </div>
      </div>

      <div className="h-full flex flex-col items-center justify-center flex-1 bg-blue" >
        <h1>NEW HERE?</h1>
        <h2>Sign up and discover a great <br />amount of new opportunities!</h2>
      </div>
    </div>
  )
}