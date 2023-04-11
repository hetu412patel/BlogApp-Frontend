import React, { useState } from 'react'
import { NavLink} from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import {ValidateUser, ChangePassword} from '../../services/passwordApi'
import { useNavigate, useParams } from "react-router-dom";

const Forgetpassword = () => {

  const {id, token} = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')

  const validate = () => {
    let flag = true
    if(password === '' && confirmpassword === ''){
      flag = false
      toast.warning("All fields are require")
    }else if(password === ''){
      flag = false
      toast.warning("password is required")
    }else if(confirmpassword === ''){
      flag = false
      toast.warning("Confirm Password is required")
    }else if(password !== confirmpassword){
      flag = false
      toast.warning("Make sure both passwords are same")
    }
    return flag
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if(validate()){
      ChangePassword(password, confirmpassword, id, token, navigate)
    }
  }

  useEffect(() => {
    ValidateUser(id, token, navigate)
  },[id, token, navigate])

  return (
    <div>
      <div className="container">
        <div className="row m-5 no-gutters shadow-lg">
          <div className="col-md-6 d-none d-md-block">
            <img src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?w=740&t=st=1680688065~exp=1680688665~hmac=572e235e00cb6bdff456464ad337ad37356549d3679c3171af63b0c8fa616651" alt="abc" height='520vh' width='520vw' />
          </div>
          <div className="col-md-6 bg-white p-5">
            <h3 className="pb-3">Password Reset Form</h3>
            <div className="form-style">
              <form onSubmit={submitHandler}>
              <div className="form-outline mb-4">
                  <input type="password" placeholder="Password" name='password' className="form-control form-control-lg" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="form-outline mb-4">
                  <input type="password" placeholder="Confirm Password" name='confirmpassword' className="form-control form-control-lg" id="confirmpassword" value={confirmpassword} onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                <div className="pb-2">
                  <button type="submit" className="btn w-100 font-weight-bold mt-2" style={{background:'#000000', color: '#ffffff'}}>Reset Password</button>
                </div>
              </form>
              <div className="pt-4 text-center">
               Return Back :
                <NavLink to='/login' style={{marginLeft:"1vw"}}>LOGIN</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forgetpassword