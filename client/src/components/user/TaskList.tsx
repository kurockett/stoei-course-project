import { List, ListSubheader } from '@mui/material'
import React from 'react'
import { useTypedSelector } from '../../store/hooks/redux'
import TaskItem from './TaskItem'

interface TaskProps {
    category: string
}

const TaskList: React.FC<TaskProps> = ({ category }) => {
    const { currentProject } = useTypedSelector((state) => state.user)
    const tasks = [...currentProject.tasks].filter(
        (task) => task.category === category
    )
    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                padding: '10px',
            }}
            component="div"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader
                    style={{
                        fontSize: '26px',
                        fontWeight: 'bold',
                        margin: '10px 0',
                    }}
                    component="h6"
                    id="nested-list-subheader"
                >
                    {category}
                </ListSubheader>
            }
        >
            {tasks.map((task) => (
                <TaskItem task={task} key={task.id} />
            ))}
        </List>
    )
}

export default TaskList
