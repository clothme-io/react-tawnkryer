/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
export interface ClusterModel {
    id: string;
    account_id: string;
    entity_id: string;
    has_child: boolean;
    level: string;
    project_id: string;
    title: string;
}

export interface ClusterResponseItem {
    id: string;
    data: {
        account_id: string;
        entity_id: string;
        has_child: boolean;
        level: string;
        project_id: string;
        title: string;
    };
}

export function transposeToClusterModel(
    model: ClusterResponseItem[]
): ClusterModel[] {
    const items = [];
    for (let x = 0; x < model.length; x++) {
        const item = {
            id: model[x].id,
            account_id: model[x].data.account_id,
            entity_id: model[x].data.entity_id,
            has_child: model[x].data.has_child,
            level: model[x].data.level,
            project_id: model[x].data.project_id,
            title: model[x].data.title,
        };
        items.push(item);
    }
    return items;
}

export function transposeSingleClusterModel(
    model: ClusterResponseItem
): ClusterModel {
    return {
        id: model.id,
        account_id: model.data.account_id,
        entity_id: model.data.entity_id,
        has_child: model.data.has_child,
        level: model.data.level,
        project_id: model.data.project_id,
        title: model.data.title,
    };
}

