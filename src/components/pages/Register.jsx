import React from 'react'
import './Register.css'
import { useForm } from "react-hook-form";

const Register = () => {

  const { register, handleSubmit,  formState: { errors } } = useForm()

  const submitHandler = (data) => {
    console.log("data", data);
    console.log("error",errors )
  } 

  return (
    <div>
      <section className="h-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <form onSubmit={handleSubmit(submitHandler)}>
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
                        <input type="text" id="name" name='name' className="form-control form-control-lg" placeholder='Full Name' {...register("name",{required: true, min: 2 })}/>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="text" id="email" name='email' className="form-control form-control-lg" placeholder='Email ID' {...register("email",{required: true, pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$" })} />
                      </div>

                      <div className="form-outline mb-4">
                        <input type="password" id="password" name='password' className="form-control form-control-lg" placeholder='Password' {...register("password",{required: true, max:6 })} />
                      </div>

                      <div className="form-outline mb-4">
                        <input type="confirmpassword" id="confirmpassword" name='confirmpassword' className="form-control form-control-lg" placeholder='Confirm Password' {...register("confirmpassword",{required: true, max:6 })} />
                      </div>

                      <div className="form-outline mb-4">
                        <input type="text" id="address" name='address' className="form-control form-control-lg" placeholder='Address' {...register("address",{required: true })} />
                      </div>

                      <div className="pb-2">
                        <button type="submit" className="btn w-100 font-weight-bold mt-2" style={{ background: '#000000', color: '#ffffff', height: "50px" }} >Submit Form</button>
                      </div>
                      <div className="pb-2">
                        <button type="submit" className="btn w-100 font-weight-bold mt-2" style={{ background: '#66fcf1', color: '#000000', height: "50px" }}>Reset All</button>
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