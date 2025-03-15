import * as React from 'react';
import { Box } from '@mui/material';

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
      src="https://i0.wp.com/phjesuits.us/wp-content/uploads/2017/11/cropped-PJF-Logo-PDF-VECTOR-Type-smaller.png?fit=681%2C681&ssl=1"
    />
  );
}
