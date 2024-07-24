import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import registerimg from '../assets/register.avif';
import axios from "axios";
import { message } from "antd";

export const Register = () => {
  const [password, setpassword] = useState("");
  const [cnfpassword, setcnf] = useState("");
  const [passerror, setpasserror] = useState("");

  const { register, handleSubmit} = useForm();

  const Navigate = useNavigate();

  const onSubmit = async (data) => {
    try{
        const {name,email,password} = data;
        const res = await axios.post('http://localhost:8080/api/auth/register',{name,email,password});
        console.log(res.data.redirectUrl);
        if(res.statusText==="OK"){
            const {token} = res.data;
            localStorage.setItem('token', token);
            message.success("Register Successful");
            Navigate(res.data.redirectUrl);
          }
    }
    catch(error){
        console.log(error);
    }
    
  };


  useEffect(()=>{
    if(password && cnfpassword){
        if(password === cnfpassword){
            setpasserror("");
        }
        else{
            setpasserror("Password does not match")
        }
    }
    else{
        setpasserror('')
    }
  },[password,cnfpassword]);




  return (
    <div className="container h-[100vh]  w-[100vw]">
      <div className="login-main w-[100vw] h-[100vh] p-12  flex">
        <div className="login-img flex justify-center items-center h-full w-[50%]">
            <img src={registerimg} alt="Register"/>
        </div>
        <div className="login-form justify-center  flex items-center w-[50%] h-full ">
          <div className="form flex flex-col gap-5 w-[100%] justify-center items-center">
            <form className="w-[50%] flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}            >
              <h2 className="text-center  font-mono">
                Register your Account
              </h2>
              <TextField className="w-[100%]" {...register("name")}  label="Name" variant="outlined"/>
              <TextField className="w-[100%]" {...register("email")} label="Email" variant="outlined"/>
              <TextField className="w-[100%]" {...register("password")} onChange={(e)=>{setpassword(e.target.value)}} label="Password" variant="outlined"/>
              <TextField className="w-[100%]" onChange={(cnf) => {setcnf(cnf.target.value)}}             label="Confirm Password" variant="outlined"/>
              {passerror && <p style={{ color: "red" }}>{passerror}</p>}
              <button  className="w-full " type='submit' >Submit</button>
            </form>
            
            <Link to="/login">Sign In?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
