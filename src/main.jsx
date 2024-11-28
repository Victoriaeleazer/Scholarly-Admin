import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes } from 'react-router'
import { Route } from 'react-router'
import LoginPage from './pages/authentication/LoginPage'
import PageNotFound from './pages/page-not-found/PageNotFound'
import { Toaster } from 'sonner'
import RegisterPage from './pages/authentication/RegisterPage'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import DashboardPage from './pages/dashboard/DashboardPage'
import ChannelPage from './pages/dashboard/channels/ChannelPage'
import FeedbacksPage from './pages/dashboard/feedbacks/FeedbacksPage'
import AnnouncementPage from './pages/dashboard/announcements/AnnouncementPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    {/* Don't remove or edit this this everyone!!!
    This is set inorder to see toasts (Those messages you see when logging in success or error) */}
    <Toaster expand position='top-right' closeButton theme='dark' richColors />
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path='channels' element={<ChannelPage />} />
          <Route path='announcements' element={<AnnouncementPage />} />
          <Route path='feedbacks' element={<FeedbacksPage />} />
          <Route path='*' element={<PageNotFound />}/>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
