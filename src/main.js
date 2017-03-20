import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import AppContainer from './containers/AppContainer';

// Erishen:: Promise 浏览器兼容: https://github.com/taylorhakes/promise-polyfill
import Promise from 'promise-polyfill';

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

// Erishen:: A window.fetch JavaScript polyfill: https://github.com/github/fetch
import 'whatwg-fetch';

localStorage.setItem('debug', 'leancloud*');

const appId = '0AwRKRTHbBvAUP8D8VaxJhzs-gzGzoHsz';
const appKey = 'MGGIMS48nNIh8dBK4r1vMRfu';
window.AV.init({ appId, appKey });

/*
var TestObject = window.AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
});
*/


// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  const routes = require('./routes/index').default(store);

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  );
};

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        console.error(error);
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      })
    );
  }
}

// ========================================================
// Go!
// ========================================================
render();
