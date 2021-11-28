import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'

interface AdminLayoutProps {
    children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
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

export default AdminLayout
