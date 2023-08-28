/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, Empty } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { ClusterDrawer } from './ClusterDrawer';

interface DataType {
  key: React.Key;
  name: string;
}

const data: DataType[] = [];
for (let i = 0; i < 7; i++) {
  data.push({
    key: i,
    name: `Jeans ${i}`,
  });
}

export function EntityDataTable(props: any) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedDrawerRecord, setSelectedDrawerRecord] = useState(null);

  const showDrawer = (record: any) => {
    // console.log('The record for drawer ====', record);
    setSelectedDrawerRecord(record);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
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
            // onConfirm={() => handleDelete(record.key)}
          >
            <p className="text-red-500 cursor-pointer">Delete Entity</p>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
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

  useEffect(() => {
    // console.log('this is data for entity===============', props.entity);
  }, [props.entity]);

  return (
    <>
      {props.entity === '' ? (
        <Empty />
      ) : (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      )}
      <ClusterDrawer
        onClose={onClose}
        open={open}
        selectedDrawerRecord={selectedDrawerRecord}
      />
    </>
  );
}
