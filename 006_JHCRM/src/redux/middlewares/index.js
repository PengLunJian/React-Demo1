import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from './api';

const applyedMiddlewares = applyMiddleware(
  thunk,
  api
);

export default applyedMiddlewares;
