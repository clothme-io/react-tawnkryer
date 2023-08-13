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

interface EntityItem {
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

interface ListProps {
  onListClick: any;
}

const ContainerHeight = '1000' as unknown as number;

export function EntityListComponent({ onListClick }: ListProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<EntityItem | any>([]);

  const appendData = () => {
    setLoading(true);
    const q = query(
      collection(db, 'keyword'),
      where('account_id', '==', 'oTCL6Iy0wNWuFqWYuaX1xbHT1Jm2'),
      where('project_id', '==', 'B56F4d0RpQNoyX1GjELG')
    );
    onSnapshot(q, (querySnapshot) => {
      const keywords: EntityItem | { id: string; value: DocumentData }[] = [];
      querySnapshot.forEach((doc) => {
        keywords.push({ id: doc.id, value: doc.data() });
      });
      // console.log('The value of keywords *****************', keywords);
      setData(keywords as unknown as EntityItem);
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
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item: EntityItem) => (
          <List.Item
            key={item.id}
            style={{ cursor: 'pointer' }}
            onClick={() => onListClick(item.id)}
          >
            <List.Item.Meta
              title={
                item.value.details.entity ? (
                  item.value.details.entity
                ) : (
                  <Skeleton.Input active />
                )
              }
              description={`${item.value.contentType} ${item.value.updated_at}`}
              className="px-3"
              style={{ backgroundColor: `${item.id} gray` }}
            />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
}
