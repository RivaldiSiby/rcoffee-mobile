import {legacy_createStore as createStore} from 'redux';
import reducers from './reducers';
// persist redux
import {persistStore, persistReducer} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login', 'chart', 'user', 'product', 'delete'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(persistedReducer);
let persistor = persistStore(store);
export {store, persistor};
