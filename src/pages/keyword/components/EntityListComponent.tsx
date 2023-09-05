/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import VirtualList from 'rc-virtual-list';
import { List, Skeleton, message } from 'antd';
import { nanoid } from 'nanoid';

// Models
import { EntityModel } from '../model/entityModel';

interface ListProps {
  loading: boolean;
  onListClick: any;
  data: any;
  appendData: any;
}

const ContainerHeight = '1000' as unknown as number;

export function EntityListComponent({
  loading,
  onListClick,
  data,
  appendData,
}: ListProps) {
  const projectId = JSON.parse(localStorage.getItem('tempProjectId') as string);

  useEffect(() => {}, [data]);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData(projectId as string);
    }
  };

  return (
    <List className="mt-8" key={nanoid()}>
      <VirtualList
        key={nanoid()}
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey={nanoid()}
        onScroll={onScroll}
      >
        {(item: EntityModel) => (
          <List.Item
            key={item.id}
            style={{
              cursor: 'pointer',
              backgroundColor: 'white',
              marginBottom: 6,
            }}
            onClick={() => onListClick(item.id)}
          >
            <List.Item.Meta
              title={loading && <Skeleton.Input active key={item.id} />}
              description={`${item.name} ${item.type} ${item.updated_at}`}
              className="px-3"
              style={{ backgroundColor: `${item.id} gray` }}
              key={item.id}
            />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
}
