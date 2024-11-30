import React from 'react'
import notFoundAnim from '../../assets/lottie/page-not-found.json'
import LottieWidget from '../../components/LottieWidget'

export default function PageNotFound() {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center text-white'>
        <LottieWidget lottieAnimation={notFoundAnim} className='w-[90%] h-[90%]' loop />
    </div>
  )
}
