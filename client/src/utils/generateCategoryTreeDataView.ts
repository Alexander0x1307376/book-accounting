import { Categories } from "../store/categoriesSlice";
import { TreeView } from "../types";


export const generateCategoryTreeDataView = (data: Categories, parentValue?: string): TreeView[] => {
  const result: TreeView[] = [];

  for (let key in data) {

    if (data[key].parent === parentValue) {

      const children = (data[key].children?.length)
        ? generateCategoryTreeDataView(data, key)
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

export const generateTreeForTable = (data: Categories, parentValue?: string): TreeView[] => {
  const result: TreeView[] = [];

  for (let key in data) {

    if (data[key].parent === parentValue) {

      const children = (data[key].children?.length)
        ? generateTreeForTable(data, key)
        : [];

      result.push({
        key,
        title: data[key].name,
        children: data[key].childCount ? children : undefined
      });
    }
  }

  return result;
};