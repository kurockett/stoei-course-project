import { Box, Container, createTheme, ThemeProvider } from '@mui/material'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader'
import TaskList from '../../components/user/TaskList'
import {
    getAllUserRoleUsers,
    getProjectById,
} from '../../store/actions/userActions'
import { useTypedSelector } from '../../store/hooks/redux'
import { Categories } from '../../store/types/mainTypes'

const theme = createTheme()

const ProjectPage: React.FC = () => {
    const { loading } = useTypedSelector((state) => state.main)
    const { currentProject } = useTypedSelector((state) => state.user)
    const [categories, setCategories] = useState<string[]>([])
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        dispatch(getProjectById(Number(id)))
        dispatch(getAllUserRoleUsers())
    }, [dispatch, id])
    useEffect(() => {
        if (_.isEmpty(currentProject)) {
            return
        }
        setCategories(
            [...currentProject.categories!].map(
                (category: Categories) => category.value
            )
        )
    }, [currentProject])
    if (loading || !categories.length) {
        return <Loader />
    }
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Box
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${categories.length}, minmax(250px, 360px))`,
                        columnGap: '1rem',
                    }}
                >
                    {categories.map((category, index) => (
                        <TaskList category={category} key={index} />
                    ))}
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default ProjectPage
