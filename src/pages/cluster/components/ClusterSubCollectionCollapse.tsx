/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Collapse, Empty, Button, Divider } from 'antd';
import { nanoid } from 'nanoid';
import { readFromSubCollectionCollections } from '../api/readClusterAPIs';
import { addOutlineData } from '../../outline/api/addOutlineAPIs';

interface DataProps {
  childrenData: any;
}

export function ClusterSubCollectionCollapseComponent({
  childrenData,
}: DataProps) {
  // const [messageApi, contextHolder] = message.useMessage();

  const accountId = JSON.parse(localStorage.getItem('tempUserId') as string);
  const projectId = JSON.parse(localStorage.getItem('tempProjectId') as string);

  const [subCollectionData, setSubCollectionData] = useState<any>(null);

  const onChange = async (key: any) => {
    if (key.length > 0) {
      const inputDetails = key[0].split('||');
      const subClusterId = inputDetails[0];
      const clusterName = inputDetails[3];
      const clusterId = inputDetails[4];
      const subCollectionResponse = await readFromSubCollectionCollections(
        clusterId,
        clusterName,
        subClusterId,
        childrenData.title
      );
      if (subCollectionResponse.ok) {
        const itemValue: any = [];
        subCollectionResponse.data.forEach((items: any) => {
          itemValue.push(items.data.title);
        });
        setSubCollectionData(subCollectionResponse.data);
      }
    }
  };

  const addToOutline = async (item: any) => {
    const keyData = childrenData.key.split('||');
    const entityId = keyData[5];

    const details = {
      cluster: {
        clusterId: keyData[4],
        clusterName: keyData[3],
      },
      subCluster: {
        subClusterId: keyData[0],
        subClusterName: childrenData.title,
        level: keyData[2],
      },
      subClusterCollection: {
        id: item.id,
      },
      outLineTopic: item.data.title,
    };
    const id = nanoid();
    const responseFromAddToOutline = await addOutlineData(
      id,
      accountId,
      projectId,
      entityId,
      details
    );
    if (responseFromAddToOutline.ok) {
      // update subCollectionData with setSubCollectionData()
      const subCollectionResponse = await readFromSubCollectionCollections(
        details.cluster.clusterId,
        details.cluster.clusterName,
        details.subCluster.subClusterId,
        details.subCluster.subClusterName
      );
      if (subCollectionResponse.ok) {
        const itemValue: any = [];
        subCollectionResponse.data.forEach((items: any) => {
          itemValue.push(items.data.title);
        });
        setSubCollectionData(subCollectionResponse.data);
      }
    }
  };

  useEffect(() => {
    // console.log('The data in dataComponent', childrenData);
  }, [childrenData, subCollectionData]);

  return (
    <div className="pt-2">
      <Collapse
        size="small"
        style={{ backgroundColor: 'white' }}
        onChange={onChange}
        items={[
          {
            key: `${childrenData.key}`,
            label: `${childrenData.title}`,
            children: (
              <ChildrenComponent
                childrenData={subCollectionData}
                addToOutline={addToOutline}
              />
            ),
          },
        ]}
      />
    </div>
  );
}

export function ChildrenComponent(props: any) {
  useEffect(() => {}, [props.childrenData]);

  return (
    <>
      {props.childrenData ? (
        props.childrenData.map((item: any) => (
          <>
            <div key={nanoid()} className="">
              {item.data ? (
                <div className="flex">
                  <div className="flex flex-grow">
                    <p>{item.data.title}</p>
                  </div>
                  <div className="flex">
                    {item.data.isOutline ? (
                      <Button
                        type="text"
                        size="small"
                        disabled
                        onClick={() => props.addToOutline(item)}
                      >
                        In Outline Step
                      </Button>
                    ) : (
                      <Button
                        type="text"
                        size="small"
                        onClick={() => props.addToOutline(item)}
                        className="text-black hover:text-white"
                      >
                        Create Outline
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <Empty />
              )}
            </div>
            <Divider />
          </>
        ))
      ) : (
        <Empty key={nanoid()} />
      )}
    </>
  );
}
