import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { blogDetail } from '../../services/blogApi'

const BlogDetail = () => {
    const {id} = useParams()
    
    const [blogHandler, setBlogHandler] = useState({})

    useEffect(()=>{
        const blog = async() => {
            setBlogHandler(await blogDetail(id) )
        }
        blog()
      },[id])

  return (
    <>
    <div className="container">
        <div className="col">
            <div className="row1" style={{display:"flex"}}>
                <img src={blogHandler?.blogImage} alt="blogImage" height="350vh" width="400vw" />
                <div className="content" style={{marginLeft: "18vw", marginTop:"18vh"}}>
                    <h3>Title : {blogHandler?.title}</h3>
                    <h3 style={{marginTop:"15px"}}>Category : {blogHandler?.category}</h3>
                    <h5 style={{marginTop:"40px"}}>Author : {blogHandler?.author}</h5>
                </div>
            </div>
            <div className="row2" style={{marginTop : "20px", textAlign:"center"}}>
                <h5>{blogHandler?.description}</h5>
            </div>
        </div>
    </div>
    </>
  )
}

export default BlogDetail