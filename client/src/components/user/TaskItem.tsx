import React, { useState } from 'react'
import {
    Collapse,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    TextField,
    Tooltip,
} from '@mui/material'
import { Tasks } from '../../store/types/mainTypes'
import TaskAltTwoToneIcon from '@mui/icons-material/TaskAltTwoTone'
import ListItemText from '@mui/material/ListItemText'
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import _ from 'lodash'
import DeleteIcon from '@mui/icons-material/Delete'

interface TaskItemProps {
    task: Tasks
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const [open, setOpen] = useState<boolean>(false)
    const [newTask, setNewTask] = useState<Tasks>(_.cloneDeep(task))
    const changed: boolean = !_.isEqual(task, newTask)
    const changeHandler = (event: React.SyntheticEvent<EventTarget>): void => {
        // setNewTask()
    }
    const handleClick = () => {
        setOpen(!open)
    }
    return (
        <div
            style={{
                marginBottom: '1rem',
                paddingBottom: open ? '1rem' : '0',
                boxShadow: '0 0 5px #000',
                borderRadius: '10px',
            }}
        >
            <ListItem
                style={{
                    marginBottom: '1rem',
                }}
            >
                <ListItemIcon>
                    <TaskAltTwoToneIcon />
                </ListItemIcon>
                <TextField
                    defaultValue={newTask.value}
                    type={'text'}
                    name={'value'}
                    onChange={changeHandler}
                />
                <IconButton onClick={handleClick}>
                    <Tooltip title={`Открыть описание`}>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </Tooltip>
                </IconButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={`Описание`} />
                        <TextField
                            defaultValue={newTask.description}
                            type={'text'}
                            name={'description'}
                            onChange={changeHandler}
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={`Срок выполнения`} />
                        <TextField
                            defaultValue={newTask.estimate}
                            type={'number'}
                            onChange={changeHandler}
                            name={'estimate'}
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                    max: 100,
                                },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        h
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </ListItemButton>
                    <ListItem>
                        <IconButton>
                            <Tooltip title={`Удалить задачу ${newTask.value}`}>
                                <DeleteIcon />
                            </Tooltip>
                        </IconButton>
                    </ListItem>
                </List>
            </Collapse>
        </div>
    )
}

export default TaskItem
