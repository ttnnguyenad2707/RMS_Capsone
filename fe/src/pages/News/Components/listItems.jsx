import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SettingsIcon from '@mui/icons-material/Settings';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HelpIcon from '@mui/icons-material/Help';
export const mainListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      MENU
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Thống kê" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <HomeWorkIcon />
      </ListItemIcon>
      <ListItemText primary="Danh Sách Nhà" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <MeetingRoomIcon />
      </ListItemIcon>
      <ListItemText primary="Danh Sách Phòng" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <NewspaperIcon />
      </ListItemIcon>
      <ListItemText primary="Bản Tin" />
    </ListItemButton>
   
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
     Others
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Cài Đặt" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <EqualizerIcon />
      </ListItemIcon>
      <ListItemText primary="Thống kê tài chính" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ManageAccountsIcon />
      </ListItemIcon>
      <ListItemText primary="Tài khoản" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <HelpIcon />
      </ListItemIcon>
      <ListItemText primary="Trợ giúp" />
    </ListItemButton>
  </React.Fragment>
);