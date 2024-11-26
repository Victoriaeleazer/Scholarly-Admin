import React, { FormEvent, useEffect, useState } from 'react';
import Input from '../../components/Input';
import { FaAt } from "react-icons/fa6";
import { Call, Unlock, User, ShieldSecurity } from 'iconsax-react';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router';
import {useMediaQuery} from '@react-hook/media-query'
import { delay } from '../../services/delay';
import { loginAccount, registerAccount } from '../../services/api-consumer';
import { toast } from 'sonner';
import {validate as validateEmail} from 'react-email-validator'
import { isPhoneNumber, validatePhoneNumber } from '../../utils/PhoneUtils';
import PageSlider from '../../components/PageSlider';
import DropDownInput from '../../components/DropdownInput';
import { AdminRole } from '../../interfaces/Admin';
// import plant from './assets/plant.jpg'

export default function RegisterPage () {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNmber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState<AdminRole | string>('')

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [sideHovered, setSideHovered] = useState(false);

    const [pageIndex, setPageIndex] = useState(0);

    const isPhone = !useMediaQuery('only screen and (min-width: 767px)')
    


    // Handle names form submission
  async function handleNamesSubmit(event: FormEvent){
    setErrorMessage(null);
    event.preventDefault();
    setLoading(true);
    // Wait 2 seconds
    await delay(2000);

    if((firstName.trim().length === 0)){
      setLoading(false)
      setErrorMessage("first name cannot be empty");
      return;
    }

    if((lastName.trim().length === 0)){
      setLoading(false)
      setErrorMessage("last name cannot be empty");
      return;
    }

    if(!role || !Object.values(AdminRole).map(e => e.toString()).includes(role ?? '')){
      setLoading(false)
      setErrorMessage("role cannot be empty");
      return;
    }

    setPageIndex(pageIndex+1)
    setLoading(false);
    
  }
     // Handle form final submission
  async function handleFinalSubmit(event: FormEvent){
    setErrorMessage(null);
    event.preventDefault();
    setLoading(true);
    // Wait 2 seconds
    await delay(2000);

    /// Email Validation check
    if((email.trim().length === 0)){
      setLoading(false)
      setErrorMessage("email cannot be empty");
      return;
    }

    if((phoneNumber.trim().length === 0)){
      setLoading(false)
      setErrorMessage("phone number cannot be empty");
      return;
    }

    const validPhone = validatePhoneNumber(phoneNumber);
    const validEmail = validateEmail(email) && !email.includes('@.');

    if(!validPhone){
      setLoading(false)
      setErrorMessage("invalid phone number");
      return;
    }

    if(!validEmail){
      setLoading(false)
      setErrorMessage("Invalid email");
      return;
    }

    if((password.trim().length < 8) || confirmPassword.trim().length ===0){
      setLoading(false)
      setErrorMessage(password.trim().length !== 0?"password must be at least 8 digits in length":"password cannot be empty");
      return;
    }

    if(confirmPassword !== password){
      setLoading(false)
      setErrorMessage("passwords don't match");
      return;
    }

    register();
  };

  async function register(){
    toast.loading("Creating your admin account", {id:'loading-register-toast', dismissible:loading});
    const response = await registerAccount(email, phoneNumber, firstName, lastName, role, password);

    toast.dismiss('loading-register-toast');

    if(response.status === 200){
      toast.success(response.data.message, {description:'Please sign into your account for confirmation'});
      console.log("Registration Successful", response.data.data)
      setLoading(false);
      navigate(-1);
      return;
    }

    // If it's not Ok (a success)
    toast.error(response.data.message ?? "Network Error Occurred");
    setLoading(false);
  }

  const nameSection = ()=>(
    <div id='name-section' className='flex w-full flex-col h-fit overflow-hidden gap-3 items-center justify-center text-center'>
      <h1 className='text-[40px] font-semibold select-none text-center'>Hello There!</h1>
      <p className='text-gray-400 text-[15px] select-none font-no text-center mb-4'>Get started with <span className='font-semibold bg-gradient-to-r from-blue via-blue to-purple bg-clip-text text-transparent'>scholarly</span> admin.<br/>What are your names?</p>
      <form className='flex w-full flex-col gap-6' onSubmit={handleNamesSubmit}>
          <Input placeholder='Enter First Name' onChange={setFirstName} prefix={<User />} type='text' error={errorMessage?.includes('first')?errorMessage: null} required={true}  />

          <Input placeholder='Enter Last Name' onChange={setLastName} prefix={<User />} type='text' error={errorMessage?.includes('last')?errorMessage: null} required={true}  />

          <DropDownInput placeholder='Select Role' onChange={setRole} value={role} prefix={<ShieldSecurity />} options={Object.values(AdminRole)} error={errorMessage?.includes('role')?errorMessage: null} required={true}  />


          <Button title='Next' type='submit' loading={loading} gradient />

          <p className='text-secondary'> Already have an admin account? <span onClick={()=>navigate(-1)} className='underline text-white cursor-pointer'>Login</span></p>
      </form>
    </div>
  )

  const emailSection = ()=>(
    <div id='email-section' className='flex w-full flex-col h-fit overflow-hidden gap-3 items-center justify-center text-center'>
      <h1 className='text-[40px] font-semibold select-none text-center'>...One More Thing</h1>
        <p className='text-gray-400 text-[15px] select-none font-no text-center mb-4'>What're your email, phone number and password?<br />Enter them below</p>
        <form className='flex w-full flex-col gap-6' onSubmit={handleFinalSubmit}>
            <Input placeholder='Enter Email' onChange={setEmail} prefix={<FaAt />} type='email' error={errorMessage?.includes('email')?errorMessage: null} required={true}  />

            <Input placeholder='Enter Phone Number' onChange={(phone)=>setPhoneNmber(phone.replaceAll(' ', ''))} prefix={<Call />} type='text' error={errorMessage?.includes('phone')?errorMessage: null} required={true}  />

            <Input placeholder='Enter Password' onChange={setPassword} prefix={<Unlock />} type='password' error={errorMessage?.includes('password') && !errorMessage?.includes('match') ?errorMessage: null} required={true}  />

            <Input placeholder='Confirm Password' onChange={setConfirmPassword} prefix={<Unlock />} type='password' error={errorMessage?.includes('match')?errorMessage: null} required={true}  />

            <Button title='Register' type='submit' loading={loading} gradient />

            <p className='text-secondary'>Need to edit something? <span onClick={()=>setPageIndex(0)} className='underline text-white cursor-pointer'>Go Back</span></p>
        </form>
    </div>
  );

  const startsOverflowing = !useMediaQuery('only screen and (min-width: 1165px)')



  return(
    <div className="w-screen h-full overflow-hidden flex flex-row-reverse bg-black">
      <div className={`h-full flex flex-col text-white items-center justify-center flex-grow-[3] ${isPhone? 'w-full': 'w-auto'}`}> 
        <div className={`flex items-center overflow-hidden justify-center h-full ${isPhone? 'w-[85%]': startsOverflowing? 'w-[80%]': 'w-[45%]'}`}>
          <PageSlider currentIndex={pageIndex}>
            {nameSection()}
            {emailSection()}
          </PageSlider>
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
          <h1 className='text-[3vw] font-extrabold'>Not New?</h1>
          <h2 className='font-[300] text-[1vw] text-center'><i>Sign into your account and keep track of <strong className='font-bold'>scholarly</strong>'s admin community.<br />Don't miss out on <em className='border-dashed border-b'>work!</em> too</i></h2>
          <div onClick={()=>navigate(-1)} className='bg-white w-[120px] h-[50px] text-black rounded-[25px] text-center flex items-center justify-center font-bold hover:bg-opacity-20 hover:text-white ease-in transition-colors' >Login</div>
        </div>
      </div>)}
    </div>
  )
}