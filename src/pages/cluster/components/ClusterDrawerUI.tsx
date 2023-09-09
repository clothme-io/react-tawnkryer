/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import { CarryOutOutlined } from '@ant-design/icons';

const x = 3;
const y = 2;
const z = 1;
const defaultData: DataNode[] = [];

export function generateData(
  _level: number,
  _preKey?: React.Key,
  _tns?: DataNode[]
): DataNode[] {
  const preKey = _preKey || '0';
  const tns = _tns || defaultData;

  const children: React.Key[] = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
  return _tns as DataNode[];
}
generateData(z);

interface ClusterDrawerUIProps {
  UIData: any;
  // selectedRecord: any;
  isButtonDisabled: boolean;
  setIsButtonDisabled: any;
  treeData: any;
  setTreeData: any;
  setSelectedClusterItem: any;
}

export function ClusterDrawerUI({
  UIData,
  // selectedRecord,
  isButtonDisabled,
  setIsButtonDisabled,
  treeData,
  setTreeData,
  setSelectedClusterItem,
}: ClusterDrawerUIProps) {
  const [gData, setGData] = useState(defaultData);
  // const [expandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0']);

  const onDragEnter: TreeProps['onDragEnter'] = (info) => {
    console.log(info);
    // expandedKeys, set it when controlled is needed
    // setExpandedKeys(info.expandedKeys)
  };

  const onDrop: TreeProps['onDrop'] = (info) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };

    const data = [...gData];

    // Find dragObject
    let dragObj: DataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
      });
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar: DataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setGData(data);
  };

  const selectedItem: TreeProps['onSelect'] = (info) => {
    // console.log(info);
    toggleIsButtonDisabled();
    setSelectedClusterItem(info);
    // expandedKeys, set it when controlled is needed
    // setExpandedKeys(info.expandedKeys)
  };

  const getTreeData = () => {
    if (UIData.length > 0) {
      const initialTreeData = {
        title: UIData[0].data.title,
        key: UIData[0].id,
        icon: <CarryOutOutlined />,
        children: [],
      };
      setTreeData([initialTreeData]);
    }
  };

  const toggleIsButtonDisabled = () => {
    if (isButtonDisabled) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  useEffect(() => {
    // console.log('The selected record ====', selectedRecord.keyword);
    getTreeData();
  }, []);

  useEffect(() => {}, [treeData]);

  return (
    <Tree
      className="draggable-tree"
      draggable
      blockNode
      showLine
      selectable
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      treeData={treeData}
      onSelect={selectedItem}
    />
  );
}
