import { Action } from 'redux'
import { RootState }  from '@/store';

export interface testAction extends Action {
  payload?: testState
}

// state
export const initialState = {
  count: 0
};

export type testState = typeof initialState

// actionTypes
export const actionTypes = {
  INCREASE: 'increate',
  DECREASE: 'decrement',
};

export const increate = (payload: testState) => ({
  type: actionTypes.INCREASE,
  payload
})

export const decreate = (payload: testState) => ({
  type: actionTypes.DECREASE,
  payload
})

export const getCount = (state: RootState): number => state.test.count

const test = (state: testState = initialState, action: testAction) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.INCREASE:
      return {
        ...state,
        count: state.count + payload.count,
      };
    case actionTypes.DECREASE:
       return {
        ...state,
        count: state.count - payload.count,
      };
    default:
      return state;
  }
};

export default test