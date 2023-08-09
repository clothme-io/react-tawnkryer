import { Row, Col } from 'antd';
import { OutlineDataComponent } from './components/OutlineDataComponent';
import { OutlineListComponent } from './components/OutlineListComponent';

export function ContentOutlinePage() {
  return (
    <>
      <Row>
        <Col span={6}>
          <h2 className="text-3xl font-bold tracking-tight mb-0">Outline</h2>
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
          <OutlineListComponent />
        </div>
        <div className="col-span-6" style={{ minHeight: '100vh' }}>
          <div
            style={{
              minHeight: '100vh',
              backgroundColor: 'white',
            }}
          >
            <OutlineDataComponent />
          </div>
        </div>
      </div>
    </>
  );
}
