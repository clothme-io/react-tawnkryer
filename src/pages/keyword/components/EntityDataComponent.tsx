import { Collapse, Skeleton, theme } from 'antd';
import { useEffect, type CSSProperties } from 'react';
import type { CollapseProps } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

interface DataProps {
  keywordData: any;
}

export function EntityDataComponent({ keywordData }: DataProps) {
  const { token } = theme.useToken();

  const onChange = (key: string | string[]) => {
    console.log('Got herer', key);
  };

  const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (
    panelStyle
  ) => [
    {
      key: '1',
      label: 'Entities',
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: '2',
      label: 'Related Search',
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: '3',
      label: 'Auto Suggest',
      children: <p>{text}</p>,
      style: panelStyle,
    },
  ];

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  useEffect(() => {}, [keywordData]);

  return (
    <div className="pt-8 px-4" style={{ height: '100vh' }}>
      <div className="pb-10">
        <p>{keywordData.value ? keywordData.value.details.entity : ''}</p>
        <p>{keywordData.id}</p>
      </div>
      <Collapse
        items={getItems(panelStyle)}
        defaultActiveKey={['1']}
        onChange={onChange}
        style={{ background: token.colorBgContainer, border: 'none' }}
      />
    </div>
  );
}
