import LottieWidget from "./components/LottieWidget";
import loadingAnim from "./assets/lottie/loading"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import scholarlyIcon from '../src/assets/images/scholarly.png'
import { hasAdminUserData } from "./services/user-storage";
import { onMessageListener, requestPermission } from "../firebase";
import { delay } from "./services/delay";

export default function App() {

  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  useEffect(()=>{
    const init = async ()=>{
      const token = await requestPermission();
      onMessageListener();
      if(token){
        setToken(token);

        if(typeof window !== 'undefined'){
          window.notifToken = token;
        }
      }
    }

    init();

    return ()=>{}
  }, [])

  useEffect(()=>{
    const loggedIn = hasAdminUserData();
    
    const init = async ()=>{
      if(!token){
        return;
      }

      await delay(5000);
      navigate(loggedIn? "/dashboard" :"/login", {replace:true});
    }

    init();
  
    
  }, [token, navigate])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-2xl text-black dark:bg-black dark:text-white">
      <img src={scholarlyIcon} alt="Scholarly" className="max-w-[240px] max-h-[190px] object-cover" />
      {/* <p className="font-bold bg-gradient-to-r from-blue to-purple bg-clip-text text-transparent">Scholarly</p> */}
      <LottieWidget lottieAnimation={loadingAnim} loop={true} className="w-10 h-10" />
    </div>
  )
};
