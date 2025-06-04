import React from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { ChevronRight, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { menuItems } from '../data/ProfileData';

const ProfileMenu = ({ onLogout }) => {
  const location = useLocation();

  return (
    <Paper elevation={1} sx={{ borderRadius: 2 }}>
      <List>
        {menuItems.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && <Divider component="li" />}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={item.link}
                sx={{
                  py: 1.5,
                  color: 'inherit',
                  textDecoration: 'none',
                  backgroundColor:
                    location.pathname === item.link
                      ? 'rgba(46, 134, 193, 0.1)'
                      : 'transparent',
                  borderLeft:
                    location.pathname === item.link
                      ? '3px solid #2E86C1'
                      : '3px solid transparent',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
                <ChevronRight size={18} color="#999" />
              </ListItemButton>
            </ListItem>
          </React.Fragment>
        ))}

        <Divider component="li" />
        <ListItem disablePadding>
          <ListItemButton
            onClick={onLogout}
            sx={{
              py: 1.5,
              color: '#e53935',
              '&:hover': {
                bgcolor: 'rgba(229, 57, 53, 0.08)'
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: '#e53935' }}>
              <LogOut size={20} />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{ color: '#e53935', fontWeight: 500 }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
};

export default ProfileMenu;
