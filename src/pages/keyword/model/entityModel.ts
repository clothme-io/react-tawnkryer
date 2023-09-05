/* eslint-disable no-plusplus */
export interface EntityModel {
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
  value: {
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
      id: model[x].id,
      url: model[x].value.details.entityUrl,
      created_at: model[x].value.created_at,
      updated_at: model[x].value.updated_at,
      name: model[x].value.details.entity,
      account_id: model[x].value.account_id,
      project_id: model[x].value.project_id,
      type: model[x].value.contentType,
      entity_number: model[x].value.entity_number,
      details: {
        entity: model[x].value.details.entity,
        entityUrl: model[x].value.details.entityUrl,
      },
      google_adwords: {
        keywords: model[x].value.google_adwords.keywords,
      },
      google_autosuggest: {
        organic_result: model[x].value.google_autosuggest.organic_result,
      },
      google_pytrends: {
        related_queries_top: model[x].value.google_pytrends.related_queries_top,
        related_queries_rising:
          model[x].value.google_pytrends.related_queries_rising,
        related_topic_rising_title:
          model[x].value.google_pytrends.related_topic_rising_title,
        related_topic_top_title:
          model[x].value.google_pytrends.related_topic_top_title,
      },
      people_ask_data: model[x].value.people_ask_data,
      wiki_entity: {
        search: model[x].value.wiki_entity.search,
        title: model[x].value.wiki_entity.title,
        url: model[x].value.wiki_entity.url,
      },
      openAI: model[x].value.openAI,
    };
    items.push(item);
  }
  return items;
}

export function transposeSingleEntityModel(
  model: EntityResponseItem
): EntityModel {
  return {
    id: model.id,
    url: model.value.details.entityUrl,
    created_at: model.value.created_at,
    updated_at: model.value.updated_at,
    name: model.value.details.entity,
    account_id: model.value.account_id,
    project_id: model.value.project_id,
    entity_number: model.value.entity_number,
    type: model.value.contentType,
    details: {
      entity: model.value.details.entity,
      entityUrl: model.value.details.entityUrl,
    },
    google_adwords: {
      keywords: model.value.google_adwords.keywords,
    },
    google_autosuggest: {
      organic_result: model.value.google_autosuggest.organic_result,
    },
    google_pytrends: {
      related_queries_top: model.value.google_pytrends.related_queries_top,
      related_queries_rising:
        model.value.google_pytrends.related_queries_rising,
      related_topic_rising_title:
        model.value.google_pytrends.related_topic_rising_title,
      related_topic_top_title:
        model.value.google_pytrends.related_topic_top_title,
    },
    people_ask_data: model.value.people_ask_data,
    wiki_entity: {
      search: model.value.wiki_entity.search,
      title: model.value.wiki_entity.title,
      url: model.value.wiki_entity.url,
    },
    openAI: model.value.openAI,
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
