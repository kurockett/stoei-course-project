import { Projects, Users, Tasks, MainAction } from './mainTypes';

export interface UserState {
  projects: Projects[];
  currentProject: Projects;
  currentUser: Users;
  tasks: Tasks[];
  currentTask: Tasks;
}

export enum UserActionTypes {
  SET_ASIGNEES = 'USER/SET_ASIGNEES',
  SET_USER = 'USER/SET_USER',
}

export interface UserSetAsigneesAction {
  type: UserActionTypes.SET_ASIGNEES;
  payload: Users[];
}

export interface UserSetUserAction {
  type: UserActionTypes.SET_USER;
  payload: Users;
}

export type UserAction = MainAction | UserSetAsigneesAction | UserSetUserAction;
