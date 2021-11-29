import React, { useEffect } from 'react'
import { useTypedSelector } from '../../store/hooks/redux'
import { deleteUser, getUsers } from '../../store/actions/adminActions'
import { useDispatch } from 'react-redux'
import MyTable from '../../components/MyTable'
import Loader from '../../components/Loader'
import { Users } from '../../store/types/mainTypes'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'

const UsersPage: React.FC = () => {
    const { users } = useTypedSelector((state) => state.admin)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const deleteHandler = (row: Users) => {
        dispatch(deleteUser(row?.id))
    }
    const upgradeHandler = (row: Users) => {
        navigate(`${location.pathname}/${row?.id}`)
    }
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    if (!users.length) {
        return <Loader />
    }
    return (
        <MyTable rows={users} remove={deleteHandler} upgrade={upgradeHandler} />
    )
}

export default UsersPage
