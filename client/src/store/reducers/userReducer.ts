import { UserState } from '../types/userTypes';
import { Projects, Tasks, Users } from '../types/mainTypes';
import { AdminActionTypes } from '../types/adminTypes';

const initialState: UserState = {
  projects: [],
  currentProject: {} as Projects,
  currentUser:
    ((localStorage.user && JSON.parse(localStorage.user)) as Users) ||
    ({} as Users),
  tasks: [],
  currentTask: {} as Tasks,
};

export const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case AdminActionTypes.SET_PROJECTS:
      return { ...state, projects: action.payload };

    case AdminActionTypes.SET_PROJECT:
      return { ...state, currentProject: action.payload };

    case AdminActionTypes.SET_TASKS:
      return { ...state, tasks: action.payload };

    case AdminActionTypes.SET_TASK:
      return { ...state, currentTask: action.payload };

    case AdminActionTypes.SET_USER:
      return { ...state, currentUser: action.payload };

    default:
      return { ...state };
  }
};
