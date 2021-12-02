import { ThemeProvider } from '@emotion/react'
import {
    Box,
    Button,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    TextField,
    Typography,
} from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { createProject } from '../../store/actions/userActions'
import { useTypedSelector } from '../../store/hooks/redux'
import { Projects } from '../../store/types/mainTypes'

const theme = createTheme()

const CreateProjectPage: React.FC = () => {
    const { currentUser } = useTypedSelector((state) => state.user)
    const dispatch = useDispatch()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const form = {
            name: data.get('name'),
            description: data.get('description'),
        }
        if (!form.name || !form.description) {
            return
        }
        dispatch(createProject(currentUser.id, form as Projects))
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Создать проект
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Название"
                            name="name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="description"
                            label="Описание"
                            type="text"
                            id="description"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Создать
                        </Button>
                        <Grid container>
                            <Grid item>
                                <NavLink to={'/projects'}>К проектам</NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default CreateProjectPage
