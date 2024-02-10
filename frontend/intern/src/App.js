import './App.css';
import Admin from './components/Admin';
import Signup from './components/Signup';
import Login from './components/Login';
import Customer from './components/Customer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/customer" element={<Customer/>}/>
      <Route exact path="/admin" element={<Admin/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
