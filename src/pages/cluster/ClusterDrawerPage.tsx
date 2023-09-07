/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
import { Button, Divider, Drawer, Row } from 'antd';
import { useEffect } from 'react';
import { ClusterDrawerUI } from './components/ClusterDrawerUI';

// API
import { readClusterContents } from './api/readClusterAPIs';

// interface DescriptionItemProps {
//   title: string;
//   content: React.ReactNode;
// }

// function DescriptionItem({ title, content }: DescriptionItemProps) {
//   return (
//     <div className="site-description-item-profile-wrapper">
//       <p className="site-description-item-profile-p-label">{title}:</p>
//       {content}
//     </div>
//   );
// }

export function ClusterDrawerPage(props: any) {
  // const [clusterDBData, setClusterDBData] = useState(null);

  const accountId = JSON.parse(localStorage.getItem('tempUserId') as string);
  const projectId = JSON.parse(localStorage.getItem('tempProjectId') as string);

  const getClusterData = async () => {
    const response = await readClusterContents(accountId, projectId);
    console.log('the response in cluster drawer', response);
  };

  useEffect(() => {
    getClusterData();
  }, [props.selectedDrawerRecord]);

  return (
    <Drawer
      width={500}
      placement="right"
      closable={false}
      onClose={props.onClose}
      open={props.open}
    >
      <div className="flex">
        <div className="flex-1">
          <p
            className="site-description-item-profile-p"
            style={{ marginBottom: 24 }}
          >
            Entity Cluster
          </p>
        </div>
        <div className="justify-end">
          <Button
            type="default"
            size="large"
            // onClick={showModal}
            className="bg-black text-white hover:text-white"
          >
            Add New Cluster
          </Button>
        </div>
      </div>
      <Divider />
      <Row>
        <ClusterDrawerUI />
      </Row>
      <Row>
        <Button
          type="default"
          size="middle"
          // onClick={showModal}
          className="bg-black text-white hover:text-white"
        >
          Include In A Cluster
        </Button>
      </Row>
    </Drawer>
  );
}
