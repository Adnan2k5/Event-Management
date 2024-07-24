import React , {useEffect}  from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { message } from "antd";
import {  useNavigate } from "react-router-dom";
import { TextField  } from '@mui/material';
import { Link } from 'react-router-dom';

import loginimg from '../assets/login-img.avif';
import { Layout } from '../components/Layout';



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
        try{
          console.log(data);
          const {email,password}  = data;
          console.log(email,password);
          const res = await axios.post('http://localhost:8080/api/auth/login',{email,password});
          console.log(res);
          if(res.statusText==="OK"){
            const {token} = res.data;
            localStorage.setItem('token', token);
            message.success("Login Successful");
            Navigate(res.data.redirectUrl);
          }
          else{
            message.error("Invalid Credentials");
          }
         }catch(err){
          console.log(err);
          message.error("Invalid Credentials");
        }
    }
        

    return (
      <Layout>
        <div className="container h-[100vh]  w-[100vw]">
          <div className="login-main w-[100vw] h-[100vh] p-12  flex">
            <div className="login-img flex justify-center items-center h-full w-[50%]"><img className="flex mix-blend-screen" src={loginimg} alt='login'/> </div>
            <div className="login-form justify-center  flex items-center w-[50%] h-full ">
              <div className="form flex flex-col gap-5 w-[100%] justify-center items-center">
                <form className="w-[50%] flex flex-col gap-5" method="POST" onSubmit={handleSubmit(onSubmit)}>
                  <h2 className="text-center  font-mono">Login into your Account</h2>
                <TextField className="w-[100%]" {...register('email')}  label="Email" variant="outlined" />
                <TextField className="w-[100%]" {...register('password')}  label="Password" variant="outlined" />
                <button className="w-[100%]" type='submit'>Submit</button>
                </form>
                <Link to='/register'>Sign Up?</Link>
              </div>
            </div>
          </div>
        </div>
        </Layout>
    )
  }