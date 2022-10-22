import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import settingsReducer from './slices/settings';
import zettaReducer from './slices/zetta_reducer';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['settings']
};

const rootReducer = combineReducers({
  settings: settingsReducer,
  zetta: zettaReducer
});

export { rootPersistConfig, rootReducer };
