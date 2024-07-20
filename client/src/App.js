
import './App.css';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoutes>< Home /></ProtectedRoutes>} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/register" element={<Register/>}/> */}
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export function ProtectedRoutes(props){
  if(localStorage.getItem('token')){
    return props.children;
  }
  else{
    return <Navigate to="/login"/>;
  }
}

export default App;
