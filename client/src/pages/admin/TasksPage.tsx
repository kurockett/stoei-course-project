import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Loader from '../../components/Loader'
import MyTable from '../../components/MyTable'
import { getTasks } from '../../store/actions/adminActions'
import { useTypedSelector } from '../../store/hooks/redux'

const TasksPage: React.FC = () => {
    const { tasks } = useTypedSelector((state) => state.admin)
    const { token } = useTypedSelector((state) => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTasks())
    }, [dispatch, token])
    useEffect(() => {
        console.log(tasks)
    }, [tasks])
    if (!tasks.length) {
        return <Loader />
    }
    return <MyTable rows={tasks} />
}

export default TasksPage
