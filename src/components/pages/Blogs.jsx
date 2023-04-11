import React, { useCallback, useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { getBlogs } from '../../Store/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteBlog } from '../../services/blogApi';
import BlogForm from '../BlogForm'

import 'ag-grid-community/styles/ag-grid.css'; 
import "ag-grid-community/styles/ag-theme-alpine.css";
import { toast } from 'react-toastify';

const AllBlogs = () => {

  const pathname = window.location.pathname

  const blogs = useSelector(state => state.app.blog)
  const dispatch = useDispatch()

  const userData = JSON.parse(localStorage.getItem("Udata"))
  const token = userData?.token
  const role = userData?.data?.role
  const currentUserId = userData?.data?._id

  const filterMyBlog = blogs.filter(blog => blog.userId === currentUserId)

  const deleteHandler = useCallback(async(data) => {
    if(currentUserId === data.userId){
      if (window.confirm("Do you want to delete?")) {
        await deleteBlog(data._id)
        dispatch(getBlogs())
      }
    }else{
      toast.error("You can't delete another admin blog")
    }
  },[currentUserId, dispatch])

  const editHandler = useCallback((data) => {
    if(currentUserId === data.userId){
      console.log(data);
      // return <BlogForm blogData={data} />
    }else{
      toast.error("You can't update another admin blog")
    }
  },[currentUserId])

  const viewHandler = useCallback((e) => {
    if(token){
      return <Link to={`/blogDetail/${e.data._id}`} style={{textDecoration:"none", color:"black", fontWeight:"bolder"}}>{e.value}</Link>
    }else{
      return e.value
    }
  },[token])

  const actionHandler = useCallback((e) => {
      return <div><EditIcon style={{ cursor: "pointer", color: "green" }} onClick={() => editHandler(e.data)}/><DeleteIcon style={{ cursor: "pointer", color: "red", marginLeft: "2vw" }} onClick={() => deleteHandler(e.data)} /></div>
    },[ editHandler, deleteHandler])

    const [columnDefs, setColumnDefs] = useState([
        {field:'title', sortable: true, filter: true, cellRenderer: viewHandler },
        {field:'description', sortable: true, filter: true, width: 550, maxWidth: 900},
        {field:'author', sortable: true, filter: true},
        {field:'category', sortable: true, filter: true}
      ])

      useEffect(() => {
        if(role === 'admin'){
          setColumnDefs([
            {field:'title', sortable: true, filter: true, cellRenderer: viewHandler},
            {field:'description', sortable: true, filter: true, width: 550, maxWidth: 900},
            {field:'author', sortable: true, filter: true},
            {field:'category', sortable: true, filter: true},
            { field: 'action', cellRenderer: actionHandler }
          ])
      }},[token, viewHandler, actionHandler, role])

      useEffect(() => {
        dispatch(getBlogs())
      },[dispatch])

  return (
    <div>
      {(role === 'admin') && <BlogForm />}
        <div className='ag-theme-alpine' style={{height:400, width: 1160, margin: '20px 90px'}}>
            <AgGridReact 
              rowData = {pathname !== "/blogs" ? filterMyBlog : blogs} 
              columnDefs = {columnDefs}
              paginationAutoPageSize={true}
              animateRows={true}
             />
        </div>
    </div>
  )
}

export default AllBlogs