import {
  createStore
} from 'redux';
import applyedMiddlewares from '../../middlewares';
import rootReducer from '../../ducks/index';

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyedMiddlewares
);

export default configureStore;
