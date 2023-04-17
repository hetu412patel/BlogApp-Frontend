import  React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close'
import { addBlogs, updateBlog } from '../services/blogApi';
import { getBlogs } from '../Store/blogSlice';
import { useDispatch } from 'react-redux';
import './BlogForm.css' 

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BlogForm({open, handleClose, blogData}) {

    const dispatch = useDispatch()
    const userData = JSON.parse(localStorage.getItem("Udata"))
    const currentUserId = userData?.data?._id

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [author, setAuthor] = useState('')
    const [blogImage, setBlogImage] = useState('')
    const [category, setCategory] = useState('')
    
    const submitHandler = async(e) => {
        e.preventDefault()
        
        const formData = new FormData()
        formData.append('title',title )
        formData.append('description',description )
        formData.append('author',author )
        formData.append('category',category )
        formData.append('userId',currentUserId)
        formData.append('blogImage', blogImage)

        if(blogData){
            formData.append('_id', blogData?._id)
            await updateBlog(formData)
        }else{
            await addBlogs(formData)
        }
        handleClose()
        dispatch(getBlogs())
    }

    useEffect(() => {
        dispatch(getBlogs())
    },[dispatch])

    useEffect(() => {
        if(blogData){
            setTitle(blogData?.title)
            setDescription(blogData?.description)
            setAuthor(blogData?.author)
            setBlogImage(blogData?.blogImage)
            setCategory(blogData?.category)
        } else{
            setTitle('')
            setDescription('')
            setAuthor('')
            setBlogImage('')
            setCategory('')
        }       
    },[blogData])

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {blogData ? "UPDATE BLOG" : "ADD BLOG"}
                        <CloseIcon style={{marginLeft: "40vw", cursor: "pointer" }} onClick={handleClose} />
                    </Typography>

                    <div className="container">
                        <form onSubmit={submitHandler}>
                            <div className="row">
                                <div className="col-25">
                                    <label htmlFor="title">Title</label>
                                </div>
                                <div className="col-75">
                                    <input type="text" id="title" name="title" value={title} placeholder="Enter Blog Title" onChange={(e => setTitle(e.target.value))} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label htmlFor="author">Author</label>
                                </div>
                                <div className="col-75">
                                    <input type="text" id="author" name="author" value={author} placeholder="Enter Blog Author" onChange={(e => setAuthor(e.target.value))} required/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label htmlFor="category">Category</label>
                                </div>
                                <div className="col-75">
                                    <select id="category" name="category" value={category} onChange={(e => setCategory(e.target.value))} required >
                                        <option value="">Select Blog Category</option>
                                        <option value="CS-IT">CS-IT</option>
                                        <option value="FOOD">FOOD</option>
                                        <option value="TRAVEL">TRAVEL</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label htmlFor="image">Upload Image</label>
                                </div>
                                <div className="col-75 my-3">
                                    <input type="file" id="blogImage" name="blogImage" onChange={(e => setBlogImage(e.target.files[0]))} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label htmlFor="description">Description</label>
                                </div>
                                <div className="col-75">
                                    <textarea id="description" name="description" value={description} placeholder="Write about your blog" onChange={(e => setDescription(e.target.value))} style={{ height: "200px" }} required ></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <input type="submit" value={blogData ? "UPDATE" : "ADD"} style={{ marginLeft: "45vw" }}/>
                            </div>
                        </form>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}
