/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/function-component-definition */
import { useEffect, useState } from 'react';
import { Row, Col, message } from 'antd';
import { DataNode } from 'antd/es/tree';
// Store & Model
import { useAppStore } from '../../store/store';
import {
  readFromCollectionSubCollectionForEntity,
  readFromSubCollections,
} from './api/readClusterAPIs';
import { ClusterListComponent } from './components/ClusterListComponent';
import { transposeToClusterModel } from './model/clusterModel';
import { ClusterSubCollectionComponent } from './components/ClusterSubCollectionComponent';

export const ClusterPage = () => {
  const entity = useAppStore((state) => state.selectedEntity);
  const [messageApi, contextHolder] = message.useMessage();

  // For Entity List Component
  const [loading, setLoading] = useState(false);
  const [clusterData, setClusterData] = useState<any>(null);
  const [firstData, setFirstData] = useState<any>(null);
  const [treeData, setTreeData] = useState<DataNode[]>();

  const accountId = JSON.parse(localStorage.getItem('tempUserId') as string);
  const projectId = JSON.parse(localStorage.getItem('tempProjectId') as string);
  const entityId = JSON.parse(localStorage.getItem('tempEntityId') as string);

  const onListClick = (key: string) => {
    // addCurrentEntityId(key);
    // setStateEntityId(key);
    // readKeywordContent(key as unknown as string)
    //   .then((item) => {
    //     if (item.ok) {
    //       const entityFromDB = transposeSingleEntityModel(item.data);
    //       selectEntity(entityFromDB);
    //       setFirstData(entityFromDB);
    //     }
    //   })
    //   .catch((error) => {
    //     messageApi.open({
    //       type: 'error',
    //       content: error,
    //     });
    //   });
  };

  const getCollectionData = async () => {
    setLoading(true);
    const clusterAPIResponse = await readFromCollectionSubCollectionForEntity(
      accountId,
      projectId,
      entityId
    );
    if (clusterAPIResponse.ok) {
      const clusterData = transposeToClusterModel(clusterAPIResponse.data);
      setClusterData(clusterData);
      await getSubCollectionData(clusterAPIResponse.data[0]);
    }
    setLoading(false);
  };

  const getSubCollectionData = async (cluster: any) => {
    setLoading(true);
    const subClusterAPIResponse = await readFromSubCollections(
      cluster.id,
      cluster.data.title
    );
    if (subClusterAPIResponse.ok) {
      setFirstData(subClusterAPIResponse.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (projectId && entityId) {
      getCollectionData();
    }
  }, [entity]);

  useEffect(() => {}, [firstData]);

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={6}>
          <h2 className="text-3xl font-bold tracking-tight mb-0">Cluster</h2>
        </Col>
        <Col span={6} />
        <Col span={6} />
        <Col span={6} className="grid justify-end" />
      </Row>
      <div className="grid gap-4 grid-cols-8 pt-3">
        <div
          className="col-span-2"
          style={
            {
              // minHeight: '100vh',
              // backgroundColor: 'white',
            }
          }
        >
          <ClusterListComponent
            loading={loading}
            data={clusterData}
            onListClick={onListClick}
            getCollectionData={getCollectionData}
          />
        </div>
        <div
          className="col-span-6"
          style={
            {
              // minHeight: '100vh'
            }
          }
        >
          <div
            style={
              {
                // minHeight: '100vh',
                // backgroundColor: 'white',
              }
            }
          >
            <ClusterSubCollectionComponent
              entityData={clusterData}
              data={firstData}
              treeData={treeData}
              setTreeData={setTreeData}
            />
          </div>
        </div>
      </div>
    </>
  );
};
