import React, { useState } from 'react'
import {
    Box,
    Chip,
    Collapse,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    MenuItem,
    Select,
    TextField,
    Theme,
    Tooltip,
} from '@mui/material'
import { Tasks, Users } from '../../store/types/mainTypes'
import TaskAltTwoToneIcon from '@mui/icons-material/TaskAltTwoTone'
import ListItemText from '@mui/material/ListItemText'
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone'
import { Add, ExpandLess, ExpandMore } from '@mui/icons-material'
import _ from 'lodash'
import DeleteIcon from '@mui/icons-material/Delete'
import {
    createAsignee,
    createTask,
    deleteAsignee,
    deleteTask,
    getProjectById,
    updateTask,
} from '../../store/actions/userActions'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '../../store/hooks/redux'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

const getStyles = (
    name: string,
    personName: readonly string[],
    theme: Theme
) => {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }
}
interface TaskItemProps {
    task: Tasks
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const { currentProject } = useTypedSelector((state) => state.user)
    const [open, setOpen] = useState<boolean>(false)
    const [newTask, setNewTask] = useState<Tasks>(_.cloneDeep(task))
    const [asigneeName, setAsigneeName] = useState<string[]>(
        [...newTask!.asignees].map((asignee: Users) => asignee.email)
    )
    const { id } = useParams()
    const dispatch = useDispatch()
    const changed: boolean = !_.isEqual(task, newTask)
    const changeHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, value } = event.target
        setNewTask((prev) => ({ ...prev, [name]: value }))
    }
    const numberKeyPressHandler = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        const { key } = event
        if (key.toLowerCase() === 'e') {
            event.preventDefault()
        }
    }
    const deleteHandler = () => {
        dispatch(deleteTask(newTask.id!))
        dispatch(getProjectById(Number(id)))
    }
    const saveChangesHandler = () => {
        console.log(newTask)
        dispatch(updateTask(newTask))
    }
    const createTaskHandler = () => {
        dispatch(createTask(newTask))
        dispatch(getProjectById(Number(id)))
    }

    const addAsigneeHandler = (value: string) => {
        const asignee = currentProject.asignees.find(
            (asignee: Users) => asignee.email === value
        )
        dispatch(createAsignee(newTask.id!, asignee.id))
    }
    const deleteAsigneeHandler = (value: string) => {
        const asignee = currentProject.asignees.find(
            (asignee: Users) => asignee.email === value
        )
        dispatch(deleteAsignee(newTask.id!, asignee.id))
    }
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAsigneeName(() => {
            const newAsignees = event.target.value as string[]
            addAsigneeHandler(newAsignees[newAsignees.length - 1])
            return newAsignees
        })
    }

    const handleDelete = (e: React.MouseEvent, value: string) => {
        e.preventDefault()
        setAsigneeName((current) => {
            deleteAsigneeHandler(value)
            return _.without(current, value)
        })
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
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemText primary={`Описание`} />
                        <TextField
                            defaultValue={newTask.description}
                            type={'text'}
                            name={'description'}
                            onChange={changeHandler}
                        />
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemText primary={`Срок выполнения`} />
                        <TextField
                            required
                            defaultValue={newTask.estimate}
                            type={'number'}
                            onChange={changeHandler}
                            onKeyPress={numberKeyPressHandler}
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
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemText primary={`Чья задача`} />
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                        <Select
                            style={{
                                width: '100%',
                            }}
                            labelId="demo-mutiple-chip-checkbox-label"
                            id="demo-mutiple-chip-checkbox"
                            multiple
                            value={asigneeName}
                            onChange={(event: any) => handleChange(event)}
                            renderValue={(selected) => {
                                return (selected as string[]).map((value) => (
                                    <Chip
                                        key={value}
                                        label={value}
                                        clickable
                                        deleteIcon={
                                            <DeleteIcon
                                                onMouseDown={(event) =>
                                                    event.stopPropagation()
                                                }
                                            />
                                        }
                                        onDelete={(e) => handleDelete(e, value)}
                                    />
                                ))
                            }}
                            MenuProps={MenuProps}
                        >
                            {currentProject.asignees.map((asignee: Users) => (
                                <MenuItem
                                    key={asignee.id}
                                    value={asignee.email}
                                    disabled={asigneeName?.includes(
                                        asignee.email
                                    )}
                                >
                                    {asignee.email}
                                </MenuItem>
                            ))}
                        </Select>
                    </ListItem>
                    <ListItem sx={{ pl: changed ? 31.5 : 37 }}>
                        {changed && newTask.hasOwnProperty('id') && (
                            <IconButton onClick={saveChangesHandler}>
                                <Tooltip title={`Сохранить изменения`}>
                                    <SaveTwoToneIcon />
                                </Tooltip>
                            </IconButton>
                        )}
                        {!newTask.hasOwnProperty('id') && (
                            <IconButton onClick={createTaskHandler}>
                                <Tooltip title={`Создать новую задачу`}>
                                    <Add />
                                </Tooltip>
                            </IconButton>
                        )}
                        <IconButton onClick={deleteHandler}>
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
