import { Button, Modal } from "antd";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesTree } from "../../../store/categoriesSlice";
import { 
  useCategoriesRootsQuery, 
  useLazyCategoryChildrenQuery
} from "../../../store/services/categoriesApi";
import TreeList, { TreeView } from "../treeList";
import { Categories } from '../../../store/categoriesSlice';
import { stringify } from "querystring";


export interface CategoryListModalProps {
  visible: boolean;
  onSelectClick?: ({id, name}: {id: string, name: string}) => void;
  onCancelClick?: () => void;
}

const CategoryListModal: React.FC<CategoryListModalProps> = ({ 
  visible, onSelectClick, onCancelClick 
}) => {

  const categories = useSelector(selectCategoriesTree);

  useCategoriesRootsQuery();
  const [fetch] = useLazyCategoryChildrenQuery();

  const categoriesTree = useMemo(() => generateTreeDataView(categories), [categories]);

  const [selectedId, setSelectedId] = useState<string>('');
  const [selectedName, setSelectedName] = useState<string>('');


  return (
    <Modal 
      title="Выбрать категорию"
      visible={visible}
      closable={false}
      maskClosable={false}
      footer={[
        <Button 
          key="cancel" 
          onClick={onCancelClick}
        >Отмена</Button>,
        <Button 
          key="select" 
          disabled={!selectedId}
          type="primary" 
          onClick={() => {
            onSelectClick?.({ id: selectedId, name: selectedName})
          }}
        >Выбрать</Button>
      ]}
    >
      <TreeList 
        data={categoriesTree}
        onLoadData={async ({key, children}) => {
          if(children) return;
          fetch(key);
        }}
        onSelect={(id) => {
          setSelectedId(id)
          setSelectedName(categories[id].name)
        }}
      />
    </Modal>
  );
}

// #region updateTree
// list - древо верхнего уровня
// key - id ноды, куда пихаем детей
// children - сами дети
// древо пересобираем полностью
// const updateTreeData = (list: any, key: string, children: any) => {
//   return list.map((node: any) => {
//     if (node.key === key) {
//       return { ...node, children };
//     }
//     if (node.children) {
//       return { ...node, children: updateTreeData(node.children, key, children) };
//     }

//     return node;
//   });
// }
//#endregion

const generateTreeDataView = (data: Categories, parentValue?: string): TreeView[] => {
  console.log(`generateTreeDataView - parentId: ${parentValue}`);
  const result: TreeView[] = [];

  for (let key in data) {
    
    if (data[key].parent === parentValue) {
      
      const children = (data[key].children?.length)
        ? generateTreeDataView(data, key)
        : undefined;

      result.push({
        key,
        title: data[key].name,
        isLeaf: !data[key].childCount,
        children
      });
    }
  }

  console.log('res', result);
  return result;
};

export default CategoryListModal;