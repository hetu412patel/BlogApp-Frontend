import axios from "axios";
import { toast } from "react-toastify";
import { APIS } from "../url/url"

export const addBlogs = async (blog) => {
  const uData = JSON.parse(localStorage.getItem('Udata'));
  const token = uData?.token

  try {
    const response = await axios.post(`${APIS.BLOG_API}/addblog`, blog, {
      headers: { 'Authorization': 'Bearer ' + token }
    });

    const addedBlog = await response?.data.data;
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
  console.log("blog", blog);
  const uData = JSON.parse(localStorage.getItem('Udata'));
  const token = uData?.token
  try {
    const response = await axios.patch(`${APIS.BLOG_API}/update/${blog.id}`, blog, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const updatedBlog = await response?.data;

    if (updatedBlog) {
      toast.success("Blog Updated Successfully");
      return true;
    } else {
      toast.error("You can not Update this Blog");
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteBlog = async (id) => {
  
  const uData = JSON.parse(localStorage.getItem('Udata'));
  const token = uData?.token
  try {
    const response = await axios.delete(
      `${APIS.BLOG_API}/delete/${id}`,
      {
        headers: { 'Authorization': 'Bearer ' + token }
      }
    );
    if (response.status === 200) {
      toast.success("Blog Deleted Successfully");
    } else {
      toast.error("Blog can't delete");
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const blogDetail = async(id) => {
  try{
    const response = await axios.get(`${APIS.BLOG_API}/blog/${id}`)
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