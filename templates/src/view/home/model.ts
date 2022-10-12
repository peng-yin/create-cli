import { Action } from 'redux'
import { RootState }  from '@/store';

// state
export const initialState = {
  count: 0
};

export interface homeAction extends Action {
  payload?: homeState
}

export type homeState = typeof initialState

// actionTypes
export const actionTypes = {
  INCREASE: 'increate',
  DECREASE: 'decrement',
};

export const increate = (payload: homeState) => ({
  type: actionTypes.INCREASE,
  payload
})

export const decreate = (payload: homeState) => ({
  type: actionTypes.DECREASE,
  payload
})

export const getCount = (state: RootState): number => state.home.count

const home = (state: homeState = initialState, action: homeAction) => {
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

export default home