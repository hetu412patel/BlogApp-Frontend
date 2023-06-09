// import axios from "axios";
import { toast } from "react-toastify";
import { instance } from "./interceptor";
// import { APIS } from "../url/url"

export const addBlogs = async (blog) => {
  // const uData = JSON.parse(localStorage.getItem('Udata'));
  // const token = uData?.token

  try {
    const response = await instance.post(`/blogs/addblog`, blog );
    const addedBlog = await response?.data?.data;
    
    if (addedBlog) {
      toast.success("Blog Added Successfully");
    }else{
      toast.error("Blog not added")
    }
  }catch(e){
    toast.error("error",e.message)
  }
};

export const updateBlog = async (blog) => {
 
  // const uData = JSON.parse(localStorage.getItem('Udata'));
  // const token = uData?.token

  const id = blog.get("_id");
  
  try {
    const response = await instance.patch(`/blogs/update/${id}`, blog );
    const updatedBlog = await response?.data;

    if (updatedBlog) {
      toast.success("Blog Updated Successfully");
      return true;
    } else {
      toast.error("Blog was not updated");
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteBlog = async (id) => {
  
  // const uData = JSON.parse(localStorage.getItem('Udata'));
  // const token = uData?.token
  try {
    const response = await instance.delete(
      `/blogs/delete/${id}`,
    );
    if (response.status === 200) {
      toast.success("Blog Deleted Successfully");
    } else {
      toast.error("Blog can't delete");
    }
  } catch (error) {
    console.log("error", error);
    toast.error(error.message);
  }
};

export const blogDetail = async(id) => {
  try{
    const response = await instance.get(`/blogs/blog/${id}`)
    const blog = response?.data.data
    
    if(!blog){
      toast.error("Blogs not found")
    }else{
      return blog
    }
  }catch(e){
    toast.error(e.message)
  }
}