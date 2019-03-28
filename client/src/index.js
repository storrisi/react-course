import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader'
import './index.css';
<<<<<<< Updated upstream
import App from './App';
=======
import App from './containers/App';
>>>>>>> Stashed changes
import * as serviceWorker from './serviceWorker';

const render = Component => {
    ReactDOM.render(<AppContainer>
        <Component />
    </AppContainer>, document.getElementById('root'));
}

render(App)

if (module.hot) {
<<<<<<< Updated upstream
    module.hot.accept('./App', () => {render(App)})
=======
    module.hot.accept('./containers/App', () => {render(App)})
>>>>>>> Stashed changes
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
