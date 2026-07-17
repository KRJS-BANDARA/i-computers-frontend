import './App.css'
import ProductCard from './components/procuctCard'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import AdminPage from './pages/adminPage'
import TestPage from './pages/test'
import Test1Page from './pages/test1'
import { Route, Routes } from 'react-router-dom'  
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPassword from './pages/forgetPassword';

function App() {

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
       {/* <GoogleOAuthProvider clientId="19329537837-c8tqg4demeov3m56kvfjpufpvff9b2qh.apps.googleusercontent.com"> */}
      
    <>
      {/* <ProductCard name="MacBook Air M5 Chip 13 inch (2026)" price="Rs525,000.00" imgUrl="https://d2bschjhk4kxui.cloudfront.net/assets/images/product/69ab016f84a621772814703.webp"/>
      <ProductCard name="MacBook Neo 13 inch (2026)" price="Rs325,000.00" imgUrl="https://d2bschjhk4kxui.cloudfront.net/assets/images/product/69aaf75f58e471772812127.webp"/>
      <ProductCard name="Macbook Pro M5 Chip 14 inch 16GB / 512GB (2025)" price="Rs619,000.00" imgUrl="https://d2bschjhk4kxui.cloudfront.net/assets/images/product/68f09a95046661760598677.webp"/> */}
    {/* <div className='w-175 h-175 bg-yellow-300 relative'>
      <div className='w-[600px] h-[600px] flex flex-col justify-evenly items-center bg-gray-400'>
        <div className='w-[100px] h-[100px] bg-blue-700'></div>
        <div className='w-[100px] h-[100px] fixed top-[100px] right-[10px] bg-red-700'></div>
        <div className='w-[100px] h-[100px] bg-white'></div>
        <div className='w-[100px] h-[100px] bg-green-700'></div>
        <div className='w-[100px] h-[100px] absolute bottom-[10px] right-[10px] bg-black'></div>  
      </div>
    </div> */}

    <div className='w-full h-screen'>
      <Toaster position='top-right'/>
    <Routes>
      <Route path='/*' element={<HomePage/>}/>
      <Route path='/signin' element={<LoginPage/>}/>
      <Route path='/signup' element={<RegisterPage/>}/>
      <Route path="/forget-password" element={<ForgetPassword/>}/>
      <Route path='/admin/*' element={<AdminPage/>}/>
      <Route path='/test' element={<TestPage/>}/>
      <Route path='/test1' element={<Test1Page/>}/>
    </Routes>
    </div>
    
    </>
    </GoogleOAuthProvider>
  )
}

export default App
