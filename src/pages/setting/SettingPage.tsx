/* eslint-disable no-nested-ternary */
import { Col, Row, Tabs } from 'antd';
import { ProjectAccountPage } from './components/project/ProjectComponent';

export function SettingPage() {
  return (
    <>
      <Row>
        <Col span={6}>
          <h2 className="text-3xl font-bold tracking-tight mb-4">Setting</h2>
        </Col>
        <Col span={6} />
        <Col span={6} />
        <Col span={6} className="grid justify-end" />
      </Row>
      <div className="pt-12 bg-white h-full">
        <Tabs
          tabPosition="left"
          items={new Array(3).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: `${
                id === '1' ? 'Account' : id === '2' ? 'Project' : 'Notification'
              }`,
              key: id,
              children:
                id === '1' ? (
                  'Account'
                ) : id === '2' ? (
                  <ProjectAccountPage />
                ) : (
                  'Notification'
                ),
            };
          })}
        />
      </div>
    </>
  );
}
