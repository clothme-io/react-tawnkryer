/* eslint-disable no-plusplus */
export interface EntityModel {
  key: string;
  id: string;
  url: string;
  created_at: number;
  updated_at: number;
  name: string;
  account_id: string;
  project_id: string;
  entity_number: number;
  type: string;
  details: {
    entity: string;
    entityUrl: string;
  };
  google_adwords: {
    keywords: string[];
  };
  google_autosuggest: {
    organic_result: string[];
  };
  google_pytrends: {
    related_queries_top: string[];
    related_queries_rising: string[];
    related_topic_rising_title: string[];
    related_topic_top_title: string[];
  };
  people_ask_data: string[];
  wiki_entity: {
    search: string[];
    title: string;
    url: string;
  };
  openAI: OpenAIResponse[];
}

export interface OpenAIResponse {
  entity: string;
  topics: string[];
}

export interface EntityResponseItem {
  id: string;
  data: {
    account_id: string;
    contentType: string;
    created_at: number;
    email: string;
    processing: boolean;
    project_id: string;
    status: string;
    entity_number: number;
    updated_at: number;
    details: {
      entity: string;
      entityUrl: string;
    };
    google_adwords: {
      keywords: string[];
    };
    google_autosuggest: {
      organic_result: string[];
    };
    google_pytrends: {
      related_queries_top: string[];
      related_queries_rising: string[];
      related_topic_rising_title: string[];
      related_topic_top_title: string[];
    };
    people_ask_data: string[];
    wiki_entity: {
      search: string[];
      title: string;
      url: string;
    };
    openAI: OpenAIResponse[];
  };
}

export function transposeToEntityModel(
  model: EntityResponseItem[]
): EntityModel[] {
  const items = [];
  for (let x = 0; x < model.length; x++) {
    const item = {
      key: model[x].id,
      id: model[x].id,
      url: model[x].data.details.entityUrl,
      created_at: model[x].data.created_at,
      updated_at: model[x].data.updated_at,
      name: model[x].data.details.entity,
      account_id: model[x].data.account_id,
      project_id: model[x].data.project_id,
      type: model[x].data.contentType,
      entity_number: model[x].data.entity_number,
      details: {
        entity: model[x].data.details.entity,
        entityUrl: model[x].data.details.entityUrl,
      },
      google_adwords: {
        keywords: model[x].data.google_adwords.keywords,
      },
      google_autosuggest: {
        organic_result: model[x].data.google_autosuggest.organic_result,
      },
      google_pytrends: {
        related_queries_top: model[x].data.google_pytrends.related_queries_top,
        related_queries_rising:
          model[x].data.google_pytrends.related_queries_rising,
        related_topic_rising_title:
          model[x].data.google_pytrends.related_topic_rising_title,
        related_topic_top_title:
          model[x].data.google_pytrends.related_topic_top_title,
      },
      people_ask_data: model[x].data.people_ask_data,
      wiki_entity: {
        search: model[x].data.wiki_entity.search,
        title: model[x].data.wiki_entity.title,
        url: model[x].data.wiki_entity.url,
      },
      openAI: model[x].data.openAI,
    };
    items.push(item);
  }
  return items;
}

export function transposeSingleEntityModel(
  model: EntityResponseItem
): EntityModel {
  return {
    key: model.id,
    id: model.id,
    url: model.data.details.entityUrl,
    created_at: model.data.created_at,
    updated_at: model.data.updated_at,
    name: model.data.details.entity,
    account_id: model.data.account_id,
    project_id: model.data.project_id,
    entity_number: model.data.entity_number,
    type: model.data.contentType,
    details: {
      entity: model.data.details.entity,
      entityUrl: model.data.details.entityUrl,
    },
    google_adwords: {
      keywords: model.data.google_adwords.keywords,
    },
    google_autosuggest: {
      organic_result: model.data.google_autosuggest.organic_result,
    },
    google_pytrends: {
      related_queries_top: model.data.google_pytrends.related_queries_top,
      related_queries_rising: model.data.google_pytrends.related_queries_rising,
      related_topic_rising_title:
        model.data.google_pytrends.related_topic_rising_title,
      related_topic_top_title:
        model.data.google_pytrends.related_topic_top_title,
    },
    people_ask_data: model.data.people_ask_data,
    wiki_entity: {
      search: model.data.wiki_entity.search,
      title: model.data.wiki_entity.title,
      url: model.data.wiki_entity.url,
    },
    openAI: model.data.openAI,
  };
}

export interface ProjectResponseItem {
  id: string;
  value: {
    account_id: string;
    // created_at: number;
    updated_at: number;
    name: string;
    default: boolean;
  };
}
