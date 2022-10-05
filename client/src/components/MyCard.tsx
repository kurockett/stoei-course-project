import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Projects } from '../store/types/mainTypes';
import { NavLink, useNavigate } from 'react-router-dom';
import { CardHeader, IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';

interface MyCardProps {
  project: Projects;
  remove(id: number): void;
}

const MyCard: React.FC<MyCardProps> = ({ project, remove }) => {
  const navigate = useNavigate();
  const deleteHandler = () => {
    remove(project.id!);
  };
  const updateHandler = () => {
    navigate(`/projects/update/${project.id!}`);
  };
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        action={
          <>
            <Tooltip title='Обновить'>
              <IconButton onClick={updateHandler} aria-label='settings'>
                <SettingsSharpIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Удалить'>
              <IconButton onClick={deleteHandler} aria-label='settings'>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </>
        }
        title={project.name}
        subheader={`Дата создания проекта: ${
          project?.createdAt
            ? new Date(project.createdAt).toLocaleDateString()
            : ''
        } `}
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          Описание
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {project.description}
        </Typography>
      </CardContent>
      <CardActions>
        <NavLink to={`/projects/${project.id}`}>Узнать больше</NavLink>
      </CardActions>
    </Card>
  );
};

export default MyCard;
