/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import { Collapse, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';

interface DataType {
  key: React.Key;
  keyword: string;
  volume: number;
}

interface TopicalArticleMapDataTableProps {
  openAI: any;
}

export function TopicalArticleMapDataTableComponent({
  openAI,
}: TopicalArticleMapDataTableProps) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Keyword',
      dataIndex: 'keyword',
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
    },
  ];

  const topicsData = (dataInput: any) => {
    const data: DataType[] = [];
    for (let i = 0; i < dataInput.length; i++) {
      data.push({
        key: `${i}||openAI||entity||${dataInput[i].entity}`,
        keyword: dataInput[i],
        volume: 32,
      });
    }
    return data;
  };

  // const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
  //   console.log('selectedRowKeys changed: ', newSelectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    // onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <div
      className="pt-8 px-4"
      style={{
        // height: '100vh',
        paddingBottom: 20,
      }}
    >
      {openAI.map((item: any, index: number) => {
        return (
          <Collapse
            key={index}
            size="small"
            style={{ backgroundColor: 'white', marginBottom: 10 }}
            items={[
              {
                key: `${item.entity}`,
                label: `${item.entity}`,
                children: (
                  <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={topicsData(item.topics)}
                  />
                ),
              },
            ]}
          />
        );
      })}
    </div>
  );
}
