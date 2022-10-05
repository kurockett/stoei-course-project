import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PersonIcon from '@mui/icons-material/Person';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../store/hooks/redux';

export const MainAdminListItems = () => {
  const { roles } = useTypedSelector((state) => state.auth);
  return (
    <div>
      <NavLink to={'/projects'}>
        <ListItem button>
          <ListItemIcon>
            <AccountTreeIcon />
          </ListItemIcon>
          <ListItemText primary='Проекты' />
        </ListItem>
      </NavLink>
      {roles[0].value === 'ADMIN' ? (
        <>
          <NavLink to={'/users'}>
            <ListItem>
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary='Пользователи' />
            </ListItem>
          </NavLink>
          <NavLink to={'/tasks'}>
            <ListItem button>
              <ListItemIcon>
                <TaskAltIcon />
              </ListItemIcon>
              <ListItemText primary='Задачи' />
            </ListItem>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to={'/profile'}>
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary='Профиль' />
            </ListItem>
          </NavLink>
        </>
      )}
    </div>
  );
};

export const SecondaryAdminListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Current month' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Last quarter' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Year-end sale' />
    </ListItem>
  </div>
);
