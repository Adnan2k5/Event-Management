import React , {useEffect}  from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { TextField } from '@mui/material';
import { Button } from "antd";



export const Login = () => {
    const Navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token')){
          Navigate("/");
        }
      },[Navigate]);
    
    const {
        register,
        handleSubmit,
      } = useForm()


      const onSubmit = async (data)=>{
        const {email,password}  = data;
        const res = await axios.post('http://localhost:8080/api/auth/login',{email,password});
        const {token} = res.data;
        localStorage.setItem('token', token);
        message.success("Login Successful");
        Navigate('/');

       }

    return (
        <div className="container w-[100vw]">
          <div className="login-main p-8 flex">
            <div className="login-img w-[50%]">

            </div>
            <div className="login-form  w-[50%]">
              <form className="flex w-[50%] flex-col gap-5" method="POST" onSubmit={handleSubmit(onSubmit)}>
              <TextField {...register('email')}  label="Email" variant="outlined" />
              <TextField {...register('password')}  label="Password" variant="outlined" />
              <Button onSubmit={onSubmit} type="primary">Login</Button>
          
              </form>
            </div>
          </div>
            
        </div>
    )
}



