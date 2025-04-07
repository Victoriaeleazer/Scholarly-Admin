import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { delay } from '../../services/delay';
import error404Anim from "../../assets/lottie/404-error.json"
import LottieWidget from "../../components/LottieWidget";
import { useAdmin } from "../../provider/AdminProvider";
import { FaSpinner } from "react-icons/fa6";
import { useNavigate } from 'react-router';

type props = {
  title?: string,
  description?: string,
  button?: string,
  showButton?: boolean,
  onClick?: ()=>void
}

export default function SessionExpiredPage({title, description, button, showButton=true, onClick}: props) {

    const {setAdmin} = useAdmin();

    const navigate = useNavigate()

    const logout = useMutation({
        mutationFn: async()=>{
          await delay(2000)

          if(!onClick){
            localStorage.clear()
          setAdmin(null);
          }
    
          
        },
        onSuccess: ()=>{
          if(onClick){
            onClick!();
            return;
          }
          navigate('/', {replace: true});

        }
      })
    
  return (
    <div className="w-full h-full flex flex-col flex-center select-none text-secondary gap-4">
        <LottieWidget lottieAnimation={error404Anim} className="w-[37%] h-[37%] object-contain" />
        <p className="font-bold text-3xl text-white">{title ?? "Oops!"}</p>
        <p className="text-[14px] font-light text-center">{description??"Looks like your session has expired.\nPlease re-login into your admin account"}</p>
        {showButton && <button onClick={()=>logout.mutate()} className="outline-none rounded-[25px] font-semibold bg-white flex flex-center h-[40px] w-[78px] text-black text-[13px] hover:bg-tertiary hover:text-white transition-all ease duration-200">
          {logout.isPending && <FaSpinner className="animate-spin text-[12px]" />}
          {!logout.isPending && (button ?? "Logout")}
        </button>}
      </div>);
    
}
