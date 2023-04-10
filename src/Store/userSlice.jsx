import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {APIS} from "../url/url"
import axios from "axios";
import { toast } from "react-toastify";

    const userData = JSON.parse(localStorage.getItem("Udata"))
    const token = userData?.token

export const getUser = createAsyncThunk(
    "blog/getUser",
    async () => {
       
        try {
            const response = await axios.get(`${APIS.USER_API}/alluser`, {headers: { 'Authorization': 'Bearer ' + token}}); 
            const users = await response?.data;
            if (!users) {
                toast.error("No users Found");
            } else {
                return users;
            } 
            } catch (error) {
                toast.error(error?.response?.data?.msg);
            }
    })

const userSlice = createSlice({
    name:'user',
    initialState:{
        user:[],
        loading:false,
        error:null
    },
    extraReducers:{
        [getUser.pending]:(state,action) => {
            state.loading = true
        },
        [getUser.fulfilled]:(state,action) => {
            state.loading = false
            state.user = action.payload
        },
        [getUser.rejected]:(state,action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export default userSlice.reducer