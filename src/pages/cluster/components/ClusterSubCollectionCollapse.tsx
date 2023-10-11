/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Collapse, Button, Divider } from 'antd';
import { nanoid } from 'nanoid';
import {
  readFromSubClusterCollections,
  readFromSubCollection,
  readFromSubCollectionCollections,
} from '../api/readClusterAPIs';
import { addClusterToOutline, addSubClusterToOutline } from '../../outline/api/addOutlineAPIs';

interface DataProps {
  childrenData: any;
}

export function ClusterSubCollectionCollapseComponent({
  childrenData,
}: DataProps) {
  // const [messageApi, contextHolder] = message.useMessage();

  const accountId = JSON.parse(localStorage.getItem('tempUserId') as string);
  const projectId = JSON.parse(localStorage.getItem('tempProjectId') as string);
  const entityId = JSON.parse(localStorage.getItem('tempEntityId') as string);

  const [subCollectionData, setSubCollectionData] = useState<any>(null);

  const onChange = async (key: any) => {
    if (key.length > 0) {
      const inputDetails = key[0].split('||');
      const subClusterId = inputDetails[0];
      // const clusterName = inputDetails[3];
      // const clusterId = inputDetails[4];
      const subCollectionResponse = await readFromSubClusterCollections(
        subClusterId,
        accountId,
        projectId,
        entityId
      );
      if (subCollectionResponse.ok) {
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
      accountId,
      projectId,
      entityId,
    };
    const id = nanoid();
    const responseFromAddToOutline = await addClusterToOutline(
      id,
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
  }, [childrenData]);

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
  const [collectionData, setCollectionData] = useState<any>({});
  const setData = () => {
    setCollectionData(props.childrenData)
  }
  useEffect(() => {
    if (props.childrenData?.data) setData()
    // console.log('props.childrenData', props.childrenData.data);
  }, [collectionData, props.childrenData]);

  return (
    <>
      <div className="px-6 pt-6">
        <div className="flex mb-10">
          <p className="flex-1">{collectionData ? collectionData?.data?.title : ''}</p>
          <div className="flex">
            {collectionData?.data ? (
              <Button
                type="text"
                size="small"
                disabled
              // onClick={() => props.addToOutline(item)}
              >
                In Outline Step
              </Button>
            ) : (
              <Button
                type="text"
                size="small"
                // onClick={() => props.addToOutline(item)}
                className="text-black hover:text-white"
              >
                Create Outline
              </Button>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="flex-1">
            {collectionData?.data && (
              collectionData?.data?.organic_result?.map((item: any) => (
                <div className="flex-1" key={item?.id}><RelatedSearchItemComponent item={item} fullData={collectionData} /></div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}


export function RelatedSearchItemComponent(props: any) {

  // const accountId = JSON.parse(localStorage.getItem('tempUserId') as string);
  // const projectId = JSON.parse(localStorage.getItem('tempProjectId') as string);
  // const entityId = JSON.parse(localStorage.getItem('tempEntityId') as string);

  const [subDisplayData, setDisplayData] = useState<any>(null);

  const addToOutline = async (item: any) => {
    const { account_id, cluster, processing, title, project_id, entity_id } = props.fullData.data

    const details = {
      account_id,
      project_id,
      entity_id,
      processing,
      cluster,
      subCluster: {
        title,
        id: props.fullData.id,
      },
      outLineTopic: item.title,
    };

    const outline_id = nanoid();

    const responseFromAddToOutline = await addSubClusterToOutline(
      outline_id,
      details
    );
    if (responseFromAddToOutline.ok) {
      // update subCollectionData with setSubCollectionData()
      const subCollectionResponse = await readFromSubCollection(
        props.fullData.id,
      );
      if (subCollectionResponse.ok) {
        setDisplayData(subCollectionResponse.data);
      }
    }
  };

  const setInitialData = () => {
    if (props.item) {
      setDisplayData(props.item)
    }
  }

  useEffect(() => {
    setInitialData()
  }, [])

  return (
    <>
      <div key={props.item.link}>
        <div className="flex">
          <div className="flex-1 pr-20">
            <div className="flex">{subDisplayData?.title}</div>
            <div className="flex">{subDisplayData?.domain}</div>
            <div className="flex">{subDisplayData?.link}</div>
          </div>
          <div>
            {!subDisplayData?.processing ? (
              <Button
                type="text"
                size="small"
                disabled
                onClick={() => addToOutline(subDisplayData)}
              >
                Added To Outline
              </Button>
            ) : (
              <Button
                type="text"
                size="small"
                onClick={() => addToOutline(subDisplayData)}
                className="text-black hover:text-white"
              >
                Add To Outline
              </Button>
            )}
          </div>
        </div>
        <Divider style={{ border: "" }} />
      </div>
    </>
  )
}