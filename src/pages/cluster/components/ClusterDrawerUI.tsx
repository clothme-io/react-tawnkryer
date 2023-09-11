/* eslint-disable react/jsx-boolean-value */
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
  treeData: any;
  setTreeData: any;
  setSelectedClusterItem: any;
  toggleIsButtonDisabled: any;
}

export function ClusterDrawerUI({
  UIData,
  treeData,
  setTreeData,
  setSelectedClusterItem,
  toggleIsButtonDisabled,
}: ClusterDrawerUIProps) {
  const [gData, setGData] = useState(defaultData);

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

  const checkedItem = (info: any) => {
    console.log(info);
    toggleIsButtonDisabled();
    setSelectedClusterItem(info);
    // expandedKeys, set it when controlled is needed
    // setExpandedKeys(info.expandedKeys)
  };

  const getTreeData = () => {
    const level1Children: any = [];
    if (UIData) {
      for (let x = 0; x < UIData.level1.length; x++) {
        const child = {
          key: `${UIData.level1[x].id}||${UIData.level1[x].data.has_child}||${UIData.level1[x].data.level}||${UIData.level1[x].data.level_0_collection_name}||${UIData.level1[x].data.level_0_id}||${UIData.level1[x].data.root_entity_id}`,
          title: UIData.level1[x].data.title,
          children: [],
        };
        level1Children.push(child);
      }
      const initialTreeData = {
        title: UIData.entity.value.title,
        key: UIData.entity,
        icon: <CarryOutOutlined />,
        children: level1Children,
      };
      setTreeData([initialTreeData]);
    }
  };

  useEffect(() => {
    getTreeData();
  }, [UIData]);

  useEffect(() => {}, [treeData]);

  return (
    <Tree
      className="draggable-tree"
      draggable
      blockNode
      showLine
      selectable={false}
      checkable={true}
      checkStrictly={true}
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      treeData={treeData}
      onCheck={checkedItem}
    />
  );
}
