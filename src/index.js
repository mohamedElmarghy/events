import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ReactReduxFirebaseProvider , isLoaded, getFirebase} from 'react-redux-firebase'
import fbConfig from './firebase/config/fbConfig';
import firebase from 'firebase/app';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import './indexx.css';
import reducers from './store/reducers';
import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { reduxFirestore,getFirestore, createFirestoreInstance} from 'redux-firestore';
import thunk from 'redux-thunk';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from 'react-redux-toastr'


const store = createStore(reducers,
  composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
        reduxFirestore(fbConfig)
      )
    );
    const rrfConfig = {
      userProfile: 'users',
      useFirestoreForProfile: true,
      updateProfileOnLogin: false
    }
const rrfProps = {
    firebase,
    config: rrfConfig,fbConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
   
  };
  function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return <div>Loading Screen...</div>;
        return children
}
  ReactDOM.render(
    <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
      <AuthIsLoaded>
        <ReduxToastr 
          position='bottom-right'
          transitionIn='fadeIn'
          transitionOut="fadeOut"
          />
        <App />
        </AuthIsLoaded>
      </BrowserRouter>
      
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);