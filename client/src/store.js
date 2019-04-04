import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction';
import rootReducer from './reducers'

const composeEnhancers = composeWithDevTools({
  name: 'MyApp'
});

export default function store(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware
        )
    )
  )

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}