import {combineReducers} from 'redux';
import login from './login';
import chart from './chart';
import user from './user';
import loading from './loading';
import product from './product';

const reducers = combineReducers({
  login: login,
  chart: chart,
  user: user,
  loading: loading,
  product: product,
});

export default reducers;
