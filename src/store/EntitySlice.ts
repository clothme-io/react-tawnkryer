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
  entity: any;
  addEntities: (ents: any) => void;
  setEntity: (ent: any) => void;
  removeEntity: (entityId: string) => void;
  updateUrl: (newUrl: string, entiyId: string) => void;
  // updateRelated_search: ();
  // UpdateSuggestion: ();
  // updateKeywords: ();
  // updateRelatedQueries: ();
  selectEntity: (entityId: string) => void;
  setDefaultEntity: (entityId: string) => void;
}

export const createEntitySlice: StateCreator<EntitySlice> = (set, get) => ({
  entities: [],
  entity: {},
  setEntity: (ent: any) => {
    let { entity } = get();
    entity = ent
    set({ entity });
  },
  addEntities: (entity: any) => {
    let { entities } = get();
    entities = [...entities, ...entity];
    set({ entities });
  },
  removeEntity: (entityId: string) => {
    set({
      entities: get().entities.filter((entity) => entity.id !== entityId),
    });
  },
  selectEntity: (entityId: string) => {
    set({
      entity: get().entities.filter((entity) => entity.id !== entityId),
    });
  },
  setDefaultEntity(entityId: string) {
    set({
      entity: get().entities.filter((entity) => {
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
