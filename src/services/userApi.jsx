import axios from "axios";
import { toast } from "react-toastify";
import {APIS} from "../url/url"

export const registerUser = async(data) => {
  try{
    const response = await axios.post(`${APIS.USER_API}/register`, data, { 
      headers: { 'Content-Type': 'application/json' }
    })
    const user = await response?.data
    if(!user){
      toast.error("User not registered")
    }else{
      toast.success('User Registered Successfully')
    }
  }catch(e){
    toast.error("error", e.message)
  } 
}

export const loginUser = async(data) => {
  
  try{
    const response = await axios.post(`${APIS.USER_API}/login`, data , { 
      headers: { 'Content-Type': 'application/json'}
    })

    const user = await response?.data
    const token = user?.token

    if(!token){
      toast.error("Please check login credentials")
    }else{
      toast.success("Login successfully")
      return user
    }
  }catch(e){
    toast.error(e.response.data.message)
  } 
}

export const editUserRole = async (data) => {
  
    const userData = JSON.parse(localStorage.getItem("Udata"))
    const token = userData?.token

    try {
      const response = await axios.patch(`${APIS.USER_API}/changerole/${data.id}`, data, {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const editUserRole = await response?.data;
      if (editUserRole) {
        toast.success("UserRole edited Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
