import React, { useState } from 'react'
import {toast} from "react-toastify"
import {ForgetPasswordLink} from '../../services/passwordApi'

const Resetpassword = () => {

  const [email, setEmail] = useState('')

  const validate = () => {
    let flag = true
    if(email === "" || email === null){
      flag = false
      toast.warning("Please enter email to send link")
    }
    return flag
  }

  const sendLink = async (e) => {
    e.preventDefault()

    if(validate()){
      const response = await ForgetPasswordLink(email)
      if(response.status === 200){
        toast.success("Password reset link send successfully in your Email")
      }else{
        toast.error("Invalid User")
      }
      setEmail('')
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row m-5 no-gutters shadow-lg">
          <div className="col-md-6 d-none d-md-block">
            <img src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?w=740&t=st=1680688065~exp=1680688665~hmac=572e235e00cb6bdff456464ad337ad37356549d3679c3171af63b0c8fa616651" alt="abc" height='350vh' width='510vw'/>
          </div>
          <div className="col-md-6 bg-white p-5">
            <h3 className="pb-3">Forget Password</h3>
            <div className="form-style">
              <form onSubmit={sendLink}>

                <div className="form-outline mb-4">
                    <input type="email" id="email" name='email' value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="form-control form-control-lg" />
                </div>

                <div className="pb-2">
                  <button type="submit" className="btn w-100 font-weight-bold mt-2" style={{background:'#000000', color: '#ffffff'}}>Send Email</button>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resetpassword