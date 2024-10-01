import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from '../src/components/Auth'
import LogoutButton from './components/Logout'
import ChatWithRobo from './pages/chatWithRobo'
import MyComponent from './components/MyComponent'
import ChatBox from './pages/talkWithRobo'
import Contact from './pages/Contact'
import About from './pages/About'



function App() {
  
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<MyComponent/>}/>
      {/* <Route path='/login' element={<LoginForm/>}/>
      <Route path='/register' element={<RegistrationForm/>}/> */}
     <Route path='/auth' element={<Auth/>}/>
     <Route path='/logout' element={<LogoutButton/>}/>
     <Route path='/chat' element={<ChatWithRobo/>}/>
     <Route path='/talk' element={<ChatBox/>}/>
     <Route path='/contact' element={<Contact/>}/>
     <Route path='/about' element={<About/>}/>
    </Routes>
   
    </>
  )
}

export default App
