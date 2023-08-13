import { StateCreator } from 'zustand';

export interface Entity {
  id: string;
  url: string;
  created_at: string;
  updated_at: string;
  name: string;
  created_by: string;
  account_id: string
  project_id: string;
  entity_number: number;
  type: string;
  details: {
    related_search: any,
    suggestion: any
    related_queries: any,
    keywords: any
  };

}

export interface EntitySlice {
  entities: Entity[];
  currentProject: any;
  addProject: (project: Entity) => void;
  removeProject: (projectId: string) => void;
  updateUrl: (newUrl: string, entiyId: string) => void;
  // updateRelated_search: ();
  // UpdateSuggestion: ();
  // updateKeywords: ();
  // updateRelatedQueries: ();
  selectProject: (projectId: string) => void;
  setDefaultProject: (projectId: string) => void;
}

export const createProjectSlice: StateCreator<EntitySlice> = (set, get) => ({
  entities: [],
  currentProject: {},
  addProject: (entity: Entity) => {
    const { entities } = get();
    entities.push(entity);
    set({ entities });
  },
  removeProject: (entityId: string) => {
    set({
      entities: get().entities.filter((entity) => entity.id !== entityId),
    });
  },
  selectProject: (entityId: string) => {
    set({
      currentProject: get().entities.filter((entity) => entity.id !== entityId),
    });
  },
  setDefaultProject(entityId: string) {
    set({
      currentProject: get().entities.filter((entity) => {
        // use a background task to update the db
        return entity.id !== entityId
      })
    });
  },
  updateUrl(newUrl: string, entityId: string) {
    set({
      entities: get().entities.filter((entity) => {
        if (entity.id !== entityId) {
          // use a background task to update the db
          return entity.url = newUrl
        }
      })
    })
  },
});
