import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useRoute from './router/useRoute';
import { useTypedSelector } from './store/hooks/redux';
import ParentLayout from './layout/ParentLayout';
import { Users } from './store/types/mainTypes';
import { useDispatch } from 'react-redux';
import { getUserById } from './store/actions/adminActions';

const mdTheme = createTheme();

const App: React.FC = () => {
  const { authorized, roles } = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();
  const route = useRoute(authorized, roles);
  React.useEffect(() => {
    const user: Users = JSON.parse(localStorage.getItem('user')!);
    if (!user?.id) {
      return;
    }
    dispatch(getUserById(user.id));
  }, [dispatch]);
  if (!authorized || !roles || roles.length === 0) {
    return <ThemeProvider theme={mdTheme}>{route}</ThemeProvider>;
  }
  return (
    <ThemeProvider theme={mdTheme}>
      <ParentLayout role={roles[0].value}>{route}</ParentLayout>
    </ThemeProvider>
  );
};

export default App;
