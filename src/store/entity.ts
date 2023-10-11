/* eslint-disable no-param-reassign */
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
    key: '',
    id: '',
    url: '',
    created_at: 0,
    updated_at: 0,
    name: '',
    account_id: '',
    project_id: '',
    entity_number: 0,
    type: '',
    details: {
      entity: '',
      entityUrl: '',
    },
    google_adwords: {
      keywords: [],
    },
    google_autosuggest: {
      organic_result: [],
    },
    google_pytrends: {
      related_queries_rising: [],
      related_queries_top: [],
      related_topic_rising_title: [],
      related_topic_top_title: [],
    },
    wiki_entity: {
      search: [],
      title: '',
      url: '',
    },
    openAI: [],
    people_ask_data: [],
  },
  addEntities: (entity: EntityModel[]) => {
    let { entities } = get();
    entities = [...entities, ...entity];
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
          entity.url = newUrl;
        }
        return entity;
      }),
    });
  },
});
