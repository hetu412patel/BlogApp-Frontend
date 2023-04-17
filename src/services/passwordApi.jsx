// import axios from "axios";
// import { APIS } from "../url/url"
import {toast} from 'react-toastify'
import { instance } from '../components/auth/interceptor'

export const ValidateUser = async(id, token) => {
    try{
        const response = await instance.get(`/password/forgetpassword/${id}/${token}`)
        return response  
    }catch(e){
        toast.error(e)
    }
}

export const ForgetPasswordLink = async(email) => {
    try{
        const response = await instance.post(`/password/sendpasswordlink`, {email : email})
        return response
    }catch(e){
        toast.error(e)
    }
}

export const ChangePassword = async(password, confirmpassword, id, token) => {
    try{
        const response = await instance.patch(`/password/${id}/${token}`, {password: password, confirmpassword: confirmpassword} )

        return response

    }catch(e){
        toast.error(e)
    }
}
