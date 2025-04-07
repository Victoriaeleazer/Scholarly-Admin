import React, { ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router'
import DashboardNavItem from '../../components/DashboardNavItem'
import { HambergerMenu, Home2, Calendar, Information, Messages, Notification as N, Personalcard, ShieldTick, BookSaved, Setting, Book, Message, EmojiHappy, ArrowDown2, DirectboxReceive, Icon, IconProps, Messages1, SecurityUser, Call } from 'iconsax-react'
import { Admin, AdminRole } from '../../interfaces/Admin';
import { getAdminUserData, getCallToken, hasAdminUserData, saveCallToken } from '../../services/user-storage';
import { useMediaQuery } from '@react-hook/media-query';
import { acceptInvitation, markNotification, updateToken, websocket_url } from '../../services/api-consumer';
import { Stomp } from '@stomp/stompjs';
import {distinctList} from '../../utils/ArrayUtils';
import { ApiResponse } from '../../interfaces/ApiResponse';
import { Channel } from '../../interfaces/Channel';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook';
import { setChannels } from '../../provider/channels-slice';
import { Notification} from '../../interfaces/Notification';
import { setNotifications } from '../../provider/notificications-slice';
import { toast } from 'sonner';
import notificationAnim from '../../assets/lottie/notification-anim.json'
import Dialog from '../../components/Dialog';
import LottieWidget from '../../components/LottieWidget';
import Button from '../../components/Button';
import { useMutation } from '@tanstack/react-query';
import PopupTarget from '../../components/PopupMenu/PopupTarget';
import PopupMenu from '../../components/PopupMenu/PopupMenu';
import { CallingState, useCall, useCalls, useStreamVideoClient,} from '@stream-io/video-react-sdk';
import CallList from './CallList';
import { CallContext } from './CallLayout';
import CallPage from '../calls/CallPage';
import {logout as logoutUser} from '../../services/user-storage'
import { useNotifications } from '../../provider/NotificationsProvider';
import { useAdmin } from '../../provider/AdminProvider';
import SessionExpiredPage from '../other/SessionExpiredPage';

export default function DashboardLayout() {

  const currentLocation = useLocation();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const callId = useMemo(()=>searchParams.get("call"), [searchParams])

  const [collapsed, setCollapsed] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [profilePopup, showProfilePopup] = useState(false);

  const {admin: adminOrNull} = useAdmin();

  // If no user is logged in but a client happens to be on this page
  if(!adminOrNull) return <SessionExpiredPage />

  const admin = adminOrNull!;

  const [notificationShow, showNotification] = useState(false);

  const [logout, showLogout] = useState(false);

  const [selectedNotification, selectNotification] = useState<Notification>()

  const [filter, setFilter] = useState<'all'| 'read' | 'unread'>('all');

  
  const call = useCall();

  const calls = useCalls();

  const callClient = useStreamVideoClient()!;

  const callContext = useContext(CallContext)!;

  const isPhone = !useMediaQuery('only screen and (min-width: 767px)')

  const isTablet = !useMediaQuery('only screen and (min-width: 1106px)') && !isPhone

  const {notifications} = useNotifications()

  const unreadNotifications = notifications.filter(notification => !notification.read).length

  const filteredNotifications = notifications.filter(notif => filter === 'all'? true: filter === 'unread'? !notif.read: notif.read);

  const selectedInvitation = selectedNotification?.category === 'invitation';



  useEffect(()=>{
    if(!collapsed && isTablet){
      setCollapsed(true);
      return;
    }

    if(!isTablet){
      if(collapsed){
        setCollapsed(false)
      }
    }
  }, [isTablet])


  useEffect(()=>{
    /// In order to make sure that when the user clicks or navigates
    /// On a phone screen size, the drawer is closed immediately
    setMenuOpen(false);
  }, [currentLocation.pathname, adminOrNull])

  


  const facultyMenus = ()=>(
    <>
      <DashboardNavItem selected={currentLocation.pathname.includes('/my-cohorts')} navItem={{icon:<BookSaved />, selectedIcon:<BookSaved variant='Bold'/>, link:'./my-cohorts', name:'My Cohorts'}} />
    </>
  );

  const managerOrCouselorMenus = ()=>(
    <>
      <DashboardNavItem selected={currentLocation.pathname.includes('/courses')} navItem={{icon:<Book />, selectedIcon:<Book variant='Bold'/>, link:'./courses', name:'Courses'}} />
      <DashboardNavItem selected={currentLocation.pathname.includes('/cohorts')} navItem={{icon:<BookSaved />, selectedIcon:<BookSaved variant='Bold'/>, link:'./cohorts', name:'Cohorts'}} />
      <DashboardNavItem selected={currentLocation.pathname.includes('/feedbacks')} navItem={{icon:<Information/>, selectedIcon:<Information variant='Bold' />, link:'./feedbacks', name:'Feedbacks'}} />  
    </>
  )

  const counselorMenus = ()=>(
    <>
      <DashboardNavItem selected={currentLocation.pathname.includes('/mentees')} navItem={{icon:<EmojiHappy />, selectedIcon:<EmojiHappy variant='Bold'/>, link:'./mentees', name:'My Mentees'}} />
    </>
  )

  const managerMenus = ()=>(
    <>
      <DashboardNavItem selected={currentLocation.pathname.includes('/staffs')} navItem={{icon:<ShieldTick />, selectedIcon:<ShieldTick variant='Bold'/>, link:'./staffs', name:'Staffs'}} />
    </>
  )

  const sideBar = ()=>(
    <div className={`h-full bg-tertiary text-white px-5 py-2 flex flex-col items-center gap-3 transition-all duration-[1000ms] ease ${isPhone? 'w-[65vw] absolute z-10 left-0 top-0 ':'z-0'} ${isPhone? (menuOpen?'left-0':'-left-[70vw]')  : (collapsed? 'w-[95px]' : 'w-[20%]')}`} style={{left: (isPhone && !menuOpen)? '-75vw': '0px'}}>

      <div className='w-full flex gap-4 justify-start p-3 items-center text-white font-extrabold overflow-hidden'>
        <div onClick={()=>{
          if(isPhone){
            setMenuOpen(false);
            return;
          }
          setCollapsed(!collapsed);
        }} className='cursor-pointer transition-transform duration-500 ease-in-out' style={{transform:collapsed || menuOpen? 'rotate(-180deg)':'rotate(0deg)'}}><HambergerMenu size={30} /></div>
        <p className='select-none text-[27px] bg-gradient-to-r from-blue via-blue to-purple bg-clip-text text-transparent text-nowrap'>Scholarly</p>
      </div>

      <div className='w-full h-fit flex flex-col items-center overflow-x-hidden overflow-y-scroll scholarly-scrollbar gap-3'>
      <DashboardNavItem selected={currentLocation.pathname.endsWith('dashboard/') || currentLocation.pathname.endsWith('dashboard')} navItem={{icon:<Home2/>, selectedIcon:<Home2 variant='Bold'/>, link:'.', name:'Dashboard'}} />
      <DashboardNavItem selected={currentLocation.pathname.includes('/announcements')} navItem={{icon:<Message/>, selectedIcon:<Message variant='Bold'/>, link:'./announcements', name:'Announcements'}} />
      <DashboardNavItem selected={currentLocation.pathname.includes('/events')} navItem={{icon:<Calendar/>, selectedIcon:<Calendar variant='Bold'/>, link:'./events', name:'Events'}} />
      <DashboardNavItem selected={currentLocation.pathname.includes('/students')} navItem={{icon:<Personalcard/>, selectedIcon:<Personalcard variant='Bold'/>, link:'./students', name:'Students'}} />
      <DashboardNavItem selected={currentLocation.pathname.includes('/chats')} navItem={{icon:<Messages/>, selectedIcon:<Messages variant='Bold'/>, link:'./chats', name:'Chats'}} />

      {/* Varying Menus. (Menus that vary based on User Roles) */}

      {/* For Faculty */}
      {admin?.role === AdminRole.Faculty && facultyMenus()}

      {/* For Counselors */}
      {admin?.role === AdminRole.Counselor && counselorMenus()}

      {/* For Managers */}
      {admin?.role === AdminRole.Manager && managerMenus()}

      {/* For Menus that apply to both managers and counselors */}
      {admin?.role === AdminRole.Counselor || admin?.role === AdminRole.Manager && managerOrCouselorMenus()}

      <DashboardNavItem selected={currentLocation.pathname.includes('/meets')} navItem={{icon:<Call />, selectedIcon:<Call variant='Bold'/>, link:'./meets', name:'Meets'}} />
      

      <DashboardNavItem selected={currentLocation.pathname.includes('/settings')} navItem={{icon:<Setting />, selectedIcon:<Setting variant='Bold'/>, link:'./settings', name:'Settings'}} />
      </div>

    </div>
  )

  const notificationColor = (notification?: Notification) : string =>{
    switch(notification?.category){
      case 'account':
        return 'orange';
      case 'invitation':
        return 'blue'; 
      case 'channel':
        return 'green'  
      default:
        return 'transparent';
    }
  }
    
  const notificationIcon = (notification?: Notification) : ReactNode =>{
  
    switch(notification?.category){
      case 'account':
        return <SecurityUser size={25} variant='Bold' />
      case 'channel':
        return <Messages1 size={25} variant='Bold' />
      case 'invitation':
        return <DirectboxReceive size={25} variant='Bold' color='white' />  
      default:
        return <div className=' h-[25px] w-[25px]'/>
    }
  }

  async function respondToNotification({notificationId, read} : {notificationId: string, read: boolean}){
    const response = (await markNotification(notificationId, read));
    
    const body = response.data as ApiResponse;

    if(response.status !== 200){
      throw new Error(body?.message ?? "Error when marking notification")
    }

    return body;

  }

  async function respondToInvitation({invitationId, accept} : {invitationId: string, accept: boolean}){
    const response = (await acceptInvitation(invitationId, accept));
    
    const body = response.data as ApiResponse;

    if(response.status !== 200){
      throw new Error(body?.message ?? "Error when marking notification")
    }

    return body;

  }


  const notificationMutation = useMutation({
    mutationFn: respondToNotification,
    onSuccess: (data, {read})=>{
      toast.success(`Marked notification as ${!read? 'unread' : 'read'}`);
      selectNotification(undefined);
    },
    onError: (error, {read})=>{
      toast.error(`Unable to ${!read? 'unmark': 'mark' }`, {description: error.message});
    }
  })

  const invitationMutation = useMutation({
    mutationFn: respondToInvitation,
    onSuccess: (_,data,__)=>{
      toast.success(`${data.accept? "Accepted": "Declined"} Invitation`);
      selectNotification(undefined);
    },
    onError: (error, {accept})=>{
      toast.error(`Unable to ${accept? "accept": "reject"}`, {description: error.message});
    }
  })


  const incomingCalls = calls.filter(_call => (
   _call.isCreatedByMe === false && _call.state.callingState === CallingState.RINGING
  ));

  const ongoingCalls = calls.filter(_call =>(
    [CallingState.JOINED].includes(_call.state.callingState)
  ))

  

  useEffect(()=>{

    const [incomingCall] = incomingCalls;
    callContext.setIncomingCall(incomingCall);
  }, [incomingCalls])

  useEffect(()=>{

    const [ongoingCall] = ongoingCalls;
    callContext.setCall(ongoingCall);
  }, [ongoingCalls])



  return (
    <div onClick={()=>showProfilePopup(false)} className='flex w-full h-full overflow-hidden relative'>


      {/* Drawer. We want it only to show if the browser is not in a phone screen size */}
      {sideBar()}
      {/* Nav bar & Page (Outlet) */}
      <div onClick={(e)=>{
        if(!isPhone){
          return;
        }
        if(menuOpen){
          e.preventDefault();
          e.stopPropagation();
          setMenuOpen(false);
          return;
        }
      }} key={currentLocation.pathname} className='flex flex-col items-start flex-1 bg-transparent h-full'>
        <div className='w-full flex items-center justify-end px-6 h-[110px] gap-8'>
          {isPhone && <div onClick={()=>{
            setCollapsed(false);
            setMenuOpen(!menuOpen)
          }} className='cursor-pointer text-white transition-transform duration-500 ease-in-out' style={{transform:menuOpen? 'rotate(-180deg)':'rotate(0deg)'}}><HambergerMenu size={30} /></div>}

          {/* Spacing to prevent the drawer icon at the start */}
          <div className='flex flex-1 items-center text-white justify-center'>
            {call && <CallList />}
          </div>

          {/* Notification Icon */}
          <div onClick={()=>showNotification(true)} title='notification' className='flex w-11 h-11 cursor-pointer relative rounded-circle items-center justify-center bg-background text-white'>
            { unreadNotifications > 0 && <div className='p-1.5 absolute top-1.5 right-3 rounded-circle bg-blue'/>}
            <N className={`w-[60%] h-[60%] ${unreadNotifications>0? 'animate-bell-shake':''}`} size={18} variant='Bold' />
          </div>

          {/* Settings Icon */}
          <div title='settings' className='flex w-11 h-11 cursor-pointer relative rounded-circle items-center justify-center bg-background text-white'>
            <Setting className='w-[60%] h-[60%]' size={18} />
          </div>

          {/* Profile Icon */}
          <PopupTarget
            id='profile-icon'>
            <div onClick={(e)=>{
              e.stopPropagation();
              showProfilePopup(!profilePopup);
            }} className='w-fit cursor-pointer flex items-center justify-center gap-4'>
              <div className='w-10 h-10 rounded-circle overflow-hidden open-sans select-none flex items-center justify-center text-white text-center font-medium' style={{backgroundColor: admin.color, letterSpacing:1}}>
                {admin.profile && <img className='rounded-circle w-10 h-10 object-cover' src={admin?.profile} alt="Profile Photo" />}
                {!admin.profile && <p>{admin.fullName.split(' ').map(name => name.charAt(0))}</p>}
              </div>
              <ArrowDown2 style={{transform: `rotate(${!profilePopup? '0':'180'}deg)`}} className='text-secondary transition-transform ease duration-500' size={18} />
            </div>
          </PopupTarget>
        </div>
        <Outlet />   
      </div>

      {/* Profile Icon Popup */}
      <PopupMenu
        className='min-w-80 bg-tertiary p-0'
        position='bottom-right'
        onClose={()=> showProfilePopup(false)}
        show={profilePopup}
        targetId='profile-icon'>
          <div className='flex flex-col m-0 bg-tertiary items-center py-[30px] px-4 gap-4'>
            <div className='w-16 h-16 select-none rounded-circle overflow-hidden open-sans flex items-center justify-center text-white text-center text-lg font-medium' style={{backgroundColor: admin.color, letterSpacing:1}}>
              {admin.profile && <img className='rounded-circle w-full h-full object-cover' src={admin?.profile} alt="Profile Photo" />}
              {!admin.profile && <p>{admin.fullName.split(' ').map(name => name.charAt(0))}</p>}
            </div>
            <p className='text-white font-light'>Hi, <span className='text-white font-semibold'>{admin.firstName}</span></p>
            <Button invert outlined className='text-[14px] max-h-[45px] rounded-[30px] mb-1' title='View Profile' />
            <Button onClick={()=>{
              logoutUser();
              navigate('/login', {replace:true, relative:'route'});
            }} className='text-[14px] max-h-[45px] rounded-[30px]' negative title='Logout' />
            <div className='flex items-center justify-center gap-2 underline decoration-secondary text-secondary text-[12px] underline-offset-[3px]'>
              <p className='cursor-pointer'>Privacy Policy</p>
              <div className='w-1 h-1 bg-secondary rounded-circle' />
              <p className='cursor-pointer'>Our Terms</p>
            </div>
          </div>
      </PopupMenu>

      {/* Notifications Dialog */}
      <Dialog 
        animType='slide-down'
        className='min-w-[40%] flex flex-col items-center justify-start gap-4 text-left'
        show={notificationShow && !selectedNotification}
        onClose={()=>{
          showNotification(false)
          setFilter('all')
        }}
        cancelable>
        <p className='text-white mb-3 text-[25px] font-semibold self-start'>{filter !== 'all' && `${filter.charAt(0).toUpperCase() + filter.substring(1)} `}Notifications <span className='text-[17px] text-secondary transition-all ease'>({filteredNotifications.length})</span></p>
        
        {/* Notification Type Toggle */}
        <div className="flex gap-4 w-full">
          <p onClick={()=> setFilter('all')} className={`min-w-16 py-2 cursor-pointer select-none ${filter === 'all'? 'bg-purple text-white' : 'bg-white bg-opacity-5 text-secondary'} text-[14px] rounded-[25px] overflow-hidden  text-center transition-colors ease duration-300`}>All</p>
          <p onClick={()=> setFilter('read')} className={`min-w-16 py-2 cursor-pointer select-none ${filter === 'read'? 'bg-purple text-white' : 'bg-white bg-opacity-5 text-secondary'} text-[14px] rounded-[25px] overflow-hidden  text-center transition-colors ease duration-300`}>Read</p>
          <p onClick={()=> setFilter('unread')} className={`min-w-16 py-2 cursor-pointer select-none ${filter === 'unread'? 'bg-purple text-white' : 'bg-white bg-opacity-5 text-secondary'} text-[14px] rounded-[25px] overflow-hidden  text-center transition-colors ease duration-300`}>Unread</p>
        </div>

        {filteredNotifications.length === 0 && <div className='flex flex-col items-center justify-center gap-16 w-full min-h-[60vh] text-white text-[18px] font-semibold'>
          <LottieWidget className='object-cover scale-[2.75]' lottieAnimation={notificationAnim} width={200} height={200} />
          <p>No {filter !== 'all' && `${filter.charAt(0).toUpperCase() + filter.substring(1)} `} Notifications</p>
        </div>}

        {filteredNotifications.length !== 0 && <div className='w-full gap-4 h-[60vh] flex flex-col overflow-y-scroll scholarly-scrollbar'>
          {filteredNotifications.map((notification, index)=>{

            return <div onClick={()=> selectNotification(notification)} key={notification.id} className='w-full flex px-3 select-none items-center cursor-pointer gap-6 py-3 border-b-[1px] border-b-white border-opacity-10 last:border-b-0 hover:bg-white hover:bg-opacity-[0.02] transition-colors ease duration-500'>
              <div className='w-[48px] h-[48px] flex items-center text-white bg-opacity-10 justify-center rounded-circle' style={{backgroundColor:notificationColor(notification)}}>
                {notificationIcon(notification)}
              </div>
              <div className='flex flex-col items-start justify-center gap-1 text-white overflow-hidden flex-1'>
                <p className='font-semibold text-[16px] whitespace-nowrap text-ellipsis overflow-hidden'>{notification.title}</p>
                <p className='text-secondary text-[12px] whitespace-nowrap text-ellipsis overflow-hidden'>{notification.content}</p>
              </div>
              <div style={{transitionBehavior: 'allow-discrete'}} className={`${notification.read? 'opacity-0 hidden': 'opacity-100'} w-2 h-2 bg-light-purple rounded-circle transition-all ease duration-1000`}/>
            </div>
          })}
          </div>}
      </Dialog>

      {/* Logout Dialog */}
      <Dialog
      negative
      onClose={()=>showLogout(false)}>

      </Dialog>

      {/* Selected Notification Dialog */}
      <Dialog
        animType='popin'
        discrete={false}
        onClose={()=>selectNotification(undefined)}
        show={selectedNotification !== undefined}
        cancelable
        className='w-[400px] flex flex-col items-center justify-start gap-6 text-left'>
          <div className='w-[80px] h-[80px] overflow-hidden flex items-center text-white bg-opacity-10 justify-center rounded-circle' style={{backgroundColor:notificationColor(selectedNotification)}}>
            <div className='scale-[1.6]'>{notificationIcon(selectedNotification)}</div>
          </div>
          <p className='text-white text-[18px] whitespace-nowrap font-semibold text-center'>{selectedNotification?.title}</p>
          <p className='text-secondary text-[14px] whitespace-nowrap text-center'>{selectedNotification?.content}</p>
          <div className='flex gap-3 w-full justify-center items-center'>
            {selectedInvitation && !selectedNotification.read && <Button className='flex-1 max-h-[50px] text-red-500' onClick={()=>invitationMutation.mutate({invitationId: selectedNotification!.id, accept: false})} loading={invitationMutation.isPending && !invitationMutation.variables.accept} negative title={'Reject'} />}
            <Button onClick={()=>{
              if(!selectedInvitation){
                notificationMutation.mutate({notificationId: selectedNotification!.id, read: !selectedNotification!.read});
                return;
              }

              if(selectedInvitation && selectedNotification.read){
                selectNotification(undefined);
                return;
              }

              invitationMutation.mutate({invitationId: selectedNotification!.id, accept: true});
            }} className='flex-1 max-h-[50px]' loading={selectedInvitation? (invitationMutation.isPending && invitationMutation.variables.accept): notificationMutation.isPending} negative={selectedNotification?.read} invert={selectedNotification?.read} title={selectedInvitation? (selectedNotification?.read? 'Close' : 'Accept') : selectedNotification?.read? 'Mark as Unread' : 'Mark as read'} />
          </div>

      </Dialog>

      {/* Call Page */}
      {callId && call && <CallPage />}
    </div>
  )
}
