/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import { Collapse } from 'antd';
import { useEffect } from 'react';
// Store
import { KeywordDataTableComponent } from './KeywordDataTableComponent';
import { EntityDataTable } from '../EntityDataTable';
import { PeopleAlsoAskDataTableComponent } from './PeopleAlsoAskDataTableComponent';
import { GoogleAutoSuggestDataTableComponent } from './GoogleAutoSuggestDataTable';
import { TopicalArticleMapDataTableComponent } from './TopicalArticleMapDataTable';

interface DataProps {
  entityData: any;
  data: any;
}

export function EntityDataComponent({ entityData, data }: DataProps) {
  // const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    // console.log('The data in dataComponent', data);
  }, [entityData, data]);

  return (
    <div
      className="pt-8 px-4"
      style={{
        // height: '100vh',
        paddingBottom: 20,
      }}
    >
      <div className="p-10 bg-white">
        {/* {contextHolder} */}
        <p>{data ? data.name : ''}</p>
        <p>{data ? data.type : ''}</p>
        <p>{data ? data.url : ''}</p>
      </div>
      <br />
      <Collapse
        size="small"
        style={{ backgroundColor: 'white' }}
        items={[
          {
            key: '1',
            label: 'Related Entities',
            children: <EntityDataTable entity={entityData} />,
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
            label: 'Topical Article Map',
            children: (
              <TopicalArticleMapDataTableComponent
                openAI={data ? data.openAI : []}
              />
            ),
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
            label: 'Related Keywords',
            children: (
              <KeywordDataTableComponent
                google_adwords={data ? data.google_adwords : []}
              />
            ),
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
            label: 'Peopl Also Ask',
            children: (
              <PeopleAlsoAskDataTableComponent
                people_ask_data={data ? data.people_ask_data : []}
              />
            ),
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
            label: 'Google Auto-Suggest',
            children: (
              <GoogleAutoSuggestDataTableComponent
                google_autosuggest={data ? data.google_autosuggest : []}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
