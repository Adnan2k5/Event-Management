import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = (props) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Web3 Event Management Dashboard
      </Typography>
      <h2>{props.name}</h2>
    </Toolbar>
  </AppBar>
);

export default Header;
