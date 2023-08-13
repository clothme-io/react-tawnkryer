import { StateCreator } from 'zustand';

export interface Project {
  id: string;
  created_at: string;
  name: string;
  created_by: string;
  owner: string
  project_number: number;
  project_id: string;
}

export interface ProjectSlice {
  projects: Project[];
  currentProject: any;
  addProject: (project: Project) => void;
  removeProject: (projectId: string) => void;
  selectProject: (projectId: string) => void;
  setDefaultProject: (projectId: string) => void;
}

export const createProjectSlice: StateCreator<ProjectSlice> = (set, get) => ({
  projects: [],
  currentProject: {},
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
      currentProject: get().projects.filter((project) => project.id !== projectId),
    });
  },
  setDefaultProject(projectId: string) {
    set({
      currentProject: get().projects.filter((project) => project.id !== projectId),
    });
  },
});
