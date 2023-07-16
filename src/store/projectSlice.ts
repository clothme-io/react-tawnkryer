import { StateCreator } from 'zustand';

export interface Project {
  id: string;
}

export interface ProjectSlice {
  projects: Project[];
  showProject: any;
  addProject: (project: Project) => void;
  removeProject: (projectId: string) => void;
  selectProject: (projectId: string) => void;
  setDefaultProject: (projectId: string) => void;
}

export const createProjectSlice: StateCreator<ProjectSlice> = (set, get) => ({
  projects: [],
  showProject: {},
  addProject: (project: Project) => {
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
      showProject: get().projects.filter((project) => project.id !== projectId),
    });
  },
  setDefaultProject(projectId: string) {
    set({
      showProject: get().projects.filter((project) => project.id !== projectId),
    });
  },
});
