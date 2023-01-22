import '../styles/App.css';
import SignIn from '../pages/SignIn';
import {Routes, Route} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HomePage from '../pages/HomePage';
import { useAuth } from "../hooks";
import UserProfile from '../pages/UserProfile';

function App() {
  const auth = useAuth();

  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"/>
      <Routes>
          <Route path='/' element={<SignIn/>}></Route>
          <Route path='/home' element={<HomePage/>}></Route>
          <Route path='/userProfile/:userId' element={<UserProfile/>}></Route>
      </Routes>
    </div>
  );
}

export default App
