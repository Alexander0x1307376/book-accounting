import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesTree } from "../../../store/categoriesSlice";
import { 
  useCategoriesRootsQuery, 
  useLazyCategoryChildrenQuery
} from "../../../store/services/categoriesApi";
import TreeList, { TreeView } from "../treeList";
import { Categories } from '../../../store/categoriesSlice';
import CommonModal from "./commonModal";

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
    <CommonModal 
      title="Выбрать категорию"
      visible={visible}
      acceptButtonText="Выбрать"
      onAcceptClick={() => onSelectClick?.({ id: selectedId, name: selectedName}) }
      onCancelClick={onCancelClick}
      isAcceptButtonDisabled={!selectedId}
    >
      <TreeList 
        data={categoriesTree}
        onLoadData={async ({key, children}) => {
          if(children) return;
          fetch(key);
        }}
        onSelect={(id) => {
          if(id) {
            setSelectedId(id);
            setSelectedName(categories[id].name);
          } else {
            setSelectedId('');
            setSelectedName('');
          }
        }}
      />
    </CommonModal>
  );
}



const generateTreeDataView = (data: Categories, parentValue?: string): TreeView[] => {
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

  return result;
};

export default CategoryListModal;