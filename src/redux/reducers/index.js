import {combineReducers} from 'redux';
import login from './login';
import chart from './chart';
import user from './user';
import loading from './loading';

const reducers = combineReducers({
  login: login,
  chart: chart,
  user: user,
  loading: loading,
});

export default reducers;
