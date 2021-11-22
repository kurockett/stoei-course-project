import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Navbar from './components/Navbar'
import useRoute from './router/useRoute'
import { useTypedSelector } from './store/hooks/redux'

const mdTheme = createTheme()

const App: React.FC = () => {
    const { authorized, token, roles } = useTypedSelector((state) => state.auth)
    const route = useRoute(authorized, roles)
    if (!authorized) {
        return <ThemeProvider theme={mdTheme}>{route}</ThemeProvider>
    }
    return (
        <ThemeProvider theme={mdTheme}>
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
                    {route}
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default App
