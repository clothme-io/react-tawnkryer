/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import VirtualList from 'rc-virtual-list';
import { List, message } from 'antd';

interface UserItem {
  email: string;
  gender: string;
  name: {
    first: string;
    last: string;
    title: string;
  };
  nat: string;
}

const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = '100vh' as unknown as number;

export function OutlineListComponent() {
  const [data, setData] = useState<UserItem[]>([]);

  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };

  const onListClick = (key: string | string[]) => {
    console.log(key);
  };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
    }
  };

  return (
    <List className="mt-12">
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item: UserItem) => (
          <List.Item
            key={item.email}
            style={{ cursor: 'pointer' }}
            onClick={() => onListClick(item.email)}
          >
            <List.Item.Meta title={item.email} className="px-3" />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
}
