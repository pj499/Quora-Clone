import '../styles/App.css';
import SignIn from '../pages/SignIn';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"/>
      <Routes>
          <Route path='/' element={<SignIn/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
