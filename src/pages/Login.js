import React,{useState} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import axiosconfig from '../config/axios'
import axios from 'axios'
import useAlert from '../context/useAlert';
import Loader from '../component/Loader';


const Login = ()=> {
  const { setAlert } = useAlert();
  const [loading, setloading] = useState(false)
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const navigate = useNavigate();
    const loginHandler = async (e)=> {
      try {
        e.preventDefault();
        setloading(true);
        const obj = {
           email, password:pwd
        }
        const response = await axiosconfig.post('/login', obj);
        localStorage.setItem("token",response?.data?.token)
        setAlert(response?.data?.message, 'success');
        navigate('/Todo');
      } catch (error) {
        if (axios.isAxiosError(error)) {
         setAlert(error.response?.data?.message || 'An Error Occurred','error');
        }
      } finally {
        setloading(false);
      }
     }

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
          <form onSubmit={(e)=>loginHandler(e)}  className="form-login">
            <img src="https://i.ibb.co/H4f3Hkv/profile.png" />
            <h2 className="title">Welcome</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Email</h5>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="input"
                />
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
                  type="password"
                  className="input"
                />
              </div>
            </div>
          
            {loading? <Loader/>:  <input type="submit" className="btn" value="Login" /> }
            <h5>
              Don't have an account?<NavLink to={'/CreateAccount'}>Sign Up</NavLink>
            </h5>
          </form>
        </div>
      </div>
    </>
    // <>
    // <h1>Hello</h1>
    // </>
  )
}

export default Login