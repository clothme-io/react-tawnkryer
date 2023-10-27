/* eslint-disable react-hooks/exhaustive-deps */
import { Row, Col } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { OutlineDataComponent } from './components/OutlineDataComponent';
import { OutlineListComponent } from './components/OutlineListComponent';
import { readOutlineContents } from './api/readOutlineAPIs';

export function ContentOutlinePage() {
  const accountId = JSON.parse(localStorage.getItem('tempUserId') as string);
  const projectId = JSON.parse(localStorage.getItem('tempProjectId') as string);
  const entityId = JSON.parse(localStorage.getItem('tempEntityId') as string);

  const [outlineUiData, setOutlineUiData] = useState({
    processing: true,
    data: {},
    id: '',
    title: '',
    updated_at: null,
  });

  const getUIData = async () => {
    const outlineApiRes = await readOutlineContents(
      entityId,
      accountId,
      projectId
    );
    if (outlineApiRes.ok) {
      console.log('The api response ====', outlineApiRes.data);
      if (outlineApiRes.data.length > 0) {
        outlineApiRes.data.forEach((item: any) => {
          console.log('The item ====', item.data);
          setOutlineUiData({
            title: item.data.title,
            processing: item.data.processing,
            id: item.id,
            data: item.outline_data,
            updated_at: item.data.updated_at,
          });
        });
      }
    }
  };

  // const saveEditorDataToDB: Worker = useMemo(
  //   () => new Worker(new URL('./workers/saveData.ts', import.meta.url)),
  //   []
  // );

  // useEffect(() => {
  //   if (window.Worker) {
  //     saveEditorDataToDB.postMessage('');
  //   }
  // }, []);

  // useEffect(() => {
  //   if (window.Worker) {
  //     saveEditorDataToDB.onmessage = (e: MessageEvent<string>) => {
  //       // setLengthCount((prev) => ({
  //       //   ...prev,
  //       //   loading: false,
  //       //   value: Number(e.data) && Number(e.data),
  //       // }));
  //     };
  //   }
  // }, []);

  useEffect(() => {
    getUIData();
  }, []);

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
            <OutlineDataComponent content="" />
          </div>
        </div>
      </div>
    </>
  );
}
