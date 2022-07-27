import {combineReducers} from 'redux';
import login from './login';
import chart from './chart';
import user from './user';
import loading from './loading';
import ondelete from './delete';
import product from './product';
import device from './device';

const reducers = combineReducers({
  login: login,
  chart: chart,
  device: device,
  user: user,
  loading: loading,
  delete: ondelete,
  product: product,
});

export default reducers;
