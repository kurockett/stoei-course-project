import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import MyTable from '../../components/MyTable'
import { deleteProject, getProjects } from '../../store/actions/mainAction'
import { useTypedSelector } from '../../store/hooks/redux'
import { Projects } from '../../store/types/mainTypes'

const ProjectsPage: React.FC = () => {
    const { projects } = useTypedSelector((state) => state.admin)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const deleteHandler = (row: Projects) => {
        dispatch(deleteProject(row.id!))
    }
    const upgradeHandler = (row: Projects) => {
        navigate(`${location.pathname}/${row?.id}`)
    }
    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch])
    if (!projects.length) {
        return <Loader />
    }
    return (
        <MyTable
            rows={projects}
            remove={deleteHandler}
            upgrade={upgradeHandler}
        />
    )
}

export default ProjectsPage
