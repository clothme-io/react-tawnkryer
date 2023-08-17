import { StateCreator } from 'zustand';
// Model
import { EntityModel } from '../pages/keyword/model/entityModel';

export interface EntitySlice {
  entities: EntityModel[];
  selectedEntity: EntityModel;
  selectEntity: (entity: EntityModel) => void;
  addEntities: (entity: EntityModel[]) => void;
  removeEntity: (entityId: string) => void;
  updateUrl: (newUrl: string, entiyId: string) => void;
  // updateRelated_search: ();
  // UpdateSuggestion: ();
  // updateKeywords: ();
  // updateRelatedQueries: ();
}

export const createEntitySlice: StateCreator<EntitySlice> = (set, get) => ({
  entities: [],
  selectedEntity: {
    id: '',
    url: '',
    created_at: 0,
    updated_at: 0,
    name: '',
    created_by: '',
    account_id: '',
    project_id: '',
    entity_number: 0,
    type: '',
    details: {
      related_search: undefined,
      suggestion: undefined,
      related_queries: undefined,
      keywords: undefined
    }
  },
  addEntities: (entity: EntityModel[]) => {
    let { entities } = get();
    entities = []
    entities = entity;
    set({ entities });
  },
  selectEntity: (inputEntity: EntityModel) => {
    let { selectedEntity } = get();
    selectedEntity = inputEntity;
    set({ selectedEntity });
  },
  removeEntity: (entityId: string) => {
    set({
      entities: get().entities.filter((entity) => entity.id !== entityId),
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