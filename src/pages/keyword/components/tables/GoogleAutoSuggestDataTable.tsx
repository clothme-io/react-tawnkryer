/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { Button, Empty, Popconfirm, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { ClusterDrawerPage } from '../../../cluster/ClusterDrawerPage';

interface DataType {
  key: React.Key;
  keyword: string;
  volume: number;
}

interface GoogleAutoSuggestDataTableProps {
  google_autosuggest: any;
}

export function GoogleAutoSuggestDataTableComponent({
  google_autosuggest,
}: GoogleAutoSuggestDataTableProps) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedDrawerRecord, setSelectedDrawerRecord] = useState(null);

  const showDrawer = (record: any) => {
    setSelectedDrawerRecord(record);
    setOpen(true);
  };

  const handleDelete = (record: any) => {
    console.log('The record for drawer ====', record);
  };

  const onClose = () => {
    setOpen(false);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Keyword',
      dataIndex: 'keyword',
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record: { key: React.Key }) => (
        <Space size="middle">
          <Button
            className="text-blue-500 cursor-pointer pr-4"
            onClick={showDrawer}
            type="text"
            block
          >
            Do Research
          </Button>
          <Button
            className="text-blue-500 cursor-pointer pr-4"
            onClick={() => showDrawer(record)}
            type="text"
            block
          >
            Cluster
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <p className="text-red-500 cursor-pointer">Delete Entity</p>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [];
  if (google_autosuggest.organic_result) {
    for (let i = 0; i < google_autosuggest.organic_result.length; i++) {
      data.push({
        key: `${i}||google_autosuggest||organic_result||${google_autosuggest.organic_result[i]}`,
        keyword: google_autosuggest.organic_result[i],
        volume: 32,
      });
    }
  }

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

  useEffect(() => {}, [google_autosuggest]);

  return (
    <>
      {google_autosuggest.ok ? (
        <Empty />
      ) : (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      )}
      <ClusterDrawerPage
        onClose={onClose}
        open={open}
        selectedDrawerRecord={selectedDrawerRecord}
      />
    </>
  );
}
