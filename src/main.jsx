// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './animations.css'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes } from 'react-router'
import { Route } from 'react-router'
import LoginPage from './pages/authentication/LoginPage'
import PageNotFound from './pages/page-not-found/PageNotFound'
import { Toaster } from 'sonner'
import RegisterPage from './pages/authentication/RegisterPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import FeedbacksPage from './pages/dashboard/feedbacks/FeedbacksPage'
import AnnouncementPage from './pages/dashboard/announcements/AnnouncementPage'
import EventsPage from './pages/dashboard/events/EventsPage'
import StudentsPage from './pages/dashboard/students/StudentsPage'
import MenteesPage from './pages/dashboard/mentees/MenteesPage'
import MenteeLayout from './pages/dashboard/mentees/MenteeLayout'
import ViewMenteePage from './pages/dashboard/mentees/ViewMenteePage'
import BatchesPage from './pages/dashboard/batches/BatchesPage'
import MyBatchesPage from './pages/dashboard/my-batches/MyBatchesPage'
import CoursesPage from './pages/dashboard/courses/CoursesPage'
import StaffsPage from './pages/dashboard/staffs/StaffsPage'
import ViewEventPage from './pages/dashboard/events/ViewEventPage'
import EventLayout from './pages/dashboard/events/EventLayout'
import ChatsLayout from './pages/dashboard/chats/ChatsLayout'
import ChatsPage from './pages/dashboard/chats/ChatsPage'
import OpenChat from './pages/dashboard/chats/OpenChat'
import PaymentRequests from './pages/dashboard/payments/PaymentRequests'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './store'
import ChatDetails from './pages/dashboard/chats/ChatDetails'
import CallLayout from './pages/dashboard/CallLayout'
import WebsocketStore from './provider/WebsocketStore'
import StaffsLayout from './pages/dashboard/staffs/StaffsLayout'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <BrowserRouter>
          {/* Don't remove or edit this this everyone!!!
          This is set inorder to see toasts (Those messages you see when logging in success or error) */}
          <Toaster expand position='top-right' closeButton theme='dark' richColors />
          <QueryClientProvider client={queryClient}>
            <WebsocketStore>
              <Routes>
                  <Route path='/' element={<App/>} />
                  <Route path='/login' element={<LoginPage/>} />
                  <Route path='/register' element={<RegisterPage />} />
                  <Route path='/dashboard' element={<CallLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path='chats' element={<ChatsLayout />}>
                      <Route index element={<OpenChat />} />
                      <Route path=':dmId' element={<ChatsPage/>} />
                      <Route path=':dmId/details?' element={<ChatDetails />} />
                    </Route>
                    <Route path='announcements' element={<AnnouncementPage />} />
                    <Route path='students' element={<StudentsPage />} />
                    <Route path='cohorts' element={<BatchesPage />} />
                    <Route path='courses' element={<CoursesPage />} />
                    <Route path='my-batches' element={<MyBatchesPage />} />
                    <Route path='staffs' element={<StaffsPage />} />
                    <Route path='mentees' element={<MenteeLayout />} >
                      <Route index element={<MenteesPage />} />
                      <Route path=':menteeId' element={<ViewMenteePage />} />
                    </Route>
                    <Route path='my-cohorts' element={<MyBatchesPage />} />
                    <Route path='staffs' element={<StaffsLayout />}>
                      <Route index element={<StaffsPage />} />
                    </Route>
                    <Route path='mentees' element={<MenteesPage />} />
                    <Route path='events' element={<EventLayout />} >
                    <Route path='payments' element={<PaymentRequests />} ></Route>
                      <Route index element={<EventsPage />} />
                      <Route path=':eventId' element={<ViewEventPage />} />
                    </Route>
                    <Route path='feedbacks' element={<FeedbacksPage />} />
                    <Route path='*' element={<PageNotFound />}/>
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
              </Routes>
            </WebsocketStore>
          </QueryClientProvider>
        </BrowserRouter>
    </Provider>
)
