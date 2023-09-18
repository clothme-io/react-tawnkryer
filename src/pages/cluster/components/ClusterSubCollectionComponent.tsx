/* eslint-disable react/jsx-key */
/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import { CarryOutOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { ClusterSubCollectionCollapseComponent } from './ClusterSubCollectionCollapse';
// Store

interface DataProps {
  entityData: any;
  data: any;
  treeData: any;
  setTreeData: any;
}

export function ClusterSubCollectionComponent({
  entityData,
  data,
  treeData,
  setTreeData,
}: DataProps) {
  // const [messageApi, contextHolder] = message.useMessage();

  const getTreeData = () => {
    const level1Children: any = [];
    if (data) {
      for (let x = 0; x < data.length; x++) {
        const child = {
          key: `${data[x].id}||${data[x].data.has_child}||${data[x].data.level}||${data[x].data.level_0_collection_name}||${data[x].data.level_0_id}||${data[x].data.root_entity_id}`,
          title: data[x].data.title,
          icon: <CarryOutOutlined />,
          treeData: [],
        };
        level1Children.push(child);
        setTreeData(level1Children);
      }
    }
  };

  useEffect(() => {
    getTreeData();
  }, [data]);

  useEffect(() => {
    console.log('The data', data);
    if (treeData) console.log('The treeData', treeData);
  }, [entityData, data, treeData]);

  return (
    <div
      className="pt-8 px-4"
      style={{
        paddingBottom: 20,
      }}
    >
      <div className="p-10 bg-white">
        {/* {contextHolder} */}
        <p>{data ? data.name : ''}</p>
        <p>{data ? data.type : ''}</p>
        <p>{data ? data.url : ''}</p>
      </div>
      {treeData &&
        treeData.map((item: any) => (
          <ClusterSubCollectionCollapseComponent childrenData={item} />
        ))}
    </div>
  );
}
