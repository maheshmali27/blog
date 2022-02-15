import { Box, Typography } from '@mui/material';
import React from 'react';

const copyRightYear = new Date().getFullYear();

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#eee', padding: 3, textAlign: 'center'}}>
            <Typography variant='subtitle1' component='p' >© Blogs - {copyRightYear}</Typography>
        </Box>
    )
};

export default Footer;