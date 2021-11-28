import React, { useEffect } from 'react'
import { useTypedSelector } from '../../store/hooks/redux'
import { getUsers } from '../../store/actions/adminActions'
import { useDispatch } from 'react-redux'
import MyTable from '../../components/MyTable'
import Loader from '../../components/Loader'

const UsersPage: React.FC = () => {
    const { users } = useTypedSelector((state) => state.admin)
    const { token } = useTypedSelector((state) => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch, token])
    if (!users.length) {
        return <Loader />
    }
    return <MyTable rows={users} />
}

export default UsersPage
