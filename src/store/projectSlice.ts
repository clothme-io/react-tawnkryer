import { StateCreator } from 'zustand';
import { ProjectModel } from './model/projectModel';

export interface ProjectSlice {
  projects: ProjectModel[];
  currentProject: ProjectModel;
  addProject: (project: ProjectModel) => void;
  removeProject: (projectId: string) => void;
  selectProject: (projectId: string) => void;
  setDefaultProject: (project: ProjectModel) => void;
}

export const createProjectSlice: StateCreator<ProjectSlice> = (set, get) => ({
  projects: [],
  currentProject: {
    id: '',
    name: '',
    project: {
      account_id: '',
      default: false,
      name: '',
    },
  },
  addProject: (project: ProjectModel) => {
    const { projects } = get();
    projects.push(project);
    set({ projects });
  },
  removeProject: (projectId: string) => {
    set({
      projects: get().projects.filter((project) => project.id !== projectId),
    });
  },
  selectProject: (projectId: string) => {
    set({
      projects: get().projects.filter((project) => project.id !== projectId),
    });
  },
  setDefaultProject(project: ProjectModel) {
    set({
      currentProject: project,
    });
  },
});
