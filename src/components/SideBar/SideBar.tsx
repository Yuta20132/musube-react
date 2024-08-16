import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

// Define the types for the props
interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

// Define the types for the items in the list
interface ListItem {
  text: string;
  path: string;
}

const SideBar: React.FC<SideBarProps> = ({ open, onClose }) => {
  const listItems: ListItem[] = [
    
  ];

  return (
    <Drawer anchor='left' open={open} onClose={onClose}>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {listItems.map((item, index) => (
            <ListItemButton component="a" href={item.path} key={item.text}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;
