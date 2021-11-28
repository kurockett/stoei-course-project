import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import useRoute from './router/useRoute'
import { useTypedSelector } from './store/hooks/redux'
import ParentLayout from './layout/ParentLayout'

const mdTheme = createTheme()

const App: React.FC = () => {
    const { authorized, roles } = useTypedSelector((state) => state.auth)
    const route = useRoute(authorized, roles)
    if (!authorized) {
        return <ThemeProvider theme={mdTheme}>{route}</ThemeProvider>
    }
    return (
        <ThemeProvider theme={mdTheme}>
            <ParentLayout role={roles[0].value}>{route}</ParentLayout>
        </ThemeProvider>
    )
}

export default App
