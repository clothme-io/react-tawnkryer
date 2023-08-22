import { Collapse } from 'antd';
import { useEffect } from 'react';
// Store
import { useAppStore } from '../../../store/store';
import { DataTableComponent } from './DataTableCOmponent';
import { EntityDataTable } from './EntityDataTable';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export function EntityDataComponent() {
  const entity = useAppStore((state) => state.selectedEntity);

  // const onChange = (key: string | string[]) => {
  // console.log('Got herer', key);
  // };

  useEffect(() => {
    // console.log('Got herer', entity);
  }, [entity]);

  return (
    <div
      className="pt-8 px-4"
      style={{
        // height: '100vh',
        paddingBottom: 20,
      }}
    >
      <div className="p-10 bg-white">
        {/* <p>{entity ? entity.name : ''}</p> */}
        <p>{entity.name}</p>
        <p>{entity.id}</p>
      </div>
      <br />
      <Collapse
        size="small"
        style={{ backgroundColor: 'white' }}
        items={[
          {
            key: '1',
            label: 'Related Entities',
            children: <EntityDataTable />,
          },
        ]}
      />
      <br />
      <Collapse
        size="small"
        style={{ backgroundColor: 'white' }}
        items={[
          {
            key: '2',
            label: 'Related Search',
            children: <p>{text}</p>,
          },
        ]}
      />
      <br />
      <Collapse
        size="small"
        style={{ backgroundColor: 'white' }}
        items={[
          {
            key: '3',
            label: 'Related Queries',
            children: <p>{text}</p>,
          },
        ]}
      />
      <br />
      <Collapse
        size="small"
        style={{ backgroundColor: 'white' }}
        items={[
          {
            key: '4',
            label: 'Keywords',
            children: <DataTableComponent />,
          },
        ]}
      />
    </div>
  );
}
