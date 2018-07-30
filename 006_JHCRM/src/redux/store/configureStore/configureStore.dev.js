import {
  createStore,
  compose
} from 'redux';
import applyedMiddlewares from '../../middlewares';
import rootReducer from '../../ducks/index';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;
const enhancer = composeEnhancers(
  applyedMiddlewares,
  // other store enhancers if any
);
const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    enhancer
  );
  
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../../ducks', () => {
      const newRootReducer = require('../../ducks');
      store.replaceReducer(newRootReducer);
    });
  }
  
  return store;
};

export default configureStore;
