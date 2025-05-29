import {Layout} from './components/Layout.jsx'
import {Routes, Route} from 'react-router-dom'
import { MainPage } from './pages/MainPage.jsx'
import { StudentPage } from './pages/StudentPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { AdminPage } from './pages/AdminPage.jsx';
import { TeacherPage } from './pages/TeacherPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import {ToastContainer} from 'react-toastify'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMe } from './redux/features/auth/authslice.js';
import { Dashboard } from './pages/DashBoard.jsx';



function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [])

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='register' element={<RegisterPage/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='student' element={<StudentPage/>}/>
        <Route path='admin' element={<AdminPage/>}/>
        <Route path='teacher' element={<TeacherPage/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
      </Routes>

      <ToastContainer position='bottom-right' />
    </Layout>
  );
}

export default App;
