import React, { ReactElement } from 'react';
import {
  createTheme,
  Grid,
  ThemeProvider,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { useTypedSelector } from '../../store/hooks/redux';
import { Tasks } from '../../store/types/mainTypes';
import { isEmpty } from 'lodash';
import { getUserById } from '../../store/actions/adminActions';
import { useDispatch } from 'react-redux';

const theme = createTheme();

const limit: number = 40;

const ProfilePage: React.FC = (): ReactElement => {
  const { currentUser } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();
  const mainWorkTime: number = React.useMemo(() => {
    const tasks = currentUser.tasks as Tasks[];
    return tasks.reduce((acc, task) => acc + task.estimate, 0);
  }, [currentUser]);
  const isOvertime = React.useMemo(() => mainWorkTime > limit, [mainWorkTime]);
  const overtimeValue = React.useMemo(
    () => mainWorkTime - limit,
    [mainWorkTime]
  );
  React.useEffect(() => {
    dispatch(getUserById(currentUser.id));
  }, [dispatch, currentUser.id]);
  return (
    <ThemeProvider theme={theme}>
      <Typography
        component='h1'
        variant='h1'
        style={{
          fontSize: '56px',
          fontFamily: 'Roboto',
          fontWeight: 'bold',
          marginBottom: '2rem',
        }}
      >
        Общее рабочее время сотрудника: {mainWorkTime} / {limit} часов.
        {isOvertime
          ? `У сотрудника ${overtimeValue} ${
              overtimeValue > 4 ? 'часов' : 'часа'
            } переработки`
          : ''}
      </Typography>
      <Grid container spacing={2}>
        {!isEmpty(currentUser) &&
          (currentUser['tasks'] as Tasks[]).map((task) => (
            <Grid item xs={12} key={task.id}>
              <Card variant='outlined'>
                <CardContent>
                  <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                    Название проекта -
                    {
                      currentUser.projects?.find(
                        (project) => project.id === task.projectId
                      )?.name
                    }
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color='text.secondary'
                    gutterBottom
                  >
                    Название задачи - {task.value}
                  </Typography>
                  <Typography variant='h5' component='div'></Typography>
                  <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                    Время на выполнение - {task.estimate}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </ThemeProvider>
  );
};

export default ProfilePage;
