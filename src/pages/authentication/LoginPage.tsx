import React, { useEffect, useState } from 'react';
import Input from '../../components/Input';
import { FaAt } from "react-icons/fa6";
import { Unlock } from 'iconsax-react';
import Button from '../../components/Button';
import { Link } from 'react-router';
import {useMediaQuery} from '@react-hook/media-query'
// import plant from './assets/plant.jpg'

export default function LoginPage () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [sideHovered, setSideHovered] = useState(false);

    const isPhone = !useMediaQuery('only screen and (min-width: 767px)')

    const startsOverflowing = !useMediaQuery('only screen and (min-width: 1165px)')


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
      <div className='h-full flex flex-col text-white items-center justify-center flex-grow-[3]'> 
        <div className={`flex flex-col items-center justify-center h-full gap-3 text-center ${isPhone? 'w-[85%]': startsOverflowing? 'w-[80%]': 'w-[45%]'}`}>
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

      {!isPhone && (<div 
      onMouseEnter={()=>setSideHovered(true)}
      onMouseLeave={()=>setSideHovered(false)}
      className={`h-full flex flex-col items-center justify-center overflow-hidden flex-grow-[1.5] relative gap-4 text-white bg-gradient-to-br from-blue via-violet-800 to-purple ${startsOverflowing? 'flex-grow-[0.75]':''}`}>
        {/* Shapes : */}
        <div className={`w-[150px] h-[150px] rounded-circle z-10 absolute top-[10%] ${sideHovered? 'left-[50%]':'left-[10%]'} bg-white opacity-10 transition-all ease-in-out duration-500`}/>
        <div className={`w-[150px] h-[150px] z-10 absolute ${sideHovered? 'rotate-[270deg]' : 'rotate-90'} top-[20%] right-[5%] bg-white opacity-10 clip-triangle transition-all ease-in-out duration-500`}/>
        <div className={`w-[150px] h-[150px] rounded-circle z-10 absolute bottom-[10%] ${sideHovered? 'right-[45%]' : 'right-[10%]'} bg-white opacity-10 transition-all ease-in-out duration-500`}/>
        <div className={`w-[150px] h-[150px] z-10 absolute ${sideHovered? 'rotate-[270deg]' :'rotate-90'} bottom-[20%] left-[15%] bg-white opacity-10 clip-star transition-all ease-in-out duration-500`}/>

        <div className="bg-transparent backdrop-blur-[2.5px] w-full h-full z-20 flex flex-col gap-4 items-center justify-center">
          <h1 className='text-[3vw] font-extrabold'>New Here?</h1>
          <h2 className='font-[300] text-[1vw] text-center'><i>Sign up and join <strong className='font-bold'>scholarly</strong>'s admin community.<br />Don't be the odd <em className='border-dashed border-b'>staff</em> out!</i></h2>
          <Link to={'/register'} className='bg-white w-[120px] h-[50px] text-black rounded-[25px] text-center flex items-center justify-center font-bold hover:bg-opacity-20 hover:text-white ease-in transition-colors' >Sign Up</Link>
        </div>
      </div>)}
    </div>
  )
}