export interface Users {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  roles?: Roles[];
  projects?: Projects[];
  tasks?: Tasks[];
}
export interface Roles {
  id: number;
  value: string;
  description: string;
  users?: Users[];
}
export interface UserRoles {
  id: number;
  roleId: number;
  userId: number;
}

export interface Projects {
  id?: number;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  asignees?: Users[];
  tasks?: Tasks[];
  categories?: Categories[];
}

export interface UserProjects {
  id: number;
  projectId: number;
  userId: number;
}

export interface Tasks {
  id?: number;
  value: string;
  description: string;
  estimate: number;
  projectId: number;
  createdAt: string;
  updatedAt: string;
  category: string;
  asignees: Users[];
  project?: Projects;
}

export interface UserTasks {
  id: number;
  roleId: number;
  userId: number;
}

export interface Labels {
  id: number;
  value: string;
  color: string;
  projectId: number;
}

export interface TaskLabels {
  id: number;
  labelId: number;
  taskId: number;
}

export interface Categories {
  id: number;
  value: string;
}

export interface CategoryTasks {
  id: number;
  taskId: number;
  categoryId: number;
}

export interface MainState {
  loading: boolean;
}

export enum MainActionTypes {
  SHOW_LOADER = 'MAIN/SHOW_LOADER',
  HIDE_LOADER = 'MAIN/HIDE_LOADER',
}

export interface MainShowLoaderAction {
  type: MainActionTypes.SHOW_LOADER;
}

export interface MainHideLoaderAction {
  type: MainActionTypes.HIDE_LOADER;
}

export type MainAction = MainShowLoaderAction | MainHideLoaderAction;
