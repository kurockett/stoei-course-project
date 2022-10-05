import axios from 'axios';
import { API_URL } from '../../config';
import { AppDispatch } from '../store';
import { AdminActionTypes } from '../types/adminTypes';
import { Tasks, Users } from '../types/mainTypes';
import { hideLoader, showLoader } from './mainAction';

export const getUsers = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(showLoader());
      dispatch(setUsers([]));
      const { data } = await axios.get<Users[]>(`${API_URL}/api/users/`);
      dispatch(setUsers(data));
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(hideLoader());
    }
  };
};

export const getUserById = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.get<Users>(`${API_URL}/api/users/${id}`);
      console.log('get user by id', data);
      dispatch(setUser(data));
      localStorage.user = JSON.stringify(data);
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(hideLoader());
    }
  };
};

export const setUsers = (data: any) => ({
  type: AdminActionTypes.SET_USERS,
  payload: data,
});

export const setUser = (data: any) => ({
  type: AdminActionTypes.SET_USER,
  payload: data,
});

export const deleteUser = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await axios.delete(`${API_URL}/api/users/${id}`);
      dispatch(getUsers());
    } catch (e) {
      console.error(e);
    }
  };
};

export const getTasks = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(showLoader());
      dispatch(setTasks([]));
      const { data } = await axios.get<Tasks[]>(`${API_URL}/api/tasks/`);
      dispatch(setTasks(data));
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(hideLoader());
    }
  };
};

export const setTasks = (data: any) => ({
  type: AdminActionTypes.SET_TASKS,
  payload: data,
});

export const deleteTask = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`);
      dispatch(getTasks());
    } catch (e) {
      console.error(e);
    }
  };
};
