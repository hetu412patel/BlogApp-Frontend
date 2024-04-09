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
import { Button } from '@mui/material';

const AllBlogs = () => {

  const pathname = window.location.pathname

  const [open, setOpen] = useState(false);
  const [blogData, setBlogData] = useState(null);

  const blogs = useSelector(state => state?.app?.blog)
  const dispatch = useDispatch()

  const userData = JSON.parse(localStorage.getItem("Udata"))
  const token = userData?.token
  const role = userData?.data?.role
  const currentUserId = userData?.data?._id

  const filterMyBlog = blogs?.filter(blog => blog?.userId === currentUserId)

  const deleteHandler = useCallback(async(data) => {
    
    if(currentUserId === data?.userId){
      if (window.confirm("Do you want to delete?")) {
        await deleteBlog(data?._id)
        dispatch(getBlogs())
      }
    }else{
      toast.error("You can't delete another admin blog")
    }
  },[currentUserId, dispatch])

  const editHandler = useCallback((data) => {
    if(currentUserId === data?.userId){
      setBlogData(data)
      handleOpen()
    }else{
      toast.error("You can't update another admin blog")
    }
  },[currentUserId])

  const nameHandler = useCallback((e) => {
    if(token){
      const userData = e.data?.userData
      for (let i = 0; i < userData?.length; i++) {
        const name = userData[i].name;
        return name
      }
    }
  },[token])

  const viewHandler = useCallback((e) => {
    if(token){
      return <Link to={`/blogDetail/${e.data?._id}`} style={{textDecoration:"none", color:"black", fontWeight:"bolder"}}>{e.value}</Link>
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
        {field:'Writer-Name', sortable: true, filter: true, cellRenderer: nameHandler},
        {field:'author', sortable: true, filter: true},
        {field:'category', sortable: true, filter: true}
      ])

      useEffect(() => {
        if(role === 'admin'){
          setColumnDefs([
            {field:'title', sortable: true, filter: true, cellRenderer: viewHandler},
            {field:'description', sortable: true, filter: true, width: 550, maxWidth: 900},
            {field:'Writer-Name', sortable: true, filter: true, cellRenderer: nameHandler},
            {field:'author', sortable: true, filter: true},
            {field:'category', sortable: true, filter: true},
            { field: 'action', cellRenderer: actionHandler }
          ])
      }},[token, viewHandler, actionHandler, role, nameHandler])

      useEffect(() => {
        dispatch(getBlogs())
      },[dispatch])

      const handleOpen = () => setOpen(true);
      
      const handleClose = () => {
        setOpen(false);
        setBlogData(null)
      }

  return (
    <div>
      {(role === 'admin') && <Button variant="contained" style={{ marginLeft: "83vw", background: "#000000", color: "#66fcf1", fontWeight: "bolder" }} onClick={handleOpen}>Add Blog</Button>}
        <div className='ag-theme-alpine' style={{height:400, width: 1160, margin: '20px 45px'}}>
            <AgGridReact 
              rowData = {pathname !== "/blogs" ? filterMyBlog : blogs} 
              columnDefs = {columnDefs}
              pagination={true}
              paginationAutoPageSize={true}
              animateRows={true}
             />
             <BlogForm open={open} handleClose={handleClose} blogData={blogData} />
        </div>
    </div>
  )
}

export default AllBlogs