import {useCallback, useEffect, useState} from 'react';
import {useTypedSelector, useAppAsyncDispatch} from '@hooks';
import {action} from '@store';
import {CategoryState, TaskState} from '@interfaces';

const useCategory = () => {
  const getCategory = useAppAsyncDispatch(
    action.CategoryAction.getCategoryAction,
  );
  const getCategoryById = useAppAsyncDispatch(
    action.CategoryAction.getCategoryByIdAction,
  );
  const {categories} = useTypedSelector<CategoryState>('category');
  const {listTasks} = useTypedSelector<TaskState>('hafalan');

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const [renderCategory, setRenderCategory] = useState(false);

  const handlePressCategory = async (value: any) => {
    try {
      await getCategoryById({
        payload: {
          param: value[0]?.id,
        },
      });
      setRenderCategory(!renderCategory);
    } catch (error) {
      console.log(error, 'HANDLER PRESS CATEGORY LIST ERROR');
    }
  };

  const fetchData = useCallback(async () => {
    try {
      await getCategory();
    } catch (error) {
      console.log(error);
    }
  }, [getCategory]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    categories,
    renderCategory,
    setRenderCategory,
    handlePressCategory,
    handleSheetChanges,
    listTasks,
  };
};

export default useCategory;
