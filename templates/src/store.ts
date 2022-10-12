import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

// 引入单个
import home from './view/home/model';
import test from './view/test/model';

const rootReducer = combineReducers({
  home,
  test
})

let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
