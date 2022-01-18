import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesTree } from "../../../store/categoriesSlice";
import { 
  useCategoriesRootsQuery, 
  // useLazyCategoriesRootsQuery, 
  useLazyCategoryChildrenQuery
} from "../../../store/services/categoriesApi";
import TreeList from "../treeList";
import CommonModal from "./commonModal";
import { generateCategoryTreeDataView } from "../../../utils/generateCategoryTreeDataView";

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
  const categoriesTree = useMemo(() => generateCategoryTreeDataView(categories), [categories]);

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

export default CategoryListModal;