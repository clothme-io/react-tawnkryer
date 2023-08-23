/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import VirtualList from 'rc-virtual-list';
import { List, Skeleton, message } from 'antd';
import {
  DocumentData,
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { db } from '../../../lib/firebase/firebaseConfig';

// Store
import { useAppStore } from '../../../store/store';

// Models
import {
  EntityResponseItem,
  EntityModel,
  transposeToEntityModel,
} from '../model/entityModel';

interface ListProps {
  onListClick: any;
}

const ContainerHeight = '1000' as unknown as number;

export function EntityListComponent({ onListClick }: ListProps) {
  // const entities = useAppStore((state) => state.entities);
  const addEntities = useAppStore((state) => state.addEntities);
  const selectEntity = useAppStore((state) => state.selectEntity);
  const accountId = useAppStore((state) => state.account.id);
  const project = useAppStore((state) => state.currentProject);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<EntityResponseItem | any>(null);

  const appendData = () => {
    setLoading(true);
    const q = query(
      collection(db, 'keyword'),
      where('account_id', '==', accountId),
      where('project_id', '==', project.id)
    );
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      const keywords:
        | EntityResponseItem
        | { id: string; value: DocumentData }[] = [];
      querySnapshot.forEach((doc) => {
        keywords.push({ id: doc.id, value: doc.data() });
      });
      const entitiesFromDB = transposeToEntityModel(
        keywords as unknown as EntityResponseItem[]
      );
      console.log('Document form DB', entitiesFromDB);

      setData(entitiesFromDB);
      addEntities(entitiesFromDB);
      selectEntity(entitiesFromDB[0]);
      setLoading(false);
    });
    return () => unSubscribe();
  };

  useEffect(() => {
    appendData();
  }, []);

  useEffect(() => {
  }, [data]);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
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
              title={loading && <Skeleton.Input active />}
              description={`${item.name} ${item.type} ${item.updated_at}`}
              className="px-3"
              style={{ backgroundColor: `${item.id} gray` }}
            />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
}
