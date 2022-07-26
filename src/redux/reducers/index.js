import {combineReducers} from 'redux';
import login from './login';
import chart from './chart';
import user from './user';
import loading from './loading';
import ondelete from './delete';
import product from './product';

const reducers = combineReducers({
  login: login,
  chart: chart,
  user: user,
  loading: loading,
  delete: ondelete,
  product: product,
});

export default reducers;
