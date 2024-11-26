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
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
