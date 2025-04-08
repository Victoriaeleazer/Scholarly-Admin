import { Outlet, useParams } from 'react-router'
import React, { useEffect } from 'react'
import DMsPage from './DMsPage'
import { useDirectMessages } from '../../../provider/DirectMessagesProvider'
import { ChatsProvider } from '../../../provider/ChatsProvider';
import { TypingIndicatorProvider } from '../../../provider/TypingIndicatorProvider';

export default function ChatsLayout() {

  const {fetch} = useDirectMessages();

  const {dmId} = useParams()

  useEffect(()=>{
    fetch()
  }, [])

  return (
    <div className='w-full h-full text-white p-6 pt-0 overflow-hidden flex gap-6 items-center justify-center'>
        <DMsPage />

        <div className='flex flex-1 h-full'>
          <ChatsProvider>
            <>
              {!dmId && <Outlet/>}
              {dmId && <TypingIndicatorProvider dmId={dmId}>
                  <Outlet />
                </TypingIndicatorProvider>}

            </>
          </ChatsProvider>
        </div>
    </div>
  )
}
