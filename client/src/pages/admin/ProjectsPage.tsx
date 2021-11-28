import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Loader from '../../components/Loader'
import MyTable from '../../components/MyTable'
import { getProjects } from '../../store/actions/adminActions'
import { useTypedSelector } from '../../store/hooks/redux'

const ProjectsPage: React.FC = () => {
    const { projects } = useTypedSelector((state) => state.admin)
    const { token } = useTypedSelector((state) => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch, token])
    if (!projects.length) {
        return <Loader />
    }
    return <MyTable rows={projects} />
}

export default ProjectsPage
