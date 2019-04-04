import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {
    connectRouter,
    routerMiddleware
  } from 'connected-react-router';
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction';
import rootReducer from './reducers';
import {history} from './config/history';

const composeEnhancers = composeWithDevTools({
  name: 'MyApp'
});

const loggerMiddleware = createLogger({predicate: (getState, action) => true})

export default function store(preloadedState) {
  const store = createStore(
    connectRouter(history)(rootReducer), //History e Stato vengono connessi
    preloadedState,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware,
            routerMiddleware(history)
        )
    )
  )

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(connectRouter(history)(rootReducer));
    });
  }

  return store;
}