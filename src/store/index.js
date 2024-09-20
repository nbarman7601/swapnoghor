// src/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import customerReducer from './reducer/customer.reducer';
import { loanReducer } from './reducer/loan.reducer';
import { groupReducer } from './reducer/group.reducer';
import { employeeReducer } from './reducer/employee.reducer';
import { itemReducer } from './reducer/item.reducer';
import { disburseReducer } from './reducer/disburse.reducer';
import { globalReducer } from './reducer/global.reducer';

const rootReducer = combineReducers({
  customers: customerReducer,
  loans: loanReducer,
  groups: groupReducer,
  employee: employeeReducer,
  item: itemReducer,
  disburse: disburseReducer,
  global: globalReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
