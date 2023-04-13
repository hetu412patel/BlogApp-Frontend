import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../Store/userSlice'
import { useEffect } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { editUserRole } from '../../services/userApi'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Users = () => {

  const users = useSelector(state => state?.user?.user)
  // console.log(users);
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);
  const [role, setRole] = useState('');
  const [id, setId] = useState(null)

  const handleClose = () => setOpen(false);

  const handleOpen = (data) => {
    setRole(data.role)
    setId(data._id)
    setOpen(true);
  }

  const handleChange = (e) => {
    setRole(e.target.value)
  }

  const roleHandler = async (e) => {
    e.preventDefault()
    const updatedRole = {id, role}
    await editUserRole(updatedRole)
    dispatch(getUser())
    handleClose()
  }

  const columnDefs = [
    { field: 'name', sortable: true, filter: true },
    { field: 'email', sortable: true, filter: true },
    { field: 'role', sortable: true, filter: true },
    { field: 'address', sortable: true, filter: true },
    { field: 'Action', cellRenderer: (e) => <div><button className='btn btn-secondary btn-sm' onClick={() => handleOpen(e.data)}>change Role</button></div> }
  ]

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <div>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{marginBottom: "20px", display: "flex"}}>
            Change Role
          <CloseIcon style={{marginLeft: "12vw", cursor: "pointer" }} onClick={handleClose} />
          </Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value="admin">admin</MenuItem>
                  <MenuItem value="user">user</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" style={{margin: "3vh 0px 0px 17vw"}} onClick={roleHandler}>Change</Button>
            </Box>
          </Box>
        </Modal>
      </div>

      <div className='ag-theme-alpine' style={{ height: 400, width: 1007, margin: '50px 90px' }}>
        <AgGridReact
          rowData={users}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
          animateRows={true}
        />
      </div>
    </div>
  )
}

export default Users