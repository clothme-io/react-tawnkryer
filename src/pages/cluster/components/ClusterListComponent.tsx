/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import VirtualList from 'rc-virtual-list';
import { List, Skeleton } from 'antd';
import { ClusterModel } from '../model/clusterModel';

// Models

interface ListProps {
  loading: boolean;
  onListClick: any;
  data: any;
  getCollectionData: any;
}

const ContainerHeight = '1000' as unknown as number;

export function ClusterListComponent({
  loading,
  onListClick,
  data,
  getCollectionData,
}: ListProps) {
  const projectId = JSON.parse(localStorage.getItem('tempProjectId') as string);

  useEffect(() => {}, [data]);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      getCollectionData(projectId as string);
    }
  };

  return (
    <List className="mt-8">
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="clusterList"
        onScroll={onScroll}
      >
        {(item: ClusterModel) => (
          <List.Item
            key={item ? item.id : Math.random()}
            style={{
              cursor: 'pointer',
              backgroundColor: 'white',
              marginBottom: 6,
            }}
            onClick={() => onListClick(item.id)}
          >
            <List.Item.Meta
              title={loading && <Skeleton.Input active />}
              description={`${item.title}`}
              className="px-3"
              style={{ backgroundColor: `${item.id} gray` }}
            />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
}
