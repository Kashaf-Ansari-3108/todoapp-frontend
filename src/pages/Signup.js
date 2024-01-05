import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axiosconfig from '../config/axios'
import axios from 'axios'
import useAlert from '../context/useAlert';
import Loader from "../component/Loader";

const Signup = () => {
  const { setAlert } = useAlert();
  const [loading, setloading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")
  const navigate = useNavigate();

  const signupHandler = async (e) => {
   try {
      e.preventDefault();
      setloading(true);
      const obj = {
        name, email, password:pwd
      }
      const response = await axiosconfig.post('/createUser', obj);
      setAlert(response?.data?.message,'success');
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
       setAlert(error.response?.data?.message || 'An Error Occurred','error');
      }
    } finally {
      setloading(false);
    }
  };


  const inputs = document.querySelectorAll(".input");

  function addCl() {
    let par = this.parentNode.parentNode;
    par.classList.add("focus");
  }

  function remC1() {
    let par = this.parentNode.parentNode;
    if (this.value == "") par.classList.remove("focus");
  }

  inputs.forEach((input) => {
    input.addEventListener("focus", addCl);
    input.addEventListener("blur", remC1);
  });


  return (
    <>
      <img src="https://i.ibb.co/XWdPc2X/wave-01.png" className="wave" />
      <div className="container">
        <div className="img">
          <img src="https://i.ibb.co/JvXP8rW/phone.png" />
        </div>
        <div className="login-content">
          <form
            onSubmit={(e) => signupHandler(e)}
            className="form-login">
            <h2 className="title">Sign Up</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Username</h5>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text" className="input" />
              </div>
            </div>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="div">
                <h5>Email</h5>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email" className="input" />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5>Password</h5>
                <input
                  onChange={(e) => setPwd(e.target.value)}
                  type="password" className="input" />
              </div>
            </div>
            {loading? <Loader/>:<input type="submit" className="btn" value="CREATE ACCOUNT" /> }
            
            <h5>
              Already have an account? <NavLink to={'/'}>Login</NavLink>
            </h5>
          </form>

        </div>
      </div>
    </>
  )
}

export default Signup