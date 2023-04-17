import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import { instance } from "../components/auth/interceptor";

    // const userData = JSON.parse(localStorage.getItem("Udata"))
    // const token = userData?.token

export const getUser = createAsyncThunk(
    "blog/getUser",
    async () => {
       
        try {
            const response = await instance.get(`/users/alluser`); 
            const users = await response?.data?.data;
            if (!users) {
                toast.error("No users Found");
            } else {
                return users;
            } 
            } catch (error) {
                toast.error("Server error");
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