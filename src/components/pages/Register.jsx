import React, { useState } from 'react'
import './Register.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { APIS } from '../../url/url';

const Register = () => {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  const [address, setAddress] = useState('')

  const isValidate = () => {
    let isProceed = true;
    // let pattern = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
    if(name === '' && email === "" && confirmpassword === "" && password === "" && address === ""){
      isProceed = false;
      toast.warning("All the field is required")
    }
    else if(name === ""|| name === null){
        isProceed = false;
        toast.warning("Name is required")
      }
      else if(email === ""|| email === null){
        isProceed = false;
        toast.warning("email is required")
      }
      else if(password === ""|| password === null){
        isProceed = false;
        toast.warning("password is required")
      }
      else if(confirmpassword === ""|| confirmpassword === null){
        isProceed = false;
        toast.warning("confirm password is required")
      }
      else if(password !== confirmpassword){
       isProceed = false;
       toast.warning("Make sure passwords are same")
     }
      else if(address === ""|| address === null){
        isProceed = false;
        toast.warning("address is required")
      }
    return isProceed
  }

  const submitHandler = (e) => {
    e.preventDefault()

    let registerUser = {name, email, password, confirmpassword, address}
    if(isValidate()){
      console.log(registerUser);

      fetch(`${APIS.USER_API}/register`, {
        method: "POST", 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerUser)
      })
      .then(response => response.json())
      .then(data => {
        toast.success('User Registered Successfully')
        navigate('/login')
        // console.log("fdgd", data);
        return data
      })
      .catch((err) => {
        toast.error('Failed :' + err.message)
      })
    }
  }
  
  const resetHandler = (e) => {
    e.preventDefault()

    setName('')
    setEmail('')
    setPassword('')
    setConfirmpassword('')
    setAddress('')
  }

  return (
    <div>
      <section className="h-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <form onSubmit={submitHandler}>
            <div className="col">
              <div className="card card-registration my-4" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">
                    <img src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?w=740&t=st=1680688065~exp=1680688665~hmac=572e235e00cb6bdff456464ad337ad37356549d3679c3171af63b0c8fa616651" alt="abc" height='600vh' width='450vw' style={{ margin: '80px 0px 40px 50px' }} />
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-5 text-uppercase">Registration form</h3>

                      <div className="form-outline mb-4">
                        <input type="text" id="name" name='name' className="form-control form-control-lg" placeholder='Full Name' value={name} onChange={(e => setName(e.target.value))}/>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="text" id="email" name='email' className="form-control form-control-lg" placeholder='Email ID' value={email} onChange={(e => setEmail(e.target.value))} />
                      </div>

                      <div className="form-outline mb-4">
                        <input type="password" id="password" name='password' className="form-control form-control-lg" placeholder='Password' value={password} onChange={(e => setPassword(e.target.value))} />
                      </div>

                      <div className="form-outline mb-4">
                        <input type="password" id="confirmpassword" name='confirmpassword' className="form-control form-control-lg" placeholder='Confirm Password' value={confirmpassword} onChange={(e => setConfirmpassword(e.target.value))}/>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="text" id="address" name='address' className="form-control form-control-lg" placeholder='Address' value={address} onChange={(e => setAddress(e.target.value))}/>
                      </div>

                      <div className="pb-2">
                        <button type="submit" className="btn w-100 font-weight-bold mt-2" style={{ background: '#000000', color: '#ffffff', height: "50px" }} >Submit Form</button>
                      </div>
                      <div className="pb-2">
                        <button type="submit" className="btn w-100 font-weight-bold mt-2" style={{ background: '#66fcf1', color: '#000000', height: "50px" }} onClick={resetHandler}>Reset All</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Register