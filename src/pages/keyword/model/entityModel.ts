export interface EntityModel {
    id: string;
    url: string;
    created_at: number;
    updated_at: number;
    name: string;
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

  export interface EntityResponseItem {
    id: string;
    value: {
      account_id: string;
      contentType: string;
      created_at: number;
      email: string;
      processing: boolean;
      project_id: string;
      status: string;
      updated_at: number;
      details: {
        entity: string;
        entityUrl: string;
      };
    };
  }

  export function transposeToEntityModel(model: EntityResponseItem): EntityModel {
    return {
      id: model.id,
      url: model.value.details.entityUrl,
      created_at: model.value.created_at,
      updated_at: model.value.updated_at,
      name: model.value.details.entity,
      account_id: model.value.account_id,
      project_id: model.value.project_id,
      entity_number: 0,
      type: model.value.contentType,
      details: {
        related_search: '',
        suggestion: '',
        related_queries: '',
        keywords: ''
      }
    }
  }