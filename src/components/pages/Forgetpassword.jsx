import React from 'react'

const Forgetpassword = () => {
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
              <form>
                <div className="form-outline mb-4">
                    <input type="email" id="email" name='email' placeholder="Email" className="form-control form-control-lg" />
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

export default Forgetpassword