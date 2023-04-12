import axios from "axios";
import { APIS } from "../url/url"
import {toast} from 'react-toastify'

export const ValidateUser = async(id, token) => {
    try{
        const response = await axios.get(`${APIS.PASSWORD_API}/forgetpassword/${id}/${token}`, {
            headers: {"Content-Type" : "application/json"}
          })
        return response  
    }catch(e){
        toast.error(e)
    }
}

export const ForgetPasswordLink = async(email) => {
    try{
        const response = await axios.post(`${APIS.PASSWORD_API}/sendpasswordlink`, {email : email})
        return response
    }catch(e){
        toast.error(e)
    }
}

export const ChangePassword = async(password, confirmpassword, id, token) => {
    try{
        const response = await axios.patch(`${APIS.PASSWORD_API}/${id}/${token}`, {password: password, confirmpassword: confirmpassword} , {
            headers: {"Content-Type" : "application/json"}
          })

        return response

    }catch(e){
        toast.error(e)
    }
}
