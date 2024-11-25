import LottieWidget from "./components/LottieWidget";
import loadingAnim from "./assets/lottie/loading"
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function App() {

  let navigate = useNavigate();

  useEffect(()=>{
    const timer = setTimeout(()=>{
      navigate("/login", {replace:true});
    }, 5000);
    
  
    return ()=> clearTimeout(timer);
  })

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-2xl text-black dark:bg-black dark:text-white">
      <div className="w-[100px] h-[100px] rounded-circle bg-background"></div>
      <p className="font-bold bg-gradient-to-r from-blue to-purple bg-clip-text text-transparent">Scholarly</p>
      <LottieWidget lottieAnimation={loadingAnim} loop={true} className="w-10 h-10" />
    </div>
  )
};
