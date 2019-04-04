import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader'
import {history} from './config/history'
import store from './store'
import './shared/styles/index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

const render = Component => {
    ReactDOM.render(<AppContainer>
        <Component history={history} store={store} />
    </AppContainer>, document.getElementById('root'));
}

render(App)

if (module.hot) {
    module.hot.accept('./containers/App', () => {render(App)})
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
