/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
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
import {useAppStore } from '../../../store/store';

// Models
import { EntityResponseItem, EntityModel, transposeToEntityModel } from '../model/entityModel';

interface ListProps {
  onListClick: any;
}

const ContainerHeight = '1000' as unknown as number;

export function EntityListComponent({ onListClick }: ListProps) {
  const entities = useAppStore((state) => state.entities);
  const addEntities = useAppStore((state) => state.addEntities);
  const selectEntity = useAppStore((state) => state.selectEntity);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<EntityResponseItem | any>([]);

  const appendData = () => {
    setLoading(true);
    const q = query(
      collection(db, 'keyword'),
      where('account_id', '==', 'oTCL6Iy0wNWuFqWYuaX1xbHT1Jm2'),
      where('project_id', '==', 'B56F4d0RpQNoyX1GjELG')
    );
    onSnapshot(q, (querySnapshot) => {
      const keywords: EntityResponseItem | { id: string; value: DocumentData }[] = [];
      querySnapshot.forEach((doc) => {
        keywords.push({ id: doc.id, value: doc.data() });
      });
      // console.log('The value of keywords *****************', keywords);
      const entitiesFromDB = transposeToEntityModel(keywords as unknown as EntityResponseItem[]);
      setData(entitiesFromDB);
      addEntities(entitiesFromDB);
      selectEntity(entitiesFromDB[0])
    });
  };

  useEffect(() => {
    appendData();
  }, []);

  useEffect(() => {}, [data]);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
    }
  };

  return (
    <List className="mt-12" key={nanoid()}>
      <VirtualList
        key={nanoid()}
        data={entities}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item: EntityModel) => (
          <List.Item
            key={item.id}
            style={{ cursor: 'pointer' }}
            onClick={() => onListClick(item.id)}
          >
            <List.Item.Meta
              title={
                item.name ? (
                  item.name
                ) : (
                  <Skeleton.Input active />
                )
              }
              description={`${item.type} ${item.updated_at}`}
              className="px-3"
              style={{ backgroundColor: `${item.id} gray` }}
            />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
}
