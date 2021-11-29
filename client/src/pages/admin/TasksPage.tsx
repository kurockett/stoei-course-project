import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import MyTable from '../../components/MyTable'
import { deleteTask, getTasks } from '../../store/actions/adminActions'
import { useTypedSelector } from '../../store/hooks/redux'
import { Tasks } from '../../store/types/mainTypes'

const TasksPage: React.FC = () => {
    const { tasks } = useTypedSelector((state) => state.admin)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const deleteHandler = (row: Tasks) => {
        dispatch(deleteTask(row?.id))
    }
    const upgradeHandler = (row: Tasks) => {
        navigate(`${location.pathname}/${row?.id}`)
    }
    useEffect(() => {
        dispatch(getTasks())
    }, [dispatch])
    if (!tasks.length) {
        return <Loader />
    }
    return (
        <MyTable rows={tasks} remove={deleteHandler} upgrade={upgradeHandler} />
    )
}

export default TasksPage
