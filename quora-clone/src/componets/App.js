import '../styles/App.css';
import SignIn from '../pages/SignIn';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HomePage from '../pages/HomePage';
import {UserContext} from '../provider/AuthProvider'

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"/>
      <Routes>
        <UserContext.Provider>
          <Route path='/' element={<SignIn/>}></Route>
          <Route path='/home' element={<HomePage/>}></Route>
        </UserContext.Provider>
      </Routes>
    </div>
  );
}

export default App;
