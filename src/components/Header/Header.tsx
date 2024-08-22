import React, {useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '../SideBar/SideBar';

const Header = () => {
    //サイドバーの状態を指定
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const handleSidebarOpen = () => {
        setSidebarOpen(true);
      };

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    }


  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            musuBe
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <SideBar open={isSidebarOpen} onClose={handleSidebarClose} />
    </Box>
    </div>
  )
}

export default Header

