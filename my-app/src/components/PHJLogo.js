import * as React from 'react';
import { Box } from '@mui/material';
import logo from '../assets/pjflogo.webp'; // Adjust the path as necessary

export default function PHJLogo() {
  return (
    <Box
      component="img"
      sx={{
        height: 100,
        width: 100,
        maxHeight: { xs: 233, md: 167 },
        maxWidth: { xs: 350, md: 250 },
      }}
      alt="PH Jesuits Logo"
      src={logo}
    />
  );
}
