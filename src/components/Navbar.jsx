import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import { NavLink, useNavigate } from 'react-router-dom';
import NavAvatar from './NavAvatar';

const Navbar = ({handleDrawerClose,handleDrawerOpen,theme,AppBar,drawerWidth,open,DrawerHeader}) => {

    const navigate = useNavigate()
  return (
    <>
    <AppBar position="fixed" open={open} style={{backgroundColor: "black"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ color:'#66fcf1' , flexGrow: 1, cursor: "pointer" }}>
            BLOG
          </Typography>

          <div style={{ margin: '5px 20px'}}>
                <NavLink 
                    to='/blogs' 
                    style={({ isActive }) => ({ color: isActive ? '#66fcf1' : 'white' , fontWeight: isActive ? 'bolder' : 'normal' , textDecoration: 'none'})}
                    >
                    Home
                </NavLink>
            </div>

            <div style={{ margin: '5px 20px'}}>
                <NavLink 
                    to='/about' 
                    style={({ isActive }) => ({ color: isActive ? '#66fcf1' : 'white' , fontWeight: isActive ? 'bolder' : 'normal' , textDecoration: 'none'})}
                    >
                    About
                </NavLink>
            </div>

            <div style={{ margin: '5px 20px'}}>
                {/* <NavLink 
                    to='/login' 
                    style={({ isActive }) => ({ color: isActive ? '#66fcf1' : 'white' , fontWeight: isActive ? 'bolder' : 'normal' , textDecoration: 'none'})}
                    >
                    Login
                </NavLink>  */}
                {/* <Avatar sx={{ background: '#66fcf1', color: '#000000' }}>H</Avatar> */}
                <NavAvatar />
            </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          <ListItem disablePadding onClick = {()=> navigate("/myBlogs")}>
              <ListItemButton>
                <ListItemText primary="My Blog" />
              </ListItemButton>
            </ListItem>
        </List>

        <List>
          <ListItem disablePadding onClick = {()=> navigate("/users")}>
              <ListItemButton>
                <ListItemText primary="User List" />
              </ListItemButton>
            </ListItem>
        </List>

        <List>
          <ListItem disablePadding onClick = {()=> navigate("/blogs")}>
              <ListItemButton>
                <ListItemText primary="All Blogs" />
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
    </>
  )
}

export default Navbar