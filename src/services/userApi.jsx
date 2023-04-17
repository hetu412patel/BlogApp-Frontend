// import axios from "axios";
import { toast } from "react-toastify";
import { instance } from "../components/auth/interceptor";
// import {APIS} from "../url/url"
// import {instance} from '../components/auth/interceptor'

export const registerUser = async(data) => {
  try{
    const response = await instance.post(`/users/register`, data)
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

    const response = await instance.post(`/users/login`, data )
    const user = response?.data
    const token = user?.token

    if(!token){
      toast.error("Please check login credentials")
    }else{
      toast.success("Login successfully")
      return user
    }
  }catch(e){
    toast.error(e?.response?.data?.message)
  } 
}

export const editUserRole = async (data) => {
  
    // const userData = JSON.parse(localStorage.getItem("Udata"))
    // const token = userData?.token

    try {
      const response = await instance.patch(`/users/changerole/${data.id}`, data);
      const editUserRole = await response?.data;
      if (editUserRole) {
        toast.success("UserRole edited Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };
