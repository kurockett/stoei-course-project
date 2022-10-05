import React, { useState } from 'react';
import { Add } from '@mui/icons-material';
import { IconButton, List, ListSubheader } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../../store/hooks/redux';
import { Projects, Tasks } from '../../store/types/mainTypes';
import TaskItem from './TaskItem';
import { categoriesLocalization } from '../../config';

interface TaskProps {
  category: string;
  categories: string[];
}

const TaskList: React.FC<TaskProps> = ({ category, categories }) => {
  const { currentProject } = useTypedSelector((state) => state.user);
  const [tasks, setTasks] = useState(
    [...currentProject.tasks!].filter((task) => task.category === category)
  );
  const { id } = useParams();
  const addTaskHandler = () => {
    let newTask: Tasks = {
      value: '',
      description: '',
      estimate: 0,
      projectId: Number(id),
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      category,
      asignees: [],
      project: {} as Projects,
    };
    setTasks(([] as Tasks[]).concat([newTask], tasks));
  };
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        padding: '10px',
      }}
      component='div'
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader
          style={{
            fontSize: '26px',
            fontWeight: 'bold',
            margin: '10px 0',
          }}
          component='h6'
          id='nested-list-subheader'
        >
          {
            categoriesLocalization[
              category as keyof typeof categoriesLocalization
            ]
          }
          <IconButton onClick={addTaskHandler}>
            <Add />
          </IconButton>
        </ListSubheader>
      }
    >
      {tasks.map((task) => (
        <TaskItem task={task} key={task.value} categories={categories} />
      ))}
    </List>
  );
};

export default TaskList;
