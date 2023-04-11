import axios from "axios";
import { APIS } from "../url/url"
import {toast} from 'react-toastify'

export const ValidateUser = async({id, token, navigate}) => {

    try{
        const response = await axios.get(`${APIS.PASSWORD_API}/forgetpassword/${id}/${token}`, {
            headers: {"Content-Type" : "application/json"}
          })
          if(response.status === 200){
            console.log("valid user");
          }else{
            navigate('*')
        }
    }catch(e){
        toast.error(e)
    }
}

export const ForgetPasswordLink = async({email}) => {
    try{
        const response = await axios.post(`${APIS.PASSWORD_API}/sendpasswordlink`, {email : email})
        
        if(response.status === 200){
          toast.success("Password reset link send successfully in your Email")
        }else{
          toast.error("Invalid User")
        }
    }catch(e){
        toast.error(e)
    }
}

export const ChangePassword = async({password, confirmpassword, id, token, navigate}) => {
    
    try{
        const response = await axios.post(`${APIS.PASSWORD_API}/${id}/${token}`, {password: password, confirmpassword: confirmpassword} , {
            headers: {"Content-Type" : "application/json"}
          })
          if(response.status === 200){
              toast.success("Password Update Successfully")
              navigate("/login")
            console.log("valid user");
          }else{
            toast.error("Link expired Generate new Link")
        }
    }catch(e){
        toast.error(e)
    }
}
