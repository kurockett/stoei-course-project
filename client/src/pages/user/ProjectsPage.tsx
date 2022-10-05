import React, { useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import MyCard from '../../components/MyCard';
import { deleteProject } from '../../store/actions/mainAction';
import { getUserProjects } from '../../store/actions/userActions';
import { useTypedSelector } from '../../store/hooks/redux';
import { Projects } from '../../store/types/mainTypes';
import Typography from '@mui/material/Typography';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';

const ProjectsPage: React.FC = () => {
  const { loading } = useTypedSelector((state) => state.main);
  const { projects, currentUser } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toProjectsHandler = () => {
    navigate('/projects/create');
  };
  const deleteHandler = (id: number) => {
    dispatch(deleteProject(id));
  };
  useEffect(() => {
    dispatch(getUserProjects(currentUser.id));
  }, [dispatch, currentUser.id]);
  if (loading) {
    return <Loader />;
  }
  if (!projects.length) {
    return (
      <>
        <Typography component='h1' variant='h3'>
          Проекты
        </Typography>
        <Typography>
          <span style={{ marginRight: '4px' }}>У вас еще нет проектов!</span>
          <NavLink to={'/projects/create'}>Хотите создать?</NavLink>
        </Typography>
      </>
    );
  }
  return (
    <>
      <Typography
        variant='h3'
        style={{
          marginBottom: '2rem',
        }}
      >
        Проекты
      </Typography>
      <Button style={{ marginBottom: '1rem' }} onClick={toProjectsHandler}>
        Добавить новый проект
        <AddCircleOutlineSharpIcon></AddCircleOutlineSharpIcon>
      </Button>
      <Grid container spacing={4}>
        {projects.map((project: Projects) => (
          <Grid item xs={3} key={project.id!}>
            <MyCard project={project} remove={deleteHandler} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProjectsPage;
