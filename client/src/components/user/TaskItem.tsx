import React, { useState } from 'react';
import {
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
  Tooltip,
} from '@mui/material';
import { Tasks, Users } from '../../store/types/mainTypes';
import TaskAltTwoToneIcon from '@mui/icons-material/TaskAltTwoTone';
import ListItemText from '@mui/material/ListItemText';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import { Add, ExpandLess, ExpandMore } from '@mui/icons-material';
import _ from 'lodash';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  createAsignee,
  createTask,
  deleteAsignee,
  deleteTask,
  getProjectById,
  updateTask,
} from '../../store/actions/userActions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../../store/hooks/redux';
import { categoriesLocalization } from '../../config';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
interface TaskItemProps {
  task: Tasks;
  categories: string[];
}

const TaskItem: React.FC<TaskItemProps> = ({ task, categories }) => {
  const { currentProject } = useTypedSelector((state) => state.user);
  const [open, setOpen] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<Tasks>(_.cloneDeep(task));
  const [asigneeName, setAsigneeName] = useState<string[]>(
    [...newTask!.asignees].map((asignee: Users) => asignee.email)
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const changed: boolean = !_.isEqual(task, newTask);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };
  const numberKeyPressHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const { key } = event;
    if (key.toLowerCase() === 'e') {
      event.preventDefault();
    }
  };
  const deleteHandler = () => {
    dispatch(deleteTask(newTask.id!));
    dispatch(getProjectById(Number(id)));
  };
  const saveChangesHandler = () => {
    dispatch(updateTask(newTask, Number(id)));
    dispatch(getProjectById(Number(id)));
  };
  const createTaskHandler = () => {
    dispatch(createTask(newTask));
    dispatch(getProjectById(Number(id)));
  };

  const deleteAsigneeHandler = (value: string) => {
    const asignee = (currentProject['asignees'] as Users[]).find(
      (asignee: Users) => asignee.email === value
    ) as Users;
    dispatch(deleteAsignee(newTask.id!, asignee.id));
  };
  const changeAsigneeName = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewTask((prev) => {
      const newAsignees = event.target.value as string[];
      const newTaskAsignees = [...(currentProject.asignees as Users[])].filter(
        (asignee) => newAsignees.includes(asignee.email)
      );
      newTaskAsignees.forEach((taskAsignee) => {
        dispatch(createAsignee(newTask.id!, taskAsignee.id));
      });
      return { ...prev, asignees: newTaskAsignees };
    });
  };

  const changeCategoryName = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewTask((prev) => ({ ...prev, category: event.target.value as string }));
  };

  const handleDelete = (e: React.MouseEvent, value: string) => {
    e.preventDefault();
    setAsigneeName((current) => {
      deleteAsigneeHandler(value);
      return _.without(current, value);
    });
  };
  const handleClick = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    console.log('task was changed');
    setAsigneeName(() =>
      [...newTask!.asignees].map((asignee: Users) => asignee.email)
    );
  }, [newTask]);
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
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
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
                endAdornment: <InputAdornment position='end'>h</InputAdornment>,
              }}
            />
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary={`Ответственный`} />
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <Select
              style={{
                width: '100%',
              }}
              labelId='demo-mutiple-chip-checkbox-label'
              id='demo-mutiple-chip-checkbox'
              multiple
              value={asigneeName}
              disabled={typeof newTask.id !== 'number'}
              onChange={(event: any) => changeAsigneeName(event)}
              renderValue={(selected) => {
                return (selected as string[]).map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    clickable
                    deleteIcon={
                      <DeleteIcon
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    }
                    onDelete={(e) => handleDelete(e, value)}
                  />
                ));
              }}
              MenuProps={MenuProps}
            >
              {(currentProject['asignees'] as Users[]).map((asignee: Users) => (
                <MenuItem
                  key={asignee.id}
                  value={asignee.email}
                  disabled={asigneeName?.includes(asignee.email)}
                >
                  {asignee.email}
                </MenuItem>
              ))}
            </Select>
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary={`Статус`} />
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <Select
              style={{
                width: '100%',
              }}
              labelId='demo-mutiple-chip-checkbox-label'
              id='demo-mutiple-chip-checkbox'
              value={newTask.category}
              onChange={(event: any) => changeCategoryName(event)}
              MenuProps={MenuProps}
            >
              {categories.map((category: string) => (
                <MenuItem
                  key={category}
                  value={category}
                  disabled={newTask.category === category}
                >
                  {
                    categoriesLocalization[
                      category as keyof typeof categoriesLocalization
                    ]
                  }
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
  );
};

export default TaskItem;
