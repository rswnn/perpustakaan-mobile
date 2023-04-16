import {createSelector} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from 'store';

const selectState = (state: RootState, key: keyof RootState) => state[key];
const selectStore = createSelector([selectState], state => state);

const useTypedSelector = <T>(key: keyof RootState) => {
  const selector: TypedUseSelectorHook<RootState> = useSelector;
  const result = selector(state => selectStore(state, key));
  return result as unknown as T;
};

export default useTypedSelector;
