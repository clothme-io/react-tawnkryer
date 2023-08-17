import { StateCreator } from 'zustand';
import { ProjectModel } from './model/projectModel';

export interface ProjectSlice {
  projects: ProjectModel[];
  currentProject: any;
  addProject: (project: ProjectModel) => void;
  removeProject: (projectId: string) => void;
  selectProject: (projectId: string) => void;
  setDefaultProject: (projectId: string) => void;
}

export const createProjectSlice: StateCreator<ProjectSlice> = (set, get) => ({
  projects: [],
  currentProject: {},
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
      currentProject: get().projects.filter((project) => project.id !== projectId),
    });
  },
  setDefaultProject(projectId: string) {
    set({
      currentProject: get().projects.filter((project) => project.id !== projectId),
    });
  },
});
