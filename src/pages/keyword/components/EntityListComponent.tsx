/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import VirtualList from 'rc-virtual-list';
import { List, Skeleton } from 'antd';

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
    <List className="mt-8">
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="keywordList"
        onScroll={onScroll}
      >
        {(item: EntityModel) => (
          <List.Item
            key={item ? item.updated_at : Math.random()}
            style={{
              cursor: 'pointer',
              backgroundColor: 'white',
              marginBottom: 6,
            }}
            onClick={() => onListClick(item.id)}
          >
            <List.Item.Meta
              key={item ? item.updated_at : Math.random()}
              title={
                loading && (
                  <Skeleton.Input
                    active
                    key={item ? item.updated_at : Math.random()}
                  />
                )
              }
              description={`${item.name} ${item.updated_at}`}
              className="px-3"
              style={{ backgroundColor: `${item.id} gray` }}
            />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
}
