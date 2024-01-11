import { Row, Col } from 'antd';
import { WriterDataComponent } from './components/WriterDataComponent';
import { WriterListComponent } from './components/WriterListComponent';

export function WriterPage() {
  return (
    <>
      <Row>
        <Col span={6}>
          <h2 className="text-3xl font-bold tracking-tight mb-0">Writer</h2>
        </Col>
        <Col span={6} />
        <Col span={6} />
        <Col span={6} className="grid justify-end" />
      </Row>
      <div className="grid gap-4 grid-cols-8 pt-3">
        <div
          className="col-span-2"
          style={{ minHeight: '100vh', backgroundColor: 'white' }}
        >
          <WriterListComponent />
        </div>
        <div className="col-span-6 h-full">
          <WriterDataComponent />
        </div>
      </div>
    </>
  );
}
