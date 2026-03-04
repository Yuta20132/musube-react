import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Person as PersonIcon, 
  Forum as ForumIcon, 
  School as SchoolIcon, 
  LocalHospital as LocalHospitalIcon, 
  Business as BusinessIcon, 
  Search as SearchIcon, 
  Gavel as GavelIcon, 
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { BOARD_LABELS, CategoryId, getAccessibleCategoryIds } from '../../utils/categoryAccess';

// Define the types for the props
interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

// Define the types for the items in the list
interface ListItem {
  text: string;
  path: string;
  icon: React.ReactElement;
}

const SideBar: React.FC<SideBarProps> = ({ open, onClose }) => {
  const { isLoggedIn, userCategoryId } = useAuth();

  const boardIconMap: Record<CategoryId, React.ReactElement> = {
    1: <ForumIcon />,
    2: <SchoolIcon />,
    3: <BusinessIcon />,
    4: <LocalHospitalIcon />,
    5: <SettingsIcon />,
  };

  const boardItems: ListItem[] = isLoggedIn
    ? getAccessibleCategoryIds(userCategoryId).map((categoryId) => ({
        text: BOARD_LABELS[categoryId],
        path: `/threads_page/${categoryId}`,
        icon: boardIconMap[categoryId],
      }))
    : [];

  const fixedItems: ListItem[] = isLoggedIn
    ? [
        { text: 'プロフィール', path: '/profile', icon: <PersonIcon /> },
        { text: 'ユーザ検索', path: '/user-search', icon: <SearchIcon /> },
        { text: 'ポリシー', path: '/policy', icon: <GavelIcon /> },
      ]
    : [{ text: 'ポリシー', path: '/policy', icon: <GavelIcon /> }];

  const listItems: ListItem[] = [...fixedItems.slice(0, 1), ...boardItems, ...fixedItems.slice(1)];

  return (
    <Drawer
      anchor='left'
      open={open}
      onClose={onClose}
    >
      <Box sx={{ width: 250 }} role="presentation" onClick={onClose} onKeyDown={onClose}>
        <Box sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'common.white' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            メニュー
          </Typography>
        </Box>
        <List sx={{ pt: 0 }}>
          {listItems.map((item) => (
            <ListItemButton
              component={RouterLink}
              to={item.path}
              key={item.text}
              sx={{
                display: 'flex',
                alignItems: 'center',
                py: 1.5,
                px: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'common.white',
                  transform: 'translateX(4px)',
                  '& .MuiListItemIcon-root': {
                    color: 'common.white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'primary.main', minWidth: '40px' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {item.text}
                  </Typography>
                } 
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;
