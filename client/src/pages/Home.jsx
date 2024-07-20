import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { jwtDecode } from 'jwt-decode';


export const Home = () => {

  const Navigate = useNavigate();
  const [user,setuser] = useState(null);

  useEffect(()=>{
    const decode = jwtDecode(localStorage.getItem('token'));
    setuser(decode);
  },[])


  const Logout = ()=>{
    localStorage.removeItem('token');
    Navigate('/login');
    message.success("Logout Successful");
  }

  return (
    <div>
      <div className="user">
        {user ?  user.name : '' }
      </div>
      <button onClick={Logout} type="submit">Logout</button>
    </div>
  )
}
