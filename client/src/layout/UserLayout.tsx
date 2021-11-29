import React from 'react'
import { Box, CssBaseline } from '@mui/material'
import Navbar from '../components/Navbar'
import { LayoutProps } from './interfaces'

const UserLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar />
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Box sx={{ margin: '80px 15px' }}>{children}</Box>
            </Box>
        </Box>
    )
}

export default UserLayout
