export interface EntityModel {
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

  