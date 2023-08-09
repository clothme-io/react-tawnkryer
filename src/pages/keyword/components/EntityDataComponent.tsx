import { Collapse } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
];

export function EntityDataComponent() {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <div className="pt-8 px-4">
      <div className="pb-10">
        <p>Entity Name</p>
        <p>EntityDetails</p>
      </div>
      <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
    </div>
  );
}
