import React from "react";
import styled from 'styled-components';
import { Tree } from "antd";
import { TreeView } from "../../types";


const TreeContainer = styled.div`
  height: 300px;
  overflow: auto;
`;

export interface TreeListProps {
  data: TreeView[],
  onSelect: (id: string) => void,
  onLoadData?: ({key, children}: any) => Promise<void>
}

const TreeList: React.FC<TreeListProps> = ({ data, onSelect, onLoadData }) => {
  return (
    <TreeContainer>
      <Tree 
        treeData={data}
        loadData={onLoadData}
        onSelect={(selectedKeys) => onSelect(selectedKeys[0] as string) }
      />
    </TreeContainer>
  );
}

export default TreeList;