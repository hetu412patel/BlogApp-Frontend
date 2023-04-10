import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {APIS} from "../url/url"
import axios from "axios";
import { toast } from "react-toastify";

export const getBlogs = createAsyncThunk(
    "blog/getBlogs",
    async () => {
        try {
             const response = await axios.get(`${APIS.BLOG_API}/allblogs`);
             const blogs = await response?.data;
             if (blogs?.length > 0) {
                return blogs;
             } else {
                toast.error("No Blogs Found");
             }
            
             } catch (error) {
                toast.error(error?.response?.data?.msg);
            }
    })

const blogSlice = createSlice({
    name:'blog',
    initialState:{
        blog:[],
        loading:false,
        error:null
    },
    extraReducers:{
        [getBlogs.pending]:(state,action) => {
            state.loading = true
        },
        [getBlogs.fulfilled]:(state,action) => {
            state.loading = false
            state.blog = action.payload
        },
        [getBlogs.rejected]:(state,action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export default blogSlice.reducer