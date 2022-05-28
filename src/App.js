import './App.css';
import "@fontsource/roboto";
import Login from './Pages/Login/Login';
import Exam from './Pages/Exam/Exam';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Result from './Pages/Result/Result';
import Header from './Components/Header';
import { useSelector } from 'react-redux';

function App() {
  const { login } = useSelector(state => state.auth)
  return (
    <>
      {/* <BrowserRouter basename="/MCQ"> */}
      <BrowserRouter basename={window.location.pathname || ''}>
        {login && <Header />}
        <Routes>
          <Route path='/' element={<Exam />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Result' element={<Result />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
