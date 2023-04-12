import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginUser } from '../../services/userApi'

const Login = () => {

  const navigate = useNavigate()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  
  const validate = () => {
    let result = true

    if(email === '' && password === ''){
      result = false;
      toast.warning("All fields are required")
    }
    else if(email === null || email === ''){
      result = false;
      toast.warning("Please enter username")
    }
    else if(password === null || password === ''){
      result = false;
      toast.warning("Please enter password")
    }
    return result
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    let loginData = {email, password}
    if(validate()){
      const data = await loginUser(loginData)
      if(data){
        localStorage.setItem("Udata", JSON.stringify(data))
        navigate("/blogs")
      }
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row m-5 no-gutters shadow-lg">
          <div className="col-md-6 d-none d-md-block">
            <img src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?w=740&t=st=1680688065~exp=1680688665~hmac=572e235e00cb6bdff456464ad337ad37356549d3679c3171af63b0c8fa616651" alt="abc" height='520vh' width='520vw' />
          </div>
          <div className="col-md-6 bg-white p-5">
            <h3 className="pb-3">Login Form</h3>
            <div className="form-style">
              <form onSubmit={submitHandler}>
                <div className="form-outline mb-4">
                    <input type="email" id="email" name='email' placeholder="Email" className="form-control form-control-lg" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="form-outline mb-4">
                  <input type="password" placeholder="Password" name='password' className="form-control form-control-lg" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div><NavLink to='/resetpassword' style={{marginLeft: "19vw"}}>Forget Password?</NavLink></div>
                </div>
                <div className="pb-2">
                  <button type="submit" className="btn w-100 font-weight-bold mt-2" style={{background:'#000000', color: '#ffffff'}}>Login</button>
                </div>
              </form>
              <div className="sideline" style={{marginLeft : '14vw'}}>OR</div>
              <div>
                <button type="submit" className="btn w-100 font-weight-bold mt-2" style={{background:'#66fcf1'}}><i className="fa fa-google" aria-hidden="true"></i> Login With Google</button>
              </div>
              <div className="pt-4 text-center">
                Get Members Benefit. 
                <NavLink to='/register'>Sign Up</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login




